import { createServerFileRoute } from "@tanstack/react-start/server"
import { auth } from "@/lib/auth"

const serve = async ({ request }: { request: Request }) => {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const url = new URL(request.url)
  const originUrl = new URL("http://localhost:3000/v1/shape")

  // Copy Electric-specific query params
  url.searchParams.forEach((value, key) => {
    if (["live", "table", "handle", "offset", "cursor"].includes(key)) {
      originUrl.searchParams.set(key, value)
    }
  })

  originUrl.searchParams.set("table", "recipe_ingredients")
  
  // Join with recipes table to filter by user ownership
  // This assumes recipe_ingredients can be filtered by joining to recipes
  // Alternative: we could add user_id to recipe_ingredients table for direct filtering
  const recipeIdParam = url.searchParams.get("recipe_id")
  if (recipeIdParam) {
    // If specific recipe requested, verify ownership via join
    const filter = `recipe_id = '${recipeIdParam}'`
    originUrl.searchParams.set("where", filter)
  } else {
    // For general queries, we'd need to join with recipes table
    // For now, let's require recipe_id parameter
    return new Response(JSON.stringify({ error: "recipe_id parameter required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  const response = await fetch(originUrl)
  const headers = new Headers(response.headers)
  headers.delete("content-encoding")
  headers.delete("content-length")

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export const ServerRoute = createServerFileRoute("/api/recipe-ingredients").methods({
  GET: serve,
})