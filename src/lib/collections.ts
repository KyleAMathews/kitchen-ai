import { BasicIndex, createCollection } from "@tanstack/react-db"
import {
  createRealtimeClient,
  type SealedLiveQuery,
} from "@neon/realtime/client"
import { drizzleParsers } from "@neon/realtime-drizzle/client"
import {
  realtimeCollectionOptions,
  type RealtimeCollectionUtils,
} from "@neon/realtime-tanstack"
import type { z } from "zod"
import {
  selectIngredientsSchema,
  selectRecipesSchema,
  selectRecipeIngredientsSchema,
  selectRecipeCommentsSchema,
  selectUserProfilesSchema,
  selectTagsSchema,
  selectRecipeTagsSchema,
  selectIngredientTagsSchema,
} from "@/db/zod-schemas"
import { trpc } from "@/lib/trpc-client"

// How long a write waits for its own transaction to come back over Realtime
// before TanStack DB rolls it back. Generous, so a slow reconnect doesn't undo
// a write that the server already committed.
export const TXID_TIMEOUT_MS = 60_000

type LiveQueryName = Parameters<typeof trpc.realtime.seal.mutate>[0][`name`]

// Waits for a write's transaction to reach the collection's live query.
export async function awaitTxId(
  collection: { utils: RealtimeCollectionUtils },
  txid: string
) {
  await collection.utils.awaitTxId(txid, TXID_TIMEOUT_MS)
}

