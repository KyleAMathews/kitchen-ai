import { z } from "zod"
import { selectTagsSchema } from "@/db/zod-schemas"
import { tagNameSchema } from "@/lib/services/tag-schemas"
export const linkSchema = z.object({
  id: z.string().uuid(),
  tag_id: z.string().uuid(),
  created_at: z.date(),
})
export const tagWritesSchema = z.object({
  new_tags: z.array(selectTagsSchema.extend({ name: tagNameSchema })),
  links: z.array(linkSchema),
})
export const tagTargetSchema = z.discriminatedUnion(`entity`, [
  z.object({ entity: z.literal(`recipe`), entity_id: z.string().uuid() }),
  z.object({ entity: z.literal(`ingredient`), entity_id: z.string().uuid() }),
])
