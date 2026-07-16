import { useState } from "react"
import { z } from "zod"
import {
  Flex,
  Text,
  TextField,
  RadioGroup,
  Slider,
  Box,
  Button,
  Callout,
} from "@radix-ui/themes"
import { ingredientsTrackingTypeSchema, type SelectTag } from "@/db/zod-schemas"
import { trpc } from "@/lib/trpc-client"
import { ingredientTagsCollection } from "@/lib/collections"
import { persistNewTags } from "@/lib/tags"
import ExpirationDateEdit from "@/components/expiration-date-edit"
import TagInput from "@/components/tag-input"

interface AddIngredientFormProps {
  defaultName?: string
  onClose: () => void
  onSuccess?: () => void
}

export default function AddIngredientForm({
  defaultName = ``,
  onClose,
  onSuccess,
}: AddIngredientFormProps) {
  const [type, setType] = useState(`fill_level`)
  const [expirationDate, setExpirationDate] = useState(new Date())
  const [fillLevel, setFillLevel] = useState(50)
  const [count, setCount] = useState(1)
  const [selectedTags, setSelectedTags] = useState<SelectTag[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const target = event.target as HTMLFormElement
      const formData = new FormData(target)
      const formProps = Object.fromEntries(formData)

      const result = await trpc.ingredients.createWithAI.mutate({
        name: formProps.name as string,
        tracking_type: type as z.infer<typeof ingredientsTrackingTypeSchema>,
        fill_level:
          type === `fill_level`
            ? fillLevel
            : type === `pantry_staple`
              ? 100
              : 0,
        count: type === `count` ? count : 0,
        expiration_date: type !== `pantry_staple` ? expirationDate : undefined,
      })

      // Save any newly-typed tags first — the join rows below reference them
      await persistNewTags(selectedTags)

      // Attach the selected tags to the new ingredient
      for (const tag of selectedTags) {
        ingredientTagsCollection.insert({
          id: crypto.randomUUID(),
          ingredient_id: result.ingredient.id,
          tag_id: tag.id,
          created_at: new Date(),
        })
      }

      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to add ingredient`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="5">
        {error && (
          <Callout.Root color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <label>
          <Flex direction="column" gap="1">
            <Text size="1">Ingredient Name</Text>
            <TextField.Root
              name="name"
              defaultValue={defaultName}
              placeholder="Enter the ingredient name"
              required
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === `Enter`) {
                  e.preventDefault()
                }
              }}
            />
          </Flex>
        </label>
        <label>
          <Flex direction="column" gap="1">
            <Text size="1" as="p">
              Track ingredient by "fill level" or by "count"
            </Text>
            <Box py="1">
              <RadioGroup.Root
                value={type}
                name="tracking_type"
                onValueChange={(value) => {
                  setType(value)
                }}
                disabled={isLoading}
              >
                <Flex gap="2" direction="column">
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="fill_level" />
                      {` `}
                      Fill Level (0-100%)
                    </Flex>
                  </Text>
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="count" /> Count (e.g. number of
                      cans)
                    </Flex>
                  </Text>
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="pantry_staple" /> Pantry Staple
                      (always have)
                    </Flex>
                  </Text>
                </Flex>
              </RadioGroup.Root>
            </Box>
          </Flex>
        </label>
        {type === `count` ? (
          <label>
            <Text as="div" size="1" mb="1">
              Count
            </Text>
            <TextField.Root
              type="number"
              name="count"
              value={String(count)}
              onChange={(e) => setCount(parseInt(e.target.value, 10) || 0)}
              placeholder="How many of this ingredient do you have?"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === `Enter`) {
                  e.preventDefault()
                }
              }}
            />
          </label>
        ) : type === `fill_level` ? (
          <label>
            <Flex direction="column" gap="2">
              <Text size="1">Fill Level</Text>
              <Slider
                value={[fillLevel]}
                name="fill_level"
                onValueChange={(val) => setFillLevel(val[0])}
                disabled={isLoading}
              />
              <Flex justify="between">
                <Text size="1" color="gray">
                  0%
                </Text>
                <Text size="1" color="gray">
                  {fillLevel}%
                </Text>
                <Text size="1" color="gray">
                  100%
                </Text>
              </Flex>
            </Flex>
          </label>
        ) : null}
        {type !== `pantry_staple` && (
          <ExpirationDateEdit
            onValueChange={setExpirationDate}
            expirationDate={expirationDate}
          />
        )}
        <TagInput
          value={selectedTags}
          onChange={setSelectedTags}
          placeholder="Search or add a tag..."
          disabled={isLoading}
        />
      </Flex>

      <Flex gap="3" mt="4" justify="end">
        <Button
          variant="soft"
          color="gray"
          onClick={(e) => {
            e.preventDefault()
            onClose()
          }}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? `Adding...` : `Save`}
        </Button>
      </Flex>
    </form>
  )
}
