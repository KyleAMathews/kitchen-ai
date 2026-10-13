# Neon Realtime bug bash: papercuts

Things that were confusing, missing or wrong while porting Kitchen AI from
Electric + tRPC + TanStack DB to Neon Realtime (`@neon/realtime*` 0.0.3, Neon
CLI 8.4.3, staging). Written for whoever smooths the path for the next agent.

Each entry: what happened, why it hurt, and a suggested fix.

## Setup and tooling

### `neon-realtime` agent skill can't be installed

- `neon skills -s neon-realtime` isn't in the CLI 8.4.3 catalog, and
  `https://neon.com/.well-known/agent-skills/neon-realtime/SKILL.md` returns 404.
- The only copy is in the draft PR neondatabase/agent-skills#141. I copied it
  into `.claude/skills/neon-realtime/SKILL.md` by hand.
- Fix: publish it to the registry and the CLI catalog before the bug bash, or
  link the PR file from the channel/docs.

### Stale global CLI gives no hint

- The global `neon` on this machine was 4.18.0, which has no realtime support.
  Nothing tells you this; you only find out when commands are missing.
- Fix: the quickstart could say "realtime needs CLI ≥ 8.4.3; check `neon --version`".

### Staging needs a profile that you have to create first

- `NEON_PROFILE=staging … neon me` fails with `Unknown profile "staging"`.
  The channel says `neon login --profile staging`. What worked was
  `NEON_OAUTH_HOST=… NEON_API_HOST=… neon profile create staging`.
- Every later command still needs both host env vars, or `--api-host`/`--oauth-host`.
- Fix: one copy-paste staging block in the bug-bash doc.

### Example templates pin older SDK versions

- examples PR #269 (`realtime/with-tanstack`) pins `@neon/realtime*` at `0.0.1`,
  but npm has `0.0.3`.

### `neon projects list` prompts for an org, even unattended

- With no `--org-id`, `neon projects list` opens an interactive org picker.
  An agent's shell just hangs on it. Passing `--org-id` works.
- Fix: in a non-TTY, fail with "pass --org-id (one of: …)", or pick the only
  org automatically.

### `neon env pull` doesn't write the browser copy of the URL

- `neon env pull --service realtime` writes `NEON_REALTIME_URL` and
  `NEON_REALTIME_SECRET` to `.env.local`. Vite apps also need
  `VITE_NEON_REALTIME_URL`, which you have to copy by hand. The docs mention
  this, but it's an easy step to miss.
- Apps that load env with `dotenv/config` read `.env`, not `.env.local`, so
  the server didn't see the pulled vars until I loaded both files.
- Fix: a `--public-prefix VITE_` option, or print a reminder after the pull.

### `neon realtime enable` gives no confirmation

- It prints "Realtime enable requested for branch …" and exits. Nothing says
  when the feature is ready. (`neon subscribe` worked a minute later.)
- Fix: wait for the operation to finish, or print the command to check its status.

### `neon link` edits `.gitignore` without saying so

- It added `.neon` to `.gitignore`. That's fine, but it's an unannounced change
  in the user's repo.

## Docs

### TanStack and Drizzle example pages are placeholders

- `/docs/realtime/examples/tanstack` and `/docs/realtime/examples/drizzle` are
  mostly "TBC" / lorem ipsum. The real working code is only in examples PR #269.
- Fix: link the template from these pages until they're written.

### "Drop-in replacement for Electric" undersells the collection change

- The skill says `realtimeCollectionOptions()` replaces `electricCollectionOptions()`.
  But Electric collections are usually synchronous module-level singletons
  (a URL is enough), while `realtimeCollectionOptions` needs an already-sealed
  `query` at `createCollection()` time. Sealing is async and needs an
  authenticated request.
- So every module-level collection, and anything derived from one at module
  level (e.g. a `createLiveQueryCollection` over it), has to move behind an
  async init step. This is the biggest structural change in the port, and
  nothing in the docs mentions it.
- Fix: an "Electric migration" section showing how to handle module-level
  collections. Alternatively, accept `query: () => Promise<SealedLiveQuery>` in
  `realtimeCollectionOptions` so the collection can seal lazily when sync starts.

### Sealed query is captured once, so GC/restart reuses an expired seal

- The adapter destructures `query` when the collection is created and passes it
  to `client.subscribe()` every time sync starts. If the collection is
  garbage-collected and restarted later, it resubscribes with the long-expired
  original seal.
- The template works around this with `gcTime: 0` and a comment. The SDK
  reference doesn't mention it.
- Fix: on (re)start, refresh first when `expiresAt` has passed and
  `refreshQuery` is set. Or at least document the `gcTime: 0` requirement.

### Electric → Realtime txid format change isn't called out

