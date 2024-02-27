import { isRunningLow, isExpiredSoon } from "../util"
import { useNavigate } from "react-router-dom"
import {
  Flex,
  Heading,
  Box,
  Text,
  Separator,
  Slider,
  Badge,
} from "@radix-ui/themes"
import { CaretRightIcon } from "@radix-ui/react-icons"
import TimeAgo from "javascript-time-ago"

// English.
import en from "javascript-time-ago/locale/en"

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo(`en-US`)

export default function IngredientCard({ ingredient }: Ingredients) {
  const navigate = useNavigate()
  const expiredDate = new Date(ingredient.expiration_date)
  return (
    <Flex
      key={ingredient.id}
      gap="5"
      style={{ cursor: `pointer` }}
      align="center"
      onClick={() => {
        navigate(`/ingredients/${ingredient.id}`)
      }}
    >
      <Flex gap="2" direction="column">
        <Heading size="3" weight="medium">
          {ingredient.name}
          {ingredient.tracking_type === `count` &&
            ` (` + ingredient.count + `)`}
        </Heading>
        <Text size="2" color="gray">
          Expires {timeAgo.format(new Date(expiredDate))}
        </Text>
      </Flex>
      <Flex direction="column" gap="1" ml="auto">
        {ingredient.tracking_type === `fill_level` && (
          <Box style={{ minWidth: 100 }}>
            <Slider
              variant="soft"
              className="no-thumb"
              value={[ingredient.fill_level]}
            />
          </Box>
        )}
        {isRunningLow(ingredient) && (
          <Box>
            <Badge color="crimson" variant="solid">
              Running Low
            </Badge>
          </Box>
        )}
        {isExpiredSoon(ingredient) && (
          <Box>
            <Badge color="crimson" variant="solid">
              Replace soon
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
