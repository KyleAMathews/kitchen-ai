import { Outlet, Link } from "react-router-dom"
import { Flex, Box, Heading, Text, Separator } from "@radix-ui/themes"
import Working from "../components/working-icon"
import { useLiveQuery } from "electric-sql/react"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { FiShoppingCart } from "react-icons/fi"
import { useElectric } from "../context"

// Inline style for the icon container
const iconContainerStyle = {
  position: `relative`,
  display: `inline-block`,
}

// Inline style for the badge
const badgeStyle = {
  position: `absolute`,
  top: `-10px`, // Adjust these values based on the size of your icon
  right: `-10px`,
  backgroundColor: `red`,
  color: `white`,
  fontSize: `12px`,
  padding: `2px 5px`,
  borderRadius: `50%`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  height: `20px`, // Ensure the badge is circular
  minWidth: `20px`, // Minimum width to maintain aspect ratio
}

export default function Root() {
  const electric = useElectric()!
  let count
  if (electric) {
    const { db } = electric
    const { results: shoppingListCount } = useLiveQuery(
      db.liveRaw({ sql: `select count(*) as count from shopping_list` })
    )

    count = (shoppingListCount && shoppingListCount[0].count) || null
    console.log({ shoppingListCount: count })
  }

  return (
    <Flex direction="column">
      <Flex asChild p="4">
        <nav>
          <Heading weight="bold" size="4">
            <Link
              to="/"
              style={{ textDecoration: `inherit`, color: `inherit` }}
            >
              Kitchen.ai <Working />
            </Link>
          </Heading>
          <Flex ml="auto">
            {count && (
              <Link
                to="/shopping-cart"
                style={{
                  textDecoration: `inherit`,
                  color: `inherit`,
                  paddingRight: 8,
                  height: 12,
                  top: -6,
                  position: `relative`,
                }}
              >
                <FiShoppingCart style={{ width: `14`, height: `14` }} />
                <Text
                  size="1"
                  style={{
                    paddingLeft: 2,
                    display: `inline-block`,
                    position: `relative`,
                    top: -2,
                  }}
                >
                  ({count})
                </Text>
              </Link>
            )}
            <SignedIn>
              <UserButton afterSignOutUrl="/sign-in" />
            </SignedIn>
            <SignedOut>
              <Text>
                <Link to="/sign-in">Sign In</Link>
              </Text>
            </SignedOut>
          </Flex>
        </nav>
      </Flex>
      <Separator orientation="horizontal" size="4" />
      <Box p="4" py="5">
        <Outlet />
      </Box>
    </Flex>
  )
}