function createCollections(sealed: Awaited<ReturnType<typeof sealAll>>) {
  // Collections are client-only (`/_authenticated` disables SSR), so this
  // only ever connects from the browser.
  const client = createRealtimeClient({
    url: import.meta.env.VITE_NEON_REALTIME_URL,
    parsers: { ...drizzleParsers },
  })

  // The tRPC output type is the JSON view of the row, so restate the row type
  // the live query actually produces (dates parsed back into `Date`s). The
  // schema only supplies that type: passing it to the collection as `schema`
  // doesn't type-check with `realtimeCollectionOptions`, and synced rows skip
  // it anyway.
  function live<Schema extends z.ZodType>(
    name: LiveQueryName,
    _schema: Schema
  ) {
    type Row = z.output<Schema> & object
    return {
      client,
      query: sealed[name] as unknown as SealedLiveQuery<Row>,
      refreshQuery: () =>
        trpc.realtime.seal
          .mutate({ name })
          .catch(leaveOnAuthLoss) as unknown as Promise<SealedLiveQuery<Row>>,
      // Never garbage-collect: a collection restarted later would resubscribe
      // with its original, long-expired sealed query.
      gcTime: 0,
    }
  }

  const users = createCollection(
    realtimeCollectionOptions({
      id: `users`,
      ...live(`users`, selectUserProfilesSchema),
      getKey: (item) => item.id,
    })
  )

  const ingredients = createCollection(
    realtimeCollectionOptions({
      id: `ingredients`,
      ...live(`ingredients`, selectIngredientsSchema),
      getKey: (item) => item.id,

      onInsert: async ({ transaction, collection }) => {
        const { modified: newIngredient } = transaction.mutations[0]
        const result = await trpc.ingredients.create.mutate({
          id: newIngredient.id,
          name: newIngredient.name,
          description: newIngredient.description,
          embedding: newIngredient.embedding,
          tracking_type: newIngredient.tracking_type,
          fill_level: newIngredient.fill_level,
          grocery_section: newIngredient.grocery_section,
          count: newIngredient.count,
          trello_add_count: newIngredient.trello_add_count,
          is_reviewed: newIngredient.is_reviewed,
          expiration_date: newIngredient.expiration_date,
        })
        await awaitTxId(collection, result.txid)
      },

      onUpdate: async ({ transaction, collection }) => {
        const { original, changes: updatedIngredient } =
          transaction.mutations[0]
        const result = await trpc.ingredients.update.mutate({
          id: original.id,
          data: {
            ...updatedIngredient,
          },
        })
        await awaitTxId(collection, result.txid)
      },

      onDelete: async ({ transaction, collection }) => {
        const { original: deletedIngredient } = transaction.mutations[0]
        const result = await trpc.ingredients.delete.mutate({
          id: deletedIngredient.id,
        })
        await awaitTxId(collection, result.txid)
      },
    })
  )

  const recipes = createCollection(
    realtimeCollectionOptions({
      id: `recipes`,
      ...live(`recipes`, selectRecipesSchema),
      getKey: (item) => item.id,

      onInsert: async ({ transaction, collection }) => {
        const { modified: newRecipe, metadata } = transaction.mutations[0]

        if (
          typeof metadata !== `object` ||
          metadata === null ||
          !(`pastedText` in metadata) ||
          typeof metadata.pastedText !== `string` ||
          !metadata.pastedText
        ) {
          throw new Error(`pastedText is required to create a recipe`)
        }
        const url =
          `url` in metadata && typeof metadata.url === `string`
            ? metadata.url
            : undefined

        const result = await trpc.recipes.create.mutate({
          id: newRecipe.id,
          pastedText: metadata.pastedText,
          url,
        })
        await awaitTxId(collection, result.txid)
      },

      onUpdate: async ({ transaction, collection }) => {
        const { modified: updatedRecipe } = transaction.mutations[0]
        const result = await trpc.recipes.update.mutate({
          id: updatedRecipe.id,
          data: {
            name: updatedRecipe.name,
            description: updatedRecipe.description,
            url: updatedRecipe.url,
          },
        })
        await awaitTxId(collection, result.txid)
      },

      onDelete: async ({ transaction, collection }) => {
        const { original: deletedRecipe } = transaction.mutations[0]
        const result = await trpc.recipes.delete.mutate({
          id: deletedRecipe.id,
        })
        await awaitTxId(collection, result.txid)
      },
    })
  )

  // Recipe ingredients are written by `recipes.create`, which the recipe
  // create action confirms; there are no direct mutations.
  const recipeIngredients = createCollection(
    realtimeCollectionOptions({
      id: `recipe_ingredients`,
      ...live(`recipe_ingredients`, selectRecipeIngredientsSchema),
      getKey: (item) => item.id,
    })
  )

  const recipeComments = createCollection(
    realtimeCollectionOptions({
      id: `recipe_comments`,
      ...live(`recipe_comments`, selectRecipeCommentsSchema),
      getKey: (item) => item.id,

      onInsert: async ({ transaction, collection }) => {
        const { modified: newComment } = transaction.mutations[0]
        const result = await trpc.recipeComments.create.mutate({
          id: newComment.id,
          recipe_id: newComment.recipe_id,
          made_it: newComment.made_it,
          rating: newComment.rating,
          comment: newComment.comment,
        })
        await awaitTxId(collection, result.txid)
      },

      onUpdate: async ({ transaction, collection }) => {
        const { original, changes } = transaction.mutations[0]
        const result = await trpc.recipeComments.update.mutate({
          id: original.id,
          data: changes,
        })
        await awaitTxId(collection, result.txid)
      },

      onDelete: async ({ transaction, collection }) => {
        const { original: deletedComment } = transaction.mutations[0]
        const result = await trpc.recipeComments.delete.mutate({
          id: deletedComment.id,
        })
        await awaitTxId(collection, result.txid)
      },
    })
  )

  const tags = createCollection(
    realtimeCollectionOptions({
      id: `tags`,
      ...live(`tags`, selectTagsSchema),
      getKey: (item) => item.id,

      onInsert: async ({ transaction, collection }) => {
        const { modified: newTag } = transaction.mutations[0]
        const result = await trpc.tags.create.mutate({
          id: newTag.id,
          name: newTag.name,
        })
        await awaitTxId(collection, result.txid)
      },

      onUpdate: async ({ transaction, collection }) => {
        const { original, modified } = transaction.mutations[0]
        const result = await trpc.tags.update.mutate({
          id: original.id,
          data: { name: modified.name },
        })
        await awaitTxId(collection, result.txid)
      },

      onDelete: async ({ transaction, collection }) => {
        const { original: deletedTag } = transaction.mutations[0]
        const result = await trpc.tags.delete.mutate({
          id: deletedTag.id,
        })
        await awaitTxId(collection, result.txid)
      },
    })
  )

  const recipeTags = createCollection(
    realtimeCollectionOptions({
      id: `recipe_tags`,
      ...live(`recipe_tags`, selectRecipeTagsSchema),
      getKey: (item) => item.id,

      onInsert: async ({ transaction, collection }) => {
        const { modified: newRecipeTag } = transaction.mutations[0]
        const result = await trpc.tags.addToRecipe.mutate({
          id: newRecipeTag.id,
          recipe_id: newRecipeTag.recipe_id,
          tag_id: newRecipeTag.tag_id,
        })
        await awaitTxId(collection, result.txid)
      },

      onDelete: async ({ transaction, collection }) => {
        const { original: deletedRecipeTag } = transaction.mutations[0]
        const result = await trpc.tags.removeFromRecipe.mutate({
          id: deletedRecipeTag.id,
        })
        await awaitTxId(collection, result.txid)
      },
    })
  )

  const ingredientTags = createCollection(
    realtimeCollectionOptions({
      id: `ingredient_tags`,
      ...live(`ingredient_tags`, selectIngredientTagsSchema),
      getKey: (item) => item.id,

      onInsert: async ({ transaction, collection }) => {
        const { modified: newIngredientTag } = transaction.mutations[0]
        const result = await trpc.tags.addToIngredient.mutate({
          id: newIngredientTag.id,
          ingredient_id: newIngredientTag.ingredient_id,
          tag_id: newIngredientTag.tag_id,
        })
        await awaitTxId(collection, result.txid)
      },

      onDelete: async ({ transaction, collection }) => {
        const { original: deletedIngredientTag } = transaction.mutations[0]
        const result = await trpc.tags.removeFromIngredient.mutate({
          id: deletedIngredientTag.id,
        })
        await awaitTxId(collection, result.txid)
      },
    })
  )

  ingredients.createIndex((row) => row.updated_at, {
    indexType: BasicIndex,
    name: `ingredients_updated_at`,
  })

  recipeComments.createIndex((row) => row.recipe_id, {
    indexType: BasicIndex,
    name: `recipe_comments_recipe_id`,
  })

  recipeTags.createIndex((row) => row.tag_id, {
    indexType: BasicIndex,
    name: `recipe_tags_tag_id`,
  })

  ingredientTags.createIndex((row) => row.tag_id, {
    indexType: BasicIndex,
    name: `ingredient_tags_tag_id`,
  })

  return {
    users,
    ingredients,
    recipes,
    recipeIngredients,
    recipeComments,
    tags,
    recipeTags,
    ingredientTags,
  }
}

