import { Outlet, Link } from "react-router-dom"
import {
  Flex,
  Box,
  Heading,
  Text,
  Separator,
  Container,
} from "@radix-ui/themes"
import Working from "../components/working-icon"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"

export default function Root() {
  return (
    <Container size="1">
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
      <Box p="4">
        <Outlet />
      </Box>
    </Container>
  )
}
