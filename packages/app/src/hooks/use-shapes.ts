// import { useShape } from "@electric-sql/react"
import { useCollection } from "@kylemathews/sync/useCollection"
// import { CollectionConfig } from "@kylemathews/sync/collection"
// import { createElectricSync } from "@kylemathews/sync/electric"
// import { ShapeStreamOptions } from "@electric-sql/client"
import { electricCollectionOptions } from "@tanstack/electric-db-collection"
import { createCollection } from "@tanstack/react-db"

console.log({ useCollection })

const API_URL = import.meta.env.VITE_API_URL
console.log({ API_URL })
// const API_URL = `http://localhost:3000`

export const recipesCollection = createCollection(
  electricCollectionOptions({
    id: `recipes`,
    getKey: (item) => item.id,
    shapeOptions: {
      url: `${API_URL}/v1/shape`,
      params: {
        table: `recipes`,
      },
    },
  })
)

export const ingredientsCollection = createCollection(
  electricCollectionOptions({
    id: `ingredients`,
    getKey: (item) => item.id,
    shapeOptions: {
      url: `${API_URL}/v1/shape`,
      params: {
        table: `ingredients`,
      },
      parser: {
        timestamptz: (value: string) => new Date(value),
      },
    },
  })
)

export const photoUploadsCollection = createCollection(
  electricCollectionOptions({
    id: `photoUploads`,
    getKey: (item) => item.id,
    shapeOptions: {
      url: `${API_URL}/v1/shape`,
      params: {
        table: `ingredients_photo_uploads`,
      },
    },
  })
)

export const recipeIngredientsCollection = createCollection(
  electricCollectionOptions({
    id: `recipeIngredients`,
    getKey: (item) => item.id,
    shapeOptions: {
      url: `${API_URL}/v1/shape`,
      params: {
        table: `recipe_ingredients`,
      },
    },
  })
)

// export const collectionConfigs: Record<string, CollectionConfig> = {
//   recipes: {
//     id: `all-recipes`,
//     sync: createElectricSync(
//       {
//         url: `${API_URL}/v1/shape`,
//         params: {
//           table: `recipes`,
//         },
//       },
//       { primaryKey: [`id`] }
//     ),
//     mutationFn: {
//       persist: async (params) => {
//         console.log(`persist called`, { params })
//       },
//       awaitSync: async (params) => {
//         console.log(`awaitSync called`, { params })
//       },
//     },
//   },
//   ingredients: {
//     id: `all-ingredients`,
//     sync: createElectricSync(
//       {
//         url: `${API_URL}/v1/shape`,
//         params: {
//           table: `ingredients`,
//         },
//         parser: {
//           timestamptz: (value: string) => new Date(value),
//         },
//       },
//       { primaryKey: [`id`] }
//     ),
//     mutationFn: {
//       persist: async (params) => {
//         console.log(`ingredients persist called`, { params })
//       },
//       awaitSync: async (params) => {
//         console.log(`ingredients awaitSync called`, { params })
//       },
//     },
//   },
// }
//
// export const shapeConfigs: Record<string, ShapeStreamOptions> = {
//   // recipes: {
//   //   url: `${API_URL}/v1/shape`,
//   //   params: {
//   //     table: `recipes`,
//   //   },
//   // },
//   // ingredients: {
//   //   url: `${API_URL}/v1/shape`,
//   //   params: {
//   //     table: `ingredients`,
//   //   },
//   //   parser: {
//   //     timestamptz: (value: string) => new Date(value),
//   //   },
//   // },
//   recipeIngredients: {
//     url: `${API_URL}/v1/shape`,
//     params: {
//       table: `recipe_ingredients`,
//     },
//   },
//   photos: {
//     url: `${API_URL}/v1/shape`,
//     params: {
//       table: `ingredients_photo_uploads`,
//     },
//   },
// } as const
//
// export function useRecipesShape() {
//   return useCollection(collectionConfigs.recipes)
// }
//
// export function useIngredientsShape() {
//   return useCollection(collectionConfigs.ingredients)
// }
//
// export function useRecipeIngredientsShape() {
//   return useShape(shapeConfigs.recipeIngredients)
// }
//
// export function usePhotosShape() {
//   return useShape(shapeConfigs.photos)
// }