type Collections = ReturnType<typeof createCollections>

// A realtime collection needs a sealed query when it's created, and sealing
// needs the signed-in session. So the collections are created by
// `initCollections()`, which `/_authenticated` awaits in `beforeLoad`, and
// exported as live bindings: importers see them once they're assigned. Only
// read them from code that runs under `/_authenticated`.
export let usersCollection: Collections[`users`]
export let ingredientsCollection: Collections[`ingredients`]
export let recipesCollection: Collections[`recipes`]
export let recipeIngredientsCollection: Collections[`recipeIngredients`]
export let recipeCommentsCollection: Collections[`recipeComments`]
export let tagsCollection: Collections[`tags`]
export let recipeTagsCollection: Collections[`recipeTags`]
export let ingredientTagsCollection: Collections[`ingredientTags`]

const sealAll = () => trpc.realtime.sealAll.mutate()

let initialized: Promise<void> | undefined

export function initCollections() {
  initialized ??= sealAll()
    .then((sealed) => {
      const collections = createCollections(sealed)
      usersCollection = collections.users
      ingredientsCollection = collections.ingredients
      recipesCollection = collections.recipes
      recipeIngredientsCollection = collections.recipeIngredients
      recipeCommentsCollection = collections.recipeComments
      tagsCollection = collections.tags
      recipeTagsCollection = collections.recipeTags
      ingredientTagsCollection = collections.ingredientTags
    })
    .catch((error: unknown) => {
      initialized = undefined
      throw error
    })
  return initialized
}

// The session ended, so these collections' queries no longer apply. Leave
// with a full page load, which drops the realtime connection and its rows.
function leaveOnAuthLoss(error: unknown): never {
  if (/UNAUTHORIZED/.test(String(error))) {
    window.location.assign(`/login`)
  }
  throw error
}
