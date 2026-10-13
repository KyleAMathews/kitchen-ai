import { initTRPC, TRPCError } from "@trpc/server"
import { auth } from "@/lib/auth"
import { db } from "@/db/connection"
import { sql } from "drizzle-orm"

export type Context = {
  session: Awaited<ReturnType<typeof auth.api.getSession>>
  db: typeof db
}

const t = initTRPC.context<Context>().create()

export const router = t.router
export const procedure = t.procedure
export const middleware = t.middleware

export const isAuthed = middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: `UNAUTHORIZED` })
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  })
})

export const authedProcedure = procedure.use(isAuthed)

// Returns the current transaction's id for the client to pass to
// `awaitTxId()`. Neon Realtime matches the full 64-bit id, so keep it as a
// decimal string: no `::xid` cast (that was Electric's 32-bit form) and no
// conversion to a JS number.
export async function generateTxId(
  tx: Parameters<
    // eslint-disable-next-line quotes
    Parameters<typeof import("@/db/connection").db.transaction>[0]
  >[0]
): Promise<string> {
  const result = await tx.execute<{ txid: string }>(
    sql`SELECT pg_current_xact_id()::text as txid`
  )
  const txid = result.rows[0]?.txid

  if (txid === undefined) {
    throw new Error(`Failed to get transaction ID`)
  }

  return txid
}
