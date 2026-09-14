import type { SelectTag } from "@/db/zod-schemas"
import { getKitchen } from "./collections"
export type TagTarget =
  | { entity: `recipe`; entity_id: string }
  | { entity: `ingredient`; entity_id: string }

export interface TagWrites {
  new_tags: SelectTag[]
  links: Array<{
    id: string
    tag_id: string
    created_at: Date
  }>
}

export function prepareTagWrites(tags: SelectTag[]): TagWrites {
  const now = new Date()

  return {
    new_tags: tags.filter((tag) => !getKitchen().tagsCollection.has(tag.id)),
    links: tags.map((tag) => ({
      id: crypto.randomUUID(),
      tag_id: tag.id,
      created_at: now,
    })),
  }
}

interface CurrentTagLink {
  id: string
  tag_id: string
}

/**
 * Replaces the tag assignments for one recipe or ingredient as one optimistic
 * transaction. Returns null when the selection did not change.
 */
export function changeTagAssignments(
  target: TagTarget,
  currentLinks: CurrentTagLink[],
  selectedTags: SelectTag[]
) {
  const currentTagIds = new Set(currentLinks.map((link) => link.tag_id))
  const selectedTagIds = new Set(selectedTags.map((tag) => tag.id))
  const addedTags = selectedTags.filter((tag) => !currentTagIds.has(tag.id))
  const removed_link_ids = currentLinks
    .filter((link) => !selectedTagIds.has(link.tag_id))
    .map((link) => link.id)

  if (addedTags.length === 0 && removed_link_ids.length === 0) {
    return null
  }

  return getKitchen().changeTagAssignmentsAction({
    target,
    removed_link_ids,
    ...prepareTagWrites(addedTags),
  })
}
