import { useLocation, useNavigate, Link } from "@tanstack/react-router"
import { Flex, Heading, Separator } from "@radix-ui/themes"
import { useElectricData } from "electric-query"
import { Electric, Recipes } from "../generated/client"
import { useElectric } from "../context"
import { useUser } from "@clerk/clerk-react"
import RecipeCard from "../components/recipe-card"
import { PlusCircledIcon } from "@radix-ui/react-icons"

const queries = ({ db }: { db: Electric[`db`] }) => {
  return {
    recipes: db.recipes.liveMany({
      orderBy: {
        updated_at: `desc`,
      },
      include: {
        recipe_ingredients: true,
      },
    }),
  }
}

Recipes.queries = queries

export default function Recipes() {
  const location = useLocation()
  const navigate = useNavigate()
  // const { db } = useElectric()!
  const {
    user: { id: user_id },
  } = useUser()

  // const { recipes }: { recipes: Recipes[] } = useElectricData(
  //   location.pathname + location.search
  // )
  const recipes: Recipes[] = []

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
            <>
              <RecipeCard recipe={recipe} />
              {recipes.length - 1 !== i && <Separator size="4" />}
            </>
          )
        })}
      </Flex>
    </Flex>
  )
}
