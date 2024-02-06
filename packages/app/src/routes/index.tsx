import { useLocation } from "react-router-dom"
import { useLiveQuery } from "electric-sql/react"
import { useElectric } from "../context"
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
    photos: db.spice_jar_photos_upload.liveMany({
      orderBy: {
        created_at: `asc`,
      },
    }),
  }
}

Index.queries = queries

export default function Index() {
  const location = useLocation()

  const { photos } = useElectricData(location.pathname + location.search)
  console.log({ photos })
  const spicesCount = new Set()
  photos.forEach((photo) => {
    photo.extracted_data?.forEach((spice) => {
      spicesCount.add(spice.name)
    })
  })

  const label = (photo) =>
    !photo.uploaded_at
      ? `uploading...`
      : !photo.ai_processing_duration_sec
        ? `Analyzing photo with AI...`
        : photo.extracted_data.length > 0
          ? photo.extracted_data?.map((spice) => spice.name).join(`, `)
          : `no spices found`
  return (
    <Flex direction="column" gap="6">
      <Heading size="6">My Photos</Heading>
      {photos.map((photo) => {
        return (
          <Flex gap="3" align="center" key={photo.id}>
            {photo.photo_url ? (
              <Box height="8" width="9">
                {` `}
                <img src={photo.photo_url} style={{ height: `100%` }} />
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
        <Button>Review {spicesCount.size} spices</Button>
      </Flex>
    </Flex>
  )
}
