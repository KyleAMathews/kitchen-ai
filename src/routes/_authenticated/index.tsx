import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { useLiveQuery, or, ilike, eq, count, max } from "@tanstack/react-db"
import { Flex, Heading, Text, TextField } from "@radix-ui/themes"
import {
  MagnifyingGlassIcon,
  PlusCircledIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons"
import {
  ingredientsCollection,
  recipesCollection,
  recipeCommentsCollection,
} from "@/lib/collections"
import RecipeCard from "@/components/recipe-card"
import IngredientCard from "@/components/ingredient-card"

export const Route = createFileRoute(`/_authenticated/`)({
  component: Dashboard,
  loader: async () => {
    await Promise.all([
      recipesCollection.preload(),
      ingredientsCollection.preload(),
      recipeCommentsCollection.preload(),
    ])
  },
})

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState(``)
  const isSearching = searchQuery.length > 0

  const { data: ingredients } = useLiveQuery((q) =>
    q
      .from({ ingredientsCollection })
      .orderBy(
        ({ ingredientsCollection }) => ingredientsCollection.updated_at,
        `desc`
      )
      .limit(3)
  )

  const { data: allIngredients } = useLiveQuery((q) =>
    q.from({ ingredientsCollection })
  )

  const { data: searchIngredients } = useLiveQuery(
    (q) =>
      isSearching
        ? q
            .from({ ingredientsCollection })
            .where(({ ingredientsCollection }) =>
              ilike(ingredientsCollection.name, `%${searchQuery}%`)
            )
        : q.from({ ingredientsCollection }),
    [searchQuery]
  )

  // Join recipes with made_it comments to compute times_made and last_made_at
  // Orders by most recently made, then by times made count
  const { data: recipes } = useLiveQuery(
    (q) => {
      const madeItComments = q
        .from({ c: recipeCommentsCollection })
        .where(({ c }) => eq(c.made_it, true))

      let query = q
        .from({ r: recipesCollection })
        .leftJoin({ mc: madeItComments }, ({ r, mc }) => eq(r.id, mc.recipe_id))

      if (isSearching) {
        query = query.where(({ r }) =>
          or(
            ilike(r.name, `%${searchQuery}%`),
            ilike(r.description, `%${searchQuery}%`)
          )
        )
      }

      return query
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
        .limit(isSearching ? 50 : 10)
    },
    [searchQuery]
  )

  const displayRecipes = recipes || []
  const displayIngredients = isSearching
    ? searchIngredients || []
    : ingredients || []

  return (
    <div className="p-6">
      <Flex direction="column" gap={isSearching ? `5` : `6`}>
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

        <Flex direction="column" gap={isSearching ? `5` : `7`}>
          {/* Recipes Section */}
          <Flex direction="column" gap={isSearching ? `3` : `6`}>
            <Heading size={isSearching ? `3` : `5`}>
              <Link
                to="/recipes"
                style={{
                  color: `inherit`,
                  textDecoration: `none`,
                  height: 20,
                  display: `inline-block`,
                }}
              >
                Recipes{!isSearching && ` (${recipes?.length || 0}) `}
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
                    color: `inherit`,
                    textDecoration: `none`,
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
                  {displayRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
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
                {isSearching ? `No results` : `Add your first recipe!`}
              </Text>
            )}
          </Flex>

          {/* Ingredients Section */}
          <Flex direction="column" gap={isSearching ? `3` : `6`}>
            <Heading size={isSearching ? `3` : `5`}>
              <Link
                to="/ingredients"
                style={{ color: `inherit`, textDecoration: `none` }}
              >
                Ingredients{!isSearching && ` (${allIngredients?.length || 0})`}
              </Link>
            </Heading>

            {displayIngredients.length > 0 ? (
              <>
                <Flex direction="column" gap="4">
                  {displayIngredients.map((ingredient) => (
                    <IngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                    />
                  ))}
                </Flex>
                {!isSearching && (
                  <Link to="/ingredients">
                    See all <ArrowRightIcon />
                  </Link>
                )}
              </>
            ) : (
              <Text color="gray">{isSearching ? `No results` : ``}</Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
}
