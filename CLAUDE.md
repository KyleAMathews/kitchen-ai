# Kitchen AI

Kitchen logistics and recipe management. This worktree uses TanStack DB Endpoints for reads, writes and optimistic state. Electric and tRPC have been removed. The original checkout still has the old architecture.

## Commands

- `pnpm dev`: compile the schema, start the configured PostgreSQL service, and run Vite.
- `pnpm build`: compile the schema and make a production build.
- `pnpm typecheck`: check application types.
- `pnpm lint`: format and lint; run targeted lint after edits.
- `pnpm migrate`: apply Drizzle migrations to the configured database.
- `pnpm test:endpoints:compiled`: run the application SQL smoke test with stubbed external services against disposable PostgreSQL.
- `pnpm test:endpoints`: run the real-session browser checks against the disposable test database and a server on port 4196.

## Architecture

- `src/endpoints/kitchen.endpoint.ts` owns query and mutation declarations and their SQL.
- `src/endpoints/database.server.ts` provides the database and explicit session checks.
- `src/lib/db-client.ts` owns the browser page’s client and resolves the session when an operation starts. Import collections and actions directly from their endpoint module.
- `src/lib/services/` contains external AI/Trello operations. Keep those on the server.
- `src/db/schema.ts` and `src/db/zod-schemas.ts` own database and validation schemas.
- Routes preload collections and use TanStack DB live queries for client filtering and joins.

Bind with `const { query, mutation } = endpoints(dbClient)`. Query declarations return bare collections. Mutation actions return a synchronous transaction; use `tx.isPersisted.promise` only when a caller needs confirmation. Apply optimistic changes in `onMutate`; show write errors and let rollback repair guesses. Avoid blocking unrelated controls on a pending write.

Name database mutations with `insert`, `update`, or `delete` to match their operation. Avoid `save` for updates and redundant `Action` suffixes. Keep workflow names when a mutation spans external services, such as `addToShoppingList`.

Authorization remains explicit application code in handlers. Never have the compiler insert or rewrite auth. Dependency analysis covers visible SQL and supported PostgreSQL effects; external JavaScript calls are outside that proof. Schema inspection belongs in compilation, never request handling. Unsupported analysis must preserve full refresh.

Retained collections have full endpoint results. There is no automatic cross-client sync; use explicit refetch or a separate polling/event/sync channel for outside writes. Do not infer external freshness from selective mutation refresh.

Use Drizzle’s property names directly without manual case conversion, centralized Zod schemas, route preloading, Radix components and existing libraries. Before changing DB reads or writes, read the installed TanStack DB live-query, collection-setup and optimistic-mutation SKILL files. The local prototype source is linked from the TanStack DB worktree; changes there need its own tests too.

## Test isolation

Write tests target only `kitchen_endpoints` at `127.0.0.1:55480`. Do not switch them to the ordinary application database. The browser test uses real test sessions. The compiled-handler companion stubs auth, AI and Trello while executing the actual SQL against disposable PostgreSQL. Do not run live paid/external calls as a substitute.

## Historical generated mappings

The generated block below belongs to the removed Electric/tRPC architecture. It is retained verbatim; do not apply its Electric routing rules to this Endpoints worktree. Regenerate these mappings through Intent when updating package skills.

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
