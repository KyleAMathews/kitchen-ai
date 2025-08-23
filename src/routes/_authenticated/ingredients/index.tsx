import { createFileRoute } from "@tanstack/react-router"
import { useLiveQuery } from "@tanstack/react-db"
import { Heading, Flex, Separator, Text } from "@radix-ui/themes"
import { ingredientsCollection } from "@/lib/collections"
import IngredientCard from "@/components/ingredient-card"

export const Route = createFileRoute(`/_authenticated/ingredients/`)({
  component: IngredientsList,
  loader: async () => {
    await ingredientsCollection.preload()
  },
})

export default function IngredientsList() {
  const { data: ingredients } = useLiveQuery((q) =>
    q
      .from({ ingredientsCollection })
      .orderBy(({ ingredientsCollection }) => ingredientsCollection.name)
  )

  return (
    <div className="p-6">
      <Flex direction="column" gap="7" pt="2">
        <Heading>Ingredients ({ingredients?.length || 0})</Heading>
        {ingredients && ingredients.length > 0 ? (
          <Flex direction="column" gap="4">
            {ingredients.map((ingredient, i: number) => {
              if (ingredient.is_reviewed) {
                return (
                  <div key={ingredient.id}>
                    <IngredientCard ingredient={ingredient} />
                  </div>
                )
              }
              return null
            })}
          </Flex>
        ) : (
          <Text color="gray">
            No ingredients yet. Start by uploading photos!
          </Text>
        )}
      </Flex>
    </div>
  )
}
