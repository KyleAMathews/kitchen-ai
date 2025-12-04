import {
  createFileRoute,
  useParams,
  Link,
  useNavigate,
} from "@tanstack/react-router"
import { useLiveQuery, eq } from "@tanstack/react-db"
import { useState } from "react"
import {
  Heading,
  Flex,
  Text,
  Badge,
  Box,
  Slider,
  Button,
  Card,
  ScrollArea,
  Select,
  Dialog,
  DropdownMenu,
  IconButton,
  TextField,
  TextArea,
} from "@radix-ui/themes"
import { DotsVerticalIcon, TrashIcon, Pencil1Icon } from "@radix-ui/react-icons"
import {
  ingredientsCollection,
  recipeIngredientsCollection,
  recipesCollection,
} from "@/lib/collections"
import { isRunningLow, cosineSimilarity } from "@/lib/utils"
import { useMemo } from "react"
import ExpirationDateEdit from "@/components/expiration-date-edit"
import { ingredientsTrackingTypeSchema } from "@/db/zod-schemas"
import { z } from "zod"

export const Route = createFileRoute(`/_authenticated/ingredients/$id`)({
  component: IngredientDetail,
  loader: async () => {
    await ingredientsCollection.preload()
  },
})

function TrackingTypeEditor({
  ingredient,
}: {
  ingredient: {
    id: string
    tracking_type: string | null
    fill_level?: number
    count?: number
  }
}) {
  const [open, setOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(
    ingredient.tracking_type ?? undefined
  )

  const trackingTypeOptions = [
    { value: `fill_level`, label: `Fill Level (0-100%)` },
    { value: `count`, label: `Count (number of items)` },
    { value: `pantry_staple`, label: `Pantry Staple (always available)` },
  ]

  const handleSave = () => {
    ingredientsCollection.update(ingredient.id, (draft) => {
      draft.tracking_type = selectedType as z.infer<
        typeof ingredientsTrackingTypeSchema
      >
      draft.updated_at = new Date()

      // Reset tracking values when changing type
      if (selectedType === `fill_level`) {
        draft.fill_level = 100
        draft.count = 0
      } else if (selectedType === `count`) {
        draft.count = 1
        draft.fill_level = 0
      } else if (selectedType === `pantry_staple`) {
        draft.fill_level = 0
        draft.count = 0
        draft.expiration_date = new Date(`2099-12-31`) // Far future for pantry staples
      }
    })
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="soft" size="1">
          Change Type
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Change Tracking Type</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Choose how you want to track this ingredient. This will reset current
          values.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <Select.Root value={selectedType} onValueChange={setSelectedType}>
            <Select.Trigger />
            <Select.Content>
              {trackingTypeOptions.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Button
            variant="soft"
            color="gray"
            onClick={() => {
              setSelectedType(ingredient.tracking_type)
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

function EditNameDescriptionDialog({
  ingredient,
  open,
  onOpenChange,
}: {
  ingredient: {
    id: string
    name: string
    description: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [name, setName] = useState(ingredient.name)
  const [description, setDescription] = useState(ingredient.description)

  const handleSave = () => {
    ingredientsCollection.update(ingredient.id, (draft) => {
      draft.name = name.trim()
      draft.description = description.trim()
      draft.updated_at = new Date()
    })
    onOpenChange(false)
  }

  // Reset form when dialog opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setName(ingredient.name)
      setDescription(ingredient.description)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit Ingredient</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Update the name and description for this ingredient.
        </Dialog.Description>

        <Flex direction="column" gap="4">
          <label>
            <Text as="div" size="2" mb="2" weight="bold">
              Name
            </Text>
            <TextField.Root
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingredient name"
            />
          </label>

          <label>
            <Text as="div" size="2" mb="2" weight="bold">
              Description
            </Text>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingredient description"
              rows={3}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Button
            variant="soft"
            color="gray"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name.trim() || !description.trim()}
          >
            Save Changes
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

function IngredientActionsMenu({
  ingredient,
}: {
  ingredient: {
    id: string
    name: string
    description: string
  }
}) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" size="2">
            <DotsVerticalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => setEditOpen(true)}>
            <Pencil1Icon width="14" height="14" />
            Edit Name & Description
          </DropdownMenu.Item>
          <DropdownMenu.Item color="red" onClick={() => setDeleteOpen(true)}>
            <TrashIcon width="14" height="14" />
            Delete Ingredient
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Dialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Delete Ingredient</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Are you sure you want to delete "{ingredient.name}"? This action
            cannot be undone.
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Button
              variant="soft"
              color="gray"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                ingredientsCollection.delete(ingredient.id)
                navigate({ to: `/ingredients` })
              }}
            >
              Delete
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <EditNameDescriptionDialog
        ingredient={ingredient}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  )
}

function IngredientDetail() {
  const { id } = useParams({ from: `/_authenticated/ingredients/$id` })

  const { data: ingredients } = useLiveQuery(
    (q) =>
      q
        .from({ ingredientsCollection })
        .where(({ ingredientsCollection }) => eq(ingredientsCollection.id, id)),
    [id]
  )

  const ingredient = ingredients?.[0]

  // Get all recipe ingredients and recipes for matching
  const { data: allRecipeIngredients } = useLiveQuery(
    (q) => q.from({ recipeIngredientsCollection }),
    []
  )

  const { data: allRecipes } = useLiveQuery(
    (q) => q.from({ recipesCollection }),
    []
  )

  // Find recipes that use this ingredient based on embedding similarity
  const matchingRecipes = useMemo(() => {
    if (!ingredient?.embedding || !allRecipeIngredients || !allRecipes) {
      return []
    }

    const ingredientEmbedding = JSON.parse(ingredient.embedding)
    const matches: Array<{
      recipe_id: string
      similarity: number
      recipe: { id: string; name: string; description: string }
    }> = []

    // Group recipe ingredients by recipe_id
    const recipeIngredientsMap = new Map<string, typeof allRecipeIngredients>()
    allRecipeIngredients.forEach((ri) => {
      if (!recipeIngredientsMap.has(ri.recipe_id)) {
        recipeIngredientsMap.set(ri.recipe_id, [])
      }
      recipeIngredientsMap.get(ri.recipe_id)?.push(ri)
    })

    // Check each recipe's ingredients for matches
    recipeIngredientsMap.forEach((recipeIngredients, recipe_id) => {
      let maxSimilarity = 0

      for (const ri of recipeIngredients) {
        if (ri.embedding) {
          try {
            const similarity = cosineSimilarity(
              ingredientEmbedding,
              JSON.parse(ri.embedding)
            )
            if (similarity > maxSimilarity) {
              maxSimilarity = similarity
            }
          } catch (e) {
            console.error(`Error parsing embedding:`, e)
          }
        }
      }

      // Only include recipes with similarity above threshold
      if (maxSimilarity > 0.73) {
        const recipe = allRecipes.find((r) => r.id === recipe_id)
        if (recipe) {
          matches.push({
            recipe_id,
            similarity: maxSimilarity,
            recipe,
          })
        }
      }
    })

    // Sort by similarity score (highest first)
    return matches.sort((a, b) => b.similarity - a.similarity)
  }, [ingredient, allRecipeIngredients, allRecipes])

  if (!ingredient) {
    return (
      <div className="p-6">
        <Text>Ingredient not found</Text>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Flex direction="column" gap="6">
        <Link
          to="/ingredients"
          style={{
            color: `var(--gray-11)`,
            textDecoration: `none`,
            fontSize: `14px`,
          }}
        >
          ← All Ingredients
        </Link>

        <Flex direction="column" gap="3">
          <Flex justify="between" align="start">
            <Heading size="6">{ingredient.name}</Heading>
            <IngredientActionsMenu ingredient={ingredient} />
          </Flex>
        </Flex>

        {ingredient.description && (
          <Text size="3" color="gray">
            {ingredient.description}
          </Text>
        )}

        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Flex justify="between" align="center">
              <Text weight="medium">Tracking Type</Text>
              <TrackingTypeEditor ingredient={ingredient} />
            </Flex>
            <Badge variant="soft" color="blue">
              {ingredient.tracking_type === `fill_level` && `Fill Level`}
              {ingredient.tracking_type === `count` && `Count`}
              {ingredient.tracking_type === `pantry_staple` && `Pantry Staple`}
            </Badge>
          </Flex>

          {ingredient.tracking_type !== `pantry_staple` && (
            <Flex direction="column" gap="2">
              <Text weight="medium">Expiration Date</Text>
              <ExpirationDateEdit
                expirationDate={ingredient.expiration_date}
                onValueChange={(newDate) => {
                  ingredientsCollection.update(ingredient.id, (draft) => {
                    draft.expiration_date = newDate
                    draft.updated_at = new Date()
                  })
                }}
              />
            </Flex>
          )}

          <Flex direction="column" gap="2">
            <Text weight="medium">Grocery Section</Text>
            <Badge variant="soft">{ingredient.grocery_section}</Badge>
          </Flex>

          {ingredient.tracking_type === `fill_level` && (
            <Flex direction="column" gap="2">
              <Text weight="medium">Fill Level</Text>
              <Box style={{ width: 200 }}>
                <Slider
                  variant="soft"
                  value={[ingredient.fill_level]}
                  onValueChange={(values) => {
                    ingredientsCollection.update(ingredient.id, (draft) => {
                      draft.fill_level = values[0]
                      draft.updated_at = new Date()
                    })
                  }}
                />
              </Box>
              <Text size="2" color="gray">
                {ingredient.fill_level}%
              </Text>
            </Flex>
          )}

          {ingredient.tracking_type === `count` && (
            <Flex direction="column" gap="2">
              <Text weight="medium">Count</Text>
              <Flex gap="2" align="center">
                <Button
                  size="1"
                  variant="soft"
                  onClick={() => {
                    ingredientsCollection.update(ingredient.id, (draft) => {
                      draft.count = Math.max(0, ingredient.count - 1)
                      draft.updated_at = new Date()
                    })
                  }}
                >
                  -
                </Button>
                <Text>{ingredient.count}</Text>
                <Button
                  size="1"
                  variant="soft"
                  onClick={() => {
                    ingredientsCollection.update(ingredient.id, (draft) => {
                      draft.count = ingredient.count + 1
                      draft.updated_at = new Date()
                    })
                  }}
                >
                  +
                </Button>
              </Flex>
            </Flex>
          )}

          {ingredient.tracking_type === `pantry_staple` && (
            <Flex direction="column" gap="2">
              <Text weight="medium">Status</Text>
              <Badge color="green" variant="soft">
                Pantry Staple - Always Available
              </Badge>
            </Flex>
          )}

          {isRunningLow(ingredient) &&
            ingredient.tracking_type !== `pantry_staple` && (
              <Badge color="crimson" variant="soft">
                Running Low
              </Badge>
            )}
        </Flex>

        {/* Matching Recipes Section */}
        {matchingRecipes.length > 0 && (
          <Flex direction="column" gap="3">
            <Heading size="4">Recipes Using This Ingredient</Heading>
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              style={{ maxHeight: 400 }}
            >
              <Flex direction="column" gap="3">
                {matchingRecipes.map(({ recipe, similarity }) => (
                  <Link
                    key={recipe.id}
                    to="/recipes/$id"
                    params={{ id: recipe.id }}
                    style={{ textDecoration: `none` }}
                  >
                    <Card style={{ cursor: `pointer` }}>
                      <Flex direction="column" gap="2">
                        <Flex justify="between" align="center">
                          <Heading size="3">{recipe.name}</Heading>
                          <Badge variant="soft" color="gray">
                            {Math.round(similarity * 100)}% match
                          </Badge>
                        </Flex>
                        {recipe.description && (
                          <Text size="2" color="gray">
                            {recipe.description.length > 150
                              ? recipe.description.slice(0, 150) + `...`
                              : recipe.description}
                          </Text>
                        )}
                      </Flex>
                    </Card>
                  </Link>
                ))}
              </Flex>
            </ScrollArea>
          </Flex>
        )}
      </Flex>
    </div>
  )
}
