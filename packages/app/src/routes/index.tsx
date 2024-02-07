import { useLocation, Link } from "react-router-dom"
import { useLiveQuery } from "electric-sql/react"
import { useElectric } from "../context"
import { Electric } from "../generated/client"
import { useElectricData } from "electric-query"
import { Flex, Heading, Box, Text, Button, Separator } from "@radix-ui/themes"
import { PlusCircledIcon, ArrowRightIcon } from "@radix-ui/react-icons"

const queries = ({ db }: { db: Electric[`db`] }) => {
  return {
    photos: db.ingredients_photo_uploads.liveMany({
      where: {
        state: {
          equals: `reviewing`,
        },
      },
    }),
    ingredients: db.ingredients.liveMany({
      orderBy: {
        name: `asc`,
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
      {photos && (
        <Button variant="soft">
          <Link
            to="/review"
            style={{ textDecoration: `none`, color: `inherit` }}
          >
            Review {ingredients.filter((i) => i.is_reviewed === false).length}
            {` `}
            new ingredients{` `}
            <ArrowRightIcon
              width="16"
              height="16"
              style={{ position: `relative`, top: 1 }}
            />
          </Link>
        </Button>
      )}
      <Flex direction="column" gap="2">
        {ingredients.map((ingredient, i) => {
          if (ingredient.is_reviewed) {
            return (
              <>
                <Text>{ingredient.name}</Text>
                {i !== ingredients.length - 1 && (
                  <Separator orientation="horizontal" size="4" />
                )}
              </>
            )
          }
        })}
      </Flex>
    </Flex>
  )
}
