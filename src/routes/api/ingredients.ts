import { createFileRoute } from "@tanstack/react-router"
import { auth } from "@/lib/auth"
import { prepareElectricUrl, proxyElectricRequest } from "@/lib/electric-proxy"

const serve = async ({ request }: { request: Request }) => {
  try {
    console.log('Ingredients API called:', request.url)

    const session = await auth.api.getSession({ headers: request.headers })
    console.log('Session:', session ? 'found' : 'not found')

    if (!session) {
      return new Response(JSON.stringify({ error: `Unauthorized` }), {
        status: 401,
        headers: { "content-type": `application/json` },
      })
    }

    const originUrl = prepareElectricUrl(request.url)
    originUrl.searchParams.set(`table`, `ingredients`)
    console.log('Electric URL:', originUrl.toString())

    // User can only see their own ingredients
    // const filter = `user_id = '${session.user.id}'`
    // originUrl.searchParams.set(`where`, filter)

    const response = await proxyElectricRequest(originUrl)
    console.log('Electric response status:', response.status)
    return response
  } catch (error) {
    console.error('Ingredients API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), {
      status: 500,
      headers: { "content-type": `application/json` },
    })
  }
}

export const Route = createFileRoute(`/api/ingredients`)({
  server: {
    handlers: {
      GET: serve,
    },
  },
})
