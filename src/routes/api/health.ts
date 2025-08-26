import { createServerFileRoute } from "@tanstack/react-start/server"

const healthCheck = async ({ request }: { request: Request }) => {
  return new Response(
    JSON.stringify({
      status: `ok`,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || `unknown`,
    }),
    {
      status: 200,
      headers: {
        "content-type": `application/json`,
        "cache-control": `no-cache`,
      },
    }
  )
}

export const ServerRoute = createServerFileRoute(`/api/health`).methods({
  GET: healthCheck,
})
