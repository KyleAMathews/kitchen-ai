import { useLocation, Link } from "react-router-dom"
import { useLiveQuery } from "electric-sql/react"
import { useElectric } from "../context"
import { Electric } from "../generated/client"
import { useElectricData } from "electric-query"
import { Flex, Heading, Box, Text, Button, Separator } from "@radix-ui/themes"
import { PlusCircledIcon } from "@radix-ui/react-icons"

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
        is_reviewed: true,
      },
    }),
  }
}

Index.queries = queries

export default function Index() {
  const location = useLocation()

  const { photos, ingredients } = useElectricData(
    location.pathname + location.search
  )
  console.log({ photos, ingredients })

  return (
    <Flex direction="column" gap="5">
      <Heading>
        Spice Rack{` `}
        <Link to="/upload-photos">
          <PlusCircledIcon />
        </Link>
      </Heading>
      <Flex direction="column" gap="2">
        {ingredients.map((ingredient, i) => {
          return (
            <>
              <Text>{ingredient.name}</Text>
              {i !== ingredients.length - 1 && (
                <Separator orientation="horizontal" size="4" />
              )}
            </>
          )
        })}
      </Flex>
    </Flex>
  )
}
