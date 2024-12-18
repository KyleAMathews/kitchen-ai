import { Link, useParams, useLocation } from "@tanstack/react-router"
import { useState } from "react"
import {
  Flex,
  Heading,
  Link as RadixLink,
  Checkbox,
  ScrollArea,
  Text,
  Badge,
  Em,
  Box,
  Button,
  Dialog,
  TextField,
  RadioGroup,
  Slider,
} from "@radix-ui/themes"
import { useShape } from "@electric-sql/react"
import { useUser } from "@clerk/clerk-react"
import {
  cosineSimilarity,
  createJob,
  isExpiredSoon,
  isRunningLow,
  lambdaFunction,
} from "../util"
import ExpirationDateEdit from "../components/expiration-date-edit"
import { UpdateIcon } from "@radix-ui/react-icons"
import * as Toast from "@radix-ui/react-toast"
import { groupBy, mapValues } from "lodash"

function AddIngredientsToShoppingListButton({
  possibleMatches,
  checked,
  recipe,
}) {
  const [working, setWorking] = useState(false)
  const [open, setOpen] = useState(false)
  // const { db } = useElectric()!

  return (
    <Toast.Provider swipeDirection="right">
      <Button
        disabled={working}
        onClick={async () => {
          setOpen(false)
          setWorking(true)
          const createObjects = Object.keys(possibleMatches)
            .map((ingredient_id: string) => {
              if (
                checked[ingredient_id] === false ||
                (typeof checked[ingredient_id] === `undefined` &&
                  possibleMatches[ingredient_id] === null)
              ) {
                const ingredient: Recipe_ingredients =
                  recipe.recipe_ingredients.find((i) => i.id === ingredient_id)
                return {
                  ingredient: ingredient.listing,
                  section: ingredient.grocery_section,
                }
              }
            })
            .filter((i) => i)

          const cardDescription = {
            url: recipe.url,
            checklists: mapValues(
              groupBy(createObjects, (o) => o.section),
              (sectionVals) => sectionVals.map((s) => s.ingredient)
            ),
          }
          const response = await fetch(
            `${lambdaFunction}/create-shopping-list`,
            {
              method: `POST`,
              headers: {
                "Content-Type": `application/json`,
              },
              body: JSON.stringify(cardDescription),
            }
          )
          if (!response.ok) {
            console.log(`Network response was not ok`)
          }
          const data = await response.json()
          console.log(`response`, data)
          setOpen(true)
          setWorking(false)
          // db.recipes.update({
          //   data: {
          //     updated_at: new Date(),
          //   },
          //   where: {
          //     id: recipe.id,
          //   },
          // })
        }}
      >
        Add items to Shopping List
      </Button>
      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">
          <Flex p="4">
            <Text>Ingredients added to shopping list</Text>
          </Flex>
        </Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  )
}

function generateDateMonthsAgo(monthsAgo) {
  const currentDate = new Date() // Get the current date
  currentDate.setMonth(currentDate.getMonth() - monthsAgo) // Subtract the specified number of months

  const year = currentDate.getFullYear() // Get the year
  let month = currentDate.getMonth() + 1 // Get the month (add 1 because getMonth() returns 0-11)

  // Ensure month is in 'MM' format
  month = month < 10 ? `0${month}` : month

  return `${year}/${month}` // Return the formatted date string
}

function Working({
  isWorking,
  style,
}: {
  isWorking: boolean
  style: React.CSSProperties
}) {
  if (isWorking) {
    return (
      <UpdateIcon style={style} height="14" width="14" className="icon-spin" />
    )
  } else {
    return null
  }
}

