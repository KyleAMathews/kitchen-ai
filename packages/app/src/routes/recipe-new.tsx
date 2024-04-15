import { useState } from "react"
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
import { UpdateIcon } from "@radix-ui/react-icons"
import { genUUID } from "electric-sql/util"
import { Electric, Recipes } from "../generated/client"
import { lambdaFunction } from "../util"
import { useNavigate, NavigateFunction } from "react-router"

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

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  db: Electric[`db`],
  user_id: string,
  setWorking: Function,
  navigate: NavigateFunction
) => {
  setWorking(true)
  e.preventDefault()
  const id = genUUID()

  const target = e.target as HTMLFormElement
  const formData = new FormData(target)
  const formProps = { ...Object.fromEntries(formData), id }

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

  try {
    const response = await fetch(`${lambdaFunction}/recipes`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(formProps),
    })
    if (!response.ok) {
      throw new Error(`Network response was not ok`)
    }
    const data = await response.json()
    console.log(`Submission successful`, data)
    navigate(`/recipes`)
  } catch (error) {
    await db.recipes.delete({
      where: {
        id,
      },
    })
    console.error(`Submission failed`, error)
  } finally {
    setWorking(false)
  }
}

export default function RecipeNew() {
  const [working, setWorking] = useState(false)
  const navigate = useNavigate()
  const { db } = useElectric()!
  const {
    user: { id: user_id },
  } = useUser()

  return (
    <Flex direction="column" gap="5">
      <Heading size="4">
        Add New Recipe <Working isWorking={working} />
      </Heading>
      <form onSubmit={(e) => handleSubmit(e, db, user_id, setWorking, navigate)}>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text as="label">URL</Text>
            <TextFieldInput required name="url" />
          </Flex>
          <Flex direction="column" gap="2">
            <Text as="label">
              Copy/Paste recipe text (including Recipe title) and Kitchen.ai
              will extract the ingredients
            </Text>
            <TextArea required name="pasted" />
          </Flex>
          <Button disabled={working}>Add Recipe</Button>
        </Flex>
      </form>
    </Flex>
  )
}
