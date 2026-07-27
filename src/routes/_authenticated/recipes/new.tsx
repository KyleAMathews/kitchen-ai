import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import {
  Heading,
  Flex,
  Text,
  Button,
  TextArea,
  TextField,
} from "@radix-ui/themes"
import { UpdateIcon } from "@radix-ui/react-icons"
import {
  recipesCollection,
  recipeIngredientsCollection,
  tagsCollection,
  recipeTagsCollection,
} from "@/lib/collections"
import TagInput from "@/components/tag-input"
import { createRecipe } from "@/lib/create-actions"
import type { SelectTag } from "@/db/zod-schemas"

export const Route = createFileRoute(`/_authenticated/recipes/new`)({
  component: NewRecipe,
  loader: async () => {
    return Promise.all([
      recipesCollection.preload(),
      recipeIngredientsCollection.preload(),
      tagsCollection.preload(),
      recipeTagsCollection.preload(),
    ])
  },
})

function Working({
  isWorking,
  style,
}: {
  isWorking: boolean
  style?: React.CSSProperties
}) {
  if (isWorking) {
    return (
      <UpdateIcon style={style} height="14" width="14" className="icon-spin" />
    )
  } else {
    return null
  }
}

function NewRecipe() {
  const navigate = useNavigate()
  const [error, setError] = useState(``)
  const defaultValues: {
    url: string
    pastedText: string
    tags: SelectTag[]
  } = {
    url: ``,
    pastedText: ``,
    tags: [],
  }

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (!value.pastedText.trim()) {
        setError(`Please paste the recipe text`)
        return
      }

      setError(``)
      try {
        const { id: recipeId, transaction } = createRecipe(value)
        await transaction.isPersisted.promise

        navigate({ to: `/recipes/$id`, params: { id: recipeId } })
      } catch (err) {
        console.error(`Recipe processing error:`, err)
        setError(
          err instanceof Error ? err.message : `Failed to process recipe`
        )
      }
    },
  })

  return (
    <div className="p-6">
      <Flex direction="column" gap="6">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Heading size="6">
              Add New Recipe <Working isWorking={isSubmitting} />
            </Heading>
          )}
        </form.Subscribe>

        <Text color="gray">
          Paste a recipe from any website and we'll automatically extract the
          ingredients and details using AI.
        </Text>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            form.handleSubmit()
          }}
        >
          <Flex direction="column" gap="4">
            <form.Field name="url">
              {(field) => (
                <Flex direction="column" gap="2">
                  <Text as="label" weight="medium">
                    Source URL (optional)
                  </Text>
                  <TextField.Root
                    name={field.name}
                    placeholder="https://example.com/recipe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </Flex>
              )}
            </form.Field>

            <form.Field name="pastedText">
              {(field) => (
                <Flex direction="column" gap="2">
                  <Text as="label" weight="medium">
                    Copy/Paste recipe text (including Recipe title) and
                    Kitchen.ai will extract the ingredients
                  </Text>
                  <TextArea
                    name={field.name}
                    placeholder="Paste your recipe here..."
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    rows={10}
                    style={{ minHeight: 200 }}
                  />
                </Flex>
              )}
            </form.Field>

            <form.Field name="tags">
              {(field) => (
                <Flex direction="column" gap="2">
                  <Text as="label" weight="medium">
                    Tags
                  </Text>
                  <form.Subscribe selector={(state) => state.isSubmitting}>
                    {(isSubmitting) => (
                      <TagInput
                        value={field.state.value}
                        onChange={field.handleChange}
                        label=""
                        placeholder="Search or add a tag..."
                        disabled={isSubmitting}
                      />
                    )}
                  </form.Subscribe>
                </Flex>
              )}
            </form.Field>

            {error && (
              <Text color="crimson" size="2">
                {error}
              </Text>
            )}

            <form.Subscribe
              selector={(state) => ({
                canSubmit: Boolean(state.values.pastedText.trim()),
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ canSubmit, isSubmitting }) => (
                <Button
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
                  style={{ alignSelf: `flex-start` }}
                >
                  {isSubmitting ? `Processing...` : `Add Recipe`}
                </Button>
              )}
            </form.Subscribe>
          </Flex>
        </form>
      </Flex>
    </div>
  )
}
