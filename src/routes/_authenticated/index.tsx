import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useLiveQuery } from "@tanstack/react-db"
import {
  Flex,
  Heading,
  Text,
  Button,
  Separator,
  TextField,
} from "@radix-ui/themes"
import {
  MagnifyingGlassIcon,
  PlusCircledIcon,
  ArrowRightIcon,
  CameraIcon,
} from "@radix-ui/react-icons"
import { ingredientsCollection, recipesCollection } from "@/lib/collections"
import RecipeCard from "@/components/recipe-card"
import IngredientCard from "@/components/ingredient-card"

export const Route = createFileRoute("/_authenticated/")({
  component: Dashboard,
  ssr: false,
  loader: async () => {
    await Promise.all([
      recipesCollection.preload(),
      ingredientsCollection.preload(),
    ])
  },
})

function Dashboard() {
  console.log(`dashboard`)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  // Get all recipes and ingredients for dashboard
  const { data: recipes } = useLiveQuery((q) =>
    q
      .from({ recipesCollection })
      .orderBy(({ recipesCollection }) => recipesCollection.updatedAt)
      .limit(3)
  )

  const { data: ingredients } = useLiveQuery((q) =>
    q
      .from({ ingredientsCollection })
      .orderBy(
        ({ ingredientsCollection }) => ingredientsCollection.updatedAt,
        `desc`
      )
      .limit(3)
  )

  const { data: allRecipes } = useLiveQuery((q) =>
    q.from({ recipesCollection })
  )

  const { data: allIngredients } = useLiveQuery((q) =>
    q.from({ ingredientsCollection })
  )

  // Search functionality
  const { data: searchRecipes } = useLiveQuery(
    (q) =>
      searchQuery.length > 0
        ? q
            .from({ recipesCollection })
            .where(({ recipesCollection }) =>
              q.or(
                q.like(recipesCollection.name, `%${searchQuery}%`),
                q.like(recipesCollection.description, `%${searchQuery}%`)
              )
            )
        : // .limit(3)
          q.from({ recipesCollection }),
    [searchQuery]
  )

  const { data: searchIngredients } = useLiveQuery(
    (q) =>
      searchQuery.length > 0
        ? q
            .from({ ingredientsCollection })
            .where(({ ingredientsCollection }) =>
              q.like(ingredientsCollection.name, `%${searchQuery}%`)
            )
        : // .limit(3)
          q.from({ ingredientsCollection }),
    [searchQuery]
  )

  const isSearching = searchQuery.length > 0
  const displayRecipes = isSearching ? searchRecipes || [] : recipes || []
  const displayIngredients = isSearching
    ? searchIngredients || []
    : ingredients || []

  return (
    <div className="p-6">
      <Flex direction="column" gap={isSearching ? "5" : "6"}>
        {/* Search */}
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField.Root
            placeholder="Search Kitchen"
            type="search"
            autoComplete="off"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </form>

        <Flex direction="column" gap={isSearching ? "5" : "7"}>
          {/* Recipes Section */}
          <Flex direction="column" gap={isSearching ? "3" : "6"}>
            <Heading size={isSearching ? "3" : "5"}>
              <Link
                to="/recipes"
                style={{
                  color: `inherit`,
                  textDecoration: `none`,
                  height: 20,
                  display: `inline-block`,
                }}
              >
                Recipes{!isSearching && ` (${allRecipes?.length || 0}) `}
              </Link>
              {!isSearching && (
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
                  <PlusCircledIcon
                    height="20"
                    width="20"
                    style={{ height: 20 }}
                  />
                </Link>
              )}
            </Heading>

            {displayRecipes.length > 0 ? (
              <>
                <Flex direction="column" gap="4">
                  {displayRecipes.map((recipe, i) => (
                    <div key={recipe.id}>
                      <RecipeCard recipe={recipe} />
                      {displayRecipes.length - 1 !== i && (
                        <Separator size="4" />
                      )}
                    </div>
                  ))}
                </Flex>
                {!isSearching && (
                  <Link to="/recipes">
                    Browse all <ArrowRightIcon />
                  </Link>
                )}
              </>
            ) : (
              <Text color="gray">
                {isSearching ? "No results" : "Add your first recipe!"}
              </Text>
            )}
          </Flex>

          {/* Ingredients Section */}
          <Flex direction="column" gap={isSearching ? "3" : "6"}>
            <Heading size={isSearching ? "3" : "5"}>
              <Link
                to="/ingredients"
                style={{ color: `inherit`, textDecoration: `none` }}
              >
                Ingredients{!isSearching && ` (${allIngredients?.length || 0})`}
              </Link>
              {!isSearching && (
                <Link
                  to="/upload-photos"
                  style={{
                    height: 20,
                    display: `inline-block`,
                    position: `relative`,
                    top: 3,
                    left: 4,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <CameraIcon height="20" width="20" />
                </Link>
              )}
            </Heading>

            {displayIngredients.length > 0 ? (
              <>
                <Flex direction="column" gap="4">
                  {displayIngredients.map((ingredient, i) => (
                    <div key={ingredient.id}>
                      <IngredientCard ingredient={ingredient} />
                      {displayIngredients.length - 1 !== i && (
                        <Separator size="4" />
                      )}
                    </div>
                  ))}
                </Flex>
                {!isSearching && (
                  <Link to="/ingredients">
                    See all <ArrowRightIcon />
                  </Link>
                )}
              </>
            ) : (
              <Text color="gray">
                {isSearching ? "No results" : "Add ingredients to get started!"}
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
}
