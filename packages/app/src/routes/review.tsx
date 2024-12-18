import { useState } from "react"
import * as React from "react"
import { Link, useNavigate, useLocation } from "@tanstack/react-router"
import { useElectric } from "../context"
import { Electric } from "../generated/client"
import { useElectricData } from "electric-query"
import { TrashIcon } from "@radix-ui/react-icons"
import {
  Flex,
  Heading,
  Box,
  Text,
  Separator,
  Slider,
  Button,
  Badge,
} from "@radix-ui/themes"
import { cosineSimilarity } from "../util"
import ExpirationDateEdit from "../components/expiration-date-edit"

function ReviewSpice({ spice, allIngredients }) {
  const [expirationDate, setExpirationDate] = useState(spice.expiration_date)
  const { db } = useElectric()!

  // Check if there's any ingredients that we've probably uploaded before.
  const similarIngredient = allIngredients
    .map((i) => {
      if (spice.id !== i.id) {
        const distance = cosineSimilarity(
          JSON.parse(spice.embedding),
          JSON.parse(i.embedding)
        )
        return { distance, name: i.name, id: i.id }
      }
    })
    .filter((i) => i?.distance > 0.7)

  return (
    <Flex direction="column" gap="4">
      {similarIngredient.length > 0 && (
        <Badge color="ruby">
          Duplicate of
          <Link to={`/ingredients/${similarIngredient[0].id}`}>
            {similarIngredient[0].name}
          </Link>
          ?
        </Badge>
      )}
      <Box>
        <Heading size="3">
          {spice.name}
          {` `}
          <TrashIcon
            style={{
              position: `relative`,
              top: 2,
            }}
            onClick={() => {
              db.ingredients.delete({
                where: {
                  id: spice.id,
                },
              })
            }}
          />
        </Heading>
      </Box>
      <Flex direction="column" gap="2">
        <Text size="1">Fill Level</Text>
        <Flex direction="column" gap="1">
          <Slider
            defaultValue={[spice.fill_level]}
            onValueCommit={(val) => {
              const newFillLevel = val[0] as number
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
      <ExpirationDateEdit
        expirationDate={expirationDate}
        onValueChange={setExpirationDate}
        onValueCommit={(newDate: Date) => {
          db.ingredients.update({
            data: {
              expiration_date: newDate,
            },
            where: {
              id: spice.id,
            },
          })
        }}
      />
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
    }),
  }
}

Review.queries = queries

export default function Review() {
  // const { db } = useElectric()!
  const navigate = useNavigate()
  const location = useLocation()
  // const { photos, ingredients }: { photos: Ingredients_photo_uploads[]; ingredients: Ingredients[] } = useElectricData(
  //   location.pathname + location.search
  // )
  const photos: Ingredients_photo_uploads[] = []
  const ingredients: Ingredients[] = []

  return (
    <Flex direction="column" gap="7" pt="2">
      <Flex direction="column" gap="4">
        <Heading size="6">Review new ingredients</Heading>
        <Text size="2" color="gray">
          Once done reviewing Kitchen.ai's estimates, click save to add the
          spice jars to your Kitchen!
        </Text>
      </Flex>
      <Flex direction="column" gap="5">
        {ingredients
          .filter((i) => i.is_reviewed === false)
          .map((spice, i) => {
            return (
              <>
                <ReviewSpice
                  spice={spice}
                  key={spice.id}
                  allIngredients={ingredients}
                />
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
            // db.ingredients_photo_uploads.updateMany({
            //   data: {
            //     state: `done`,
            //   },
            //   where: {
            //     state: `reviewing`,
            //   },
            // }),
            // db.ingredients.updateMany({
            //   data: {
            //     is_reviewed: true,
            //   },
            //   where: {
            //     is_reviewed: false,
            //   },
            // }),
          ])
        }}
      >
        Save
      </Button>
    </Flex>
  )
}
