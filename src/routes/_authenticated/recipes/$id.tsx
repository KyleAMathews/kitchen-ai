import {
  createFileRoute,
  useParams,
  Link,
  useNavigate,
} from "@tanstack/react-router"
import { useLiveQuery, eq } from "@tanstack/react-db"
import { useState } from "react"
import { z } from "zod"
import {
  ingredientsTrackingTypeSchema,
  type SelectRecipeIngredient,
  type SelectRecipe,
} from "@/db/zod-schemas"
import { trpc } from "@/lib/trpc-client"
import {
  Heading,
  Flex,
  Text,
  Link as RadixLink,
  Badge,
  Box,
  Button,
  Checkbox,
  ScrollArea,
  Dialog,
  TextField,
  RadioGroup,
  Slider,
} from "@radix-ui/themes"
import * as Toast from "@radix-ui/react-toast"
import { groupBy, mapValues } from "lodash-es"
import {
  recipesCollection,
  recipeIngredientsCollection,
  ingredientsCollection,
} from "@/lib/collections"
import { cosineSimilarity, isExpiredSoon, isRunningLow } from "@/lib/utils"
import ExpirationDateEdit from "@/components/expiration-date-edit"

export const Route = createFileRoute(`/_authenticated/recipes/$id`)({
  component: RecipeDetail,
  loader: async () => {
    await Promise.all([
      recipesCollection.preload(),
      recipeIngredientsCollection.preload(),
      ingredientsCollection.preload(),
    ])
  },
})

function AddIngredientsToShoppingListButton({
  possibleMatches,
  checked,
  recipe,
  recipeIngredients,
}: {
  possibleMatches: Record<string, any>
  checked: Record<string, boolean>
  recipe: SelectRecipe
  recipeIngredients: SelectRecipeIngredient[]
}) {
  const [working, setWorking] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <Toast.Provider swipeDirection="right">
      <Button
        disabled={working}
        onClick={async () => {
          setOpen(false)
          setError(null)
          setWorking(true)

          const createObjects = Object.keys(possibleMatches)
            .map((ingredient_id: string) => {
              if (
                checked[ingredient_id] === false ||
                (typeof checked[ingredient_id] === `undefined` &&
                  possibleMatches[ingredient_id] === null)
              ) {
                const ingredient = recipeIngredients.find(
                  (i) => i.id === ingredient_id
                )!
                return {
                  ingredient: ingredient.listing,
                  section: ingredient.grocery_section,
                }
              }
            })
            .filter((i) => i)

          const checklists = mapValues(
            groupBy(createObjects, (o) => o?.section),
            (sectionVals) => sectionVals.map((s) => s?.ingredient)
          )

          try {
            await trpc.shoppingList.addToShoppingList.mutate({
              recipeName: recipe.name,
              url: recipe.url,
              checklists,
            })
            setOpen(true)
          } catch (err) {
            console.error(`Failed to add items to shopping list:`, err)
            setError(`Failed to add items to shopping list`)
          } finally {
            setWorking(false)
          }
        }}
      >
        Add items to Shopping List
      </Button>
      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">
          <Flex p="4">
            <Text>{error ? error : `Ingredients added to shopping list`}</Text>
          </Flex>
        </Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  )
}

function AlreadyHaveIngredient({
  ingredient,
  setChecked,
  checked,
  possibleMatches,
}: {
  ingredient: any
  setChecked: (val: any) => void
  checked: Record<string, boolean>
  possibleMatches: Record<string, any>
}) {
  const matchedIngred = possibleMatches[ingredient.id]

  return (
    <Flex direction="column" gap="2" position="relative">
      <Text as="label" size="2">
        <Flex gap="2">
          <Checkbox
            checked={true}
            onClick={() => {
              setChecked({ ...checked, [ingredient.id]: false })
            }}
          />
          {` `}
          {ingredient.listing}
          {` `}
        </Flex>
      </Text>
      {matchedIngred && (
        <>
          <Box pl="5" asChild>
            <Text color="gray" size="1">
              matches:{` `}"
              <Link
                to={`/ingredients/$id`}
                params={{ id: matchedIngred.id }}
                style={{ color: `var(--teal-a11)`, textDecoration: `none` }}
              >
                {matchedIngred.name}
                {matchedIngred.tracking_type === `count` &&
                  ` (${matchedIngred.count})`}
              </Link>
              "{` `}
            </Text>
          </Box>
          <Flex gap="1" pl="5">
            {isRunningLow(matchedIngred) &&
              matchedIngred.tracking_type !== `pantry_staple` && (
                <Badge color="crimson" variant="soft" size="1">
                  Running Low
                </Badge>
              )}
            {isExpiredSoon(matchedIngred) &&
              matchedIngred.tracking_type !== `pantry_staple` && (
                <Badge color="orange" variant="soft" size="1">
                  Expired
                </Badge>
              )}
            {matchedIngred.tracking_type === `pantry_staple` && (
              <Badge color="green" variant="soft" size="1">
                Pantry Staple
              </Badge>
            )}
          </Flex>
        </>
      )}
      {!matchedIngred && <AddIngredient ingredient={ingredient} />}
    </Flex>
  )
}

