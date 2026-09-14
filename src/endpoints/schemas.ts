import { z } from "zod"
import { selectTagsSchema } from "@/db/zod-schemas"
export const usersEndpointSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  image: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
})
export const linkSchema = z.object({
  id: z.string().uuid(),
  tag_id: z.string().uuid(),
  created_at: z.date(),
})
export const tagWritesSchema = z.object({
  new_tags: z.array(selectTagsSchema),
  links: z.array(linkSchema),
})
export const tagTargetSchema = z.discriminatedUnion(`entity`, [
  z.object({ entity: z.literal(`recipe`), entity_id: z.string() }),
  z.object({ entity: z.literal(`ingredient`), entity_id: z.string() }),
])
