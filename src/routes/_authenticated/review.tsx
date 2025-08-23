import { createFileRoute } from "@tanstack/react-router"
import { Heading, Flex, Text, Button } from "@radix-ui/themes"
import { CheckIcon } from "@radix-ui/react-icons"

export const Route = createFileRoute(`/_authenticated/review`)({
  component: Review,
})

export default function Review() {
  return (
    <div className="p-6">
      <Flex
        direction="column"
        gap="6"
        align="center"
        style={{ textAlign: `center`, minHeight: `60vh` }}
        justify="center"
      >
        <CheckIcon height="64" width="64" color="gray" />

        <Heading size="6">Review AI Suggestions</Heading>

        <Text color="gray" style={{ maxWidth: 400 }}>
          Review and approve ingredients that our AI has identified from your
          uploaded photos.
        </Text>

        <Button disabled variant="soft">
          Review Feature Coming Soon
        </Button>

        <Text size="2" color="gray">
          This feature is being migrated from the original Kitchen AI
          implementation.
        </Text>
      </Flex>
    </div>
  )
}
