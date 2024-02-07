import { Outlet, Link } from "react-router-dom"
import { Flex, Box, Heading, Separator } from "@radix-ui/themes"

export default function Root() {
  return (
    <Flex direction="column">
      <Flex asChild p="4">
        <nav>
          <Heading size="4">
            <Link
              to="/"
              style={{ textDecoration: `inherit`, color: `inherit` }}
            >
              Kitchen.ai
            </Link>
          </Heading>
        </nav>
      </Flex>
      <Separator orientation="horizontal" size="4" />
      <Box p="4" py="5">
        <Outlet />
      </Box>
    </Flex>
  )
}
