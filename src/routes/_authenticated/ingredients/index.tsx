import { createFileRoute } from "@tanstack/react-router"
import { useLiveQuery, ilike } from "@tanstack/react-db"
import { useState } from "react"
import {
  Heading,
  Flex,
  Text,
  Button,
  Dialog,
  TextField,
  Checkbox,
} from "@radix-ui/themes"
import { ingredientsCollection } from "@/lib/collections"
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
    await ingredientsCollection.preload()
  },
})

export default function IngredientsList() {
  const [searchQuery, setSearchQuery] = useState(``)

  const { data: ingredients } = useLiveQuery(
    (q) =>
      searchQuery.length > 0
        ? q
            .from({ ingredientsCollection })
            .where(({ ingredientsCollection }) =>
              ilike(ingredientsCollection.name, `%${searchQuery}%`)
            )
            .orderBy(({ ingredientsCollection }) => ingredientsCollection.name)
        : q
            .from({ ingredientsCollection })
            .orderBy(({ ingredientsCollection }) => ingredientsCollection.name),
    [searchQuery]
  )

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

      await trpc.shoppingList.addToShoppingList.mutate({
        recipeName: `Manual Ingredients`,
        checklists,
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
        ) : (
          <Text color="gray">
            No ingredients yet. Add them from recipes or manually!
          </Text>
        )}

        <Dialog.Root open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Add Ingredient</Dialog.Title>
            <AddIngredientForm onClose={() => setIsAddDialogOpen(false)} />
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </div>
  )
}
