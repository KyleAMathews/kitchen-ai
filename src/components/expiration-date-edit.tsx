import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Flex, Text, Popover } from "@radix-ui/themes"
import DatePicker from "react-date-picker"

export default function ExpirationDateEdit({
  onValueChange = null,
  onValueCommit = null,
  expirationDate,
}: {
  onValueCommit?: ((date: Date) => void) | null
  onValueChange?: ((date: Date) => void) | null
  expirationDate: Date
}) {
  return (
    <Flex direction="column" gap="2">
      <Text size="1">
        Expiration date{` `}
        <Popover.Root>
          <Popover.Trigger>
            <button
              type="button"
              aria-label="About expiration dates"
              style={{
                display: `inline-flex`,
                padding: 0,
                border: 0,
                background: `transparent`,
                color: `inherit`,
                cursor: `help`,
              }}
            >
              <InfoCircledIcon height="10" width="10" />
            </button>
          </Popover.Trigger>
          <Popover.Content style={{ width: 300 }}>
            <Text size="1">
              If the package has an expiration date, use that. Whole spices and
              herbs often last about two years; ground versions last about one.
            </Text>
          </Popover.Content>
        </Popover.Root>
      </Text>
      <DatePicker
        value={expirationDate}
        onChange={(value) => {
          if (!(value instanceof Date)) return
          onValueChange?.(value)
          onValueCommit?.(value)
        }}
        format="y-MM-dd"
        locale="en-US"
        clearIcon={null}
        calendarAriaLabel="Choose expiration date"
        dayAriaLabel="Expiration day"
        monthAriaLabel="Expiration month"
        yearAriaLabel="Expiration year"
        className="expiration-date-picker"
      />
    </Flex>
  )
}
