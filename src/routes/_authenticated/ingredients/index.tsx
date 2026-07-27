import { createFileRoute } from "@tanstack/react-router"
import { eq, useLiveQuery } from "@tanstack/react-db"
import { useState, useMemo, useRef } from "react"
import { UNSAFE_PortalProvider } from "react-aria"
import {
  Heading,
  Flex,
  Text,
  Button,
  Dialog,
  TextField,
  Checkbox,
} from "@radix-ui/themes"
import {
  ingredientsCollection,
  tagsCollection,
  ingredientTagsCollection,
} from "@/lib/collections"
import IngredientCard from "@/components/ingredient-card"
import AddIngredientForm from "@/components/add-ingredient-form"
import { trpc } from "@/lib/trpc-client"
import {
  PlusIcon,
  BackpackIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons"

export const Route = createFileRoute(`/_authenticated/ingredients/`)({
  component: IngredientsList,
  loader: async () => {
    await Promise.all([
      ingredientsCollection.preload(),
      tagsCollection.preload(),
      ingredientTagsCollection.preload(),
    ])
  },
})

function IngredientsList() {
  const [searchQuery, setSearchQuery] = useState(``)
  const addDialogContainerRef = useRef<HTMLDivElement>(null)

  const { data: allIngredients } = useLiveQuery(
    (q) =>
      q
        .from({ ingredientsCollection })
        .orderBy(
          ({ ingredientsCollection }) => ingredientsCollection.trello_add_count,
          `desc`
        )
        .orderBy(({ ingredientsCollection }) => ingredientsCollection.name),
    []
  )
  const query = searchQuery.trim().toLowerCase()
  const { data: tagMatches } = useLiveQuery(
    (q) =>
      query
        ? q
            .from({ link: ingredientTagsCollection })
            .innerJoin({ tag: tagsCollection }, ({ link, tag }) =>
              eq(link.tag_id, tag.id)
            )
            .fn.where(({ tag }) => tag.name.toLowerCase().includes(query))
            .select(({ link }) => ({ ingredient_id: link.ingredient_id }))
        : undefined,
    [query]
  )

  // Search matches an ingredient's name OR any of its tag names
  const ingredients = useMemo(() => {
    if (!query) return allIngredients ?? []

    const taggedIngredientIds = new Set(
      (tagMatches ?? []).map((match) => match.ingredient_id)
    )

    return (allIngredients ?? []).filter(
      (ingredient) =>
        ingredient.name.toLowerCase().includes(query) ||
        taggedIngredientIds.has(ingredient.id)
    )
  }, [allIngredients, query, tagMatches])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    new Set()
  )
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToShoppingList = async () => {
    if (selectedIngredients.size === 0) return

    setIsAddingToCart(true)
    try {
      const selectedIngredientsList =
        ingredients?.filter((i) => selectedIngredients.has(i.id)) || []

      // Group ingredients by grocery section
      const checklists: Record<string, string[]> = {}
      selectedIngredientsList.forEach((ingredient) => {
        const section = ingredient.grocery_section
          .replace(` `, `_`)
          .replace(`/`, `_`)
        if (!checklists[section]) {
          checklists[section] = []
        }
        checklists[section].push(ingredient.name)
      })

      // Extract ingredient IDs for tracking
      const ingredientIds = selectedIngredientsList.map((i) => i.id)

      await trpc.shoppingList.addToShoppingList.mutate({
        recipeName: `Manual Ingredients`,
        checklists,
        ingredientIds,
      })

      // Clear selection
      setSelectedIngredients(new Set())
      setIsSelectionMode(false)
    } catch (error) {
      console.error(`Failed to add to shopping list:`, error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const toggleIngredientSelection = (ingredientId: string) => {
    const newSelected = new Set(selectedIngredients)
    if (newSelected.has(ingredientId)) {
      newSelected.delete(ingredientId)
    } else {
      newSelected.add(ingredientId)
    }
    setSelectedIngredients(newSelected)
  }

  return (
    <div className="p-6">
      <Flex direction="column" gap="7" pt="2">
        <Flex>
          <Heading>Ingredients ({ingredients?.length || 0})</Heading>
        </Flex>

        {/* Search */}
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField.Root
            placeholder="Search ingredients..."
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

        <Flex gap="2">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            variant="soft"
            size="2"
          >
            <PlusIcon />
            Add Ingredient
          </Button>
          {ingredients && ingredients.length > 0 && (
            <>
              {!isSelectionMode ? (
                <Button
                  onClick={() => setIsSelectionMode(true)}
                  variant="soft"
                  size="2"
                >
                  <BackpackIcon />
                  Select for Shopping
                </Button>
              ) : (
                <Flex gap="2">
                  <Button
                    onClick={handleAddToShoppingList}
                    disabled={selectedIngredients.size === 0 || isAddingToCart}
                    variant="solid"
                    size="2"
                  >
                    {isAddingToCart
                      ? `Adding...`
                      : `Add ${selectedIngredients.size} to Cart`}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsSelectionMode(false)
                      setSelectedIngredients(new Set())
                    }}
                    variant="soft"
                    color="gray"
                    size="2"
                  >
                    Cancel
                  </Button>
                </Flex>
              )}
            </>
          )}
        </Flex>
        {ingredients && ingredients.length > 0 ? (
          <Flex direction="column" gap="4">
            {ingredients.map((ingredient) => {
              if (ingredient.is_reviewed) {
                return (
                  <Flex key={ingredient.id} align="center" gap="3">
                    {isSelectionMode && (
                      <Checkbox
                        checked={selectedIngredients.has(ingredient.id)}
                        onCheckedChange={() =>
                          toggleIngredientSelection(ingredient.id)
                        }
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <IngredientCard ingredient={ingredient} />
                    </div>
                  </Flex>
                )
              }
              return null
            })}
          </Flex>
        ) : searchQuery.trim() ? (
          <Text color="gray">
            No ingredients match &ldquo;{searchQuery.trim()}&rdquo;.
          </Text>
        ) : (
          <Text color="gray">
            No ingredients yet. Add them from recipes or manually!
          </Text>
        )}

        <Dialog.Root open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <Dialog.Content ref={addDialogContainerRef} maxWidth="450px">
            <Dialog.Title>Add Ingredient</Dialog.Title>
            <UNSAFE_PortalProvider
              getContainer={() => addDialogContainerRef.current}
            >
              <AddIngredientForm onClose={() => setIsAddDialogOpen(false)} />
            </UNSAFE_PortalProvider>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </div>
  )
}
