import { createRealtime } from "@neon/realtime/server"
import { drizzleAdapter } from "@neon/realtime-drizzle"
import { getTableColumns } from "drizzle-orm"
import { db } from "@/db/connection"
import {
  users,
  ingredients,
  recipes,
  recipeIngredients,
  recipeComments,
  tags,
  recipeTags,
  ingredientTags,
} from "@/db/schema"

// Created on first use, so a missing variable only breaks sealing rather than
// every server route that shares this module graph.
let realtime: ReturnType<typeof createRealtimeServer> | undefined

function createRealtimeServer() {
  const databaseUrl = process.env.DATABASE_URL
  const secret = process.env.NEON_REALTIME_SECRET
  if (!databaseUrl || !secret) {
    throw new Error(
      `DATABASE_URL and NEON_REALTIME_SECRET must be set. Run \`neon env pull --service postgres --service realtime\`.`
    )
  }
  return createRealtime({
    secret,
    db: new URL(databaseUrl).pathname.slice(1),
    adapter: drizzleAdapter(),
  })
}

export function getRealtime() {
  realtime ??= createRealtimeServer()
  return realtime
}

// One live query per collection. The Drizzle adapter needs each selected key
// to match its column name, which the snake_case schema already gives us.
// No `orderBy`: it makes Realtime resync on every write, and the client sorts.
export const liveQueries = {
  // Only the profile fields other users see; emails stay private.
  users: () =>
    db
      .select({ id: users.id, name: users.name, image: users.image })
      .from(users),
  ingredients: () => db.select(getTableColumns(ingredients)).from(ingredients),
  recipes: () => db.select(getTableColumns(recipes)).from(recipes),
  recipe_ingredients: () =>
    db.select(getTableColumns(recipeIngredients)).from(recipeIngredients),
  recipe_comments: () =>
    db.select(getTableColumns(recipeComments)).from(recipeComments),
  tags: () => db.select(getTableColumns(tags)).from(tags),
  recipe_tags: () => db.select(getTableColumns(recipeTags)).from(recipeTags),
  ingredient_tags: () =>
    db.select(getTableColumns(ingredientTags)).from(ingredientTags),
}

export type LiveQueryName = keyof typeof liveQueries
