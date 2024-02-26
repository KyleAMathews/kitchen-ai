import { useUser } from "@clerk/clerk-react"
import { useElectric } from "../context"
import {
  Flex,
  Heading,
  TextFieldInput,
  Text,
  TextArea,
  Button,
} from "@radix-ui/themes"
import { genUUID } from "electric-sql/util"
import { Electric, Recipes } from "../generated/client"

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  db: Electric[`db`],
  user_id: string
) => {
  e.preventDefault()
  const id = genUUID()

  const target = e.target as HTMLFormElement
  const formData = new FormData(target)
  const formProps = { ...Object.fromEntries(formData), id }
  console.log({ formProps })

  const newRecipe = await db.recipes.create({
    data: {
      id,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
      name: ``,
      description: ``,
      url: formProps.url,
    },
  })
  console.log({ newRecipe })

  try {
    const response = await fetch(
      `https://7vxq1y2eu2.execute-api.us-east-1.amazonaws.com/recipes`,
      {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(formProps),
      }
    )
    if (!response.ok) {
      throw new Error(`Network response was not ok`)
    }
    const data = await response.json()
    console.log(`Submission successful`, data)
  } catch (error) {
    await db.recipes.delete({
      where: {
        id,
      },
    })
    console.error(`Submission failed`, error)
  }
}

export default function RecipeNew() {
  const { db } = useElectric()!
  const {
    user: { id: user_id },
  } = useUser()

  return (
    <Flex direction="column" gap="5">
      <Heading size="4">Add New Recipe</Heading>
      <form onSubmit={(e) => handleSubmit(e, db, user_id)}>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text as="label">URL</Text>
            <TextFieldInput name="url" />
          </Flex>
          <Flex direction="column" gap="2">
            <Text as="label">
              Copy/Paste recipe text (including Recipe title) and Kitchen.ai
              will extract the ingredients
            </Text>
            <TextArea name="pasted" />
          </Flex>
          <Button>Add Recipe</Button>
        </Flex>
      </form>
    </Flex>
  )
}
