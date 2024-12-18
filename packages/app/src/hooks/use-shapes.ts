import { useShape } from "@electric-sql/react"
import { ShapeStreamOptions } from "@electric-sql/client"

const API_URL = import.meta.env.VITE_API_URL

export const shapeConfigs: Record<string, ShapeStreamOptions> = {
  recipes: {
    url: `${API_URL}/v1/shape`,
    params: {
      table: `recipes`,
    },
  },
  ingredients: {
    url: `${API_URL}/v1/shape`,
    params: {
      table: `ingredients`,
    },
    parser: {
      timestamptz: (value: string) => new Date(value),
    },
  },
  recipeIngredients: {
    url: `${API_URL}/v1/shape`,
    params: {
      table: `recipe_ingredients`,
    },
  },
  photos: {
    url: `${API_URL}/v1/shape`,
    params: {
      table: `ingredients_photo_uploads`,
    },
  },
} as const

export function useRecipesShape() {
  return useShape(shapeConfigs.recipes)
}

export function useIngredientsShape() {
  return useShape(shapeConfigs.ingredients)
}

export function useRecipeIngredientsShape() {
  return useShape(shapeConfigs.recipeIngredients)
}

export function usePhotosShape() {
  return useShape(shapeConfigs.photos)
}
