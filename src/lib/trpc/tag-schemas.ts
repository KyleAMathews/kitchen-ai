import { z } from "zod"

export const MAX_TAG_NAME_LENGTH = 50
export const tagNameSchema = z.string().trim().min(1).max(MAX_TAG_NAME_LENGTH)

export const newTagInputSchema = z.object({
  id: z.string().uuid(),
  name: tagNameSchema,
})

export const tagLinkInputSchema = z.object({
  id: z.string().uuid(),
  tag_id: z.string().uuid(),
})
