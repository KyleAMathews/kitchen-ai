import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { Heading, Flex, Text, Button, TextArea } from "@radix-ui/themes"
import { recipesCollection } from "@/lib/collections"
import { trpc } from "@/lib/trpc-client"

export const Route = createFileRoute("/_authenticated/recipes/new")({
  component: NewRecipe,
})

export default function NewRecipe() {
  const navigate = useNavigate()
  const [pastedText, setPastedText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!pastedText.trim()) {
      setError("Please paste a recipe to process")
      return
    }

    setIsProcessing(true)
    setError("")

    try {
      // Create a placeholder recipe first
      const recipeId = crypto.randomUUID()
      recipesCollection.insert({
        id: recipeId,
        name: "Processing...",
        description: "AI processing in progress",
        url: "",
        userId: "", // This will be set by the backend
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      // Process the recipe with AI
      const result = await trpc.ai.processRecipe.mutate({
        pasted: pastedText,
        recipeId,
      })

      // Update the recipe with processed data
      await trpc.recipes.processAndUpdate.mutate({
        recipeId,
        name: result.recipe.name,
        description: result.recipe.description,
        ingredients: result.ingredients.map(ing => ({
          listing: ing.listing,
          extracted_name: ing.extracted_name,
          embedding: ing.embedding,
          grocery_section: ing.grocery_section as any,
        })),
      })

      // Navigate to the new recipe
      navigate({ to: "/recipes/$id", params: { id: recipeId } })
    } catch (err: any) {
      console.error("Recipe processing error:", err)
      setError(err.message || "Failed to process recipe")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="p-6">
      <Flex direction="column" gap="6">
        <Heading size="6">Add New Recipe</Heading>
        
        <Text color="gray">
          Paste a recipe from any website and we'll automatically extract the ingredients and details using AI.
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
              style={{ alignSelf: "flex-start" }}
            >
              {isProcessing ? "Processing..." : "Process Recipe"}
            </Button>
          </Flex>
        </form>
      </Flex>
    </div>
  )
}