import { Badge } from "@radix-ui/themes"
import { Link } from "@tanstack/react-router"
import { useLiveQuery, eq } from "@tanstack/react-db"
import {
  tagsCollection,
  recipeTagsCollection,
  ingredientTagsCollection,
} from "@/lib/collections"

interface TagListProps {
  entity: `recipe` | `ingredient`
  entityId: string
  size?: `1` | `2`
}

/**
 * Renders the tags attached to a recipe or ingredient as soft badges,
 * meant to sit inline next to other badges like "Made 1x" or "Pantry Staple".
 */
export default function TagList({
  entity,
  entityId,
  size = `1`,
}: TagListProps) {
  return entity === `recipe` ? (
    <RecipeTagList entityId={entityId} size={size} />
  ) : (
    <IngredientTagList entityId={entityId} size={size} />
  )
}

function RecipeTagList({
  entityId,
  size,
}: Pick<TagListProps, `entityId` | `size`>) {
  const { data: tags } = useLiveQuery(
    (q) =>
      q
        .from({ link: recipeTagsCollection })
        .innerJoin({ tag: tagsCollection }, ({ link, tag }) =>
          eq(link.tag_id, tag.id)
        )
        .where(({ link }) => eq(link.recipe_id, entityId))
        .select(({ tag }) => ({ id: tag.id, name: tag.name }))
        .orderBy(({ tag }) => tag.name),
    [entityId]
  )

  return <TagBadges tags={tags} size={size} />
}

function IngredientTagList({
  entityId,
  size,
}: Pick<TagListProps, `entityId` | `size`>) {
  const { data: tags } = useLiveQuery(
    (q) =>
      q
        .from({ link: ingredientTagsCollection })
        .innerJoin({ tag: tagsCollection }, ({ link, tag }) =>
          eq(link.tag_id, tag.id)
        )
        .where(({ link }) => eq(link.ingredient_id, entityId))
        .select(({ tag }) => ({ id: tag.id, name: tag.name }))
        .orderBy(({ tag }) => tag.name),
    [entityId]
  )

  return <TagBadges tags={tags} size={size} />
}

function TagBadges({
  tags,
  size,
}: {
  tags: Array<{ id: string; name: string }> | undefined
  size: TagListProps[`size`]
}) {
  if (!tags?.length) return null

  return (
    <>
      {tags.map((tag) => (
        <Link
          key={tag.id}
          to="/"
          search={{ q: tag.name }}
          // Ingredient cards navigate from an onClick on the whole row, so
          // without this a tag click would fire that too and lose the search.
          onClick={(e) => e.stopPropagation()}
          style={{ textDecoration: `none` }}
          title={`Show recipes and ingredients tagged “${tag.name}”`}
        >
          <Badge
            color="iris"
            variant="soft"
            size={size}
            style={{ cursor: `pointer` }}
          >
            {tag.name}
          </Badge>
        </Link>
      ))}
    </>
  )
}
