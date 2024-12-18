import { isRunningLow, isExpiredSoon } from "../util"
import { Link, useNavigate } from "@tanstack/react-router"
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
import { timeAgo } from "../util"

export default function IngredientCard({ ingredient }: Ingredients) {
  console.log({ ingredient })
  const navigate = useNavigate()
  const expiredDate = new Date(ingredient.expiration_date)
  const expiresInFuture = ingredient.expiration_date > new Date()

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
