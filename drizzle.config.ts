import { config } from "dotenv"

// `neon env pull` writes `.env.local`; `.env` holds anything set by hand.
config({ path: [`.env.local`, `.env`], quiet: true })

import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: `./src/db/out`,
  schema: [`./src/db/schema.ts`, `./src/db/auth-schema.ts`],
  dialect: `postgresql`,
  casing: `snake_case`,
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      `postgresql://postgres:password@localhost:54321/kitchen_ai`,
  },
})
