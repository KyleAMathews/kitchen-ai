import { z } from "zod"
import { router, authedProcedure } from "@/lib/trpc"
import {
  getRealtime,
  liveQueries,
  type LiveQueryName,
} from "@/lib/realtime.server"

const sealQuery = <Name extends LiveQueryName>(name: Name) =>
  getRealtime().seal({
    query: liveQueries[name]() as ReturnType<(typeof liveQueries)[Name]>,
  })

// Sealed queries are bearer tokens, so these are mutations (POST, never
// cached) and nothing here logs them. They expire after about a minute; the
// collections call `seal` again to renew before then.
export const realtimeRouter = router({
  sealAll: authedProcedure.mutation(async () => {
    const names = Object.keys(liveQueries) as Array<LiveQueryName>
    const sealed = await Promise.all(names.map((name) => sealQuery(name)))
    return Object.fromEntries(names.map((name, i) => [name, sealed[i]])) as {
      [Name in LiveQueryName]: Awaited<ReturnType<typeof sealQuery<Name>>>
    }
  }),

  seal: authedProcedure
    .input(
      z.object({
        name: z.enum(
          Object.keys(liveQueries) as [LiveQueryName, ...Array<LiveQueryName>]
        ),
      })
    )
    .mutation(({ input }) => sealQuery(input.name)),
})
