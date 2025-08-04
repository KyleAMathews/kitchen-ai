import { useState } from "react"
import {
  Flex,
  Heading,
  TextField,
  Text,
  TextArea,
  Button,
} from "@radix-ui/themes"
import { UpdateIcon } from "@radix-ui/react-icons"
import { genUUID } from "electric-sql/util"
import { lambdaFunction } from "../util"
import { useNavigate } from "@tanstack/react-router"

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
  setWorking: Function,
  navigate: ReturnType<typeof useNavigate>
) => {
  setWorking(true)
  e.preventDefault()
  const id = genUUID()

  const target = e.target as HTMLFormElement
  const formData = new FormData(target)
  const formProps = { ...Object.fromEntries(formData), id }

  const API_URL = import.meta.env.VITE_API_URL
  console.log({ formProps, API_URL })
  const response = await fetch(new URL(`/recipes/process`, API_URL), {
    method: `POST`,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formProps)
  })

  const body = await response.json()
  console.log(body)
  // const newRecipe = await db.recipes.create({
  //   data: {
  //     id,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //     name: ``,
  //     description: ``,
  //     url: formProps.url,
  //   },
  // })
  //
  // try {
  //   const response = await fetch(`${lambdaFunction}/recipes`, {
  //     method: `POST`,
  //     headers: {
  //       "Content-Type": `application/json`,
  //     },
  //     body: JSON.stringify(formProps),
  //   })
  //   if (!response.ok) {
  //     throw new Error(`Network response was not ok`)
  //   }
  //   const data = await response.json()
  //   console.log(`Submission successful`, data)
  //   navigate(`/recipes`)
  // } catch (error) {
  //   await db.recipes.delete({
  //     where: {
  //       id,
  //     },
  //   })
  //   console.error(`Submission failed`, error)
  // } finally {
  //   setWorking(false)
  // }
}

export default function RecipeNew() {
  const [working, setWorking] = useState(false)
  const navigate = useNavigate()

  return (
    <Flex direction="column" gap="5">
      <Heading size="4">
        Add New Recipe <Working isWorking={working} />
      </Heading>
      <form onSubmit={(e) => handleSubmit(e, setWorking, navigate)}>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text as="label">URL</Text>
            <TextField.Root required name="url">
            </TextField.Root>
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
