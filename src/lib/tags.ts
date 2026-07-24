import { createOptimisticAction } from "@tanstack/react-db"
import {
  tagsCollection,
  recipeTagsCollection,
  ingredientTagsCollection,
} from "@/lib/collections"
import type { SelectTag } from "@/db/zod-schemas"
import { trpc } from "@/lib/trpc-client"

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

interface ChangeTagAssignmentsVariables extends TagWrites {
  target: TagTarget
  removed_link_ids: string[]
}

export function prepareTagWrites(tags: SelectTag[]): TagWrites {
  const now = new Date()

  return {
    new_tags: tags.filter((tag) => !tagsCollection.has(tag.id)),
    links: tags.map((tag) => ({
      id: crypto.randomUUID(),
      tag_id: tag.id,
      created_at: now,
    })),
  }
}

export function optimisticallyInsertTags(
  target: TagTarget,
  { new_tags, links }: TagWrites
) {
  for (const tag of new_tags) {
    tagsCollection.insert(tag)
  }

  if (target.entity === `recipe`) {
    for (const link of links) {
      recipeTagsCollection.insert({
        ...link,
        recipe_id: target.entity_id,
      })
    }
  } else {
    for (const link of links) {
      ingredientTagsCollection.insert({
        ...link,
        ingredient_id: target.entity_id,
      })
    }
  }
}

export async function awaitTagWrites(
  target: TagTarget,
  { new_tags, links }: TagWrites,
  txid: number,
  hasRemovedLinks = false
) {
  const syncs: Array<Promise<boolean>> = []
  if (new_tags.length > 0) {
    syncs.push(tagsCollection.utils.awaitTxId(txid))
  }
  if (links.length > 0 || hasRemovedLinks) {
    syncs.push(
      target.entity === `recipe`
        ? recipeTagsCollection.utils.awaitTxId(txid)
        : ingredientTagsCollection.utils.awaitTxId(txid)
    )
  }
  await Promise.all(syncs)
}

const changeTagAssignmentsAction =
  createOptimisticAction<ChangeTagAssignmentsVariables>({
    onMutate: ({ target, removed_link_ids, ...tagWrites }) => {
      optimisticallyInsertTags(target, tagWrites)

      if (removed_link_ids.length > 0) {
        if (target.entity === `recipe`) {
          recipeTagsCollection.delete(removed_link_ids)
        } else {
          ingredientTagsCollection.delete(removed_link_ids)
        }
      }
    },
    mutationFn: async ({ target, removed_link_ids, ...tagWrites }) => {
      const { txid } = await trpc.tags.changeAssignments.mutate({
        target,
        new_tags: tagWrites.new_tags.map(({ id, name }) => ({ id, name })),
        links: tagWrites.links.map(({ id, tag_id }) => ({ id, tag_id })),
        removed_link_ids,
      })

      await awaitTagWrites(
        target,
        tagWrites,
        Number(txid),
        removed_link_ids.length > 0
      )
    },
  })

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

  return changeTagAssignmentsAction({
    target,
    removed_link_ids,
    ...prepareTagWrites(addedTags),
  })
}
