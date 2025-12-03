import { createCollection } from "@tanstack/react-db"
import { electricCollectionOptions } from "@tanstack/electric-db-collection"
import {
  selectIngredientsSchema,
  selectRecipesSchema,
  selectRecipeIngredientsSchema,
  selectRecipeCommentsSchema,
  selectUsersSchema,
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

      // pastedText is required for recipe creation
      const recipeMetadata = metadata as
        | { pastedText: string; url?: string }
        | undefined
      if (!recipeMetadata?.pastedText) {
        throw new Error(`pastedText is required to create a recipe`)
      }

      const result = await trpc.recipes.create.mutate({
        id: newRecipe.id,
        pastedText: recipeMetadata.pastedText,
        url: recipeMetadata.url,
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
