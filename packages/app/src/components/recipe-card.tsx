import { Link } from "@tanstack/react-router"
import { CaretRightIcon } from "@radix-ui/react-icons"
import {
  Flex,
  Heading,
  Link as RadixLink,
  Text,
  Separator,
} from "@radix-ui/themes"
import { timeAgo } from "../util"

export default function RecipeCard({ recipe }) {
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
          Last used {timeAgo.format(new Date(recipe.updated_at))}
        </Text>
      </Flex>
      <Flex align="center">
        <CaretRightIcon height="20" width="20" />
      </Flex>
    </Flex>
  )
}
