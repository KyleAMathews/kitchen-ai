import { DbClient } from "@tanstack/db"
import { authStateCollection } from "./auth-client"

export function currentUserId(): string {
  const userId = authStateCollection.get(`auth`)?.user?.id
  if (typeof userId !== `string` || !userId)
    throw new Error(`An authenticated session is required`)
  return userId
}

// This application reloads on logout; each browser page owns one client.
export const dbClient = new DbClient({ endpointScope: currentUserId })
