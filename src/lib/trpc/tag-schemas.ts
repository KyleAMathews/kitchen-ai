import { z } from "zod"

export const newTagInputSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(50),
})

export const tagLinkInputSchema = z.object({
  id: z.string().uuid(),
  tag_id: z.string().uuid(),
})