function AlreadyHaveIngredient({
  ingredient,
  setChecked,
  checked,
  possibleMatches,
}: {
  ingredient: Recipe_ingredients
  setChecked: (val: boolean) => void
  checked: boolean
  possibleMatches: Recipe_ingredients[]
}) {
  // const { db } = useElectric()!
  // const { results: liveJobs } = useLiveQuery(
  // db.jobs.liveMany({
  //   where: {
  //     state: `working`,
  //     target_id: ingredient.id,
  //   },
  // })
  // )
  const jobs = []
  const matchedIngred = possibleMatches[ingredient.id] as Ingredients
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
          <Working
            isWorking={jobs.length > 0}
            style={{ position: `relative`, top: 3.5 }}
          />
        </Flex>
      </Text>
      {jobs.length === 0 && !matchedIngred && (
        <AddIngredient ingredient={ingredient} />
      )}
      {matchedIngred && (
        <>
          <Box pl="5" asChild>
            <Text color="gray" size="1">
              matches:{` `}"
              <Link
                to={`/ingredients/${matchedIngred.id}`}
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
            {isRunningLow(matchedIngred) && (
              <Badge color="crimson" variant="soft" size="1">
                Running Low
              </Badge>
            )}
            {isExpiredSoon(matchedIngred) && (
              <Badge color="orange" variant="soft" size="1">
                Expired
              </Badge>
            )}
          </Flex>
        </>
      )}
    </Flex>
  )
}

function AddIngredient({ ingredient }: { ingredient: Recipe_ingredients }) {
  const [type, setType] = useState(`fill_level`)
  const [open, setOpen] = useState(false)
  const [expirationDate, setExpirationDate] = useState(new Date())
  // const { db } = useElectric()!

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

              // createJob({
              //   id: genUUID(),
              //   db,
              //   target_id: ingredient.id,
              //   type: `Transform recipe ingredient to kitchen ingredient`,
              //   fetchFn: async () => {
              //     // Make LLM call to get description, embedding
              //     const response = await fetch(
              //       `${lambdaFunction}/ingredients`,
              //       {
              //         method: `POST`,
              //         headers: {
              //           "Content-Type": `application/json`,
              //         },
              //         body: JSON.stringify({ ingredient: formProps.name }),
              //       }
              //     )
              //     if (!response.ok) {
              //       throw new Error(`Network response was not ok`)
              //     }
              //     const data = await response.json()

              //     const newIngredient = await db.ingredients.create({
              //       data: {
              //         id: genUUID(),
              //         name: formProps.name,
              //         fill_level: parseInt(formProps.fill_level, 10) || 0,
              //         embedding: JSON.stringify(data.embedding),
              //         tracking_type: type,
              //         count: parseInt(formProps?.count, 10) || 0,
              //         grocery_section: data.grocery_section,
              //         expiration_date: expirationDate,
              //         description: data.description,
              //         is_reviewed: true,
              //         created_at: new Date(),
              //         updated_at: new Date(),
              //       },
              //     })

              //     return response
              //   },
              // })

              // Job is going so now let's close the dialog
              setOpen(false)
            }}
          >
            <Flex direction="column" gap="5">
              <label>
                <Text size="1">Ingredient Name</Text>
                <TextField.Input
                  name="name"
                  defaultValue={ingredient.extracted_name}
                  placeholder="Enter the ingredient name"
                />
              </label>
              <label>
                <Flex direction="column" gap="3">
                  <Text size="2" as="p">
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
                  <TextField.Input
                    type="number"
                    name="count"
                    placeholder="How many of this ingredient do you have?"
                  />
                </label>
              ) : (
                <label>
                  <Flex direction="column" gap="2">
                    <Text size="1">Fill Level</Text>
                    <Slider
                      defaultValue={[0]}
                      name="fill_level"
                      onValueCommit={(val) => { }}
                    />
                    <Flex justify="between">
                      <Text size="1" color="gray">
                        0%
                      </Text>
                      <Text size="1" color="gray">
                        100%
                      </Text>
                    </Flex>
                  </Flex>
                </label>
              )}
              <ExpirationDateEdit
                onValueChange={setExpirationDate}
                expirationDate={expirationDate}
              />
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

