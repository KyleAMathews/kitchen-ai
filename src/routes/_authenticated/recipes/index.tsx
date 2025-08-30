import { createFileRoute, Link } from "@tanstack/react-router"
import { useLiveQuery } from "@tanstack/react-db"
import { Flex, Heading, Text } from "@radix-ui/themes"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import RecipeCard from "@/components/recipe-card"
import { recipesCollection, recipeCommentsCollection } from "@/lib/collections"

export const Route = createFileRoute(`/_authenticated/recipes/`)({
  component: Recipes,
  loader: async () => {
    await Promise.all([
      recipesCollection.preload(),
      recipeCommentsCollection.preload(),
    ])
  },
})

export default function Recipes() {
  const { data: recipes } = useLiveQuery((q) => q.from({ recipesCollection }))

  return (
    <div className="p-6">
      <Flex direction="column" gap="7" pt="2">
        <Flex direction="column" gap="5">
          <Heading size="6">
            <Flex gap="1">
              Recipes ({recipes?.length || 0})
              <Link to="/recipes/new">
                <PlusCircledIcon
                  height="20"
                  width="20"
                  style={{ height: 20 }}
                />
              </Link>
            </Flex>
          </Heading>
        </Flex>

        {recipes && recipes.length > 0 ? (
          <Flex direction="column" gap="4">
            {recipes.map((recipe) => (
              <div key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </Flex>
        ) : (
          <Text color="gray">No recipes yet. Create your first one!</Text>
        )}
      </Flex>
    </div>
  )
}
