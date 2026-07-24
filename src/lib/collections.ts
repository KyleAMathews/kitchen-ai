import { createCollection } from "@tanstack/react-db"
import { electricCollectionOptions } from "@tanstack/electric-db-collection"
import {
  selectIngredientsSchema,
  selectRecipesSchema,
  selectRecipeIngredientsSchema,
  selectRecipeCommentsSchema,
  selectUsersSchema,
  selectTagsSchema,
  selectRecipeTagsSchema,
  selectIngredientTagsSchema,
} from "@/db/zod-schemas"
import { trpc } from "@/lib/trpc-client"

export const usersCollection = createCollection(
  electricCollectionOptions({
    id: `users`,
    shapeOptions: {
      url: new URL(
        `/api/users`,
        typeof window !== `undefined`
          ? window.location.origin
          : `http://localhost:5173`
      ).toString(),
      parser: {
        timestamptz: (date: string) => new Date(date),
      },
    },
    schema: selectUsersSchema,
    getKey: (item) => item.id,
  })
)

export const ingredientsCollection = createCollection(
  electricCollectionOptions({
    id: `ingredients`,
    shapeOptions: {
      url: new URL(
        `/api/ingredients`,
        typeof window !== `undefined`
          ? window.location.origin
          : `http://localhost:5173`
      ).toString(),
      parser: {
        timestamptz: (date: string) => new Date(date),
      },
    },
    schema: selectIngredientsSchema,
    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
      const { modified: newIngredient } = transaction.mutations[0]
      const result = await trpc.ingredients.create.mutate({
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

      return { txid: Number(result.txid) }
    },

    onUpdate: async ({ transaction }) => {
      const { original, changes: updatedIngredient } = transaction.mutations[0]
      const result = await trpc.ingredients.update.mutate({
        id: original.id,
        data: {
          ...updatedIngredient,
        },
      })

      return { txid: Number(result.txid) }
    },

    onDelete: async ({ transaction }) => {
      const { original: deletedIngredient } = transaction.mutations[0]
      const result = await trpc.ingredients.delete.mutate({
        id: deletedIngredient.id,
      })

      return { txid: Number(result.txid) }
    },
  })
)

export const recipesCollection = createCollection(
  electricCollectionOptions({
    id: `recipes`,
    shapeOptions: {
      url: new URL(
        `/api/recipes`,
        typeof window !== `undefined`
          ? window.location.origin
          : `http://localhost:5173`
      ).toString(),
      parser: {
        timestamptz: (date: string) => new Date(date),
      },
    },
    schema: selectRecipesSchema,
    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
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

      return { txid: Number(result.txid) }
    },

    onUpdate: async ({ transaction }) => {
      const { modified: updatedRecipe } = transaction.mutations[0]
      const result = await trpc.recipes.update.mutate({
        id: updatedRecipe.id,
        data: {
          name: updatedRecipe.name,
          description: updatedRecipe.description,
          url: updatedRecipe.url,
        },
      })

      return { txid: Number(result.txid) }
    },

    onDelete: async ({ transaction }) => {
      const { original: deletedRecipe } = transaction.mutations[0]
      const result = await trpc.recipes.delete.mutate({
        id: deletedRecipe.id,
      })

      return { txid: Number(result.txid) }
    },
  })
)

export const recipeIngredientsCollection = createCollection(
  electricCollectionOptions({
    id: `recipe_ingredients`,
    shapeOptions: {
      url: new URL(
        `/api/recipe-ingredients`,
        typeof window !== `undefined`
          ? window.location.origin
          : `http://localhost:5173`
      ).toString(),
    },
    schema: selectRecipeIngredientsSchema,
    getKey: (item) => item.id,

    // Note: Recipe ingredients are typically managed through the recipes.addIngredients tRPC procedure
    // But we can still provide optimistic updates for direct operations
  })
)

