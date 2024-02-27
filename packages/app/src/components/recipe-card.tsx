import { Link } from "react-router-dom"
import {
  Flex,
  Heading,
  Link as RadixLink,
  Text,
  Separator,
} from "@radix-ui/themes"
import TimeAgo from "javascript-time-ago"

// English.
import en from "javascript-time-ago/locale/en"

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo(`en-US`)

export default function RecipeCard({ recipe }) {
  return (
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
        Last used {timeAgo.format(recipe.updated_at)}
      </Text>
    </Flex>
  )
}
