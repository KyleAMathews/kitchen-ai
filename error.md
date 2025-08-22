> drizzle-kit migrate

No config path provided, using default 'drizzle.config.ts'
Reading config file '/Users/kylemathews/programs/kitchen-ai/drizzle.config.ts'
Using 'pg' driver for database querying
[⣻] applying migrations...DrizzleQueryError: Failed query: CREATE TYPE "public"."g
rocery_section" AS ENUM('Produce', 'Deli', 'Bakery', 'Meat_Seafood', 'Dairy_Eggs',
 'Dry__Goods', 'Canned__Foods', 'Spices_Herbs', 'Beverages', 'Frozen__Foods', 'Oil
_Vinegar', 'Other__Aisles');
params: 
    at NodePgPreparedQuery.queryWithCache (/Users/kylemathews/programs/kitchen-ai/
node_modules/.pnpm/drizzle-orm@0.44.4_@types+pg@8.15.5_kysely@0.28.4_pg@8.16.3_pos
tgres@3.4.7/node_modules/src/pg-core/session.ts:73:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async <anonymous> (/Users/kylemathews/programs/kitchen-ai/node_modules/.pnp
m/drizzle-orm@0.44.4_@types+pg@8.15.5_kysely@0.28.4_pg@8.16.3_postgres@3.4.7/node_
modules/src/pg-core/dialect.ts:102:7)
    ... 2 lines matching cause stack trace ...
    at async migrate (/Users/kylemathews/programs/kitchen-ai/node_modules/.pnpm/dr
izzle-orm@0.44.4_@types+pg@8.15.5_kysely@0.28.4_pg@8.16.3_postgres@3.4.7/node_modu
les/src/node-postgres/migrator.ts:10:2) {
  query: `CREATE TYPE "public"."grocery_section" AS ENUM('Produce', 'Deli', 'Baker
y', 'Meat_Seafood', 'Dairy_Eggs', 'Dry__Goods', 'Canned__Foods', 'Spices_Herbs', '
Beverages', 'Frozen__Foods', 'Oil_Vinegar', 'Other__Aisles');`,
  params: [],
  cause: error: type "grocery_section" already exists
      at /Users/kylemathews/programs/kitchen-ai/node_modules/.pnpm/pg@8.16.3/node_
modules/pg/lib/client.js:545:17
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5
)
      at async <anonymous> (/Users/kylemathews/programs/kitchen-ai/node_modules/.p
npm/drizzle-orm@0.44.4_@types+pg@8.15.5_kysely@0.28.4_pg@8.16.3_postgres@3.4.7/nod
e_modules/src/node-postgres/session.ts:149:14)
      at async NodePgPreparedQuery.queryWithCache (/Users/kylemathews/programs/kit
chen-ai/node_modules/.pnpm/drizzle-orm@0.44.4_@types+pg@8.15.5_kysely@0.28.4_pg@8.
16.3_postgres@3.4.7/node_modules/src/pg-core/session.ts:71:12)
      at async <anonymous> (/Users/kylemathews/programs/kitchen-ai/node_modules/.p
npm/drizzle-orm@0.44.4_@types+pg@8.15.5_kysely@0.28.4_pg@8.16.3_postgres@3.4.7/nod
e_modules/src/pg-core/dialect.ts:102:7)
      at async NodePgSession.transaction (/Users/kylemathews/programs/kitchen-ai/n
ode_modules/.pnpm/drizzle-orm@0.44.4_@types+pg@8.15.5_kysely@0.28.4_pg@8.16.3_post
gres@3.4.7/node_modules/src/node-postgres/session.ts:258:19)
      at async PgDialect.migrate (/Users/kylemathews/programs/kitchen-ai/node_modu
les/.pnpm/drizzle-orm@0.44.4_@types+pg@8.15.5_kysely@0.28.4_pg@8.16.3_postgres@3.4
.7/node_modules/src/pg-core/dialect.ts:95:3)
      at async migrate (/Users/kylemathews/programs/kitchen-ai/node_modules/.pnpm/
drizzle-orm@0.44.4_@types+pg@8.15.5_kysely@0.28.4_pg@8.16.3_postgres@3.4.7/node_mo
dules/src/node-postgres/migrator.ts:10:2) {
    length: 95,
    severity: 'ERROR',
    code: '42710',
    detail: undefined,
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: undefined,
    table: undefined,
    column: undefined,
    dataType: undefined,
    constraint: undefined,
    file: 'typecmds.c',
    line: '1167',
    routine: 'DefineEnum'
  }
}
 ELIFECYCLE  Command failed with exit code 1.
➜  kitchen-ai git:(next) ✗ 