export const recipeCommentsCollection = createCollection(
  electricCollectionOptions({
    id: `recipe_comments`,
    shapeOptions: {
      url: new URL(
        `/api/recipe-comments`,
        typeof window !== `undefined`
          ? window.location.origin
          : `http://localhost:5173`
      ).toString(),
      parser: {
        timestamptz: (date: string) => new Date(date),
      },
    },
    schema: selectRecipeCommentsSchema,
    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
      const { modified: newComment } = transaction.mutations[0]
      const result = await trpc.recipeComments.create.mutate({
        recipe_id: newComment.recipe_id,
        made_it: newComment.made_it,
        rating: newComment.rating,
        comment: newComment.comment,
      })

      return { txid: Number(result.txid) }
    },

    onUpdate: async ({ transaction }) => {
      const { original, changes } = transaction.mutations[0]
      const result = await trpc.recipeComments.update.mutate({
        id: original.id,
        data: changes,
      })

      return { txid: Number(result.txid) }
    },

    onDelete: async ({ transaction }) => {
      const { original: deletedComment } = transaction.mutations[0]
      const result = await trpc.recipeComments.delete.mutate({
        id: deletedComment.id,
      })

      return { txid: Number(result.txid) }
    },
  })
)

export const tagsCollection = createCollection(
  electricCollectionOptions({
    id: `tags`,
    shapeOptions: {
      url: new URL(
        `/api/tags`,
        typeof window !== `undefined`
          ? window.location.origin
          : `http://localhost:5173`
      ).toString(),
      parser: {
        timestamptz: (date: string) => new Date(date),
      },
    },
    schema: selectTagsSchema,
    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
      const { modified: newTag } = transaction.mutations[0]
      const result = await trpc.tags.create.mutate({
        id: newTag.id,
        name: newTag.name,
      })

      return { txid: Number(result.txid) }
    },

    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0]
      const result = await trpc.tags.update.mutate({
        id: original.id,
        data: { name: modified.name },
      })

      return { txid: Number(result.txid) }
    },

    onDelete: async ({ transaction }) => {
      const { original: deletedTag } = transaction.mutations[0]
      const result = await trpc.tags.delete.mutate({
        id: deletedTag.id,
      })

      return { txid: Number(result.txid) }
    },
  })
)

export const recipeTagsCollection = createCollection(
  electricCollectionOptions({
    id: `recipe_tags`,
    shapeOptions: {
      url: new URL(
        `/api/recipe-tags`,
        typeof window !== `undefined`
          ? window.location.origin
          : `http://localhost:5173`
      ).toString(),
      parser: {
        timestamptz: (date: string) => new Date(date),
      },
    },
    schema: selectRecipeTagsSchema,
    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
      const { modified: newRecipeTag } = transaction.mutations[0]
      const result = await trpc.tags.addToRecipe.mutate({
        id: newRecipeTag.id,
        recipe_id: newRecipeTag.recipe_id,
        tag_id: newRecipeTag.tag_id,
      })

      return { txid: Number(result.txid) }
    },

    onDelete: async ({ transaction }) => {
      const { original: deletedRecipeTag } = transaction.mutations[0]
      const result = await trpc.tags.removeFromRecipe.mutate({
        id: deletedRecipeTag.id,
      })

      return { txid: Number(result.txid) }
    },
  })
)

export const ingredientTagsCollection = createCollection(
  electricCollectionOptions({
    id: `ingredient_tags`,
    shapeOptions: {
      url: new URL(
        `/api/ingredient-tags`,
        typeof window !== `undefined`
          ? window.location.origin
          : `http://localhost:5173`
      ).toString(),
      parser: {
        timestamptz: (date: string) => new Date(date),
      },
    },
    schema: selectIngredientTagsSchema,
    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
      const { modified: newIngredientTag } = transaction.mutations[0]
      const result = await trpc.tags.addToIngredient.mutate({
        id: newIngredientTag.id,
        ingredient_id: newIngredientTag.ingredient_id,
        tag_id: newIngredientTag.tag_id,
      })

      return { txid: Number(result.txid) }
    },

    onDelete: async ({ transaction }) => {
      const { original: deletedIngredientTag } = transaction.mutations[0]
      const result = await trpc.tags.removeFromIngredient.mutate({
        id: deletedIngredientTag.id,
      })

      return { txid: Number(result.txid) }
    },
  })
)
