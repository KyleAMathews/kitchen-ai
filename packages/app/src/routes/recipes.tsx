import * as React from "react"
import { useLocation, useNavigate, Link } from "@tanstack/react-router"
import { Flex, Heading, Separator } from "@radix-ui/themes"
import { useShape } from "@electric-sql/react"
import { useUser } from "@clerk/clerk-react"
import RecipeCard from "../components/recipe-card"
import { PlusCircledIcon } from "@radix-ui/react-icons"

// const queries = ({ db }: { db: Electric[`db`] }) => {
//   return {
//     recipes: db.recipes.liveMany({
//       orderBy: {
//         updated_at: `desc`,
//       },
//       include: {
//         recipe_ingredients: true,
//       },
//     }),
//   }
// }
//
// Recipes.queries = queries

export default function Recipes() {
  const location = useLocation()
  const navigate = useNavigate()
  // const { db } = useElectric()!
  // const {
  //   user: { id: user_id },
  // } = useUser()
  const { data: recipes, isLoading: isRecipesLoading } = useShape({
    url: `${import.meta.env.VITE_API_URL}/v1/shape`,
    params: {
      table: `recipes`,
    },
  })

  if (isRecipesLoading) {
    return null
  }

  console.log({ recipes })

  return (
    <Flex direction="column" gap="7" pt="2">
      <Flex direction="column" gap="5">
        <Heading size="6">
          Recipes{` `}({recipes.length})
          <Link
            to="/recipes/new"
            style={{
              height: 20,
              display: `inline-block`,
              position: `relative`,
              top: 3,
              left: 8,
            }}
          >
            <PlusCircledIcon height="20" width="20" style={{ height: 20 }} />
          </Link>
        </Heading>
      </Flex>
      <Flex direction="column" gap="4">
        {recipes.map((recipe, i) => {
          return (
            <React.Fragment key={recipe.id}>
              <RecipeCard recipe={recipe} />
              {recipes.length - 1 !== i && <Separator size="4" />}
            </React.Fragment>
          )
        })}
      </Flex>
    </Flex>
  )
}
