# Current status — SQL-effect compiler integration

The port now uses the shared SQL-effect analyzer at build time. All eight query collections and ten mutation endpoints have known SQL dependencies against the disposable application schema. The compiler follows supported PostgreSQL SQL-function bodies and accounts for defaults, expression indexes, and operation-specific foreign-key effects. Unsupported SQL effects keep full refresh. JavaScript auth and external service calls retain their existing behavior; the compiler does not insert auth or claim to analyze those libraries.

User rows now use Drizzle’s field names (`emailVerified`, `createdAt`, `updatedAt`) directly. The endpoint returns the selected rows and uses `createSelectSchema(users)`; the former Electric case conversion and duplicate user schema are removed. The browser and compiled-handler comparisons also check these names.

Mutation handlers consume the framework-parsed `req.body`. Validation rules live in each endpoint’s `input` declaration, including tag trimming, UUID checks, protected comment fields, and ingredient fill bounds. Input schemas strip server-owned fields, including nested tag/link metadata. Callers send IDs and editable values; `onMutate` constructs complete optimistic rows with the current user and timestamps. Handlers spread validated write data and add authenticated ownership last; database defaults supply insert timestamps. The shared framework oracle generates schemas and inputs to check stripping, passthrough, strict rejection, nested defaults, and transforms. Kitchen’s browser smoke test checks its optimistic metadata; the app SQL smoke test checks its ownership and timestamp rules.

Declared input-schema rejections now return `INVALID_INPUT` with structured issue paths. The client drops only the rejected mutation’s optimistic overlay, without a write retry or refetch. The original blank-tag reproduction now passes through the real browser: one request, rollback, all retained collections still match PostgreSQL, and subsequent valid writes succeed. The updated browser run passes 240 collection comparisons; the shared compiled framework oracle checks zero handler calls and zero SQL for rejected input.

Mutation names now reflect their operations: `updateIngredient`, `updateComment`, `insertIngredient`, `insertRecipe`, `insertComment`, and the existing deletes. `updateTagAssignments` updates a relationship set through inserts/deletes. `addToShoppingList` retains its workflow name because it calls Trello before updating ingredient counters. UI helpers and oracle references use the same names.

Recipe insertion extracts AI data and embeddings before opening a write transaction. It inserts the finished recipe once, together with its ingredients and tags, and returns that row. Only the client keeps a “Processing…” optimistic placeholder. The application SQL smoke test passes 104 collection comparisons and checks the returned row, one recipe INSERT with no follow-up UPDATE, no write transaction on extraction failure, and full rollback when a related-row insert fails. AI/Trello remain stubbed in this companion.

Validation in this pass:

- Production build and typecheck pass.
- The real-session browser test passes 240 PostgreSQL/collection comparisons, including same-turn optimism, rollback, overlap, cascades and anonymous rejection.
- `pnpm test:endpoints:compiled` checks actual Kitchen handlers with 104 collection comparisons. It lives in `tests/endpoints/compiled.mjs`. Generic refresh-selection and request-time catalog checks live in the shared framework oracle; this test retains Kitchen-specific compiler integration and business rules.
- All 34 production client JavaScript files exclude the checked database, auth-secret, service, SQL-analyzer and server-registry markers.
- Catalog inspection runs in the build CLI. The request trace contains no catalog inspection.

Tests used only the disposable PostgreSQL database on port 55480. Live AI/Trello effects and deployment remain untested. The prototype compiler/runtime still reference the local TanStack DB checkout; this is a working application port, not a published package migration.

Ad hoc run artifacts have been removed. The format and workflow for checked-in evidence are not yet designed. For now, the compiled test writes its report to a temporary directory and prints the path, unless `ENDPOINT_ORACLE_OUTPUT` is set.

The sections below preserve earlier migration stages and their then-current limits. Their all-refetch and unresolved-auth descriptions are historical; the status above supersedes them under the agreed SQL-only scope.

---

# Kitchen AI with DB Endpoints

The conversion is on `codex/db-endpoints` in `.worktrees/codex-db-endpoints`. It uses the live Endpoints prototype and unreleased DB sources in `/Users/kylemathews/.codex/worktrees/e079/tanstack-db`. Those source links are local development wiring, not a published package.

## What changed

Eight authenticated full-table queries replace Electric shapes. Query and mutation declarations live in `src/endpoints/kitchen.endpoint.ts` and bind through `endpoints(dbClient)`. They return ordinary DB collections and synchronous mutation actions. Client filters, recipe-card aggregates, and optimistic UI remain DB queries and transactions.

Every retained collection is included in a mutation request. The server runs the existing business handler and returns fresh query results in the same response. Overlapping actions use the existing authority coordinator and fresh-read repair. Rejected writes roll back their optimistic overlays. Multi-table tag actions optimistically change both collections; database cascades reconcile from the returned snapshots.

The client creates collections after login and replaces them when the session user changes. Every server query and mutation verifies the real Better Auth session against the request scope. The client scope is not accepted as authentication.