const queries = ({ db, id }: { db: Electric[`db`]; id: string }) => {
  return {
    ingredients: db.ingredients.liveMany(),
    recipe: db.recipes.findUnique({
      where: {
        id,
      },
      include: {
        recipe_ingredients: true,
      },
    }),
  }
}

RecipeDetail.queries = queries

export default function RecipeDetail() {
  const { id } = useParams({ from: '/recipes/$id' })
  const location = useLocation()
  // const { db } = useElectric()!

  const [checked, setChecked] = useState({})
  const { id: recipeId } = useParams({ from: '/recipes/$id' })

  const { data: recipes, isLoading: isRecipesLoading } = useShape({
    url: `${import.meta.env.VITE_API_URL}/v1/shape`,
    params: {
      table: `recipes`,
    },
  })

  const { data: ingredients, isLoading: isIngredientsLoading } = useShape({
    url: `${import.meta.env.VITE_API_URL}/v1/shape`,
    params: {
      table: `ingredients`,
    }
  })

  const { data: recipeIngredients, isLoading: isLoadingRecipesIngredients } = useShape({
    url: `${import.meta.env.VITE_API_URL}/v1/shape`,
    params: {
      table: `recipe_ingredients`,
    }
  })

  if (isIngredientsLoading || isRecipesLoading || isLoadingRecipesIngredients) {
    return ``
  }

  const recipe = recipes.find(recipe => recipe.id === recipeId)
  if (!recipe) {
    // TODO does tanstack/router have something for this?
    return `404`
  }

  recipe.recipe_ingredients = recipeIngredients.filter(i => i.recipe_id === recipeId)

  console.log({ recipe, ingredients, recipeIngredients })



  const possibleMatches = Object.fromEntries(
    recipe.recipe_ingredients.map((ri, i) => {
      const possibleMatches = ingredients
        .map((ri2, i2) => {
          if (ri.listing !== ri2.listing) {
            const distance = cosineSimilarity(
              JSON.parse(ri.embedding),
              JSON.parse(ri2.embedding)
            )
            if (distance > 0.73) {
              return { distance, ...ri2 }
            } else {
              return false
            }
          }
        })
        .filter((i) => i)

      const possibleMatch =
        possibleMatches.length === 0
          ? null
          : possibleMatches.reduce((prev, current) => {
            return prev.distance > current.distance ? prev : current
          })

      return [ri.id, possibleMatch]
    })
  )
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
        <Link to="/recipes">{`<`} All Recipes</Link>
      </RadixLink>
      <Flex direction="column" gap="3">
        <Heading>{recipe.name}</Heading>
        <RadixLink size="2" asChild>
          <a target="_blank" href={recipe.url}>
            {recipe.url}
          </a>
        </RadixLink>
      </Flex>
      <ScrollArea scrollbars="vertical" style={{ maxHeight: 180 }} type="auto">
        <Box pr="6">
          <Text>{recipe.description}</Text>
        </Box>
      </ScrollArea>
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
          const ingredient: Recipe_ingredients = recipe.recipe_ingredients.find(
            (i) => i.id === ingredient_id
          )
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
          checked={checked}
        />
      </Flex>
      <Flex direction="column" gap="4">
        <Heading size="2">Already Have</Heading>
        {checked.length === 0 &&
          Object.values(possibleMatches).filter((i) => i).length === 0 && (
            <Text size="2">No matching ingredients</Text>
          )}
        {Object.keys(possibleMatches).map((ingredient_id: string) => {
          if (
            checked[ingredient_id] === true ||
            (typeof checked[ingredient_id] === `undefined` &&
              possibleMatches[ingredient_id] !== null)
          ) {
            const ingredient: Recipe_ingredients =
              recipe.recipe_ingredients.find((i) => i.id === ingredient_id)
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
    </Flex>
  )
}
