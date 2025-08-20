import * as React from "react"
import IngredientCard from "../components/ingredient-card"
import { Link, useLocation } from "@tanstack/react-router"
import { Heading, Flex, Link as RadixLink, Separator } from "@radix-ui/themes"
import { ingredientsCollection } from "../hooks/use-shapes"
import { useLiveQuery } from "@tanstack/react-db"

const queries = ({ db }: { db: Electric[`db`] }) => {
  return {
    ingredients: db.ingredients.liveMany({ orderBy: { updated_at: `desc` } }),
  }
}

IngredientsList.queries = queries
export default function IngredientsList() {
  const { data: ingredients } = useLiveQuery((q) =>
    q.from({ ingredientsCollection }).select(`@*`).orderBy(`@updated_at`)
  )

  return (
    <Flex direction="column" gap="7" pt="2">
      <Heading>Ingredients ({ingredients.length})</Heading>
      <Flex direction="column" gap="4">
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
    </Flex>
  )
}
