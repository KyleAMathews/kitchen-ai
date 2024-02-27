import * as React from "react"
import IngredientCard from "../components/ingredient-card"
import { useElectricData } from "electric-query"
import { useLocation } from "react-router-dom"
import { Heading, Flex, Link as RadixLink, Separator } from "@radix-ui/themes"

const queries = ({ db }: { db: Electric[`db`] }) => {
  return {
    ingredients: db.ingredients.liveMany({ orderBy: { name: `asc` } }),
  }
}

IngredientsList.queries = queries
export default function IngredientsList() {
  const location = useLocation()
  const {
    ingredients,
  }: {
    ingredients: Ingredients[]
  } = useElectricData(location.pathname + location.search)
  console.log({
    ingredients,
  })
  return (
    <Flex direction="column" gap="5">
      <Heading>Ingredients ({ingredients.length})</Heading>
      {ingredients.map((ingredient, i: number) => {
        if (ingredient.is_reviewed) {
          return (
            <React.Fragment key={ingredient.id}>
              <IngredientCard ingredient={ingredient} />
              {i !== ingredients.length - 1 && (
                <Separator
                  key={ingredient.id + `-seperator`}
                  orientation="horizontal"
                  size="4"
                />
              )}
            </React.Fragment>
          )
        }
      })}
    </Flex>
  )
}