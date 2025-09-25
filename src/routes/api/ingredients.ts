import { createFileRoute } from "@tanstack/react-router"
import { auth } from "@/lib/auth"
import { prepareElectricUrl, proxyElectricRequest } from "@/lib/electric-proxy"

const serve = async ({ request }: { request: Request }) => {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return new Response(JSON.stringify({ error: `Unauthorized` }), {
      status: 401,
      headers: { "content-type": `application/json` },
    })
  }

  const originUrl = prepareElectricUrl(request.url)
  originUrl.searchParams.set(`table`, `ingredients`)
  // User can only see their own ingredients
  // const filter = `user_id = '${session.user.id}'`
  // originUrl.searchParams.set(`where`, filter)

  return proxyElectricRequest(originUrl)
}

export const Route = createFileRoute(`/api/ingredients`)({
  server: {
    handlers: {
      GET: serve,
    },
  },
})
