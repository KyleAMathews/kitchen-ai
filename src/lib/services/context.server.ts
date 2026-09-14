import type { db } from "@/db/connection"
import type { auth } from "@/lib/auth"
type Session = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>
export type ServiceContext = { db: typeof db; session: Session }
export class ServiceError extends Error {
  readonly code: string
  constructor(options: { code: string; message?: string; cause?: unknown }) {
    super(options.message ?? options.code, { cause: options.cause })
    this.code = options.code
  }
}
