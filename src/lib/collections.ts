import { createCollection } from "@tanstack/react-db"
import { electricCollectionOptions } from "@tanstack/electric-db-collection"
import { authClient } from "@/lib/auth-client"
import {
  selectIngredientsSchema,
  selectRecipesSchema,
  selectRecipeIngredientsSchema,
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
        trackingType: newIngredient.tracking_type,
        fillLevel: newIngredient.fill_level,
        grocerySection: newIngredient.grocery_section,
        count: newIngredient.count,
        expirationDate: newIngredient.expiration_date,
        ingredientsPhotoUploadsId: newIngredient.ingredients_photo_uploads_id,
      })

      return { txid: result.txid }
    },

    onUpdate: async ({ transaction }) => {
      const { original, changes: updatedIngredient } = transaction.mutations[0]
      const result = await trpc.ingredients.update.mutate({
        id: original.id,
        data: {
          ...updatedIngredient,
        },
      })

      return { txid: result.txid }
    },

    onDelete: async ({ transaction }) => {
      const { original: deletedIngredient } = transaction.mutations[0]
      const result = await trpc.ingredients.delete.mutate({
        id: deletedIngredient.id,
      })

      return { txid: result.txid }
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
      if (!metadata?.pastedText) {
        throw new Error(`pastedText is required to create a recipe`)
      }

      const result = await trpc.recipes.create.mutate({
        pastedText: metadata.pastedText,
        url: metadata.url,
      })

      console.log(`recipe created`, result)

      return { txid: result.txid }
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

      return { txid: result.txid }
    },

    onDelete: async ({ transaction }) => {
      const { original: deletedRecipe } = transaction.mutations[0]
      const result = await trpc.recipes.delete.mutate({
        id: deletedRecipe.id,
      })

      return { txid: result.txid }
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
