import { useLocation, Link } from "react-router-dom"
import { useState } from "react"
import {
  Flex,
  Heading,
  Link as RadixLink,
  Checkbox,
  ScrollArea,
  Text,
  Em,
  Badge,
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
} from "../generated/client"
import { genUUID, uuid } from "electric-sql/util"
import { useElectric } from "../context"
import { useUser } from "@clerk/clerk-react"
import { cosineSimilarity } from "../util"
import { UpdateIcon, LightningBoltIcon } from "@radix-ui/react-icons"

function generateDateMonthsAgo(monthsAgo) {
  const currentDate = new Date() // Get the current date
  currentDate.setMonth(currentDate.getMonth() - monthsAgo) // Subtract the specified number of months

  const year = currentDate.getFullYear() // Get the year
  let month = currentDate.getMonth() + 1 // Get the month (add 1 because getMonth() returns 0-11)

  // Ensure month is in 'MM' format
  month = month < 10 ? `0${month}` : month

  return `${year}/${month}` // Return the formatted date string
}

function Working({ isWorking }: { isWorking: boolean }) {
  if (isWorking) {
    return <UpdateIcon className="icon-spin" />
  } else {
    return null
  }
}

function AddIngredient({ ingredient }: { ingredient: Recipe_ingredients }) {
  const [type, setType] = useState(`fill_level`)
  const [open, setOpen] = useState(false)
  const [fillDate, setFillDate] = useState(generateDateMonthsAgo(3))
  const [saving, setSaving] = useState(false)
  const { db } = useElectric()!

  return (
    <Box pl="5">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button size="1">Save Ingredient</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>
            Add Ingredient <Working isWorking={saving} />
          </Dialog.Title>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              const target = event.target as HTMLFormElement
              const formData = new FormData(target)
              const formProps = Object.fromEntries(formData)
              console.log(formProps, fillDate)

              setSaving(true)

              // Make LLM call to get description, embedding, shelf_life_months, is_ground
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
              console.log({ data })
              console.log(formProps, {
                id: uuid(),
                name: formProps.name,
                fill_level: parseInt(formProps.fill_level, 10) || 0,
                embedding: JSON.stringify(data.embedding),
                tracking_type: type,
                fill_date: fillDate,
                count: parseInt(formProps?.count, 10) || 0,
                is_ground: data.is_ground,
                description: data.description,
                is_reviewed: true,
                shelf_life_months: data.shelf_life_months,
              })
              try {
                const newIngredient = await db.ingredients.create({
                  data: {
                    id: uuid(),
                    name: formProps.name,
                    fill_level: parseInt(formProps.fill_level, 10) || 0,
                    embedding: JSON.stringify(data.embedding),
                    tracking_type: type,
                    fill_date: fillDate,
                    count: parseInt(formProps?.count, 10) || 0,
                    is_ground: data.is_ground,
                    description: data.description,
                    is_reviewed: true,
                    shelf_life_months: data.shelf_life_months,
                  },
                })
                console.log({ newIngredient })
              } catch (e) {
                console.log(e)
              }
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
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                Save
              </Button>
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
  const location = useLocation()
  const { db } = useElectric()!
  const {
    user: { id: user_id },
  } = useUser()

  const {
    recipe,
    ingredients,
  }: { recipe: Recipes; ingredients: Ingredients[] } = useElectricData(
    location.pathname + location.search
  )
  console.log({ recipe, ingredients })
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
              console.log(ri.listing, `,`, ri2.name, `: `, distance)
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

  console.log({ possibleMatches, checked })

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
        <ScrollArea scrollbars="vertical" style={{ maxHeight: 180 }}>
          <Text>{recipe.description}</Text>
        </ScrollArea>
      </Flex>
      <Flex direction="column" gap="4">
        <Flex direction="column" gap="2">
          <Heading size="4">Shopping List</Heading>
          <Text size="1">
            <Em>Review ingredients Kitchen.ai thinks you need to buy</Em>
          </Text>
        </Flex>
        {Object.keys(possibleMatches).map((ingredient_id: string) => {
          if (
            checked[ingredient_id] === false ||
            (typeof checked[ingredient_id] === `undefined` &&
              possibleMatches[ingredient_id] === null)
          ) {
            const ingredient: Recipe_ingredients =
              recipe.recipe_ingredients.find((i) => i.id === ingredient_id)
            return (
              <Text as="label" size="2">
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
          }
        })}
        <Button variant="outline">Add {} items to Shopping List</Button>
      </Flex>
      <Flex direction="column" gap="4">
        <Heading size="4">Already Have</Heading>
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
              <Flex direction="column" gap="2" position="relative">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Checkbox
                      checked={true}
                      onClick={() => {
                        setChecked({ ...checked, [ingredient_id]: false })
                      }}
                    />
                    {` `}
                    {ingredient.listing}
                  </Flex>
                </Text>
                {!possibleMatches[ingredient_id] && (
                  <AddIngredient ingredient={ingredient} />
                )}
                {possibleMatches[ingredient_id] && (
                  <Box pl="5" asChild>
                    <Text size="1">
                      <LightningBoltIcon height="10" width="10" /> matches:{` `}
                      "
                      <Link
                        to={`/ingredients/${possibleMatches[ingredient_id].id}`}
                      >
                        {possibleMatches[ingredient_id].name}
                      </Link>
                    </Text>
                  </Box>
                )}
              </Flex>
            )
          }
        })}
      </Flex>
    </Flex>
  )
}
