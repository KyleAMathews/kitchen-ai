import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

// Font imports
import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/700.css"
// import "../../public/GeneralSans_Complete/Fonts/WEB/css/general-sans.css"
import "@radix-ui/themes/styles.css"
import "../typography.css"
import { Theme, Flex, Heading, Text, Button } from "@radix-ui/themes"
import { Link } from "@tanstack/react-router"

import appCss from "../styles.css?url"

export const Route = createRootRoute({
  ssr: false,
  head: () => ({
    meta: [
      {
        charSet: `utf-8`,
      },
      {
        name: `viewport`,
        content: `width=device-width, initial-scale=1`,
      },
      {
        title: `Kitchen AI - Smart Ingredient & Recipe Management`,
      },
    ],
    links: [
      {
        rel: `stylesheet`,
        href: appCss,
      },
    ],
  }),

  component: () => (
    <RootDocument>
      <Theme>
        <Outlet />
      </Theme>
      {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
    </RootDocument>
  ),

  notFoundComponent: () => (
    <RootDocument>
      <Theme>
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="4"
          style={{ minHeight: "100vh", padding: "2rem" }}
        >
          <Heading size="6">Page Not Found</Heading>
          <Text size="3" color="gray" align="center">
            The page you're looking for doesn't exist.
          </Text>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button>Go Home</Button>
          </Link>
        </Flex>
      </Theme>
      {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="stylesheet" href="/GeneralSans_Complete/Fonts/WEB/css/general-sans.css" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
