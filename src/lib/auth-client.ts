import { createAuthClient } from "better-auth/react"
import {
  createCollection,
  localOnlyCollectionOptions,
} from "@tanstack/react-db"
import { z } from "zod"

const authStateSchema = z.object({
  id: z.string(),
  session: z.any().nullable(),
  user: z.any().nullable(),
})

export const authStateCollection = createCollection(
  localOnlyCollectionOptions({
    id: `auth-state`,
    getKey: (item) => item.id,
    schema: authStateSchema,
  })
)

export const authClient = createAuthClient({
  baseURL:
    typeof window !== `undefined`
      ? window.location.origin // Always use current domain in browser
      : process.env.NODE_ENV === `production`
        ? `https://kitchen-ai.fly.dev` // Fallback for server-side
        : `https://kitchen-ai.localhost`,
})
