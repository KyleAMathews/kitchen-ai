import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Flex, Code, Text, Popover, Slider } from "@radix-ui/themes"

const diffInMonths = (date1: Date, date2: Date) => {
  const yearDiff = date2.getFullYear() - date1.getFullYear()
  const monthDiff = date2.getMonth() - date1.getMonth()
  return yearDiff * 12 + monthDiff
}

function generateDateMonthsAgo(monthsAgo: number) {
  const currentDate = new Date() // Get the current date
  currentDate.setMonth(currentDate.getMonth() + monthsAgo)

  return currentDate
}

export default function ExpirationDateEdit({
  onValueChange = null,
  onValueCommit = null,
  expirationDate,
}: {
  onValueCommit?: ((date: Date) => void) | null
  onValueChange?: ((date: Date) => void) | null
  expirationDate: Date
}) {
  console.log({ expirationDate })
  const months_until_expiration = diffInMonths(new Date(), expirationDate)
  return (
    <Flex direction="column" gap="2">
      <Text size="1" style={{ height: 10 }}>
        Expiration date{` `}
        <Popover.Root>
          <Popover.Trigger>
            <InfoCircledIcon
              height="10"
              width="10"
              style={{ height: 10, position: `relative`, top: 1 }}
            />
          </Popover.Trigger>
          <Popover.Content style={{ width: 300, height: 70 }}>
            <Text size="1">
              If the expiration date is set on the package, use that. For
              spices/herbs, whole variants tend to have a shelf life around 2
              years but if ground, the shelf life is 1 year.
            </Text>
          </Popover.Content>
        </Popover.Root>
        {` `}
        <Code color="gray" style={{ float: `right` }}>
          {expirationDate.getFullYear()}/
          {expirationDate.toLocaleString(`default`, {
            month: `2-digit`,
          })}
        </Code>
      </Text>
      <Slider
        defaultValue={[33 + months_until_expiration * 2]}
        step={2}
        onValueChange={(val) => {
          const noZeroVal = val[0] === 0 ? 0.1 : val[0]
          const newAge = Math.round((noZeroVal - 33) / 2)
          const newDate = generateDateMonthsAgo(newAge)
          if (typeof onValueChange === `function`) {
            onValueChange(newDate)
          }
        }}
        onValueCommit={(val) => {
          const noZeroVal = val[0] === 0 ? 0.1 : val[0]
          const newAge = Math.round((noZeroVal - 33) / 2)
          const newDate = generateDateMonthsAgo(newAge)
          if (typeof onValueCommit === `function`) {
            onValueCommit(newDate)
          }
        }}
      />
      <Flex justify="between">
        <Text size="1" color="gray">
          {new Date().getFullYear() - 1}
        </Text>
        <Text size="1" color="gray">
          {new Date().getFullYear() + 3}
        </Text>
      </Flex>
    </Flex>
  )
}
