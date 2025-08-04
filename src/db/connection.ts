import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema"
import * as authSchema from "./auth-schema"

// Combine all schemas for the connection
const allSchemas = {
  ...schema,
  ...authSchema,
}

export const db = drizzle(
  process.env.DATABASE_URL || "postgresql://postgres:password@localhost:54321/kitchen_ai",
  { 
    casing: "snake_case",
    schema: allSchemas,
  }
)