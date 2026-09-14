import { getRequestHeaders } from "@tanstack/react-start/server"
import { auth } from "@/lib/auth"
import { db } from "@/db/connection"
export { db }
export * from "@/db/schema"
export async function requireUser(req: { scope: string }) {
  const session = await auth.api.getSession({ headers: getRequestHeaders() })
  if (!session?.user || session.user.id !== req.scope)
    throw new Error("Unauthorized")
  return session.user
}
