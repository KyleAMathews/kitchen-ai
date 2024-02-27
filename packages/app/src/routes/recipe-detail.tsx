import { useLocation, Link } from "react-router-dom"
import { useLiveQuery } from "electric-sql/react"
import { useState } from "react"
import {
  Flex,
  Heading,
  Link as RadixLink,
  Checkbox,
  ScrollArea,
  Text,
  Em,
  Box,
  Button,
  Dialog,
  TextField,
  RadioGroup,
  Slider,
} from "@radix-ui/themes"
import { useElectricData } from "electric-query"
import {
  Electric,
  Recipes,
  Ingredients,
  Recipe_ingredients,
  Shopping_list,
} from "../generated/client"
import { genUUID, uuid } from "electric-sql/util"
import { useElectric } from "../context"
import { useUser } from "@clerk/clerk-react"
import { cosineSimilarity, createJob } from "../util"
import { UpdateIcon } from "@radix-ui/react-icons"
import * as Toast from "@radix-ui/react-toast"
import { groupBy, mapValues } from "lodash"

function getFirstDayOfWeekDate() {
  const today = new Date() // Current date and time
  const dayOfWeek = today.getDay() // Day of the week, 0 for Sunday, 1 for Monday, etc.
  const firstDayOfWeek = new Date(today) // Clone today's date

  // Subtract the day of the week from the current date to get to the first day of the week
  firstDayOfWeek.setDate(today.getDate() - dayOfWeek)

  // Format the date as "YYYY/MM/DD"
  const year = firstDayOfWeek.getFullYear()
  // getMonth() returns 0-11; adding 1 to get 1-12 and padStart to ensure two digits
  const month = (firstDayOfWeek.getMonth() + 1).toString().padStart(2, `0`)
  const day = firstDayOfWeek.getDate().toString().padStart(2, `0`)

  return `Shopping ${year}/${month}/${day}`
}

function AddIngredientsToShoppingListButton({
  possibleMatches,
  checked,
  recipe,
}) {
  const [working, setWorking] = useState(false)
  const [open, setOpen] = useState(false)
  const { db } = useElectric()!

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
          console.log({ createObjects })
          const cardDescription = {
            cardName: getFirstDayOfWeekDate(),
            url: recipe.url,
            checklists: mapValues(
              groupBy(createObjects, (o) => o.section),
              (sectionVals) => sectionVals.map((s) => s.ingredient)
            ),
          }
          console.log({ cardDescription })
          // await db.shopping_list.createMany({
          // data: createObjects,
          // })
          const response = await fetch(
            `https://7vxq1y2eu2.execute-api.us-east-1.amazonaws.com/create-shopping-list`,
            {
              method: `POST`,
              headers: {
                "Content-Type": `application/json`,
              },
              body: JSON.stringify(cardDescription),
            }
          )
          if (!response.ok) {
            console.loj(`Network response was not ok`)
          }
          const data = await response.json()
          console.log(`response`, data)
          setOpen(true)
          setWorking(false)
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
  const { db } = useElectric()!
  const { results: liveJobs } = useLiveQuery(
    db.jobs.liveMany({
      where: {
        state: `working`,
        target_id: ingredient.id,
      },
    })
  )
  const jobs = liveJobs || []
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
      {jobs.length === 0 && !possibleMatches[ingredient.id] && (
        <AddIngredient ingredient={ingredient} />
      )}
      {possibleMatches[ingredient.id] && (
        <Box pl="5" asChild>
          <Text color="gray" size="1">
            matches:{` `}"
            <Link
              to={`/ingredients/${possibleMatches[ingredient.id].id}`}
              style={{ color: `var(--teal-a11)`, textDecoration: `none` }}
            >
              {possibleMatches[ingredient.id].name}
            </Link>
            "
          </Text>
        </Box>
      )}
    </Flex>
  )
}