function AddIngredient({ ingredient }: { ingredient: any }) {
  const [type, setType] = useState(`fill_level`)
  const [open, setOpen] = useState(false)
  const [expirationDate, setExpirationDate] = useState(new Date())
  const [fillLevel, setFillLevel] = useState(50)
  const [count, setCount] = useState(1)

  return (
    <Box pl="5">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button variant="outline" size="1">
            Add to Kitchen.ai
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Add Ingredient</Dialog.Title>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              const target = event.target as HTMLFormElement
              const formData = new FormData(target)
              const formProps = Object.fromEntries(formData)

              await trpc.ingredients.createWithAI.mutate({
                name: formProps.name as string,
                tracking_type: type as z.infer<
                  typeof ingredientsTrackingTypeSchema
                >,
                fill_level:
                  type === `fill_level`
                    ? fillLevel
                    : type === `pantry_staple`
                      ? 100
                      : 0,
                count: type === `count` ? count : 0,
                expiration_date:
                  type !== `pantry_staple` ? expirationDate : undefined,
              })

              // Close dialog after submission
              setOpen(false)
            }}
          >
            <Flex direction="column" gap="5">
              <label>
                <Flex direction="column" gap="1">
                  <Text size="1">Ingredient Name</Text>
                  <TextField.Root
                    name="name"
                    defaultValue={ingredient.extracted_name}
                    placeholder="Enter the ingredient name"
                  />
                </Flex>
              </label>
              <label>
                <Flex direction="column" gap="1">
                  <Text size="1" as="p">
                    Track ingredient by "fill level" or by "count"
                  </Text>
                  <Box py="1">
                    <RadioGroup.Root
                      value={type}
                      name="tracking_type"
                      onValueChange={(value) => {
                        setType(value)
                      }}
                    >
                      <Flex gap="2" direction="column">
                        <Text as="label" size="2">
                          <Flex gap="2">
                            <RadioGroup.Item value="fill_level" />
                            {` `}
                            Fill Level (0-100%)
                          </Flex>
                        </Text>
                        <Text as="label" size="2">
                          <Flex gap="2">
                            <RadioGroup.Item value="count" /> Count (e.g. number
                            of cans)
                          </Flex>
                        </Text>
                        <Text as="label" size="2">
                          <Flex gap="2">
                            <RadioGroup.Item value="pantry_staple" /> Pantry
                            Staple (always have)
                          </Flex>
                        </Text>
                      </Flex>
                    </RadioGroup.Root>
                  </Box>
                </Flex>
              </label>
              {type === `count` ? (
                <label>
                  <Text as="div" size="1" mb="1">
                    Count
                  </Text>
                  <TextField.Root
                    type="number"
                    name="count"
                    value={String(count)}
                    onChange={(e) =>
                      setCount(parseInt(e.target.value, 10) || 0)
                    }
                    placeholder="How many of this ingredient do you have?"
                  />
                </label>
              ) : type === `fill_level` ? (
                <label>
                  <Flex direction="column" gap="2">
                    <Text size="1">Fill Level</Text>
                    <Slider
                      value={[fillLevel]}
                      name="fill_level"
                      onValueChange={(val) => setFillLevel(val[0])}
                    />
                    <Flex justify="between">
                      <Text size="1" color="gray">
                        0%
                      </Text>
                      <Text size="1" color="gray">
                        {fillLevel}%
                      </Text>
                      <Text size="1" color="gray">
                        100%
                      </Text>
                    </Flex>
                  </Flex>
                </label>
              ) : null}
              {type !== `pantry_staple` && (
                <ExpirationDateEdit
                  onValueChange={setExpirationDate}
                  expirationDate={expirationDate}
                />
              )}
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Button
                variant="soft"
                color="gray"
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  )
}

