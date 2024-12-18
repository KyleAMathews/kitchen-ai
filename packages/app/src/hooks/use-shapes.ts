import { useShape } from "@electric-sql/react"

const API_URL = import.meta.env.VITE_API_URL

export function useRecipesShape() {
  return useShape({
    url: `${API_URL}/v1/shape`,
    params: {
      table: `recipes`,
    },
  })
}

export function useIngredientsShape() {
  return useShape({
    url: `${API_URL}/v1/shape`,
    params: {
      table: `ingredients`,
    },
  })
}

export function useRecipeIngredientsShape() {
  return useShape({
    url: `${API_URL}/v1/shape`,
    params: {
      table: `recipe_ingredients`,
    },
  })
}

export function usePhotosShape() {
  return useShape({
    url: `${API_URL}/v1/shape`,
    params: {
      table: `photos`,
    },
  })
}
