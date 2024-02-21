import { useLocation, Link } from "react-router-dom"
import { useEffect } from "react"
import {
  Flex,
  Heading,
  Link as RadixLink,
  Checkbox,
  ScrollArea,
  Text,
} from "@radix-ui/themes"
import { useElectricData } from "electric-query"
import { Electric, Recipes, Ingredients } from "../generated/client"
import { genUUID } from "electric-sql/util"
import { useElectric } from "../context"
import { useUser } from "@clerk/clerk-react"

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

  useEffect(() => {
    async function refresh() {
      const response = await fetch(
        `https://7vxq1y2eu2.execute-api.us-east-1.amazonaws.com/recipe-ingredients-intersection`,
        {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({
            allIngredients: ingredients.map((ingredient) => {
              return {
                id: ingredient.id,
                name: ingredient.name,
                description: ingredient.description,
              }
            }),
            recipeIngredients: recipe.recipe_ingredients.map((ingredient) => {
              return {
                id: ingredient.id,
                text: ingredient.text,
              }
            }),
            name: recipe.name,
            description: recipe.description,
          }),
        }
      )
    }

    refresh()
  }, [recipe.id])

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
        {recipe.recipe_ingredients.map((ingredient) => {
          return (
            <Text as="label" size="2">
              <Flex gap="2">
                <Checkbox /> {ingredient.text}
              </Flex>
            </Text>
          )
        })}
      </Flex>
    </Flex>
  )
}
