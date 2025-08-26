import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/db/connection"
import * as schema from "@/db/auth-schema"
import { networkInterfaces } from "os"

// Get network IP for trusted origins
const nets = networkInterfaces()
let networkIP = `192.168.1.1` // fallback

for (const name of Object.keys(nets)) {
  const netInterfaces = nets[name]
  if (netInterfaces) {
    for (const net of netInterfaces) {
      if (net.family === `IPv4` && !net.internal) {
        networkIP = net.address
        break
      }
    }
  }
}

// Allowed emails for production (comma-separated in env var)
const allowedEmails =
  process.env.ALLOWED_EMAILS?.split(`,`).map((e) => e.trim()) || []

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: `pg`,
    usePlural: true,
    schema,
    // debugLogs: true,
  }),
  emailAndPassword: {
    enabled: true,
    // Allow signup in development, disable in production for now
    disableSignUp: process.env.NODE_ENV === `production`,
    minPasswordLength: process.env.NODE_ENV === `production` ? 8 : 1,
  },
  socialProviders: {
    google: {
      enabled:
        process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
          ? true
          : false,
      clientId: process.env.GOOGLE_CLIENT_ID || ``,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ``,
      prompt: `select_account`,
      mapProfileToUser: (profile) => {
        // Check email restrictions in production
        if (process.env.NODE_ENV === `production` && allowedEmails.length > 0) {
          if (!allowedEmails.includes(profile.email)) {
            throw new Error(
              `Access restricted. Your email ${profile.email} is not authorized.`
            )
          }
        }

        // Map Google profile fields to user
        return {
          email: profile.email,
          name: profile.name,
          emailVerified: profile.email_verified,
          image: profile.picture,
        }
      },
    },
  },
  trustedOrigins: [
    `https://kitchen-ai.localhost`,
    `https://${networkIP}`,
    `http://localhost:5173`, // fallback for direct Vite access
    `https://kitchen-ai.bricolage.io`, // production domain
    `https://kitchen-ai.netlify.app`, // netlfy domain
    `https://kitchen-ai.fly.dev`, // fly.io domain
  ],
  secret:
    process.env.BETTER_AUTH_SECRET || `dev-secret-key-change-in-production`,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  cookies: {
    sessionToken: {
      name: `better-auth.session-token`,
      httpOnly: true,
      secure: process.env.NODE_ENV === `production`,
      sameSite: `lax`,
    },
  },
})
