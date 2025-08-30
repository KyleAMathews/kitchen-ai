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
