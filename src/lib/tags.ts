import { createOptimisticAction } from "@tanstack/react-db"
import {
  tagsCollection,
  recipeTagsCollection,
  ingredientTagsCollection,
} from "@/lib/collections"
import type { SelectTag } from "@/db/zod-schemas"
import { trpc } from "@/lib/trpc-client"

type TagTarget =
  | { entity: `recipe`; entity_id: string }
  | { entity: `ingredient`; entity_id: string }

interface AttachTagsVariables {
  target: TagTarget
  new_tags: SelectTag[]
  links: Array<{
    id: string
    tag_id: string
    created_at: Date
  }>
}

const attachTagsAction = createOptimisticAction<AttachTagsVariables>({
  onMutate: ({ target, new_tags, links }) => {
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
  },
  mutationFn: async ({ target, new_tags, links }) => {
    const { txid } = await trpc.tags.attach.mutate({
      target,
      new_tags: new_tags.map(({ id, name }) => ({ id, name })),
      links: links.map(({ id, tag_id }) => ({ id, tag_id })),
    })

    const syncs: Array<Promise<boolean>> = []
    if (new_tags.length > 0) {
      syncs.push(tagsCollection.utils.awaitTxId(Number(txid)))
    }
    syncs.push(
      target.entity === `recipe`
        ? recipeTagsCollection.utils.awaitTxId(Number(txid))
        : ingredientTagsCollection.utils.awaitTxId(Number(txid))
    )
    await Promise.all(syncs)
  },
})

/**
 * Optimistically attaches tags to one entity as a single TanStack transaction.
 * New tags and join rows persist together, and the transaction stays pending
 * until Electric confirms every affected collection.
 */
export function attachTags(target: TagTarget, tags: SelectTag[]) {
  const now = new Date()

  return attachTagsAction({
    target,
    new_tags: tags.filter((tag) => !tagsCollection.has(tag.id)),
    links: tags.map((tag) => ({
      id: crypto.randomUUID(),
      tag_id: tag.id,
      created_at: now,
    })),
  })
}
