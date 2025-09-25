import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import {
  Heading,
  Flex,
  Text,
  Button,
  TextArea,
  TextField,
} from "@radix-ui/themes"
import { UpdateIcon } from "@radix-ui/react-icons"
import { recipesCollection } from "@/lib/collections"

export const Route = createFileRoute(`/_authenticated/recipes/new`)({
  component: NewRecipe,
  loader: async () => {
    return recipesCollection.preload()
  },
})

function Working({
  isWorking,
  style,
}: {
  isWorking: boolean
  style?: React.CSSProperties
}) {
  if (isWorking) {
    return (
      <UpdateIcon style={style} height="14" width="14" className="icon-spin" />
    )
  } else {
    return null
  }
}

function NewRecipe() {
  const navigate = useNavigate()
  const [url, setUrl] = useState(``)
  const [pastedText, setPastedText] = useState(``)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(``)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim() && !pastedText.trim()) {
      setError(`Please provide either a URL or paste recipe text`)
      return
    }

    setIsProcessing(true)
    setError(``)

    try {
      // Create a placeholder recipe with URL and/or pastedText as metadata
      const recipeId = crypto.randomUUID()
      const insertResult = recipesCollection.insert(
        {
          id: recipeId,
          name: `Processing...`,
          description: `AI processing in progress`,
          url: url || ``,
          user_id: ``, // This will be set by the backend
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          metadata: { url, pastedText },
        }
      )

      // Wait for the insert to persist
      await insertResult.isPersisted.promise

      navigate({ to: `/recipes/$id`, params: { id: recipeId } })
    } catch (err) {
      console.error(`Recipe processing error:`, err)
      setError((err as Error).message || `Failed to process recipe`)
      setIsProcessing(false)
    }
  }

  return (
    <div className="p-6">
      <Flex direction="column" gap="6">
        <Heading size="6">
          Add New Recipe <Working isWorking={isProcessing} />
        </Heading>

        <Text color="gray">
          Paste a recipe from any website and we'll automatically extract the
          ingredients and details using AI.
        </Text>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="2">
              <Text as="label" weight="medium">
                URL
              </Text>
              <TextField.Root
                placeholder="https://example.com/recipe"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Flex>

            <Flex direction="column" gap="2">
              <Text as="label" weight="medium">
                Copy/Paste recipe text (including Recipe title) and Kitchen.ai
                will extract the ingredients
              </Text>
              <TextArea
                placeholder="Paste your recipe here..."
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                rows={10}
                style={{ minHeight: 200 }}
              />
            </Flex>

            {error && (
              <Text color="crimson" size="2">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              disabled={isProcessing || (!url.trim() && !pastedText.trim())}
              style={{ alignSelf: `flex-start` }}
            >
              {isProcessing ? `Processing...` : `Add Recipe`}
            </Button>
          </Flex>
        </form>
      </Flex>
    </div>
  )
}
