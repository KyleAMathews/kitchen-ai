import { useMemo, useState } from "react"
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons"
import { Button, Callout, Dialog, Flex } from "@radix-ui/themes"
import { UNSAFE_PortalProvider } from "react-aria"
import { eq, useLiveQuery } from "@tanstack/react-db"
import type { SelectTag } from "@/db/zod-schemas"
import {
  ingredientTagsCollection,
  recipeTagsCollection,
  tagsCollection,
} from "@/lib/collections"
import { changeTagAssignments, type TagTarget } from "@/lib/tags"
import TagInput from "@/components/tag-input"

interface TagEditorProps {
  entity: TagTarget[`entity`]
  entityId: string
}

export default function TagEditor({ entity, entityId }: TagEditorProps) {
  const { data: recipeRows } = useLiveQuery(
    (q) =>
      entity === `recipe`
        ? q
            .from({ link: recipeTagsCollection })
            .innerJoin({ tag: tagsCollection }, ({ link, tag }) =>
              eq(link.tag_id, tag.id)
            )
            .where(({ link }) => eq(link.recipe_id, entityId))
            .select(({ link, tag }) => ({
              link_id: link.id,
              id: tag.id,
              name: tag.name,
              user_id: tag.user_id,
              created_at: tag.created_at,
            }))
        : undefined,
    [entity, entityId]
  )
  const { data: ingredientRows } = useLiveQuery(
    (q) =>
      entity === `ingredient`
        ? q
            .from({ link: ingredientTagsCollection })
            .innerJoin({ tag: tagsCollection }, ({ link, tag }) =>
              eq(link.tag_id, tag.id)
            )
            .where(({ link }) => eq(link.ingredient_id, entityId))
            .select(({ link, tag }) => ({
              link_id: link.id,
              id: tag.id,
              name: tag.name,
              user_id: tag.user_id,
              created_at: tag.created_at,
            }))
        : undefined,
    [entity, entityId]
  )

  const currentRows = entity === `recipe` ? recipeRows : ingredientRows
  const currentTags = useMemo<SelectTag[]>(
    () => (currentRows ?? []).map(({ link_id: _linkId, ...tag }) => tag),
    [currentRows]
  )

  return (
    <TagEditorDialog
      target={{ entity, entity_id: entityId }}
      currentRows={currentRows ?? []}
      currentTags={currentTags}
    />
  )
}

function TagEditorDialog({
  target,
  currentRows,
  currentTags,
}: {
  target: TagTarget
  currentRows: Array<SelectTag & { link_id: string }>
  currentTags: SelectTag[]
}) {
  const [open, setOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState<SelectTag[]>(currentTags)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null
  )

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setSelectedTags(currentTags)
      setError(null)
    }
    setOpen(nextOpen)
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)

    try {
      const transaction = changeTagAssignments(
        target,
        currentRows.map((row) => ({
          id: row.link_id,
          tag_id: row.id,
        })),
        selectedTags
      )
      await transaction?.isPersisted.promise
      setOpen(false)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `Failed to save tags`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <Button variant="ghost" color="gray" size="1">
          {currentTags.length > 0 ? <Pencil1Icon /> : <PlusIcon />}
          {currentTags.length > 0 ? `Edit tags` : `Add tags`}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content ref={setPortalContainer} style={{ maxWidth: 450 }}>
        <Dialog.Title>
          {currentTags.length > 0 ? `Edit tags` : `Add tags`}
        </Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Tags are shared across recipes and ingredients.
        </Dialog.Description>

        <UNSAFE_PortalProvider getContainer={() => portalContainer}>
          <TagInput
            value={selectedTags}
            onChange={setSelectedTags}
            label=""
            placeholder="Search or add a tag..."
            disabled={saving}
          />
        </UNSAFE_PortalProvider>

        {error && (
          <Callout.Root color="red" mt="3">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <Flex gap="3" mt="4" justify="end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? `Saving...` : `Save`}
          </Button>
          <Button
            variant="soft"
            color="gray"
            onClick={() => setOpen(false)}
            disabled={saving}
          >
            Cancel
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
