import { useState } from "react"
import { useForm } from "@tanstack/react-form"
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
import {
  ingredientsTrackingTypeSchema,
  type SelectIngredient,
  type SelectTag,
} from "@/db/zod-schemas"
import { createIngredient } from "@/lib/create-actions"
import ExpirationDateEdit from "@/components/expiration-date-edit"
import TagInput from "@/components/tag-input"

interface AddIngredientFormProps {
  defaultName?: string
  onClose: () => void
  onSuccess?: () => void
}

interface AddIngredientFormValues {
  name: string
  tracking_type: NonNullable<SelectIngredient[`tracking_type`]>
  expiration_date: Date
  fill_level: number
  count: number
  tags: SelectTag[]
}

export default function AddIngredientForm({
  defaultName = ``,
  onClose,
  onSuccess,
}: AddIngredientFormProps) {
  const [error, setError] = useState<string | null>(null)
  const defaultValues: AddIngredientFormValues = {
    name: defaultName,
    tracking_type: `fill_level`,
    expiration_date: new Date(),
    fill_level: 50,
    count: 1,
    tags: [],
  }

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      setError(null)
      try {
        const expirationDate =
          value.tracking_type === `pantry_staple`
            ? new Date(Date.now() + 365 * 10 * 24 * 60 * 60 * 1000)
            : value.expiration_date

        await createIngredient({
          name: value.name,
          tracking_type: value.tracking_type,
          fill_level:
            value.tracking_type === `fill_level`
              ? value.fill_level
              : value.tracking_type === `pantry_staple`
                ? 100
                : 0,
          count: value.tracking_type === `count` ? value.count : 0,
          expiration_date: expirationDate,
          tags: value.tags,
        }).isPersisted.promise

        onSuccess?.()
        onClose()
      } catch (err) {
        setError(
          err instanceof Error ? err.message : `Failed to add ingredient`
        )
      }
    },
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Subscribe
        selector={(state) => ({
          isSubmitting: state.isSubmitting,
          trackingType: state.values.tracking_type,
          fillLevel: state.values.fill_level,
        })}
      >
        {({ isSubmitting, trackingType, fillLevel }) => (
          <>
            <Flex direction="column" gap="5">
              {error && (
                <Callout.Root color="red">
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}
              <form.Field name="name">
                {(field) => (
                  <label>
                    <Flex direction="column" gap="1">
                      <Text size="1">Ingredient Name</Text>
                      <TextField.Root
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Enter the ingredient name"
                        required
                        disabled={isSubmitting}
                        onKeyDown={(event) => {
                          if (event.key === `Enter`) event.preventDefault()
                        }}
                      />
                    </Flex>
                  </label>
                )}
              </form.Field>
              <form.Field name="tracking_type">
                {(field) => (
                  <Flex direction="column" gap="1">
                    <Text size="1" as="p">
                      Track ingredient by "fill level" or by "count"
                    </Text>
                    <Box py="1">
                      <RadioGroup.Root
                        value={field.state.value}
                        name={field.name}
                        onValueChange={(value) =>
                          field.handleChange(
                            ingredientsTrackingTypeSchema.parse(value)
                          )
                        }
                        disabled={isSubmitting}
                      >
                        <Flex gap="2" direction="column">
                          <Text as="label" size="2">
                            <Flex gap="2">
                              <RadioGroup.Item value="fill_level" />
                              Fill Level (0-100%)
                            </Flex>
                          </Text>
                          <Text as="label" size="2">
                            <Flex gap="2">
                              <RadioGroup.Item value="count" />
                              Count (e.g. number of cans)
                            </Flex>
                          </Text>
                          <Text as="label" size="2">
                            <Flex gap="2">
                              <RadioGroup.Item value="pantry_staple" />
                              Pantry Staple (always have)
                            </Flex>
                          </Text>
                        </Flex>
                      </RadioGroup.Root>
                    </Box>
                  </Flex>
                )}
              </form.Field>
              {trackingType === `count` ? (
                <form.Field name="count">
                  {(field) => (
                    <label>
                      <Text as="div" size="1" mb="1">
                        Count
                      </Text>
                      <TextField.Root
                        type="number"
                        name={field.name}
                        value={String(field.state.value)}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(
                            parseInt(event.target.value, 10) || 0
                          )
                        }
                        placeholder="How many of this ingredient do you have?"
                        disabled={isSubmitting}
                        onKeyDown={(event) => {
                          if (event.key === `Enter`) event.preventDefault()
                        }}
                      />
                    </label>
                  )}
                </form.Field>
              ) : trackingType === `fill_level` ? (
                <form.Field name="fill_level">
                  {(field) => (
                    <label>
                      <Flex direction="column" gap="2">
                        <Text size="1">Fill Level</Text>
                        <Slider
                          value={[field.state.value]}
                          name={field.name}
                          onValueChange={(value) =>
                            field.handleChange(value[0] ?? 0)
                          }
                          disabled={isSubmitting}
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
                  )}
                </form.Field>
              ) : null}
              {trackingType !== `pantry_staple` && (
                <form.Field name="expiration_date">
                  {(field) => (
                    <ExpirationDateEdit
                      onValueChange={field.handleChange}
                      expirationDate={field.state.value}
                    />
                  )}
                </form.Field>
              )}
              <form.Field name="tags">
                {(field) => (
                  <TagInput
                    value={field.state.value}
                    onChange={field.handleChange}
                    placeholder="Search or add a tag..."
                    disabled={isSubmitting}
                  />
                )}
              </form.Field>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? `Adding...` : `Save`}
              </Button>
              <Button
                type="button"
                variant="soft"
                color="gray"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </Flex>
          </>
        )}
      </form.Subscribe>
    </form>
  )
}
