import { useMemo, useRef, useState } from "react"
import { Flex, Text, Badge } from "@radix-ui/themes"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useLiveQuery } from "@tanstack/react-db"
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
 * As the user types, existing tags that match are suggested and can be
 * selected. If the typed text doesn't match an existing tag, pressing Enter or
 * Space (or clicking away) turns it into a brand-new tag. Shift+Space types a
 * literal space, so multi-word tags are still possible.
 *
 * New tags are built locally and are NOT saved here — the parent form persists
 * them on submit via persistNewTags, so cancelling leaves no stray tags.
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
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Every existing tag — the vocabulary is global, so suggestions include
  // tags created by other users
  const { data: allTags } = useLiveQuery((q) => q.from({ tag: tagsCollection }))

  const selectedIds = useMemo(() => new Set(value.map((t) => t.id)), [value])
  const trimmed = input.trim()

  // Suggestions: existing tags matching the input that aren't already selected
  const suggestions = useMemo(() => {
    const query = trimmed.toLowerCase()
    return (allTags ?? [])
      .filter(
        (tag) =>
          !selectedIds.has(tag.id) &&
          (query === `` || tag.name.toLowerCase().includes(query))
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 8)
  }, [allTags, trimmed, selectedIds])

  const exactMatch = useMemo(
    () =>
      (allTags ?? []).find(
        (tag) => tag.name.toLowerCase() === trimmed.toLowerCase()
      ),
    [allTags, trimmed]
  )

  const addTag = (tag: SelectTag) => {
    if (!selectedIds.has(tag.id)) {
      onChange([...value, tag])
    }
    setInput(``)
    setHighlight(0)
    setOpen(false)
  }

  const removeTag = (id: string) => {
    onChange(value.filter((t) => t.id !== id))
  }

  // Turn the current input into a tag: reuse an existing one if it matches,
  // otherwise build a new one. New tags are only saved when the parent form is
  // submitted (see persistNewTags), so abandoning the form leaves nothing behind.
  const commitInput = () => {
    if (!trimmed) return

    // Already selected (including tags built here but not yet saved)
    const alreadySelected = value.find(
      (tag) => tag.name.toLowerCase() === trimmed.toLowerCase()
    )
    if (alreadySelected) {
      setInput(``)
      setHighlight(0)
      setOpen(false)
      return
    }

    if (exactMatch) {
      addTag(exactMatch)
      return
    }

    addTag({
      id: crypto.randomUUID(),
      name: trimmed,
      // Provenance only, and the server sets the real value from the session
      user_id: userId ?? null,
      created_at: new Date(),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isSpace = e.key === ` `

    // Shift+Space types a literal space, so multi-word tags stay possible
    // (e.g. "pantry staple"). Pasting multi-word text works too.
    if (isSpace && e.shiftKey) return

    // Space, Enter and comma all turn the typed text into a tag
    if (e.key === `Enter` || e.key === `,` || isSpace) {
      e.preventDefault()
      // Space with nothing typed is a no-op rather than a stray commit
      if (isSpace && !trimmed) return
      // If a suggestion is highlighted, prefer it; otherwise commit the text.
      if (open && suggestions.length > 0 && suggestions[highlight]) {
        addTag(suggestions[highlight])
      } else {
        commitInput()
      }
    } else if (e.key === `ArrowDown`) {
      e.preventDefault()
      setOpen(true)
      setHighlight((h) => Math.min(h + 1, suggestions.length - 1))
    } else if (e.key === `ArrowUp`) {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === `Backspace` && input === `` && value.length > 0) {
      // Backspace on an empty field removes the last tag
      removeTag(value[value.length - 1].id)
    } else if (e.key === `Escape`) {
      setOpen(false)
    }
  }

  const showDropdown = open && suggestions.length > 0

  // Always shown, so the field never shifts and the shortcuts stay discoverable
  const hint = `Press Enter or Space to create a tag · Shift+Space for a multi-word tag`

  return (
    <Flex direction="column" gap="1">
      {label && <Text size="1">{label}</Text>}
      <div style={{ position: `relative` }}>
        <Flex
          align="center"
          gap="1"
          wrap="wrap"
          style={{
            border: `1px solid var(--gray-a7)`,
            borderRadius: `var(--radius-2)`,
            padding: `4px 6px`,
            background: `var(--color-surface)`,
            minHeight: 36,
          }}
        >
          {value.map((tag) => (
            <Badge key={tag.id} color="iris" variant="soft" size="1">
              {tag.name}
              <button
                type="button"
                aria-label={`Remove ${tag.name}`}
                onClick={() => removeTag(tag.id)}
                disabled={disabled}
                style={{
                  display: `inline-flex`,
                  alignItems: `center`,
                  border: `none`,
                  background: `transparent`,
                  cursor: `pointer`,
                  padding: 0,
                  marginLeft: 2,
                  color: `inherit`,
                }}
              >
                <Cross2Icon width="11" height="11" />
              </button>
            </Badge>
          ))}
          <input
            value={input}
            placeholder={value.length === 0 ? placeholder : ``}
            disabled={disabled}
            onChange={(e) => {
              setInput(e.target.value)
              setOpen(true)
              setHighlight(0)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              // Delay so a click on a suggestion still registers.
              blurTimeout.current = setTimeout(() => {
                setOpen(false)
                // Clicking away turns any typed text into a tag.
                commitInput()
              }, 150)
            }}
            style={{
              flex: 1,
              minWidth: 120,
              border: `none`,
              outline: `none`,
              background: `transparent`,
              color: `var(--gray-12)`,
              fontSize: `var(--font-size-2)`,
              padding: `2px 4px`,
            }}
          />
        </Flex>

        {showDropdown && (
          <div
            style={{
              position: `absolute`,
              top: `calc(100% + 4px)`,
              left: 0,
              right: 0,
              zIndex: 20,
              background: `var(--color-panel-solid)`,
              border: `1px solid var(--gray-a6)`,
              borderRadius: `var(--radius-2)`,
              boxShadow: `var(--shadow-4)`,
              overflow: `hidden`,
            }}
            // Keep focus on the input so blur-commit doesn't fire mid-click.
            onMouseDown={(e) => {
              e.preventDefault()
              if (blurTimeout.current) clearTimeout(blurTimeout.current)
            }}
          >
            {suggestions.map((tag, i) => (
              <div
                key={tag.id}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => addTag(tag)}
                style={{
                  padding: `6px 10px`,
                  cursor: `pointer`,
                  fontSize: `var(--font-size-2)`,
                  color: `var(--gray-12)`,
                  background:
                    i === highlight ? `var(--gray-a3)` : `transparent`,
                }}
              >
                {tag.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <Text size="1" color="gray">
        {hint}
      </Text>
    </Flex>
  )
}
