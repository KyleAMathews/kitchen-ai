import { useState } from "react"
import {
  Flex,
  Heading,
  Link as RadixLink,
  Checkbox,
  Switch,
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
import { useLocation, Link } from "react-router-dom"
import {
  Electric,
  Recipes,
  Ingredients,
  Recipe_ingredients,
  Shopping_list,
} from "../generated/client"
import { useElectricData } from "electric-query"
import { useElectric } from "../context"
import { groupBy, uniqBy } from "lodash"

function RecipeMode({ groupedByRecipe }) {
  return (
    <>
      {Object.keys(groupedByRecipe).map((recipe_id) => {
        const recipe: Recipes = groupedByRecipe[recipe_id][0].recipes
        const ingredientsToBuy = groupedByRecipe[recipe_id].map(
          (ri) => ri.recipe_ingredients
        ) as Recipe_ingredients[]
        console.log({ ingredientsToBuy })
        return (
          <Flex direction="column" gap="4">
            <Heading size="3" asChild>
              <RadixLink asChild>
                <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
              </RadixLink>
            </Heading>
            {ingredientsToBuy.map((ingredient: Ingredients) => {
              return (
                <Text
                  as="label"
                  size="2"
                  style={{ position: `relative`, paddingRight: 12 }}
                >
                  <Flex gap="2">
                    <Checkbox
                      checked={false}
                      onClick={() => {
                        // setChecked({ ...checked, [ingredient_id]: true })
                      }}
                    />
                    {ingredient.listing}
                  </Flex>
                </Text>
              )
            })}
          </Flex>
        )
      })}
    </>
  )
}

function StoreMode({ groupedByStoreSection }) {
  return (
    <>
      {Object.keys(groupedByStoreSection).map((sectionKey) => {
        let section: string = ``
        if (sectionKey === `Dry_Goods`) {
          section = `Dry Goods`
        } else if (sectionKey === `Canned_Foods`) {
          section = `Canned Foods`
        } else {
          section = sectionKey.split(`_`).join(` / `)
        }
        const ingredientsToBuy = groupedByStoreSection[sectionKey].map(
          (ri) => ri.recipe_ingredients
        ) as Recipe_ingredients[]
        console.log({ ingredientsToBuy })
        return (
          <Flex direction="column" gap="4">
            <Heading size="3">{section}</Heading>
            {ingredientsToBuy.map((ingredient: Ingredients) => {
              return (
                <Text
                  as="label"
                  size="2"
                  style={{ position: `relative`, paddingRight: 12 }}
                >
                  <Flex gap="2">
                    <Checkbox
                      checked={false}
                      onClick={() => {
                        // setChecked({ ...checked, [ingredient_id]: true })
                      }}
                    />
                    {ingredient.listing}
                  </Flex>
                </Text>
              )
            })}
          </Flex>
        )
      })}
    </>
  )
}
const queries = ({ db, id }: { db: Electric[`db`]; id: string }) => {
  return {
    shopping_list: db.shopping_list.liveMany({
      where: {
        recipe_id: id,
      },
      include: {
        recipe_ingredients: true,
        recipes: true,
      },
    }),
  }
}

ShoppingCart.queries = queries

export default function ShoppingCart() {
  const location = useLocation()
  const { db } = useElectric()!
  const [storeMode, setStoreMode] = useState(false)

  const {
    shopping_list,
  }: {
    shopping_list: Shopping_list[]
  } = useElectricData(location.pathname + location.search)
  const uniqShoppingList = uniqBy(shopping_list, (i) => i.id) as Shopping_list[]
  console.log({ uniqShoppingList })
  const groupedByRecipe = groupBy(uniqShoppingList, (item) => item.recipe_id)
  const groupedByStoreSection = groupBy(
    uniqShoppingList,
    (item) => item.recipe_ingredients.grocery_section
  )
  console.log({ shopping_list, groupedByRecipe, groupedByStoreSection })

  return (
    <Flex direction="column" gap="6">
      <Heading>Shopping List</Heading>
      <Text as="label" size="2">
        <Flex gap="2">
          <Switch
            onCheckedChange={(state: boolean) => setStoreMode(state)}
            checked={storeMode}
          />
          {` `}
          Store Mode
        </Flex>
      </Text>
      {storeMode ? (
        <StoreMode groupedByStoreSection={groupedByStoreSection} />
      ) : (
        <RecipeMode groupedByRecipe={groupedByRecipe} />
      )}
    </Flex>
  )
}
