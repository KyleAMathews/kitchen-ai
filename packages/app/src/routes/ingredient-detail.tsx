import { useLocation, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import DatePicker from "react-date-picker"
import "react-date-picker/dist/DatePicker.css"
import { Electric, Ingredient_events, Ingredients } from "../generated/client"
import { useElectric } from "../context"
import { useElectricData } from "electric-query"
import { useUser } from "@clerk/clerk-react"
import {
  Flex,
  Heading,
  Box,
  Text,
  Button,
  Separator,
  Slider,
  Badge,
} from "@radix-ui/themes"
import { isString } from "lodash"
import { genUUID } from "electric-sql/util"
function formatDate(date) {
  const year = date.getFullYear() // Gets the year (4 digits)
  const month = date.getMonth() + 1 // Gets month, +1 because getMonth() is zero-based
  const day = date.getDate() // Gets day of the month

  // Ensures month and day are in 'MM' and 'DD' format, respectively
  const formattedMonth = month < 10 ? `0${month}` : month
  const formattedDay = day < 10 ? `0${day}` : day

  // Constructs the formatted date string
  return `${year}-${formattedMonth}-${formattedDay}`
}

function generateEventText(event) {
  const key = Object.keys(event.from_values)[0]
  let action: string
  if (key === `fill_date`) {
    action = `refilled the jar`
  }
  if (
    key === `fill_level` &&
    event.from_values.fill_level >
      (isString(event.to_values)
        ? JSON.parse(event.to_values).fill_level
        : event.to_values.fill_level)
  ) {
    action = `used some`
  }

  return `${formatDate(event.timestamp)}: ${event.users.name} ${action}`
}

const queries = ({ db, id }: { db: Electric[`db`]; id: string }) => {
  return {
    ingredient: db.ingredients.liveUnique({
      where: {
        id,
      },
    }),
    events: db.ingredient_events.liveMany({
      where: {
        ingredient_id: id,
      },
      include: {
        users: true,
      },
      orderBy: {
        timestamp: `desc`,
      },
    }),
  }
}

IngredientDetail.queries = queries

const diffInMonths = (date1, date2) => {
  const yearDiff = date2.getFullYear() - date1.getFullYear()
  const monthDiff = date2.getMonth() - date1.getMonth()
  return yearDiff * 12 + monthDiff
}
export default function IngredientDetail() {
  const location = useLocation()
  const { db } = useElectric()!
  const {
    user: { id: user_id },
  } = useUser()

  const {
    ingredient,
    events,
  }: { ingredient: Ingredients; events: Ingredient_events } = useElectricData(
    location.pathname + location.search
  )

  const [didYouFillUp, setDidYouFillUp] = useState<boolean>(false)
  // Get expired date string
  const expiredDate = new Date(ingredient.fill_date)
  expiredDate.setMonth(expiredDate.getMonth() + ingredient.shelf_life_months)
  const expireDateStr = expiredDate
    .toLocaleDateString(`en-US`, {
      year: `2-digit`,
      month: `short`,
    })
    .split(` `)
    .join(` ’`)
  return (
    <Flex direction="column" gap="6">
      <Heading>{ingredient.name}</Heading>
      <Flex>
        <Text>Expires: {expireDateStr}</Text>
      </Flex>
      <Flex direction="column" gap="3">
        <Text size="2" weight="bold">
          Fill Level
        </Text>
        <Flex direction="column" gap="1">
          <Slider
            defaultValue={[ingredient.fill_level]}
            onValueCommit={async (val) => {
              const newFillLevel = val[0] as number
              db.ingredients.update({
                data: {
                  fill_level: newFillLevel,
                },
                where: {
                  id: ingredient.id,
                },
              })
              const halfHourAgo = new Date()
              halfHourAgo.setMinutes(halfHourAgo.getMinutes() - 30)

              const recentEvents = await db.ingredient_events.findMany({
                where: {
                  ingredient_id: ingredient.id,
                  timestamp: {
                    gte: halfHourAgo,
                  },
                },
              })

              const recentEvent = recentEvents.find(
                (e) => Object.keys(e.from_values)[0] === `fill_level`
              )
              console.log({ recentEvent })

              let didGoUp = false

              if (recentEvent) {
                if (recentEvent.from_values.fill_level < newFillLevel) {
                  didGoUp = true
                  db.ingredient_events.delete({
                    where: {
                      id: recentEvent?.id,
                    },
                  })
                } else {
                  db.ingredient_events.update({
                    data: {
                      to_values: { fill_level: newFillLevel },
                    },
                    where: {
                      id: recentEvent?.id,
                    },
                  })
                }
              } else {
                if (ingredient.fill_level < newFillLevel) {
                  didGoUp = true
                } else {
                  db.ingredient_events.create({
                    data: {
                      id: genUUID(),
                      ingredient_id: ingredient.id,
                      timestamp: new Date(),
                      from_values: { fill_level: ingredient.fill_level },
                      to_values: { fill_level: newFillLevel },
                      user_id,
                    },
                  })
                }
              }

              setDidYouFillUp(didGoUp)
            }}
          />
          <Flex justify="between">
            <Text size="1" color="gray">
              0%
            </Text>
            <Text size="1" color="gray">
              100%
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {didYouFillUp && (
        <Flex
          direction="column"
          size="2"
          p="5"
          gap="3"
          style={{
            background: `var(--gray-a2)`,
            borderRadius: `var(--radius-3)`,
          }}
        >
          <Text>
            It looks like you just bought some new <em>{ingredient.name}</em>?
            Confirm and we'll reset the expiration date. If not, just move the
            Fill Level back down to where it was.
          </Text>
          <Button
            onClick={async () => {
              const newDate = new Date()
              const year = newDate.getFullYear() // Get the year
              let month = newDate.getMonth() + 1 // Get the month (add 1 because getMonth() returns 0-11)

              // Ensure month is in 'MM' format
              month = month < 10 ? `0${month}` : month

              const newDateStr = `${year}/${month}`
              await db.ingredients.update({
                data: {
                  fill_date: newDateStr,
                },
                where: {
                  id: ingredient.id,
                },
              })
              await db.ingredient_events.create({
                data: {
                  id: genUUID(),
                  ingredient_id: ingredient.id,
                  timestamp: new Date(),
                  from_values: { fill_date: ingredient.fill_date },
                  to_values: { fill_date: newDateStr },
                  user_id,
                },
              })

              setDidYouFillUp(false)
            }}
          >
            Confirm
          </Button>
        </Flex>
      )}
      {events.length > 0 && (
        <Flex direction="column" gap="3">
          <Heading size="4">Timeline</Heading>
          {events.map((event) => {
            return <Text>{generateEventText(event)}</Text>
          })}
        </Flex>
      )}
    </Flex>
  )
}
