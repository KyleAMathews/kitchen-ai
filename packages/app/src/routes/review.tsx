import { useLocation, useNavigate } from "react-router-dom"
import { useElectric } from "../context"
import { Electric } from "../generated/client"
import { useElectricData } from "electric-query"
import {
  Flex,
  Heading,
  Box,
  Text,
  Separator,
  Slider,
  Button,
} from "@radix-ui/themes"

const diffInMonths = (date1, date2) => {
  const yearDiff = date2.getFullYear() - date1.getFullYear()
  const monthDiff = date2.getMonth() - date1.getMonth()
  return yearDiff * 12 + monthDiff
}

function generateDateMonthsAgo(monthsAgo) {
  const currentDate = new Date() // Get the current date
  currentDate.setMonth(currentDate.getMonth() - monthsAgo) // Subtract the specified number of months

  const year = currentDate.getFullYear() // Get the year
  let month = currentDate.getMonth() + 1 // Get the month (add 1 because getMonth() returns 0-11)

  // Ensure month is in 'MM' format
  month = month < 10 ? `0${month}` : month

  return `${year}/${month}` // Return the formatted date string
}

function ReviewSpice({ spice }) {
  const { db } = useElectric()!
  const age_months = diffInMonths(new Date(spice.fill_date), new Date())
  // console.log({ age_months })
  return (
    <Flex gap="5" width="100%">
      <Box style={{ width: 300 }}>
        <Heading size="3">{spice.name}</Heading>
      </Box>
      <Flex direction="column" gap="5" width="100%" grow="1">
        <Flex direction="column" gap="2">
          <Text size="1" weight="bold">
            Fill-level
          </Text>
          <Flex direction="column" gap="1">
            <Slider
              defaultValue={[spice.fill_level]}
              onValueCommit={(val) => {
                const newFillLevel = val[0] as number
                console.log({ newFillLevel })
                db.ingredients.update({
                  data: {
                    fill_level: newFillLevel,
                  },
                  where: {
                    id: spice.id,
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
          <Text size="1" weight="bold">
            Age
          </Text>
          <Flex direction="column" gap="1">
            <Slider
              defaultValue={[100 - age_months * 2]}
              step={2}
              onValueCommit={(val) => {
                console.log(`onValueCommit`, val[0])
                const noZeroVal = val[0] === 0 ? 0.1 : val[0]
                const newAge = Math.round(50 - noZeroVal / 2)
                const newFillDate = generateDateMonthsAgo(newAge)
                console.log({ newAge, newFillDate })
                db.ingredients.update({
                  data: {
                    fill_date: newFillDate,
                  },
                  where: {
                    id: spice.id,
                  },
                })
              }}
            />
            <Flex justify="between">
              <Text size="1" color="gray">
                4 years
              </Text>
              <Text size="1" color="gray">
                new
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

const queries = ({ db }: { db: Electric[`db`] }) => {
  return {
    photos: db.ingredients_photo_uploads.liveMany({
      orderBy: {
        created_at: `asc`,
      },
    }),
    ingredients: db.ingredients.liveMany({
      orderBy: {
        name: `asc`,
      },
      where: {
        is_reviewed: false,
      },
    }),
  }
}

Review.queries = queries

export default function Review() {
  const { db } = useElectric()!
  const navigate = useNavigate()
  const location = useLocation()
  const { photos, ingredients } = useElectricData(
    location.pathname + location.search
  )

  return (
    <Flex direction="column" gap="8">
      <Flex direction="column" gap="4">
        <Heading size="6">Review new ingredients</Heading>
        <Text size="2">
          Once done reviewing Kitchen.ai's estimates, click save to add the
          spice jars to your Kitchen!
        </Text>
      </Flex>
      <Flex direction="column" gap="8">
        {ingredients.map((spice, i) => {
          return (
            <>
              <ReviewSpice spice={spice} key={spice.id} />
              {i !== ingredients.length - 1 && (
                <Separator orientation="horizontal" size="4" />
              )}
            </>
          )
        })}
      </Flex>
      <Button
        onClick={async () => {
          navigate(`/`)
          Promise.all([
            db.ingredients_photo_uploads.updateMany({
              data: {
                state: `done`,
              },
              where: {
                state: `reviewing`,
              },
            }),
            db.ingredients.updateMany({
              data: {
                is_reviewed: true,
              },
              where: {
                is_reviewed: false,
              },
            }),
          ])
        }}
      >
        Save
      </Button>
    </Flex>
  )
}
