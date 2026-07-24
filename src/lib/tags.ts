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

interface AttachTagsVariables extends TagWrites {
  target: TagTarget
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
  txid: number
) {
  const syncs: Array<Promise<boolean>> = []
  if (new_tags.length > 0) {
    syncs.push(tagsCollection.utils.awaitTxId(txid))
  }
  if (links.length > 0) {
    syncs.push(
      target.entity === `recipe`
        ? recipeTagsCollection.utils.awaitTxId(txid)
        : ingredientTagsCollection.utils.awaitTxId(txid)
    )
  }
  await Promise.all(syncs)
}

const attachTagsAction = createOptimisticAction<AttachTagsVariables>({
  onMutate: ({ target, ...tagWrites }) => {
    optimisticallyInsertTags(target, tagWrites)
  },
  mutationFn: async ({ target, ...tagWrites }) => {
    const { txid } = await trpc.tags.attach.mutate({
      target,
      new_tags: tagWrites.new_tags.map(({ id, name }) => ({ id, name })),
      links: tagWrites.links.map(({ id, tag_id }) => ({ id, tag_id })),
    })

    await awaitTagWrites(target, tagWrites, Number(txid))
  },
})

/**
 * Optimistically attaches tags to one entity as a single TanStack transaction.
 * New tags and join rows persist together, and the transaction stays pending
 * until Electric confirms every affected collection.
 */
export function attachTags(target: TagTarget, tags: SelectTag[]) {
  return attachTagsAction({
    target,
    ...prepareTagWrites(tags),
  })
}
