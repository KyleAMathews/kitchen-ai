import { createFileRoute, useNavigate, Link } from "@tanstack/react-router"
import { useEffect } from "react"
import { Outlet } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client"
import {
  Flex,
  Text,
  Button,
  Heading,
  Container,
  Separator,
} from "@radix-ui/themes"

export const Route = createFileRoute(`/_authenticated`)({
  component: AuthenticatedLayout,
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data: session } = await authClient.getSession()

    if (!session) {
      throw new Error(`Not authenticated`)
    }

    return { session }
  },
  errorComponent: ({ error }) => {
    const ErrorComponent = () => {
      const { data: session } = authClient.useSession()

      // Only redirect to login if user is not authenticated
      if (!session && typeof window !== `undefined`) {
        window.location.href = `/login`
        return null
      }

      // For other errors, render an error message
      return (
        <Flex
          direction="column"
          align="center"
          justify="center"
          minHeight="100vh"
          gap="4"
        >
          <Heading size="6" color="red">
            Error
          </Heading>
          <Text color="gray">
            {error?.message || `An unexpected error occurred`}
          </Text>
          <Button onClick={() => window.location.reload()} variant="soft">
            Retry
          </Button>
        </Flex>
      )
    }

    return <ErrorComponent />
  },
})

function AuthenticatedLayout() {
  const { data: session, isPending } = authClient.useSession()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authClient.signOut()
    navigate({ to: `/login` })
  }

  if (isPending) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="100vh"
      >
        <Text color="gray">Loading...</Text>
      </Flex>
    )
  }

  if (!session) {
    return null
  }

  return (
    <Container maxWidth="440px">
      <Flex style={{ height: `100vh`, maxWidth: 440 }} direction="column">
        {/* Header */}
        <Flex asChild p="4" justify="between" align="center">
          <nav>
            <Link to="/">
              <Heading size="5">Kitchen AI</Heading>
            </Link>
            <Flex align="center" gap="4">
              <Text size="2" color="gray">
                {session.user.name || session.user.email}
              </Text>
              <Button variant="ghost" onClick={handleLogout}>
                Sign out
              </Button>
            </Flex>
          </nav>
        </Flex>

        {/* Main Content */}
        <Flex direction="column" p="4" flexGrow="1">
          <Outlet />
        </Flex>
      </Flex>
    </Container>
  )
}
