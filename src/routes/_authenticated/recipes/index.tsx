import { createFileRoute, Link } from "@tanstack/react-router"
import { useLiveQuery, eq, count, max } from "@tanstack/react-db"
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

function Recipes() {
  // Join recipes with made_it comments to compute times_made and last_made_at
  // Orders by most recently made, then by times made count
  const { data: recipes } = useLiveQuery((q) => {
    const madeItComments = q
      .from({ c: recipeCommentsCollection })
      .where(({ c }) => eq(c.made_it, true))

    return q
      .from({ r: recipesCollection })
      .leftJoin({ mc: madeItComments }, ({ r, mc }) => eq(r.id, mc.recipe_id))
      .groupBy(({ r }) => [
        r.id,
        r.name,
        r.description,
        r.url,
        r.user_id,
        r.created_at,
        r.updated_at,
      ])
      .select(({ r, mc }) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        url: r.url,
        user_id: r.user_id,
        created_at: r.created_at,
        updated_at: r.updated_at,
        times_made: count(mc?.id),
        last_made_at: max(mc?.created_at),
      }))
      .orderBy(({ $selected }) => $selected.last_made_at, {
        direction: `desc`,
        nulls: `last`,
      })
      .orderBy(({ $selected }) => $selected.times_made, `desc`)
  })

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
