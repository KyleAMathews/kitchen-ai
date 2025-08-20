import { createFileRoute, useParams } from "@tanstack/react-router"
import { useLiveQuery, eq } from "@tanstack/react-db"
import {
  Heading,
  Flex,
  Text,
  Badge,
  Box,
  Slider,
  Button,
} from "@radix-ui/themes"
import { ingredientsCollection } from "@/lib/collections"
import { isRunningLow, isExpiredSoon, timeAgo } from "@/lib/utils"

export const Route = createFileRoute("/_authenticated/ingredients/$id")({
  component: IngredientDetail,
  ssr: false,
  loader: async () => {
    await ingredientsCollection.preload()
  },
})

export default function IngredientDetail() {
  const { id } = useParams({ from: "/_authenticated/ingredients/$id" })

  const { data: ingredients } = useLiveQuery(
    (q) =>
      q
        .from({ ingredientsCollection })
        .where(({ ingredientsCollection }) => eq(ingredientsCollection.id, id)),
    [id]
  )

  const ingredient = ingredients?.[0]

  if (!ingredient) {
    return (
      <div className="p-6">
        <Text>Ingredient not found</Text>
      </div>
    )
  }

  const expiredDate = new Date(ingredient.expiration_date)
  const expiresInFuture = ingredient.expiration_date > new Date()

  return (
    <div className="p-6">
      <Flex direction="column" gap="6">
        <Heading size="6">{ingredient.name}</Heading>

        {ingredient.description && (
          <Text size="3" color="gray">
            {ingredient.description}
          </Text>
        )}

        <Flex direction="column" gap="4">
          {ingredient.tracking_type !== "pantry_staple" && (
            <Flex direction="column" gap="2">
              <Text weight="medium">Expiration</Text>
              <Text
                color={isExpiredSoon(ingredient) ? "crimson" : "gray"}
                weight={isExpiredSoon(ingredient) ? "medium" : "regular"}
              >
                {expiresInFuture ? "Expires" : "Expired"}{" "}
                {timeAgo.format(expiredDate)}
              </Text>
            </Flex>
          )}

          <Flex direction="column" gap="2">
            <Text weight="medium">Grocery Section</Text>
            <Badge variant="soft">{ingredient.grocery_section}</Badge>
          </Flex>

          {ingredient.tracking_type === "fill_level" && (
            <Flex direction="column" gap="2">
              <Text weight="medium">Fill Level</Text>
              <Box style={{ width: 200 }}>
                <Slider
                  variant="soft"
                  value={[ingredient.fill_level]}
                  onValueChange={(values) => {
                    // Update ingredient fill level optimistically
                    ingredientsCollection.update(ingredient.id, (draft) => {
                      draft.fill_level = values[0]
                      draft.updated_at = new Date()
                    })
                  }}
                />
              </Box>
              <Text size="2" color="gray">
                {ingredient.fill_level}%
              </Text>
            </Flex>
          )}

          {ingredient.tracking_type === "count" && (
            <Flex direction="column" gap="2">
              <Text weight="medium">Count</Text>
              <Flex gap="2" align="center">
                <Button
                  size="1"
                  variant="soft"
                  onClick={() => {
                    ingredientsCollection.update(ingredient.id, (draft) => {
                      draft.count = Math.max(0, ingredient.count - 1)
                      draft.updated_at = new Date()
                    })
                  }}
                >
                  -
                </Button>
                <Text>{ingredient.count}</Text>
                <Button
                  size="1"
                  variant="soft"
                  onClick={() => {
                    ingredientsCollection.update(ingredient.id, (draft) => {
                      draft.count = ingredient.count + 1
                      draft.updated_at = new Date()
                    })
                  }}
                >
                  +
                </Button>
              </Flex>
            </Flex>
          )}

          {ingredient.tracking_type === "pantry_staple" && (
            <Flex direction="column" gap="2">
              <Text weight="medium">Status</Text>
              <Badge color="green" variant="soft">
                Pantry Staple - Always Available
              </Badge>
            </Flex>
          )}

          {isRunningLow(ingredient) &&
            ingredient.tracking_type !== "pantry_staple" && (
              <Badge color="crimson" variant="soft">
                Running Low
              </Badge>
            )}
        </Flex>
      </Flex>
    </div>
  )
}