function AddIngredient({ ingredient }: { ingredient: Recipe_ingredients }) {
  const [type, setType] = useState(`fill_level`)
  const [open, setOpen] = useState(false)
  const [fillDate, setFillDate] = useState(generateDateMonthsAgo(3))
  const { db } = useElectric()!

  return (
    <Box pl="5">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button size="1">Add Ingredient</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Add Ingredient</Dialog.Title>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              const target = event.target as HTMLFormElement
              const formData = new FormData(target)
              const formProps = Object.fromEntries(formData)

              createJob({
                id: uuid(),
                db,
                target_id: ingredient.id,
                type: `Transform recipe ingredient to kitchen ingredient`,
                fetchFn: async () => {
                  // Make LLM call to get description, embedding, shelf_life_months
                  const response = await fetch(
                    `https://7vxq1y2eu2.execute-api.us-east-1.amazonaws.com/ingredients`,
                    {
                      method: `POST`,
                      headers: {
                        "Content-Type": `application/json`,
                      },
                      body: JSON.stringify({ ingredient: formProps.name }),
                    }
                  )
                  if (!response.ok) {
                    throw new Error(`Network response was not ok`)
                  }
                  const data = await response.json()

                  const newIngredient = await db.ingredients.create({
                    data: {
                      id: uuid(),
                      name: formProps.name,
                      fill_level: parseInt(formProps.fill_level, 10) || 0,
                      embedding: JSON.stringify(data.embedding),
                      tracking_type: type,
                      fill_date: fillDate,
                      count: parseInt(formProps?.count, 10) || 0,
                      description: data.description,
                      is_reviewed: true,
                      shelf_life_months: data.shelf_life_months,
                    },
                  })
                  console.log({ newIngredient })

                  return response
                },
              })

              // Job is going so now let's close the dialog
              setOpen(false)
            }}
          >
            <Flex direction="column" gap="4">
              <label>
                <Text size="1" weight="bold">
                  Ingredient Name
                </Text>
                <TextField.Input
                  name="name"
                  defaultValue={ingredient.extracted_name}
                  placeholder="Enter the ingredient name"
                />
              </label>
              <label>
                <Text size="1" as="div" weight="bold">
                  Track ingredient by fill level (0-100%) or by count (e.g.
                  number of cans)
                </Text>
              </label>
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
                        Fill Level
                      </Flex>
                    </Text>
                    <Text as="label" size="2">
                      <Flex gap="2">
                        <RadioGroup.Item value="count" /> Count
                      </Flex>
                    </Text>
                  </Flex>
                </RadioGroup.Root>
              </Box>
              {type === `count` ? (
                <label>
                  <Text as="div" size="2" mb="1">
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
                    <Text size="1" weight="bold">
                      Fill Level
                    </Text>
                    <Slider
                      defaultValue={[0]}
                      name="fill_level"
                      onValueCommit={(val) => {}}
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
              <Flex direction="column" gap="2">
                <Text size="1" weight="bold">
                  Estimate purchase date{` `}
                  {fillDate !== `` && (
                    <span style={{ color: `var(--gray-a9)` }}>
                      ({fillDate})
                    </span>
                  )}
                </Text>
                <Flex direction="column" gap="1">
                  <Slider
                    defaultValue={[100 - 12]}
                    name="purchase_date"
                    step={2}
                    onValueCommit={(val) => {
                      const noZeroVal = val[0] === 0 ? 0.1 : val[0]
                      const newAge = Math.round(50 - noZeroVal / 2)
                      const newFillDate = generateDateMonthsAgo(newAge)
                      setFillDate(newFillDate)
                    }}
                  />
                  <Flex justify="between">
                    <Text size="1" color="gray">
                      4 years ago
                    </Text>
                    <Text size="1" color="gray">
                      new
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
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
    shopping_list: db.shopping_list.liveMany({
      where: {
        recipe_id: id,
      },
    }),
  }
}

RecipeDetail.queries = queries

export default function RecipeDetail() {
  const location = useLocation()
  const { db } = useElectric()!
  const {
    user: { id: user_id },
  } = useUser()

  const {
    recipe,
    ingredients,
    shopping_list,
  }: {
    recipe: Recipes
    ingredients: Ingredients[]
    shopping_list: Shopping_list[]
  } = useElectricData(location.pathname + location.search)
  const [checked, setChecked] = useState({})

  const possibleMatches = Object.fromEntries(
    recipe.recipe_ingredients.map((ri, i) => {
      const possibleMatches = ingredients
        .map((ri2, i2) => {
          if (ri.listing !== ri2.listing) {
            const distance = cosineSimilarity(
              JSON.parse(ri.embedding),
              JSON.parse(ri2.embedding)
            )
            if (distance > 0.65) {
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
  console.log({ neededIngredients, shopping_list })

  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="3">
        <RadixLink asChild>
          <Link to="/recipes">{`<`} All Recipes</Link>
        </RadixLink>
        <Heading>{recipe.name}</Heading>
        <RadixLink size="1" asChild>
          <a target="_blank" href={recipe.url}>
            {recipe.url}
          </a>
        </RadixLink>
        <ScrollArea
          scrollbars="vertical"
          style={{ maxHeight: 180 }}
          type="auto"
        >
          <Text>{recipe.description}</Text>
        </ScrollArea>
      </Flex>
      <Flex direction="column" gap="4">
        <Flex direction="column" gap="2">
          <Heading size="5" mb="2">
            Ingredients
          </Heading>
          <Heading size="3">Needed</Heading>
          <Text size="1">
            <Em>Review ingredients Kitchen.ai thinks you need to buy</Em>
          </Text>
        </Flex>
        {neededIngredients.map((ingredient_id: string) => {
          const ingredient: Recipe_ingredients = recipe.recipe_ingredients.find(
            (i) => i.id === ingredient_id
          )
          return (
            <Text
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
        <Heading size="3">Already Have</Heading>
        {Object.values(possibleMatches).filter((i) => i).length === 0 && (
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
                setChecked={setChecked}
                ingredient={ingredient}
                checked={checked}
                possibleMatches={possibleMatches}
              />
            )
          }
        })}
      </Flex>
    </Flex>
  )
}
