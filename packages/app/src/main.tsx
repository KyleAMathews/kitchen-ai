import React from "react"
import ReactDOM from "react-dom/client"
import "@fontsource/inter"
import "@fontsource/work-sans"
import "@fontsource/caveat-brush"
import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/700.css"
import "@fontsource/della-respira"
import "@radix-ui/themes/styles.css"
import "../static/GeneralSans_Complete/Fonts/WEB/css/general-sans.css"
import "./typography.css"
import "./app.css"
import { Theme } from "@radix-ui/themes"
import { router } from "./router"
import { RouterProvider } from "@tanstack/react-router"
import { ClerkProvider } from "@clerk/clerk-react"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Missing Publishable Key')
// }

async function render() {
  // Initialize the router
  await router.load()

  const rootElement = document.getElementById(`root`)
  if (!rootElement) throw new Error(`Root element not found`)

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </React.StrictMode>
  )
}

render().catch(console.error)
