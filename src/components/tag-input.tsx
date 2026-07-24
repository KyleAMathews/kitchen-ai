import { useMemo, useState } from "react"
import { Text, Theme } from "@radix-ui/themes"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useLiveQuery } from "@tanstack/react-db"
import {
  Button,
  ComboBox,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
  Tag,
  TagGroup,
  TagList,
} from "react-aria-components"
import { tagsCollection } from "@/lib/collections"
import { authClient } from "@/lib/auth-client"
import type { SelectTag } from "@/db/zod-schemas"

interface TagInputProps {
  value: SelectTag[]
  onChange: (tags: SelectTag[]) => void
  label?: string
  placeholder?: string
  disabled?: boolean
}

/**
 * A tag entry field that doubles as a search box.
 *
 * React Aria owns the combobox, listbox, and tag keyboard behavior. Space,
 * Enter, and comma keep the app's quick-entry behavior; Shift+Space inserts a
 * literal space for multi-word tags.
 *
 * New tags are built locally and are not saved until the parent form submits.
 */
export default function TagInput({
  value,
  onChange,
  label = `Tags`,
  placeholder = `Add a tag...`,
  disabled = false,
}: TagInputProps) {
  const { data: session } = authClient.useSession()
  const userId = session?.user?.id
  const [input, setInput] = useState(``)

  // Tags are global, so suggestions include tags created by every user.
  const { data: allTags } = useLiveQuery((q) => q.from({ tag: tagsCollection }))

  const selectedIds = useMemo(
    () => new Set(value.map((tag) => tag.id)),
    [value]
  )
  const suggestions = useMemo(() => {
    const query = input.trim().toLowerCase()
    return (allTags ?? [])
      .filter(
        (tag) =>
          !selectedIds.has(tag.id) &&
          (query === `` || tag.name.toLowerCase().includes(query))
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 8)
  }, [allTags, input, selectedIds])

  const addTag = (tag: SelectTag) => {
    if (
      !value.some(
        (selected) =>
          selected.id === tag.id ||
          selected.name.toLowerCase() === tag.name.toLowerCase()
      )
    ) {
      onChange([...value, tag])
    }
    setInput(``)
  }

  const commitInput = () => {
    const name = input.trim()
    if (!name) return

    const existing =
      value.find((tag) => tag.name.toLowerCase() === name.toLowerCase()) ??
      (allTags ?? []).find(
        (tag) => tag.name.toLowerCase() === name.toLowerCase()
      )

    if (existing) {
      addTag(existing)
      return
    }

    addTag({
      id: crypto.randomUUID(),
      name,
      // Provenance only; the server sets the real value from the session.
      user_id: userId ?? null,
      created_at: new Date(),
    })
  }

  const removeTags = (ids: Set<React.Key>) => {
    onChange(value.filter((tag) => !ids.has(tag.id)))
  }

  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        gap: `var(--space-1)`,
      }}
    >
      {label && <Text size="1">{label}</Text>}
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          flexWrap: `wrap`,
          gap: `var(--space-1)`,
          minHeight: 36,
          padding: `4px 6px`,
          border: `1px solid var(--gray-a7)`,
          borderRadius: `var(--radius-2)`,
          background: `var(--color-surface)`,
        }}
      >
        <TagGroup
          aria-label="Selected tags"
          onRemove={disabled ? undefined : removeTags}
        >
          <TagList
            items={value}
            style={{
              display: `flex`,
              alignItems: `center`,
              flexWrap: `wrap`,
              gap: `var(--space-1)`,
            }}
          >
            {(tag) => (
              <Tag
                id={tag.id}
                textValue={tag.name}
                style={({ isFocusVisible }) => ({
                  display: `inline-flex`,
                  alignItems: `center`,
                  gap: 2,
                  padding: `2px 6px`,
                  borderRadius: `max(var(--radius-1), var(--radius-full))`,
                  background: `var(--iris-a3)`,
                  color: `var(--iris-a11)`,
                  fontSize: `var(--font-size-1)`,
                  lineHeight: `var(--line-height-1)`,
                  outline: isFocusVisible ? `2px solid var(--focus-8)` : `none`,
                })}
              >
                {tag.name}
                <Button
                  slot="remove"
                  aria-label={`Remove ${tag.name}`}
                  isDisabled={disabled}
                  style={{
                    display: `inline-flex`,
                    alignItems: `center`,
                    padding: 0,
                    border: 0,
                    background: `transparent`,
                    color: `inherit`,
                    cursor: `pointer`,
                  }}
                >
                  <Cross2Icon width="11" height="11" />
                </Button>
              </Tag>
            )}
          </TagList>
        </TagGroup>
        <ComboBox
          aria-label={label || `Tags`}
          items={suggestions}
          inputValue={input}
          onInputChange={setInput}
          allowsCustomValue
          menuTrigger="focus"
          isDisabled={disabled}
          defaultFilter={() => true}
          style={{
            position: `relative`,
            flex: 1,
            minWidth: 120,
          }}
        >
          <Input
            placeholder={value.length === 0 ? placeholder : ``}
            onKeyDown={(event) => {
              const isSpace = event.key === ` `
              if (isSpace && event.shiftKey) return

              if (event.key === `,` || isSpace) {
                event.preventDefault()
                commitInput()
              } else if (event.key === `Enter` && suggestions.length === 0) {
                event.preventDefault()
                commitInput()
              } else if (
                event.key === `Backspace` &&
                input === `` &&
                value.length > 0
              ) {
                event.preventDefault()
                onChange(value.slice(0, -1))
              }
            }}
            onBlur={commitInput}
            style={{
              width: `100%`,
              padding: `2px 4px`,
              border: 0,
              outline: `none`,
              background: `transparent`,
              color: `var(--gray-12)`,
              fontSize: `var(--font-size-2)`,
            }}
          />
          <Theme asChild>
            <Popover
              placement="bottom start"
              style={{
                width: `var(--trigger-width)`,
                marginTop: 4,
                overflow: `hidden`,
                zIndex: 1000,
                border: `1px solid var(--gray-a6)`,
                borderRadius: `var(--radius-2)`,
                background: `var(--color-panel-solid)`,
                boxShadow: `var(--shadow-4)`,
              }}
            >
              <ListBox<SelectTag>
                items={suggestions}
                style={{ maxHeight: 240, overflow: `auto`, outline: `none` }}
              >
                {(tag) => (
                  <ListBoxItem
                    id={tag.id}
                    textValue={tag.name}
                    onAction={() => addTag(tag)}
                    style={({ isFocused }) => ({
                      padding: `6px 10px`,
                      cursor: `pointer`,
                      fontSize: `var(--font-size-2)`,
                      color: `var(--gray-12)`,
                      background: isFocused ? `var(--gray-a3)` : `transparent`,
                      outline: `none`,
                    })}
                  >
                    {tag.name}
                  </ListBoxItem>
                )}
              </ListBox>
            </Popover>
          </Theme>
        </ComboBox>
      </div>
      <Text size="1" color="gray">
        Press Enter or Space to create a tag · Shift+Space for a multi-word tag
      </Text>
    </div>
  )
}
