# Kitchen AI
A tool for managing kitchen logistics - reviewing recipes to make & deciding if we need to buy ingredients or not based on the semi-automated ingredient management.


**Core Pattern**: Electric SQL for reads, tRPC for writes, TanStack DB for optimistic updates.

## Commands
```bash
pnpm dev        # Start dev server with Docker services
pnpm lint       # Format & lint (run after every edit)
pnpm build      # Production build
pnpm test       # Run tests
pnpm migrate    # Apply DB migrations
```

## Stack & Conventions

### File Structure
- `src/routes/` - TanStack Router file-based routes (kebab-case)
- `src/db/schema.ts` - Drizzle schema (snake_case fields)
- `src/db/zod-schemas.ts` - Centralized Zod schemas
- `src/lib/trpc/` - tRPC routers (CRUD only)
- `src/lib/collections.ts` - TanStack DB collections

### Naming Conventions
- **Database**: snake_case (e.g., `user_id`, `created_at`)
- **Files**: kebab-case (e.g., `recipe-card.tsx`)
- **Routes**: Use `_` prefix for pathless layouts (e.g., `_authenticated.tsx`)

## Data Flow Architecture

### Reading Data (Electric SQL → TanStack DB)
```tsx
// 1. Preload in route loader
export const Route = createFileRoute('/recipes/')({
  loader: async () => {
    await Promise.all([
      recipesCollection.preload(),
      recipeCommentsCollection.preload(), // Include if used by child components
    ])
  },
})

// 2. Query with useLiveQuery (ALWAYS destructure data)
const { data: recipes } = useLiveQuery(
  (q) => q.from({ recipesCollection }).where(...),
  [dependencies] // Include reactive dependencies
)
```

### Writing Data (TanStack DB → tRPC)
```tsx
// Use collection operations for optimistic updates
recipesCollection.insert({ ... })  // NOT trpc.recipes.create.mutate()
// Similar to Immer
recipesCollection.update(id, (draft) => { ... })
recipesCollection.delete(id)
```

### Collection Definition Pattern
```tsx
// src/lib/collections.ts
export const recipeCommentsCollection = createCollection(
  electricCollectionOptions({
    id: 'recipe_comments',
    shapeOptions: { url: '/api/recipe-comments', ... },
    schema: selectRecipeCommentsSchema,
    getKey: (item) => item.id,
    
    // tRPC handlers (CRUD only, return { txid })
    onInsert: async ({ transaction }) => {
      const result = await trpc.recipeComments.create.mutate(...)
      return { txid: result.txid }
    },
    onUpdate: async ({ transaction }) => { ... },
    onDelete: async ({ transaction }) => { ... },
  })
)
```

## Critical Rules

1. **NEVER use tRPC for data reads** - Only Electric SQL + useLiveQuery
2. **NEVER call tRPC directly from components** - Use collection operations
3. **NEVER use TanStack Query** - This uses TanStack DB (different library)
4. **ALWAYS preload collections** in route loaders
5. **ALWAYS use snake_case** for database fields throughout the app
6. **ONLY basic CRUD in tRPC** - No special mutations unless using `createOptimisticAction`
7. **ALWAYS default to the libraries we use** - Before writing custom JavaScript,
   CSS, HTML, hooks, or components, check the installed stack and its docs or
   skills for an existing primitive. Compose or extend library components first;
   write the smallest custom code only when no suitable library API exists.

## Schema Management

```tsx
// src/db/zod-schemas.ts (centralized, never redefine)
export const selectRecipeSchema = createSelectSchema(recipes)
export const insertRecipeSchema = createInsertSchema(recipes)
export const updateRecipeSchema = createUpdateSchema(recipes)
```

## Component Patterns

- **Styling**: Radix UI, prefer Flex over Box
- **Forms**: Use optimistic updates, no loading states needed
- **Links**: Use TanStack Router's `Link` component
- **Auth**: Access via `authClient.useSession()`

## Skills

The libraries here ship versioned skills — they're the source of truth for
Electric/TanStack DB patterns. Read the relevant one *before* changing the sync
or write path; the rules below are easy to violate in ways that look fine and
fail later.

```bash
npx @tanstack/intent@latest list    # every package + skill
npx @tanstack/intent@latest load @tanstack/db#db-core/mutations-optimistic
```

The mappings below cover the common paths. Also useful:

- `@tanstack/db#db-core/mutations-optimistic` — insert/update/delete, `isPersisted`,
  `createOptimisticAction` (atomic writes across several collections),
  `createTransaction({ autoCommit: false })` for draft-until-save flows
- `@tanstack/db#db-core/live-queries` — query builder: joins, groupBy, aggregates, operators
- `@tanstack/db#db-core/collection-setup` — creating collections, adapter options, schema validation
- `@tanstack/db#meta-framework` — preloading collections in loaders (DB is client-only; no SSR)
- `@electric-sql/client#electric-schema-shapes` — designing a table and its shape together
- `@electric-sql/client#electric-debugging` — shapes not updating, txid timeouts, stale cache

### Gotchas these document

- **Never bypass the collection to write.** The path is
  `collection.insert() → onInsert → tRPC → txid → awaitTxId`. Calling tRPC straight
  from a component skips optimistic state and the sync handshake.
- **`TimeoutWaitingForTxIdError` in dev is usually the environment, not your code.**
  Each shape holds a long-poll connection and this app has 8, over the browser's
  6-connection HTTP/1.1 cap, so writes stall waiting for a txid that can't arrive.
  Use `pnpm dev` (Caddy serves https://kitchen-ai.localhost over HTTP/2, which
  multiplexes); a bare `vite dev` on http://localhost:5173 starves shapes. Don't
  "fix" this by bypassing the collection.
- **The server must honour client-generated ids.** The collection confirms its
  optimistic row by matching the txid to the synced row, so an upsert that resolves
  to a *different* row (e.g. `ON CONFLICT (name)`) never lets it settle.
- **Keep `parser: { timestamptz: ... }` in `shapeOptions`.** Sync writes into the
  store directly, bypassing the Zod schema, so without it dates arrive as strings
  and `.getTime()` fails at runtime. The schema only covers the mutation path.
- **Ordering across tables is yours to enforce.** Await the parent row's
  `isPersisted.promise` before inserting rows that reference it.

The mapping block below is generated by `intent` — don't hand-edit between its
HTML comment markers; add prose like this section above them instead.

<!-- intent-skills:start -->
# Skill mappings — when working in these areas, load the linked skill file into context.
skills:
  - task: "Adding new synced features (new tables, shapes, collections)"
    load: "node_modules/@electric-sql/client/skills/electric-new-feature/SKILL.md"
  - task: "Working with useLiveQuery and React components"
    load:
      - "node_modules/@tanstack/react-db/skills/react-db/SKILL.md"
      - "node_modules/@electric-sql/client/skills/electric-shapes/SKILL.md"
  - task: "Debugging sync issues (shapes not updating, stale data)"
    load: "node_modules/@electric-sql/client/skills/electric-debugging/SKILL.md"
  - task: "Writing data with Drizzle ORM and tRPC mutations"
    load: "node_modules/@electric-sql/client/skills/electric-orm/SKILL.md"
  - task: "Setting up proxy routes and auth for shapes"
    load: "node_modules/@electric-sql/client/skills/electric-proxy-auth/SKILL.md"
<!-- intent-skills:end -->
