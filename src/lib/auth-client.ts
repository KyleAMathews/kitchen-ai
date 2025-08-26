import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === `production`
      ? typeof window !== `undefined` 
        ? window.location.origin // Use current domain in browser
        : `https://kitchen-ai.fly.dev` // Fallback for server-side (replace with your domain)
      : `https://kitchen-ai.localhost`,
})