- Electric apps use `pg_current_xact_id()::xid::text` (32-bit, epoch stripped)
  and usually `Number(txid)`. Realtime wants `pg_current_xact_id()::text`, the
  full 64-bit value, kept as a string.
- A straight port keeps the Electric SQL and then times out in `awaitTxId`.
- Fix: add this to the "Migrating from Electric" bullet.

### "A write that changes no rows has no txid" is overly cautious

- The skill says to skip `awaitTxId()` when a write changes no rows, and the
  mutations guide returns `{ kind: "unchanged" }` instead of a txid.
- In practice `awaitTxId()` resolves for a transaction that wrote nothing:
  a `BEGIN; SELECT pg_current_xact_id()::text; COMMIT;` txid resolved in
  ~355 ms. (A txid that hasn't been assigned yet still times out.) Waiting is
  harmless, so apps don't need a separate "unchanged" branch.
- I first wrote this entry the other way round, from the docs' wording,
  before testing it. That shows the ambiguity.
- Fix: say whether empty transactions are guaranteed to resolve. If so, drop
  the "skip `awaitTxId()`" advice or mark it as an optimization.

### Drizzle adapter's peer range is narrow

- `@neon/realtime-drizzle` requires `drizzle-orm >=0.45.2 <0.46.0`. Apps on
  0.44 have to upgrade Drizzle as part of adopting Realtime.

## SDK and types

### Passing `schema` to `realtimeCollectionOptions` doesn't type-check

- `createCollection(realtimeCollectionOptions({ ..., schema: zodSchema }))`
  fails with "No overload matches this call": `schema` resolves to `never` vs.
  the Zod type. The Electric collections in this app all passed `schema`, so
  a straight port hits this on every collection.
- I dropped `schema` and typed rows from `z.output<typeof schema>` instead.
  The template doesn't pass a schema either.
- Fix: make `Schema` inference line up with TanStack's `createCollection`
  overloads, or document that `schema` isn't supported yet.

### Row types don't survive a JSON API

- `SealedLiveQuery<Row>` carries its row type in a phantom `__row?: Row`.
  Returning it from tRPC (or any JSON API) turns `Date` fields in `Row` into
  `string`, so the client has to cast back to the real row type. The docs show
  the same `as SealedLiveQuery<Message>` cast after `res.json()`.
- Fix: export a helper type, e.g. `SealedLiveQueryFor<typeof query>`, or a
  `sealedQuerySchema<Row>()` for typed clients like tRPC/Hono.

## Gotchas found while testing

### Electric-era bug: servers that drop client ids never confirm cleanly

- `recipeComments.create` omitted the client id and let Postgres generate a
  new one, in the Electric version too. The insert "confirms", but the synced
  row has a different key, so the next update against the client id fails
  with "key was not found in the collection".
- Not a Realtime bug, but a port is a good moment to catch it. Fixed here.
  Worth a line in the migration notes: "the server must keep client ids".

### Playwright `waitForFunction` + async predicate gives false positives

- I tested with `page.waitForFunction(async () => …)`. It resolves at once,
  because the returned Promise is truthy. This briefly made a broken path
  look like it synced in 9 ms. Poll with `page.evaluate` instead.
- Not a Neon issue, but it'll bite anyone verifying sync timing.

### Confirmed inserts keep `$synced: false` (needs confirming)

- After `collection.insert()` → `onInsert` → tRPC → `awaitTxId()` resolves and
  `isPersisted` settles, `collection.get(id)` still reports `$synced: false` and
  `$origin: "local"`, with no pending transactions, even 2 s later. A row that
  only ever arrived over sync reports `$synced: true`, `$origin: "remote"`.
  Seen with `@tanstack/db` 0.9.0 and `@neon/realtime-tanstack` 0.0.3.
- Later remote updates to that row still apply, so the data is right; only
  the flag is stuck. Kitchen AI never reads `$synced`, so it isn't affected.
- The mutations guide's `Inbox` example disables Edit/Delete while
  `!message.$synced`. If this reproduces there, those buttons would stay
  disabled after you send a message.
- Next step: reproduce in the `with-tanstack` template, and check whether
  Electric collections behave the same (if so, it's TanStack DB, not Realtime).

## What worked well

- `neon subscribe --changes "SELECT …"` is a great first check: it confirmed
  live changes before any app code ran.
- Seal → subscribe → write → `awaitTxId` worked first try once the txid format
  was right. Writes confirmed in about 370 ms and appeared in a second tab within
  milliseconds. An outside `psql` update showed up in the UI as soon as
  `psql` returned.
- Sealed-query renewal through `refreshQuery` kept the subscriptions alive
  past the 60 s expiry with no extra code.
