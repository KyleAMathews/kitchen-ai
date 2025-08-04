import { createServerFileRoute } from '@tanstack/react-start/server'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { router } from '@/lib/trpc'
import { ingredientsRouter } from '@/lib/trpc/ingredients'
import { recipesRouter } from '@/lib/trpc/recipes'
import { aiRouter } from '@/lib/trpc/ai'
import { db } from '@/db/connection'
import { auth } from '@/lib/auth'

export const appRouter = router({
  ingredients: ingredientsRouter,
  recipes: recipesRouter,
  ai: aiRouter,
})

export type AppRouter = typeof appRouter

const serve = ({ request }: { request: Request }) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: async () => ({
      db,
      session: await auth.api.getSession({ headers: request.headers }),
    }),
  })
}

export const ServerRoute = createServerFileRoute('/api/trpc/$').methods({
  GET: serve,
  POST: serve,
})