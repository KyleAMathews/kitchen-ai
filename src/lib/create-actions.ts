import { createOptimisticAction } from "@tanstack/react-db"
import type { SelectIngredient, SelectTag } from "@/db/zod-schemas"
import {
  ingredientsCollection,
  recipeIngredientsCollection,
  recipesCollection,
} from "@/lib/collections"
import {
  awaitTagWrites,
  optimisticallyInsertTags,
  prepareTagWrites,
  type TagWrites,
} from "@/lib/tags"
import { trpc } from "@/lib/trpc-client"

type TrackingType = NonNullable<SelectIngredient[`tracking_type`]>

interface CreateIngredientInput {
  name: string
  tracking_type: TrackingType
  fill_level: number
  count: number
  expiration_date: Date
  tags: SelectTag[]
}

interface CreateIngredientVariables extends TagWrites {
  ingredient: SelectIngredient & { tracking_type: TrackingType }
}

const createIngredientAction =
  createOptimisticAction<CreateIngredientVariables>({
    onMutate: ({ ingredient, ...tagWrites }) => {
      ingredientsCollection.insert(ingredient)
      optimisticallyInsertTags(
        { entity: `ingredient`, entity_id: ingredient.id },
        tagWrites
      )
    },
    mutationFn: async ({ ingredient, ...tagWrites }) => {
      const { txid } = await trpc.ingredients.createWithAI.mutate({
        id: ingredient.id,
        name: ingredient.name,
        tracking_type: ingredient.tracking_type,
        fill_level: ingredient.fill_level,
        count: ingredient.count,
        expiration_date: ingredient.expiration_date,
        new_tags: tagWrites.new_tags.map(({ id, name }) => ({ id, name })),
        links: tagWrites.links.map(({ id, tag_id }) => ({ id, tag_id })),
      })
      const numericTxid = Number(txid)

      await Promise.all([
        ingredientsCollection.utils.awaitTxId(numericTxid),
        awaitTagWrites(
          { entity: `ingredient`, entity_id: ingredient.id },
          tagWrites,
          numericTxid
        ),
      ])
    },
  })

export function createIngredient(input: CreateIngredientInput) {
  const now = new Date()
  const id = crypto.randomUUID()
  const ingredient: SelectIngredient & { tracking_type: TrackingType } = {
    id,
    name: input.name,
    description: `AI processing in progress`,
    is_reviewed: true,
    embedding: `[]`,
    tracking_type: input.tracking_type,
    fill_level: input.fill_level,
    grocery_section: `Other`,
    count: input.count,
    trello_add_count: 0,
    expiration_date: input.expiration_date,
    user_id: ``,
    created_at: now,
    updated_at: now,
  }

  return createIngredientAction({
    ingredient,
    ...prepareTagWrites(input.tags),
  })
}

interface CreateRecipeInput {
  url: string
  pastedText: string
  tags: SelectTag[]
}

interface CreateRecipeVariables extends TagWrites {
  id: string
  url: string
  pastedText: string
  created_at: Date
}

const createRecipeAction = createOptimisticAction<CreateRecipeVariables>({
  onMutate: ({ id, url, created_at, new_tags, links }) => {
    const tagWrites = { new_tags, links }
    recipesCollection.insert({
      id,
      name: `Processing...`,
      description: `AI processing in progress`,
      url,
      user_id: ``,
      created_at,
      updated_at: created_at,
    })
    optimisticallyInsertTags({ entity: `recipe`, entity_id: id }, tagWrites)
  },
  mutationFn: async ({ id, url, pastedText, new_tags, links }) => {
    const tagWrites = { new_tags, links }
    const { txid } = await trpc.recipes.create.mutate({
      id,
      url,
      pastedText,
      new_tags: tagWrites.new_tags.map(({ id, name }) => ({ id, name })),
      links: tagWrites.links.map(({ id, tag_id }) => ({ id, tag_id })),
    })
    const numericTxid = Number(txid)

    await Promise.all([
      recipesCollection.utils.awaitTxId(numericTxid),
      recipeIngredientsCollection.utils.awaitTxId(numericTxid),
      awaitTagWrites(
        { entity: `recipe`, entity_id: id },
        tagWrites,
        numericTxid
      ),
    ])
  },
})

export function createRecipe(input: CreateRecipeInput) {
  const id = crypto.randomUUID()
  const transaction = createRecipeAction({
    id,
    url: input.url,
    pastedText: input.pastedText,
    created_at: new Date(),
    ...prepareTagWrites(input.tags),
  })

  return { id, transaction }
}
