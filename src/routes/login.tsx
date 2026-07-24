import { createFileRoute } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import {
  Card,
  Flex,
  Text,
  TextField,
  Button,
  Heading,
  Callout,
} from "@radix-ui/themes"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { FaGoogle } from "react-icons/fa"

export const Route = createFileRoute(`/login`)({
  component: LoginPage,
})

function LoginPage() {
  const [isSocialLoading, setIsSocialLoading] = useState(false)
  const [error, setError] = useState(``)

  const form = useForm({
    defaultValues: {
      email: ``,
      password: ``,
    },
    onSubmit: async ({ value }) => {
      setError(``)
      try {
        // Try to sign up first (auto-create accounts in development).
        let result = await authClient.signUp.email(
          {
            email: value.email,
            password: value.password,
            name: value.email,
          },
          {
            onSuccess: () => {
              window.location.href = `/`
            },
          }
        )

        if (result.error?.code === `USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL`) {
          result = await authClient.signIn.email(
            {
              email: value.email,
              password: value.password,
            },
            {
              onSuccess: () => {
                window.location.href = `/`
              },
            }
          )
        }

        if (result.error) {
          console.error(`Authentication error:`, result.error)
          setError(result.error.message || `Authentication failed`)
        }
      } catch (err) {
        console.error(`Unexpected error:`, err)
        setError(`An unexpected error occurred`)
      }
    },
  })

  const handleGoogleSignIn = async () => {
    setIsSocialLoading(true)
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
      setIsSocialLoading(false)
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
          {process.env.NODE_ENV === `production` && (
            <>
              <Button
                onClick={handleGoogleSignIn}
                disabled={isSocialLoading}
                size="3"
                variant="soft"
                style={{ width: `100%` }}
              >
                <FaGoogle />
                Sign in with Google
              </Button>
            </>
          )}

          {process.env.NODE_ENV === `development` && (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                form.handleSubmit()
              }}
            >
              <Flex direction="column" gap="4">
                <Flex direction="column" gap="2">
                  <form.Field name="email">
                    {(field) => (
                      <form.Subscribe selector={(state) => state.isSubmitting}>
                        {(isSubmitting) => (
                          <TextField.Root
                            name={field.name}
                            placeholder="Email address"
                            type="email"
                            required
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            disabled={isSubmitting}
                          />
                        )}
                      </form.Subscribe>
                    )}
                  </form.Field>
                  <form.Field name="password">
                    {(field) => (
                      <form.Subscribe selector={(state) => state.isSubmitting}>
                        {(isSubmitting) => (
                          <TextField.Root
                            name={field.name}
                            placeholder="Password"
                            type="password"
                            required
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            disabled={isSubmitting}
                          />
                        )}
                      </form.Subscribe>
                    )}
                  </form.Field>
                </Flex>

                {error && (
                  <Callout.Root color="red">
                    <Callout.Text size="2">{error}</Callout.Text>
                  </Callout.Root>
                )}

                <form.Subscribe selector={(state) => state.isSubmitting}>
                  {(isSubmitting) => (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="3"
                      style={{ width: `100%` }}
                    >
                      {isSubmitting ? `Signing in...` : `Sign in with Email`}
                    </Button>
                  )}
                </form.Subscribe>
              </Flex>
            </form>
          )}
        </Flex>
      </Card>
    </Flex>
  )
}
