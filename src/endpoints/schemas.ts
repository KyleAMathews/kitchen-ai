import { z } from "zod"
import { selectIngredientsSchema } from "@/db/zod-schemas"
import {
  newTagInputSchema,
  tagLinkInputSchema,
} from "@/lib/services/tag-schemas"

export const ingredientInputSchema = selectIngredientsSchema
  .pick({
    id: true,
    name: true,
    tracking_type: true,
    fill_level: true,
    count: true,
    expiration_date: true,
  })
  .extend({
    tracking_type: z.enum([`fill_level`, `count`, `pantry_staple`]),
    fill_level: z.number().min(0).max(100),
  })
export type IngredientInput = z.infer<typeof ingredientInputSchema>

export const tagWritesSchema = z.object({
  new_tags: z.array(newTagInputSchema),
  links: z.array(tagLinkInputSchema),
})
export type TagWrites = z.infer<typeof tagWritesSchema>

export const tagTargetSchema = z.discriminatedUnion(`entity`, [
  z.object({ entity: z.literal(`recipe`), entity_id: z.string().uuid() }),
  z.object({ entity: z.literal(`ingredient`), entity_id: z.string().uuid() }),
])
