import { createFileRoute, useParams } from "@tanstack/react-router"
import { useLiveQuery } from "@tanstack/react-db"
import { Heading, Flex, Text, Link as RadixLink } from "@radix-ui/themes"
import { recipesCollection } from "@/lib/collections"
import { timeAgo } from "@/lib/utils"

export const Route = createFileRoute("/_authenticated/recipes/$id")({
  component: RecipeDetail,
})

export default function RecipeDetail() {
  const { id } = useParams({ from: "/_authenticated/recipes/$id" })
  
  const { data: recipes } = useLiveQuery((q) =>
    q
      .from({ recipesCollection })
      .where(({ recipesCollection }) => q.eq(recipesCollection.id, id))
  )

  const recipe = recipes?.[0]

  if (!recipe) {
    return (
      <div className="p-6">
        <Text>Recipe not found</Text>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Flex direction="column" gap="6">
        <Heading size="6">{recipe.name}</Heading>
        
        {recipe.description && (
          <Text size="3" color="gray">{recipe.description}</Text>
        )}

        {recipe.url && (
          <Flex direction="column" gap="2">
            <Text weight="medium">Original Recipe</Text>
            <RadixLink href={recipe.url} target="_blank" rel="noopener noreferrer">
              {recipe.url}
            </RadixLink>
          </Flex>
        )}

        <Text size="2" color="gray">
          Last updated {timeAgo.format(new Date(recipe.updatedAt))}
        </Text>

        {/* TODO: Add recipe ingredients display here */}
        <Text color="gray" style={{ fontStyle: "italic" }}>
          Recipe ingredients display coming soon...
        </Text>
      </Flex>
    </div>
  )
}