function DeleteRecipeButton({ recipe }: { recipe: any }) {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="soft" color="red" size="2">
          Delete Recipe
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Delete Recipe</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Are you sure you want to delete "{recipe.name}"? This action cannot be
          undone.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Button
            variant="soft"
            color="gray"
            onClick={() => setOpen(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={async () => {
              setDeleting(true)
              try {
                recipesCollection.delete(recipe.id)
                navigate({ to: `/recipes` })
              } catch (error) {
                console.error(`Failed to delete recipe:`, error)
                setDeleting(false)
              }
            }}
            disabled={deleting}
          >
            {deleting ? `Deleting...` : `Delete`}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default function RecipeDetail() {
  const { id } = useParams({ from: `/_authenticated/recipes/$id` })
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  // Get recipe data
  const { data: recipes } = useLiveQuery(
    (q) =>
      q
        .from({ recipesCollection })
        .where(({ recipesCollection }) => eq(recipesCollection.id, id)),
    [id]
  )

  // Get recipe ingredients
  const { data: recipeIngredients } = useLiveQuery(
    (q) =>
      q
        .from({ recipeIngredientsCollection })
        .where(({ recipeIngredientsCollection }) =>
          eq(recipeIngredientsCollection.recipe_id, id)
        ),
    [id]
  )

  // Get all user ingredients for matching
  const { data: userIngredients } = useLiveQuery(
    (q) => q.from({ ingredientsCollection }),
    []
  )

  const recipe = recipes?.[0]

  if (!recipe) {
    return (
      <div className="p-6">
        <Text>Recipe not found</Text>
      </div>
    )
  }

  // Calculate ingredient matches using cosine similarity
  const possibleMatches: Record<string, any> = {}

  if (recipeIngredients && userIngredients) {
    recipeIngredients.forEach((ri) => {
      const matches = userIngredients
        .map((ui) => {
          if (ri.embedding && ui.embedding) {
            const distance = cosineSimilarity(
              JSON.parse(ri.embedding),
              JSON.parse(ui.embedding)
            )
            if (distance > 0.73) {
              return { distance, ...ui }
            }
          }
          return null
        })
        .filter(Boolean)

      possibleMatches[ri.id] =
        matches.length === 0
          ? null
          : matches.reduce((prev: any, current: any) => {
              return prev.distance > current.distance ? prev : current
            })
    })
  }

  const neededIngredients = Object.keys(possibleMatches).filter(
    (ingredient_id) => {
      return (
        checked[ingredient_id] === false ||
        (typeof checked[ingredient_id] === `undefined` &&
          possibleMatches[ingredient_id] === null)
      )
    }
  )

  return (
    <Flex direction="column" gap="5">
      <RadixLink asChild size="2">
        <Link to="/recipes">&lt; All Recipes</Link>
      </RadixLink>

      <Flex direction="column" gap="3">
        <Flex justify="between" align="start">
          <Heading>{recipe.name}</Heading>
          <DeleteRecipeButton recipe={recipe} />
        </Flex>
        {recipe.url && (
          <RadixLink size="2" asChild>
            <a target="_blank" href={recipe.url}>
              {recipe.url}
            </a>
          </RadixLink>
        )}
      </Flex>

      {recipe.description && (
        <ScrollArea
          scrollbars="vertical"
          style={{ maxHeight: 180 }}
          type="auto"
        >
          <Box pr="6">
            <Text>{recipe.description}</Text>
          </Box>
        </ScrollArea>
      )}

      <Flex direction="column" gap="4" mt="2">
        <Flex direction="column" gap="2">
          <Heading size="4" mb="2">
            Shopping List
          </Heading>
          <Text size="2">
            Review the ingredients Kitchen.ai thinks you need to buy for this
            recipe
          </Text>
        </Flex>
        {neededIngredients.map((ingredient_id: string) => {
          const ingredient = recipeIngredients?.find(
            (i) => i.id === ingredient_id
          )!
          return (
            <Text
              key={ingredient_id}
              as="label"
              size="2"
              style={{
                position: `relative`,
                paddingRight: 12,
              }}
            >
              <Flex gap="2">
                <Checkbox
                  checked={false}
                  onClick={() => {
                    setChecked({ ...checked, [ingredient_id]: true })
                  }}
                />
                {` `}
                {ingredient.listing}
                {` `}
              </Flex>
            </Text>
          )
        })}
        <AddIngredientsToShoppingListButton
          possibleMatches={possibleMatches}
          recipe={recipe}
          recipeIngredients={recipeIngredients || []}
          checked={checked}
        />
      </Flex>

      <Flex direction="column" gap="4">
        <Heading size="2">Already Have</Heading>
        {Object.keys(checked).length === 0 &&
          Object.values(possibleMatches).filter((i) => i).length === 0 && (
            <Text size="2">No matching ingredients</Text>
          )}
        {Object.keys(possibleMatches).map((ingredient_id: string) => {
          if (
            checked[ingredient_id] === true ||
            (typeof checked[ingredient_id] === `undefined` &&
              possibleMatches[ingredient_id] !== null)
          ) {
            const ingredient = recipeIngredients?.find(
              (i) => i.id === ingredient_id
            )
            const matchedIngred = possibleMatches[ingredient_id]
            // Skip pantry staples here - they'll be shown in their own section
            if (matchedIngred?.tracking_type === `pantry_staple`) {
              return null
            }
            return (
              <AlreadyHaveIngredient
                key={ingredient_id}
                setChecked={setChecked}
                ingredient={ingredient}
                checked={checked}
                possibleMatches={possibleMatches}
              />
            )
          }
          return null
        })}
      </Flex>

      {/* Pantry Staples Section */}
      {(() => {
        const pantryStaples = Object.keys(possibleMatches)
          .filter((ingredient_id: string) => {
            const matchedIngred = possibleMatches[ingredient_id]
            return (
              matchedIngred?.tracking_type === `pantry_staple` &&
              (checked[ingredient_id] === true ||
                (typeof checked[ingredient_id] === `undefined` &&
                  possibleMatches[ingredient_id] !== null))
            )
          })
          .map((ingredient_id) => ({
            id: ingredient_id,
            ingredient: recipeIngredients?.find((i) => i.id === ingredient_id),
            match: possibleMatches[ingredient_id],
          }))

        if (pantryStaples.length === 0) return null

        return (
          <details style={{ marginTop: `var(--space-4)` }}>
            <summary
              style={{
                cursor: `pointer`,
                userSelect: `none`,
                listStyle: `none`,
              }}
            >
              <Flex direction="column" gap="2">
                <Flex direction="row" gap="2" align="center">
                  <Text
                    size="2"
                    style={{
                      display: `inline-block`,
                      transition: `transform 0.2s`,
                      transform: `rotate(0deg)`,
                    }}
                    className="disclosure-arrow"
                  >
                    ▶
                  </Text>
                  <Heading size="2">Pantry Staples</Heading>
                  <Badge color="green" variant="soft" size="1">
                    {pantryStaples.length} items
                  </Badge>
                </Flex>
                <Flex direction="row" gap="2" wrap="wrap" pl="4">
                  {pantryStaples.map(({ ingredient }) => (
                    <Text key={ingredient?.id} size="2" color="gray">
                      {ingredient?.listing}
                      {pantryStaples[pantryStaples.length - 1].ingredient
                        ?.id !== ingredient?.id && `,`}
                    </Text>
                  ))}
                </Flex>
              </Flex>
            </summary>
            <Flex direction="column" gap="4" mt="3">
              {pantryStaples.map(({ id, ingredient }) => (
                <AlreadyHaveIngredient
                  key={id}
                  setChecked={setChecked}
                  ingredient={ingredient}
                  checked={checked}
                  possibleMatches={possibleMatches}
                />
              ))}
            </Flex>
            <style>{`
              details[open] .disclosure-arrow {
                transform: rotate(90deg) !important;
              }
            `}</style>
          </details>
        )
      })()}
    </Flex>
  )
}
