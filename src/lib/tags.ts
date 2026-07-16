import { tagsCollection } from "@/lib/collections"
import { trpc } from "@/lib/trpc-client"
import type { SelectTag } from "@/db/zod-schemas"

/**
 * Persists any tags that don't exist yet, and waits for them to commit.
 *
 * TagInput builds new tags locally without saving them, so abandoning a form
 * never leaves stray tags behind. Call this on save, before writing any
 * recipe_tags/ingredient_tags rows: those tRPC handlers verify the tag exists,
 * so the tag has to land first.
 *
 * Tags picked from the existing suggestions are already synced and are skipped.
 *
 * This calls tRPC directly rather than tagsCollection.insert() on purpose. The
 * collection resolves its insert only once the write's txid has round-tripped
 * back through the Electric shape stream, which can stall (or time out) when
 * sync is slow or connection-starved. All we actually need before writing the
 * join rows is proof the tag committed in Postgres — and the mutation returning
 * is exactly that. The new tag still arrives in tagsCollection via sync.
 */
export async function persistNewTags(tags: SelectTag[]): Promise<void> {
  const newTags = tags.filter((tag) => !tagsCollection.has(tag.id))

  await Promise.all(
    newTags.map((tag) =>
      trpc.tags.create.mutate({ id: tag.id, name: tag.name })
    )
  )
}
