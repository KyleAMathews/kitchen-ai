import { useMemo } from "react"
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
  const { data: recipeLinks } = useLiveQuery(
    (q) =>
      q
        .from({ link: recipeTagsCollection })
        .where(({ link }) => eq(link.recipe_id, entityId)),
    [entityId]
  )
  const { data: ingredientLinks } = useLiveQuery(
    (q) =>
      q
        .from({ link: ingredientTagsCollection })
        .where(({ link }) => eq(link.ingredient_id, entityId)),
    [entityId]
  )
  const { data: allTags } = useLiveQuery((q) => q.from({ tag: tagsCollection }))

  const tagNames = useMemo(() => {
    const links = entity === `recipe` ? recipeLinks : ingredientLinks
    const byId = new Map((allTags ?? []).map((t) => [t.id, t]))
    return (links ?? [])
      .map((link) => byId.get(link.tag_id))
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .map((t) => t.name)
      .sort((a, b) => a.localeCompare(b))
  }, [entity, recipeLinks, ingredientLinks, allTags])

  if (tagNames.length === 0) return null

  return (
    <>
      {tagNames.map((name) => (
        <Link
          key={name}
          to="/"
          search={{ q: name }}
          // Ingredient cards navigate from an onClick on the whole row, so
          // without this a tag click would fire that too and lose the search.
          onClick={(e) => e.stopPropagation()}
          style={{ textDecoration: `none` }}
          title={`Show recipes and ingredients tagged “${name}”`}
        >
          <Badge
            color="iris"
            variant="soft"
            size={size}
            style={{ cursor: `pointer` }}
          >
            {name}
          </Badge>
        </Link>
      ))}
    </>
  )
}
