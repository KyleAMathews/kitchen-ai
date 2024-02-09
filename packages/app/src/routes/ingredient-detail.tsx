import { useLocation, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import DatePicker from "react-date-picker"
import "react-date-picker/dist/DatePicker.css"
import {
  Electric,
  Ingredients,
  Ingredients_photo_uploads,
} from "../generated/client"
import { useElectric } from "../context"
import { useElectricData } from "electric-query"
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

const queries = ({ db, id }: { db: Electric[`db`]; id: string }) => {
  return {
    ingredient: db.ingredients.liveUnique({
      where: {
        id,
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

  const { ingredient }: { ingredient: Ingredients } = useElectricData(
    location.pathname + location.search
  )
  const [fillDate, setFillDate] = useState(ingredient.fill_date)
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
  console.log({ ingredient })
  return (
    <Flex direction="column" gap="6">
      <Heading>{ingredient.name}</Heading>
      <Flex direction="column" gap="3">
        <Text size="1" weight="bold">
          Fill Level
        </Text>
        <Flex direction="column" gap="1">
          <Slider
            defaultValue={[ingredient.fill_level]}
            onValueCommit={(val) => {
              const newFillLevel = val[0] as number
              db.ingredients.update({
                data: {
                  fill_level: newFillLevel,
                },
                where: {
                  id: ingredient.id,
                },
              })
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
      <Flex direction="column" gap="2">
        <Text>When the jar was last filled</Text>
        <DatePicker
          maxDetail="year"
          maxDate={new Date()}
          value={fillDate}
          onChange={(newDate: Date) => {
            setFillDate(newDate)
            const year = newDate.getFullYear() // Get the year
            let month = newDate.getMonth() + 1 // Get the month (add 1 because getMonth() returns 0-11)

            // Ensure month is in 'MM' format
            month = month < 10 ? `0${month}` : month

            const newDateStr = `${year}/${month}`
            db.ingredients.update({
              data: {
                fill_date: newDateStr,
              },
              where: {
                id: ingredient.id,
              },
            })
          }}
        />
      </Flex>
      <Flex>
        <Text>Expires: {expireDateStr}</Text>
      </Flex>
    </Flex>
  )
}
