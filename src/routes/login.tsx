import { createFileRoute } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import {
  Card,
  Flex,
  Text,
  TextField,
  Button,
  Heading,
  Callout,
  Separator,
} from "@radix-ui/themes"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { FaGoogle } from "react-icons/fa"

export const Route = createFileRoute(`/login`)({
  component: LoginPage,
})

function LoginPage() {
  const [email, setEmail] = useState(``)
  const [password, setPassword] = useState(``)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(``)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(``)

    try {
      // Try to sign up first (auto-create accounts in dev)
      let { data, error } = await authClient.signUp.email(
        {
          email,
          password,
          name: email, // Use email as default name
        },
        {
          onSuccess: () => {
            window.location.href = `/`
          },
        }
      )

      console.log({ data, error, e: JSON.stringify(error, null, 4) })
      // If user already exists, try to sign in
      if (error?.code === `USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL`) {
        const result = await authClient.signIn.email(
          {
            email,
            password,
          },
          {
            onSuccess: async () => {
              window.location.href = `/`
            },
          }
        )

        data = result.data
        error = result.error
      }

      if (error) {
        console.error(`Authentication error:`, error)
        setError(error.message || `Authentication failed`)
      }
    } catch (err) {
      console.error(`Unexpected error:`, err)
      setError(`An unexpected error occurred`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(``)
    
    try {
      await authClient.signIn.social({
        provider: `google`,
        callbackURL: `/`,
        errorCallbackURL: `/login?error=google_failed`,
      })
    } catch (err) {
      console.error(`Google sign-in error:`, err)
      setError(`Google sign-in failed`)
      setIsLoading(false)
    }
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ minHeight: `100vh`, padding: `2rem` }}
    >
      <Card size="3" style={{ width: `100%`, maxWidth: `500px` }}>
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="3" align="center">
            <Heading size="6" align="center">
              Welcome to Kitchen AI
            </Heading>
            <Text size="2" color="gray" align="center">
              Sign in to manage your ingredients and recipes
            </Text>
          </Flex>

          {process.env.NODE_ENV === `development` && (
            <Callout.Root color="blue">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text size="2">
                <strong>Development Mode:</strong> Any email/password
                combination will work for testing. New accounts are
                automatically created.
              </Callout.Text>
            </Callout.Root>
          )}

          {/* Google Sign In (if configured) */}
          {process.env.GOOGLE_CLIENT_ID && (
            <>
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                size="3"
                variant="soft"
                style={{ width: `100%` }}
              >
                <FaGoogle />
                Sign in with Google
              </Button>
              
              <Flex align="center" gap="3">
                <Separator size="4" />
                <Text size="2" color="gray">OR</Text>
                <Separator size="4" />
              </Flex>
            </>
          )}

          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="2">
                <TextField.Root
                  placeholder="Email address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                <TextField.Root
                  placeholder="Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </Flex>

              {error && (
                <Callout.Root color="red">
                  <Callout.Text size="2">{error}</Callout.Text>
                </Callout.Root>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                size="3"
                style={{ width: `100%` }}
              >
                {isLoading ? `Signing in...` : `Sign in with Email`}
              </Button>
            </Flex>
          </form>
        </Flex>
      </Card>
    </Flex>
  )
}
