import { createFileRoute } from "@tanstack/react-router"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { router } from "@/lib/trpc"
import { ingredientsRouter } from "@/lib/trpc/ingredients"
import { recipesRouter } from "@/lib/trpc/recipes"
import { recipeCommentsRouter } from "@/lib/trpc/recipe-comments"
import { tagsRouter } from "@/lib/trpc/tags"
import { aiRouter } from "@/lib/trpc/ai"
import { shoppingListRouter } from "@/lib/trpc/shopping-list"
import { db } from "@/db/connection"
import { auth } from "@/lib/auth"

export const appRouter = router({
  ingredients: ingredientsRouter,
  recipes: recipesRouter,
  recipeComments: recipeCommentsRouter,
  tags: tagsRouter,
  ai: aiRouter,
  shoppingList: shoppingListRouter,
})

export type AppRouter = typeof appRouter

const serve = async ({ request }: { request: Request }) => {
  try {
    return await fetchRequestHandler({
      endpoint: `/api/trpc`,
      req: request,
      router: appRouter,
      createContext: async () => ({
        db,
        session: await auth.api.getSession({ headers: request.headers }),
      }),
      onError({ error, path, type, input }) {
        console.error(`[tRPC Error] ${error.code} ${type} ${path}`, {
          message: error.message,
          cause: error.cause,
          input,
          stack: error.stack,
        })
      },
    })
  } catch (error) {
    // Errors that escape fetchRequestHandler never reach onError. h3 rewrites
    // them to the string "HTTPError" before the client sees them, so log here
    // or they are lost. See f03ee95 for the srvx abort that hid behind this.
    console.error(`[tRPC Escaped] ${request.method} ${request.url}`, error)
    throw error
  }
}

export const Route = createFileRoute(`/api/trpc/$`)({
  server: {
    handlers: {
      GET: serve,
      POST: serve,
    },
  },
})
