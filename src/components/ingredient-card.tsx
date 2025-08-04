import { isRunningLow, isExpiredSoon, timeAgo } from "@/lib/utils"
import { Link, useNavigate } from "@tanstack/react-router"
import {
  Flex,
  Heading,
  Box,
  Text,
  Slider,
  Badge,
} from "@radix-ui/themes"
import { CaretRightIcon } from "@radix-ui/react-icons"

interface Ingredient {
  id: string
  name: string
  description: string
  isReviewed: boolean
  embedding: string
  trackingType: "fill_level" | "count" | null
  fillLevel: number
  grocerySection: string
  count: number
  expirationDate: Date
  ingredientsPhotoUploadsId: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
}

interface IngredientCardProps {
  ingredient: Ingredient
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  const navigate = useNavigate()
  const expiredDate = new Date(ingredient.expirationDate)
  const expiresInFuture = ingredient.expirationDate > new Date()

  return (
    <Flex
      key={ingredient.id}
      gap="5"
      style={{ cursor: `pointer` }}
      align="center"
      onClick={() => {
        navigate({ to: `/ingredients/$id`, params: { id: ingredient.id } })
      }}
    >
      <Flex gap="2" direction="column">
        <Heading size="3" weight="medium">
          {ingredient.name}
          {ingredient.trackingType === `count` &&
            ` (` + ingredient.count + `)`}
        </Heading>
        <Text
          size="2"
          weight={isExpiredSoon(ingredient) ? `medium` : `regular`}
          color={isExpiredSoon(ingredient) ? `crimson` : `gray`}
        >
          {expiresInFuture ? `Expires` : `Expired`}
          {` `}
          {timeAgo.format(new Date(expiredDate))}
        </Text>
      </Flex>
      <Flex direction="column" gap="1" ml="auto">
        {ingredient.trackingType === `fill_level` && (
          <Box style={{ minWidth: 100 }}>
            <Slider
              variant="soft"
              className="no-thumb"
              value={[ingredient.fillLevel]}
            />
          </Box>
        )}
        {isRunningLow(ingredient) && (
          <Box>
            <Badge color="crimson" variant="soft">
              Running Low
            </Badge>
          </Box>
        )}
      </Flex>
      <Flex align="center">
        <CaretRightIcon height="20" width="20" />
      </Flex>
    </Flex>
  )
}