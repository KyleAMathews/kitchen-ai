import type { SelectIngredient, SelectRecipeComment } from "@/db/zod-schemas"
import { getKitchen } from "./collections"
function changed<T extends object>(
  row: T,
  update: (draft: T) => void
): Partial<T> {
  const draft = { ...row }
  update(draft)
  const changes: Partial<T> = {}
  for (const key of Object.keys(draft) as Array<keyof T>)
    if (draft[key] !== row[key]) changes[key] = draft[key]
  return changes
}
export function updateIngredient(
  id: string,
  update: (draft: SelectIngredient) => void
) {
  const kitchen = getKitchen()
  const row = kitchen.ingredientsCollection.get(id)
  if (!row) throw new Error(`Ingredient not found`)
  return kitchen.saveIngredient({ id, data: changed(row, update) })
}
export function updateComment(
  id: string,
  update: (draft: SelectRecipeComment) => void
) {
  const kitchen = getKitchen()
  const row = kitchen.recipeCommentsCollection.get(id)
  if (!row) throw new Error(`Comment not found`)
  return kitchen.saveComment({ id, data: changed(row, update) })
}
