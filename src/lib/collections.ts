import { DbClient } from "@tanstack/db"
import { BasicIndex } from "@tanstack/react-db"
import { createKitchenEndpoints } from "@/endpoints/kitchen.endpoint"
import { createRecipeCards } from "./derived-collections"
let current:
  { userId: string; endpoints: ReturnType<typeof createKitchen> } | undefined
function createKitchen(userId: string) {
  const endpoints = createKitchenEndpoints(
    new DbClient({ endpointScope: userId })
  )
  endpoints.ingredientsCollection.createIndex((row) => row.updated_at, {
    indexType: BasicIndex,
  })
  endpoints.recipeCommentsCollection.createIndex((row) => row.recipe_id, {
    indexType: BasicIndex,
  })
  endpoints.recipeTagsCollection.createIndex((row) => row.tag_id, {
    indexType: BasicIndex,
  })
  endpoints.ingredientTagsCollection.createIndex((row) => row.tag_id, {
    indexType: BasicIndex,
  })
  return { ...endpoints, recipeCardsCollection: createRecipeCards(endpoints) }
}
export async function initializeKitchen(userId: string) {
  if (typeof window === "undefined")
    throw new Error("Kitchen collections require a browser session")
  if (current?.userId === userId) return current.endpoints
  if (current) {
    const previous = current
    current = undefined
    await Promise.all(
      Object.entries(previous.endpoints)
        .filter(([name]) => name.endsWith("Collection"))
        .map(([, value]) => {
          if (typeof value === "object" && "cleanup" in value)
            return value.cleanup()
        })
    )
  }
  const endpoints = createKitchen(userId)
  current = { userId, endpoints }
  return endpoints
}
export function getKitchen() {
  if (!current)
    throw new Error(
      "Kitchen collections have not been initialized for this session"
    )
  return current.endpoints
}
