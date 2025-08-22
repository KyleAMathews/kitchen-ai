# TanStack Start + DB + Electric Starter

This is a TanStack Start project with tRPC v10 for mutations and Electric sync for reads, running on Start's server functions so it's easily deployable to many hosting platforms.

All reads from the Postgres database are done via the Electric sync engine. All mutations (create, update, delete) are done via tRPC with full end-to-end type safety.

We sync normalized data from tables into TanStack DB collections in the client & then write client-side queries for displaying data in components.

## Initial setup

Before you started, all necessary package install is done via `pnpm install` and a dev server is started with `pnpm dev`.

## Linting and formatting

Human devs have IDEs that autoformat code on every file save. After you edit files, you must do the equivalent by running `pnpm lint`.

This command will also report linter errors that were not automatically fixable. Use your judgement as to which of the linter violations should be fixed.

## Build/Test Commands

- `pnpm run dev` - Start development server with Docker services
- `pnpm run build` - Build for production
- `pnpm run test` - Run all Vitest tests
- `vitest run <test-file>` - Run single test file
- `pnpm run start` - Start production server

## Architecture

- **Frontend**: TanStack Start (SSR framework for React and other frameworks) with file-based routing in `src/routes/`
- **Database**: PostgreSQL with Drizzle ORM, schema in `src/db/schema.ts`
- **Electric**: Real-time sync service on port 3000
- **Services**: Docker Compose setup (Postgres on 54321, Electric on 3000)
- **Styling**: Radix. Always use radix styling args & strongly prefer Flex over Box.
- **Authentication**: better-auth
- **API**: tRPC v10 for mutations with full e2e type safety, Electric shapes for real-time reads

## API Routing

- **tRPC** (`/api/trpc/*`) - All mutations (create, update, delete) with full type safety
- **better-auth** (`/api/auth/*`) - Authentication endpoints
- **Electric shapes** (`/api/projects`, `/api/todos`, `/api/users`) - Real-time sync endpoints for reads

## Code Style

- **TypeScript**: Strict mode, ES2022 target, bundler module resolution
- **Imports**: Use `@/*` path aliases for `src/` directory imports
- **Components**: React 19 with JSX transform, functional components preferred
- **Server DB**: Drizzle ORM with PostgreSQL dialect, schema-first approach
- **Client DB**: TanStack DB with Electric Sync Collections
- **Routing**: File-based with TanStack Router, use `Link` component for navigation
- **Testing**: Vitest with @testing-library/react for component tests
- **file names** should always use kebab-case

## Schema Conventions

**IMPORTANT: Database fields use snake_case, which must be used consistently throughout the app.**

- **Database fields**: Always use snake_case (e.g., `tracking_type`, `fill_level`, `expiration_date`)
- **Centralized schemas**: All Zod schemas are defined in `src/db/zod-schemas.ts`
  - Use `createInsertSchema()` for insert operations (auto-handles defaults and optional fields)
  - Use `createUpdateSchema()` for update operations (all fields optional)
  - Use `createSelectSchema()` for select/read operations
- **tRPC handlers**: 
  - Import schemas from `@/db/zod-schemas` - NEVER redefine them locally
  - Use snake_case in input/output schemas to match database
- **Electric sync**: Automatically syncs snake_case fields from database
- **UI components**: Access fields using snake_case (e.g., `ingredient.tracking_type`, NOT `ingredient.trackingType`)

## tRPC Integration

- tRPC routers are defined in `src/lib/trpc/` directory
- Client is configured in `src/lib/trpc-client.ts`
- Collection hooks use tRPC client for mutations in `src/lib/collections.ts`
- Transaction IDs are generated using `pg_current_xact_id()::xid::text` for Electric sync compatibility

## TanStack DB Usage

**IMPORTANT: This project uses TanStack DB, NOT TanStack Query. These are different libraries with different APIs.**

### Collections and Data Flow
- Collections are defined in `src/lib/collections.ts` using `electricCollectionOptions`
- Collections automatically persist and sync data between client and server
- Client state is a reflection of server state - collections always persist
- All mutations return `{ txid: number }` which is required for Electric sync compatibility

### Using useLiveQuery
- **Correct syntax**: `const { data: items } = useLiveQuery((q) => q.from({ item: collection }).where(...))`
- **ALWAYS** destructure `data` from the return value (don't use the return value directly)
- **Dependencies**: Include reactive dependencies in the second parameter: `useLiveQuery(queryFn, [dependency1, dependency2])`
- Example with dependencies:
  ```tsx
  const { data: todos } = useLiveQuery(
    (q) => q.from({ todo: todoCollection }).where(({ todo }) => eq(todo.project_id, projectId)),
    [projectId] // Include dependencies here
  )
  ```

### Data Access Patterns
- **NO** TanStack Query APIs like `useQuery`, `useMutation`, etc.
- **NO** loading states from query hooks - use the `{ data }` destructuring pattern
- Use `useLiveQuery` for all data reads
- Use collection mutation methods (defined in `src/lib/collections.ts`) for writes
- Use `eq`, `and`, `or` operators from `@tanstack/react-db` for filtering

### Route Structure
- TanStack Router supports "pathless routes" (layout routes) using `_` prefix
- Example: `_authenticated.tsx` is a layout route that wraps authenticated pages
- Pathless routes don't add URL segments but provide layout/context
