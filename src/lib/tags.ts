import { tagsCollection } from "@/lib/collections"
import type { SelectTag } from "@/db/zod-schemas"

/**
 * Saves any tags that don't exist yet, and waits for them to be confirmed.
 *
 * TagInput builds new tags locally without saving them, so abandoning a form
 * never leaves stray tags behind. Call this on save, before writing any
 * recipe_tags/ingredient_tags rows: those tRPC handlers require the tag to
 * exist, so it has to land first.
 *
 * Goes through the collection (insert -> onInsert -> tRPC -> txid -> synced),
 * so the tag is optimistically visible immediately and `isPersisted` resolves
 * only once the write has actually synced back. Awaiting that before writing
 * the join rows is what guarantees the ordering.
 *
 * Ids are client-generated and the server honours them, so the ids here are the
 * real ones. TagInput reuses an existing tag when the name already exists (it
 * syncs the whole global vocabulary), so a duplicate name only happens if two
 * users create it at the same instant — that rejects the insert, which rolls
 * back the optimistic tag and skips the join rows rather than mislinking them.
 */
export async function persistNewTags(tags: SelectTag[]): Promise<void> {
  const newTags = tags.filter((tag) => !tagsCollection.has(tag.id))

  await Promise.all(
    newTags.map((tag) => tagsCollection.insert(tag).isPersisted.promise)
  )
}
