import { createFileRoute, Link } from "@tanstack/react-router"
import { useLiveQuery } from "@tanstack/react-db"
import { Flex, Heading, Separator, Text } from "@radix-ui/themes"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import RecipeCard from "@/components/recipe-card"
import { recipesCollection } from "@/lib/collections"

export const Route = createFileRoute("/_authenticated/recipes/")({
  component: Recipes,
})

export default function Recipes() {
  const { data: recipes } = useLiveQuery((q) => 
    q.from({ recipesCollection }).orderBy({ updatedAt: "desc" })
  )

  return (
    <div className="p-6">
      <Flex direction="column" gap="7" pt="2">
        <Flex direction="column" gap="5">
          <Heading size="6">
            Recipes ({recipes?.length || 0})
            <Link
              to="/recipes/new"
              style={{
                height: 20,
                display: `inline-block`,
                position: `relative`,
                top: 3,
                left: 8,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <PlusCircledIcon height="20" width="20" style={{ height: 20 }} />
            </Link>
          </Heading>
        </Flex>
        
        {recipes && recipes.length > 0 ? (
          <Flex direction="column" gap="4">
            {recipes.map((recipe, i) => (
              <div key={recipe.id}>
                <RecipeCard recipe={recipe} />
                {recipes.length - 1 !== i && <Separator size="4" />}
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