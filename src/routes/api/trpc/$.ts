import { createFileRoute } from "@tanstack/react-router"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { router } from "@/lib/trpc"
import { ingredientsRouter } from "@/lib/trpc/ingredients"
import { recipesRouter } from "@/lib/trpc/recipes"
import { recipeCommentsRouter } from "@/lib/trpc/recipe-comments"
import { aiRouter } from "@/lib/trpc/ai"
import { shoppingListRouter } from "@/lib/trpc/shopping-list"
import { db } from "@/db/connection"
import { auth } from "@/lib/auth"

export const appRouter = router({
  ingredients: ingredientsRouter,
  recipes: recipesRouter,
  recipeComments: recipeCommentsRouter,
  ai: aiRouter,
  shoppingList: shoppingListRouter,
})

export type AppRouter = typeof appRouter

const serve = ({ request }: { request: Request }) => {
  return fetchRequestHandler({
    endpoint: `/api/trpc`,
    req: request,
    router: appRouter,
    createContext: async () => ({
      db,
      session: await auth.api.getSession({ headers: request.headers }),
    }),
  })
}

export const Route = createFileRoute(`/api/trpc/$`)({
  server: {
    handlers: {
      GET: serve,
      POST: serve,
    },
  },
})
