import { Link, Outlet } from "@tanstack/react-router"
import { Flex, Heading, Text, Separator, Container } from "@radix-ui/themes"
import Working from "../components/working-icon"

export default function Root() {
  return (
    <Container maxWidth="440px">
      <Flex style={{ height: `100vh`, maxWidth: 440 }} direction="column">
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
          </nav>
        </Flex>
        <Separator orientation="horizontal" size="4" />
        <Flex p="4" direction="column" grow="1">
          <Outlet />
        </Flex>
      </Flex>
    </Container>
  )
}
