import { Link } from "@tanstack/react-router"
import {
  CaretRightIcon,
  StarFilledIcon,
  CheckIcon,
} from "@radix-ui/react-icons"
import { Flex, Heading, Text, Badge } from "@radix-ui/themes"
import { timeAgo } from "@/lib/utils"
import { type SelectRecipe } from "@/db/zod-schemas"
import TagList from "@/components/tag-list"

export interface RecipeCardRecipe extends SelectRecipe {
  times_made?: number
  last_made_at?: Date | null
  avg_rating?: number | null
  rating_count?: number
}

export default function RecipeCard({ recipe }: { recipe: RecipeCardRecipe }) {
  const madeCount = recipe.times_made ?? 0
  const ratingCount = recipe.rating_count ?? 0
  const lastMadeAt = recipe.last_made_at ? new Date(recipe.last_made_at) : null

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
          {madeCount > 0 && (
            <Badge color="green" variant="soft">
              <CheckIcon width="12" height="12" />
              <Text size="1">Made {madeCount}x</Text>
            </Badge>
          )}
          {recipe.avg_rating != null && ratingCount > 0 && (
            <Badge color="amber" variant="soft">
              <StarFilledIcon width="12" height="12" />
              <Text size="1">
                {recipe.avg_rating.toFixed(1)} ({ratingCount})
              </Text>
            </Badge>
          )}
          <Text color="gray" size="2">
            {lastMadeAt
              ? `Last made ${timeAgo.format(lastMadeAt)}`
              : `Not yet made`}
          </Text>
          <TagList entity="recipe" entityId={recipe.id} />
        </Flex>
      </Flex>
      <Flex align="center">
        <CaretRightIcon height="20" width="20" />
      </Flex>
    </Flex>
  )
}
