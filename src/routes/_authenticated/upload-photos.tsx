import { createFileRoute } from "@tanstack/react-router"
import { Heading, Flex, Text, Button } from "@radix-ui/themes"
import { CameraIcon } from "@radix-ui/react-icons"

export const Route = createFileRoute(`/_authenticated/upload-photos`)({
  component: UploadPhotos,
  ssr: false,
})

export default function UploadPhotos() {
  return (
    <div className="p-6">
      <Flex
        direction="column"
        gap="6"
        align="center"
        style={{ textAlign: `center`, minHeight: `60vh` }}
        justify="center"
      >
        <CameraIcon height="64" width="64" color="gray" />

        <Heading size="6">Upload Photos</Heading>

        <Text color="gray" style={{ maxWidth: 400 }}>
          Take photos of your ingredients and we'll use AI to identify them and
          add them to your kitchen inventory.
        </Text>

        <Button disabled variant="soft">
          Photo Upload Coming Soon
        </Button>

        <Text size="2" color="gray">
          This feature is being migrated from the original Kitchen AI
          implementation.
        </Text>
      </Flex>
    </div>
  )
}
