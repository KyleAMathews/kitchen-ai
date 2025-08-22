import { Link } from "@tanstack/react-router"
import { CaretRightIcon } from "@radix-ui/react-icons"
import { Flex, Heading, Text } from "@radix-ui/themes"
import { timeAgo } from "@/lib/utils"
import { type SelectRecipe } from "@/db/zod-schemas"

export default function RecipeCard({ recipe }: { recipe: SelectRecipe }) {
  console.log({ recipe })
  return (
    <Flex>
      <Flex direction="column" gap="3">
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
        <Text color="gray" size="2">
          Last used {timeAgo.format(recipe.updated_at)}
        </Text>
      </Flex>
      <Flex align="center">
        <CaretRightIcon height="20" width="20" />
      </Flex>
    </Flex>
  )
}
