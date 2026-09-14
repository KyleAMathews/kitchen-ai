import type { SelectIngredient, SelectTag } from "@/db/zod-schemas"
import { getKitchen } from "./collections"
import { prepareTagWrites } from "./tags"
type TrackingType = NonNullable<SelectIngredient[`tracking_type`]>
interface InsertIngredientInput {
  name: string
  tracking_type: TrackingType
  fill_level: number
  count: number
  expiration_date: Date
  tags: SelectTag[]
}

export function insertIngredient(input: InsertIngredientInput) {
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

  return getKitchen().insertIngredient({
    ingredient,
    ...prepareTagWrites(input.tags),
  })
}

interface InsertRecipeInput {
  url: string
  pastedText: string
  tags: SelectTag[]
}

export function insertRecipe(input: InsertRecipeInput) {
  const id = crypto.randomUUID()
  const transaction = getKitchen().insertRecipe({
    id,
    url: input.url,
    pastedText: input.pastedText,
    created_at: new Date(),
    ...prepareTagWrites(input.tags),
  })

  return { id, transaction }
}
