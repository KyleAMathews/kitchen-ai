import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { Heading, Flex, Text, Button, TextArea } from "@radix-ui/themes"
import { recipesCollection } from "@/lib/collections"

export const Route = createFileRoute(`/_authenticated/recipes/new`)({
  component: NewRecipe,
  ssr: false,
  loader: async () => {
    return recipesCollection.preload()
  },
})

export default function NewRecipe() {
  const navigate = useNavigate()
  const [pastedText, setPastedText] = useState(``)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(``)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!pastedText.trim()) {
      setError(`Please paste a recipe to process`)
      return
    }

    setIsProcessing(true)
    setError(``)

    try {
      // Create a placeholder recipe with pastedText as metadata
      const recipeId = crypto.randomUUID()
      const insertResult = recipesCollection.insert(
        {
          id: recipeId,
          name: `Processing...`,
          description: `AI processing in progress`,
          url: ``,
          userId: ``, // This will be set by the backend
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          metadata: { pastedText },
        }
      )

      console.log(1)

      // Wait for the insert to persist
      await insertResult.isPersisted.promise
      console.log(2)

      // Subscribe to changes for this specific recipe
      const unsubscribe = recipesCollection.subscribeChanges((recipe) => {
        console.log(3)
        console.log({ recipe })
        // Check if the recipe has been processed (name changed from "Processing...")
        if (recipe && recipe.name !== `Processing...`) {
          console.log(4)
          unsubscribe()
          // Navigate to the recipe page
          navigate({ to: `/recipes/$id`, params: { id: recipeId } })
        }
      })

      // Set a timeout in case processing takes too long
      setTimeout(() => {
        unsubscribe()
        if (isProcessing) {
          setError(
            `Recipe processing is taking longer than expected. You can check back later.`
          )
          setIsProcessing(false)
        }
      }, 60000) // 60 second timeout
    } catch (err: any) {
      console.error(`Recipe processing error:`, err)
      setError(err.message || `Failed to process recipe`)
      setIsProcessing(false)
    }
  }

  return (
    <div className="p-6">
      <Flex direction="column" gap="6">
        <Heading size="6">Add New Recipe</Heading>

        <Text color="gray">
          Paste a recipe from any website and we'll automatically extract the
          ingredients and details using AI.
        </Text>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="2">
              <Text weight="medium">Recipe Text</Text>
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
              disabled={isProcessing || !pastedText.trim()}
              style={{ alignSelf: `flex-start` }}
            >
              {isProcessing ? `Processing...` : `Process Recipe`}
            </Button>
          </Flex>
        </form>
      </Flex>
    </div>
  )
}
