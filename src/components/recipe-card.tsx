import { Link } from "@tanstack/react-router"
import { CaretRightIcon } from "@radix-ui/react-icons"
import {
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes"
import { timeAgo } from "@/lib/utils"

interface Recipe {
  id: string
  name: string
  description: string
  url: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Flex>
      <Flex direction="column" gap="3">
        <Heading size="3" weight="medium">
          <Link
            to={`/recipes/${recipe.id}`}
            style={{
              color: `inherit`,
              textDecoration: `none`,
            }}
          >
            {recipe.name}
          </Link>
        </Heading>
        <Text color="gray" size="2">
          Last used {timeAgo.format(new Date(recipe.updatedAt))}
        </Text>
      </Flex>
      <Flex align="center">
        <CaretRightIcon height="20" width="20" />
      </Flex>
    </Flex>
  )
}