Electric routes, packages, Docker service, transaction-ID queries and `awaitTxId` waits are removed. Browser writes use Endpoints, including shopping-list actions that change PostgreSQL after Trello succeeds. The former tRPC procedures are now ordinary service functions under `src/lib/services/`, called by Endpoints. Input and output validation, ownership checks, transactions and AI logic remain in those functions. The tRPC router, caller, client, route and package dependency are removed.

The app keeps its existing node-postgres pool. The Postgres.js pipelining adapter is not used by this driver. Independent refresh reads run concurrently over the existing pool.

## Prototype changes this exercise required

The shared runtime now supports application row schemas and non-fixture scope strings. Schema validation runs before any authority is installed; the Todo fixture retains its old validation. The compiler can accept explicitly schema-validated queries outside its scalar grammar, assigning each an independent relation and falling back to full reads. It does not infer cross-query optimistic propagation for those opaque handlers. Kitchen AI's full-table queries have no server ordering; its ordered views remain client DB queries.

## Validation

- Production build and application type check pass. `tsconfig.typecheck.json` isolates type-only React paths from Vite and permits upstream DB parameters unused under that project's settings.
- Browser checks against disposable PostgreSQL passed 232 collection comparisons. Three generated update histories use fast-check seed `20260912`; the script prints the complete histories for replay. It also checks immediate optimism, multi-table tags, comment insertion, rejected ownership changes, overlapping writes, cascade deletion and anonymous mutation rejection.
- Shared framework checks passed, including application rows without Todo fields, wrong-type authority rejection, existing malformed-response cases, registry behavior and compiler boundaries.
- The client production output was checked for database connection code, AI/Trello service code and server configuration markers.

The browser test creates a temporary user and fixture rows only in `kitchen_endpoints` on `127.0.0.1:55480`. It never uses the existing application database. Its static connection is deliberate protection against accidentally running write tests on real data. It requires Chrome and the local prototype checkout.

To reproduce, start a disposable `postgres:17-alpine` container named `kitchen-endpoints-test-e079`, exposing `127.0.0.1:55480:5432`, with `POSTGRES_HOST_AUTH_METHOD=trust` and `POSTGRES_DB=kitchen_endpoints`. Run migrations with `DATABASE_URL=postgresql://postgres@127.0.0.1:55480/kitchen_endpoints pnpm migrate`. Run Vite with the same database URL and `BETTER_AUTH_URL=http://127.0.0.1:4196`, then run `pnpm test:endpoints`. Stop the disposable container when finished. Trust authentication is for this loopback fixture only.

## What this trial exposes

The existing local database was inspected in a read-only transaction, returning only counts and aggregate sizes. Its eight collections contain 124 rows and approximately 520,097 bytes of PostgreSQL row JSON. Raw embedding strings account for 482,333 bytes (about 93%). These are uncompressed size estimates, not measured HTTP traffic or latency. This initial application binding creates all eight collections, so each successful write refreshes all eight.

Removing Electric removes continuous cross-client/background synchronization. Writes made elsewhere become visible on a later endpoint mutation or reload; there is no new push channel or polling loop. This is a behavioral change, not a claim of equivalent synchronization.

Live AI and Trello calls were not exercised. Their server workflows remain in place, but local credentials were not copied into this worktree. All write tests used disposable data. The original checkout and its Caddyfile change remain intact. Nothing was deployed or pushed.

## Function discovery and service extraction

The Endpoints compiler now follows ordinary local/imported functions, reexports,
service objects, database/transaction parameters and callbacks. It unions writes
across branches and statements, including effects before a thrown error. Unknown
calls, recursive/reassigned functions, executable SQL values and unsupported schema
features retain full refresh. Schema inspection remains a compilation step.

The service extraction preserved all 22 former procedure bodies and input schema
expressions; the one output validator remains as well. `kitchenServices` verifies
the real session before returning services with a typed context. Service errors
retain their code, message and cause. The endpoint actions still return synchronous
optimistic transactions.

The converted app passes its typecheck, targeted ESLint checks, production build
and PostgreSQL/browser oracle: 232 collection comparisons with seed 20260912,
including rollback, overlapping writes, multi-table tags, cascade deletion and
anonymous rejection. Thirty-four production client JavaScript files contain none
of the checked database, service, auth-adapter or AI implementation markers.

This does **not** yet establish selective refresh for Kitchen. A build-time check
against the disposable schema reports unknown dependencies for all eight queries
and ten actions: Better Auth's external factory is unresolved, and the ingredient
creation schema also reaches an unsupported enum factory. The current catalog
classifier rejects some application types/defaults too. Keep full refresh until
those boundaries have a complete effect model; do not bypass authentication or
assume external calls are pure. No application schema snapshot was installed.

The trial also exposed and fixed two shared compiler integration bugs: Vite 8
converted transform watch files into client module dependencies, and the `pg`
driver decoded PostgreSQL `name[]` as text. Compiler-only files now use the dev
watcher; the catalog query casts its search path to `text[]`. Both have red/green
receipts. The actual schema CLI passes against the disposable PostgreSQL fixture.

The temporary test
server and PostgreSQL container were stopped and removed. Live AI/Trello calls,
deployment and Git publication were not performed.
