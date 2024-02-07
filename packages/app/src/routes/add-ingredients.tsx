import { useLocation, Link } from "react-router-dom"
import { Electric } from "../generated/client"
import { useElectricData } from "electric-query"
import { Flex, Heading, Box, Text, Button } from "@radix-ui/themes"
import FileUploadToS3 from "../upload-to-s3"

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

const queries = ({ db }: { db: Electric[`db`] }) => {
  return {
    photos: db.ingredients_photo_uploads.liveMany({
      orderBy: {
        created_at: `asc`,
      },
      // include: {
      // ingredients: true,
      // },
    }),
    ingredients: db.ingredients.liveMany({
      where: {
        is_reviewed: false,
      },
    }),
  }
}

AddIngredients.queries = queries

export default function AddIngredients() {
  const location = useLocation()

  const { photos, ingredients } = useElectricData(
    location.pathname + location.search
  )
  console.log({ photos, ingredients })

  function label(photo) {
    const photoIngredients = ingredients.filter(
      (i) => i.ingredients_photo_uploads_id === photo.id
    )

    if (photo.state === `uploading`) {
      return `uploading...`
    }
    if (photo.state === `ai_processing`) {
      return `Analyzing photo with AI...`
    }
    if (photo.state === `reviewing`) {
      return photoIngredients.length > 0
        ? photoIngredients.map((ingredient) => ingredient.name).join(`, `)
        : `no ingredients found`
    }
    if (photo.state === `done`) {
      return `Reviewed`
    }
  }
  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="3">
        <Heading size="6">Upload Ingredients Photos</Heading>
        <Text size="2">
          You can leave this page at any time without interrupting the uploading
          process.
        </Text>
      </Flex>
      {photos.map((photo) => {
        return (
          <Flex gap="3" align="center" key={photo.id}>
            {photo.photo_url ? (
              <Box height="8" width="9">
                {` `}
                <img
                  src={photo.photo_url}
                  style={{
                    height: `100%`,
                    filter: `grayscale(${photo.state === `done` ? `100%` : `0%`})`,
                  }}
                />
              </Box>
            ) : (
              <Box height="8" width="9" style={{ background: `gray` }} />
            )}
            <Flex direction="column" gap="2">
              <Text as="p">{label(photo)}</Text>
              <Text as="p" size="2" color="gray" weight="light">
                {formatDate(photo.created_at)}
              </Text>
            </Flex>
          </Flex>
        )
      })}
      <Flex gap="4">
        <FileUploadToS3 />
        <Button asChild disabled={ingredients.length === 0}>
          <Link
            to="/review"
            style={{ pointerEvents: ingredients.length === 0 && `none` }}
          >
            Review {ingredients.length} spices
          </Link>
        </Button>
      </Flex>
    </Flex>
  )
}
