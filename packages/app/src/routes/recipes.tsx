import * as React from "react"
import { useLiveQuery } from "@tanstack/react-db"
import { Link } from "@tanstack/react-router"
import { Flex, Button, Heading, Separator } from "@radix-ui/themes"
import RecipeCard from "../components/recipe-card"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { recipesCollection } from "../hooks/use-shapes"

export default function Recipes() {
  // const location = useSearch({ from: "/recipes" })
  // const navigate = useNavigate()
  const { data: recipes } = useLiveQuery((q) => q.from({ recipesCollection }))

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
