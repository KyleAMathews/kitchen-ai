import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useMemo } from "react"
import { useLiveQuery, eq, count, max } from "@tanstack/react-db"
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

  // Tag data, so search can match on tag names as well as names/descriptions
  const { data: allTags } = useLiveQuery((q) => q.from({ tag: tagsCollection }))
  const { data: recipeTagLinks } = useLiveQuery((q) =>
    q.from({ link: recipeTagsCollection })
  )
  const { data: ingredientTagLinks } = useLiveQuery((q) =>
    q.from({ link: ingredientTagsCollection })
  )

  const query = searchQuery.trim().toLowerCase()

  // Entity ids whose tags match the search
  const { taggedRecipeIds, taggedIngredientIds } = useMemo(() => {
    const matchingTagIds = new Set(
      (allTags ?? [])
        .filter((tag) => tag.name.toLowerCase().includes(query))
        .map((tag) => tag.id)
    )
    return {
      taggedRecipeIds: new Set(
        (recipeTagLinks ?? [])
          .filter((link) => matchingTagIds.has(link.tag_id))
          .map((link) => link.recipe_id)
      ),
      taggedIngredientIds: new Set(
        (ingredientTagLinks ?? [])
          .filter((link) => matchingTagIds.has(link.tag_id))
          .map((link) => link.ingredient_id)
      ),
    }
  }, [allTags, recipeTagLinks, ingredientTagLinks, query])

  // Join recipes with made_it comments to compute times_made and last_made_at
  // Orders by most recently made, then by times made count
  const { data: recipes } = useLiveQuery((q) => {
    const madeItComments = q
      .from({ c: recipeCommentsCollection })
      .where(({ c }) => eq(c.made_it, true))

    // Not filtered/limited here: search matches tag names too (which live in
    // another collection), so filtering happens below — limiting here would
    // drop tag matches before they're considered.
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
  }, [])

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
