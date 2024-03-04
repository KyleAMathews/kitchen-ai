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
  Link as RadixLink,
  Text,
  Button,
  Slider,
  TextField,
} from "@radix-ui/themes"
import { isString } from "lodash"
import { genUUID } from "electric-sql/util"
import { lambdaFunction } from "../util"
import ExpirationDateEdit from "../components/expiration-date-edit"

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
    action = `used this`
  }
  if (key === `count`) {
    if (event.from_values.count > event.to_values.count) {
      action = `used this`
    } else {
      action = `bought more`
    }
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

function EditCountLevel({ ingredient }: { ingredient: Ingredients }) {
  const [focused, setFocused] = useState(false)
  const { db } = useElectric()!
  const {
    user: { id: user_id },
  } = useUser()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const formData = new FormData(target)
        const formProps = Object.fromEntries(formData)
        console.log({ formProps })
        const newCount = parseInt(formProps.count, 10)
        db.ingredients.update({
          data: {
            count: newCount,
            updated_at: new Date(),
          },
          where: {
            id: ingredient.id,
          },
        })
        db.ingredient_events.create({
          data: {
            id: genUUID(),
            ingredient_id: ingredient.id,
            timestamp: new Date(),
            from_values: { count: ingredient.count },
            to_values: { count: newCount },
            user_id,
          },
        })
        setFocused(false)
      }}
    >
      <Flex direction="column" gap="2">
        <Text size="2" as="label">
          Count
        </Text>
        <TextField.Input
          type="number"
          name="count"
          defaultValue={ingredient.count}
          onFocus={() => setFocused(true)}
        />
        {focused && <Button>Save</Button>}
      </Flex>
    </form>
  )
}

function EditFillLevel({ ingredient }) {
  const {
    user: { id: user_id },
  } = useUser()
  const { db } = useElectric()!
  return (
    <>
      <Flex direction="column" gap="2">
        <Text size="1">Fill Level</Text>
        <Slider
          defaultValue={[ingredient.fill_level]}
          onValueCommit={async (val) => {
            const newFillLevel = val[0] as number
            db.ingredients.update({
              data: {
                fill_level: newFillLevel,
                updated_at: new Date(),
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
    </>
  )
}

IngredientDetail.queries = queries

const diffInMonths = (date1, date2) => {
  const yearDiff = date2.getFullYear() - date1.getFullYear()
  const monthDiff = date2.getMonth() - date1.getMonth()
  return yearDiff * 12 + monthDiff
}
export default function IngredientDetail() {
  const [working, setWorking] = useState(false)
  const location = useLocation()
  const { db } = useElectric()!

  const {
    ingredient,
    events,
  }: { ingredient: Ingredients; events: Ingredient_events } = useElectricData(
    location.pathname + location.search
  )
  const [expirationDate, setExpirationDate] = useState(
    ingredient.expiration_date
  )

  console.log({ ingredient })
  // Get expired date string
  const expiredDate = new Date(ingredient.expiration_date)
  const expireDateStr = expiredDate
    .toLocaleDateString(`en-US`, {
      year: `2-digit`,
      month: `short`,
    })
    .split(` `)
    .join(` ’`)
  return (
    <Flex direction="column" gap="5">
      <RadixLink asChild size="2">
        <Link to="/ingredients">{`<`} All Ingredients</Link>
      </RadixLink>
      <Heading>{ingredient.name}</Heading>
      <Flex>
        <Text>{ingredient.description}</Text>
      </Flex>
      {ingredient.tracking_type === `count` ? (
        <EditCountLevel ingredient={ingredient} />
      ) : (
        <EditFillLevel ingredient={ingredient} />
      )}
      <ExpirationDateEdit
        expirationDate={expirationDate}
        onValueChange={setExpirationDate}
        onValueCommit={(newDate: Date) => {
          db.ingredients.update({
            data: {
              expiration_date: newDate,
            },
            where: {
              id: ingredient.id,
            },
          })
        }}
      />
      <Button
        variant="outline"
        disabled={working}
        onClick={async () => {
          setWorking(true)
          const cardDescription = {
            checklists: {
              [ingredient.grocery_section]: [ingredient.name],
            },
          }
          const response = await fetch(
            `${lambdaFunction}/create-shopping-list`,
            {
              method: `POST`,
              headers: {
                "Content-Type": `application/json`,
              },
              body: JSON.stringify(cardDescription),
            }
          )
          if (!response.ok) {
            console.log(`Network response was not ok`)
          } else {
            const data = await response.json()
            console.log(`response`, data)
            setWorking(false)
            db.ingredients.update({
              data: {
                updated_at: new Date(),
              },
              where: {
                id: ingredient.id,
              },
            })
          }
        }}
      >
        Add to shopping list
      </Button>
      {events.length > 0 && (
        <Flex direction="column" gap="3">
          <Heading size="4">Timeline</Heading>
          {events.map((event) => {
            return <Text key={event.id}>{generateEventText(event)}</Text>
          })}
        </Flex>
      )}
    </Flex>
  )
}
