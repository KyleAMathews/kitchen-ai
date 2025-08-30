import { Link } from "@tanstack/react-router"
import {
  CaretRightIcon,
  StarFilledIcon,
  CheckIcon,
} from "@radix-ui/react-icons"
import { Flex, Heading, Text, Badge } from "@radix-ui/themes"
import { timeAgo } from "@/lib/utils"
import { type SelectRecipe } from "@/db/zod-schemas"
import { useLiveQuery } from "@tanstack/react-db"
import { recipeCommentsCollection } from "@/lib/collections"
import { eq } from "@tanstack/react-db"

export default function RecipeCard({ recipe }: { recipe: SelectRecipe }) {
  // Get stats for this recipe
  const { data: comments } = useLiveQuery(
    (q) =>
      q
        .from({ comment: recipeCommentsCollection })
        .where(({ comment }) => eq(comment.recipe_id, recipe.id)),
    [recipe.id]
  )

  // Calculate stats from comments
  const madeItComments = comments?.filter((c) => c.made_it) ?? []
  const lastMadeAt =
    madeItComments.length > 0
      ? new Date(
          Math.max(
            ...madeItComments.map((c) => new Date(c.created_at).getTime())
          )
        )
      : null

  const stats = {
    madeCount: madeItComments.length,
    avgRating: comments?.length
      ? comments.reduce((sum, c) => sum + (c.rating ?? 0), 0) /
        comments.filter((c) => c.rating !== null).length
      : null,
    ratingCount: comments?.filter((c) => c.rating !== null).length ?? 0,
    lastMadeAt,
  }

  return (
    <Flex justify="between" style={{ width: `100%` }}>
      <Flex direction="column" gap="2">
        <Heading size="3" weight="medium">
          <Link
            to={`/recipes/$id`}
            params={{ id: recipe.id }}
            style={{
              color: `inherit`,
              textDecoration: `none`,
            }}
          >
            {recipe.name}
          </Link>
        </Heading>
        <Flex gap="3" align="center">
          {stats.madeCount > 0 && (
            <Badge color="green" variant="soft">
              <CheckIcon width="12" height="12" />
              <Text size="1">Made {stats.madeCount}x</Text>
            </Badge>
          )}
          {stats.avgRating !== null && stats.ratingCount > 0 && (
            <Badge color="amber" variant="soft">
              <StarFilledIcon width="12" height="12" />
              <Text size="1">
                {stats.avgRating.toFixed(1)} ({stats.ratingCount})
              </Text>
            </Badge>
          )}
          <Text color="gray" size="2">
            {stats.lastMadeAt
              ? `Last made ${timeAgo.format(stats.lastMadeAt)}`
              : `Not yet made`}
          </Text>
        </Flex>
      </Flex>
      <Flex align="center">
        <CaretRightIcon height="20" width="20" />
      </Flex>
    </Flex>
  )
}
