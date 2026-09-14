import type { SelectTag } from "@/db/zod-schemas"
import type { IngredientInput } from "@/endpoints/schemas"
import { getKitchen } from "./collections"
import { prepareTagWrites } from "./tags"

type InsertIngredientInput = Omit<IngredientInput, `id`> & { tags: SelectTag[] }

export function insertIngredient({
  tags,
  ...ingredient
}: InsertIngredientInput) {
  return getKitchen().insertIngredient({
    ingredient: { ...ingredient, id: crypto.randomUUID() },
    ...prepareTagWrites(tags),
  })
}

interface InsertRecipeInput {
  url: string
  pastedText: string
  tags: SelectTag[]
}

export function insertRecipe({ tags, ...recipe }: InsertRecipeInput) {
  const id = crypto.randomUUID()
  const transaction = getKitchen().insertRecipe({
    ...recipe,
    id,
    ...prepareTagWrites(tags),
  })

  return { id, transaction }
}
