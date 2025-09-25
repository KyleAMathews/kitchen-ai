import { createFileRoute } from "@tanstack/react-router"
import { json } from "@tanstack/react-start"

const healthCheck = async () => {
  return json(
    {
      status: `ok`,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || `unknown`,
    },
    {
      status: 200,
      headers: {
        "cache-control": `no-cache`,
      },
    }
  )
}

export const Route = createFileRoute(`/api/health`)({
  server: {
    handlers: {
      GET: healthCheck,
    },
  },
})
