import { tagsCollection } from "@/endpoints/kitchen.endpoint"
import type { TagWrites } from "@/endpoints/schemas"
import type { SelectTag } from "@/db/zod-schemas"
export type TagTarget =
  | { entity: `recipe`; entity_id: string }
  | { entity: `ingredient`; entity_id: string }

export function prepareTagWrites(tags: SelectTag[]): TagWrites {
  return {
    new_tags: tags
      .filter((tag) => !tagsCollection.has(tag.id))
      .map(({ id, name }) => ({ id, name })),
    links: tags.map((tag) => ({
      id: crypto.randomUUID(),
      tag_id: tag.id,
    })),
  }
}

interface CurrentTagLink {
  id: string
  tag_id: string
}

/**
 * Builds tag changes for one recipe or ingredient.
 * Returns null when the selection did not change.
 */
export function prepareTagAssignments(
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

  return {
    target,
    removed_link_ids,
    ...prepareTagWrites(addedTags),
  }
}
