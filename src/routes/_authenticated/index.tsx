import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useMemo } from "react"
import { useLiveQuery, eq, ilike } from "@tanstack/react-db"
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
  tagsCollection,
  recipeTagsCollection,
  ingredientTagsCollection,
} from "@/lib/collections"
import RecipeCard from "@/components/recipe-card"
import IngredientCard from "@/components/ingredient-card"
import { recipeCardsCollection } from "@/lib/derived-collections"

export const Route = createFileRoute(`/_authenticated/`)({
  component: Dashboard,
  // Search lives in the URL so tag badges can link straight to their results,
  // and so a search can be shared/bookmarked and survives back/forward.
  validateSearch: (search: Record<string, unknown>): { q?: string } => {
    const q = typeof search.q === `string` ? search.q : undefined
    return q ? { q } : {}
  },
  loader: async () => {
    await Promise.all([
      recipesCollection.preload(),
      ingredientsCollection.preload(),
      recipeCommentsCollection.preload(),
      tagsCollection.preload(),
      recipeTagsCollection.preload(),
      ingredientTagsCollection.preload(),
    ])
  },
})

function Dashboard() {
  const { q } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const searchQuery = q ?? ``
  const isSearching = searchQuery.length > 0

  // `replace` so typing doesn't fill up the history stack
  const setSearchQuery = (next: string) => {
    navigate({ search: next ? { q: next } : {}, replace: true })
  }

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

  const query = searchQuery.trim().toLowerCase()

  const { data: recipeTagMatches } = useLiveQuery(
    (q) =>
      isSearching
        ? q
            .from({ link: recipeTagsCollection })
            .innerJoin({ tag: tagsCollection }, ({ link, tag }) =>
              eq(link.tag_id, tag.id)
            )
            .where(({ tag }) => ilike(tag.name, `%${query}%`))
            .select(({ link }) => ({ entity_id: link.recipe_id }))
        : undefined,
    [isSearching, query]
  )
  const { data: ingredientTagMatches } = useLiveQuery(
    (q) =>
      isSearching
        ? q
            .from({ link: ingredientTagsCollection })
            .innerJoin({ tag: tagsCollection }, ({ link, tag }) =>
              eq(link.tag_id, tag.id)
            )
            .where(({ tag }) => ilike(tag.name, `%${query}%`))
            .select(({ link }) => ({ entity_id: link.ingredient_id }))
        : undefined,
    [isSearching, query]
  )
  const taggedRecipeIds = useMemo(
    () => new Set((recipeTagMatches ?? []).map((match) => match.entity_id)),
    [recipeTagMatches]
  )
  const taggedIngredientIds = useMemo(
    () => new Set((ingredientTagMatches ?? []).map((match) => match.entity_id)),
    [ingredientTagMatches]
  )

  const { data: recipes } = useLiveQuery(recipeCardsCollection)

  // Search matches a recipe's name, description, or any of its tag names
  const displayRecipes = useMemo(() => {
    const list = recipes ?? []
    if (!isSearching) return list.slice(0, 10)

    return list
      .filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(query) ||
          (recipe.description ?? ``).toLowerCase().includes(query) ||
          taggedRecipeIds.has(recipe.id)
      )
      .slice(0, 50)
  }, [recipes, isSearching, query, taggedRecipeIds])

  // Search matches an ingredient's name or any of its tag names
  const displayIngredients = useMemo(() => {
    if (!isSearching) return ingredients ?? []

    return (allIngredients ?? []).filter(
      (ingredient) =>
        ingredient.name.toLowerCase().includes(query) ||
        taggedIngredientIds.has(ingredient.id)
    )
  }, [ingredients, allIngredients, isSearching, query, taggedIngredientIds])

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
