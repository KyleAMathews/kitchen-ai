import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === `production`
      ? `https://kitchen-ai.netlify.app`
      : `https://kitchen-ai.localhost`,
})
