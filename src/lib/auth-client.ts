import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL:
    typeof window !== `undefined` 
      ? window.location.origin // Always use current domain in browser
      : process.env.NODE_ENV === `production`
        ? `https://kitchen-ai.fly.dev` // Fallback for server-side
        : `https://kitchen-ai.localhost`,
})
