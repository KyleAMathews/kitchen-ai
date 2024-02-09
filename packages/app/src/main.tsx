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
import "./index.css"
import "./app.css"
import { Theme } from "@radix-ui/themes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./error-page"
import { ElectricalProvider } from "./context"
import { initElectric, electricSqlLoader } from "electric-query"
import { Electric, schema } from "./generated/client"
import sqliteWasm from "wa-sqlite/dist/wa-sqlite-async.wasm?asset"
import { ClerkProvider, SignIn } from "@clerk/clerk-react"

import AuthedLayout from "./authed-layout"

import Root from "./routes/root"
import Index from "./routes/index"
import Review from "./routes/review"
import AddIngredients from "./routes/add-ingredients"
import IngredientDetail from "./routes/ingredient-detail"

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `/sign-in`,
        element: <SignIn />,
      },
      {
        element: <AuthedLayout />,
        children: [
          {
            index: true,
            element: <Index />,
            loader: async (props) => {
              const url = new URL(props.request.url)
              const search = new URLSearchParams(url.search).get(`q`)
              console.log({ url, search })
              const key = url.pathname + url.search
              await electricSqlLoader<Electric>({
                key,
                shapes: ({ db }) => [
                  {
                    shape: db.ingredients_photo_uploads.sync({
                      include: { ingredients: true, users: true },
                    }),
                    isReady: async () =>
                      !!(await db.rawQuery({
                        sql: `select id from ingredients_photo_uploads limit 1`,
                      })),
                  },
                ],
                queries:
                  ({ db }) =>
                  () =>
                    Index.queries({
                      db,
                      search: search,
                    }),
              })

              return null
            },
          },
          {
            path: `/upload-photos`,
            element: <AddIngredients />,
            loader: async (props) => {
              const url = new URL(props.request.url)
              const key = url.pathname + url.search
              await electricSqlLoader<Electric>({
                key,
                shapes: ({ db }) => [
                  {
                    shape: db.ingredients_photo_uploads.sync({
                      include: { ingredients: true, users: true },
                    }),
                    isReady: async () =>
                      !!(await db.rawQuery({
                        sql: `select id from ingredients_photo_uploads limit 1`,
                      })),
                  },
                  {
                    shape: db.ingredients.sync({
                      include: { ingredients_photo_uploads: true },
                    }),
                    isReady: async () => {
                      const result = await db.rawQuery({
                        sql: `select id from ingredients`,
                      })

                      console.log({ result, boolean: !!result })
                      return !!result
                    },
                  },
                ],
                queries: ({ db }) =>
                  AddIngredients.queries({
                    db,
                  }),
              })

              return null
            },
          },
          {
            path: `/review`,
            element: <Review />,
            loader: async (props) => {
              const url = new URL(props.request.url)
              const key = url.pathname + url.search
              await electricSqlLoader<Electric>({
                key,
                shapes: ({ db }) => [
                  {
                    shape: db.ingredients_photo_uploads.sync(),
                    isReady: async () =>
                      !!(await db.rawQuery({
                        sql: `select id from ingredients_photo_uploads limit 1`,
                      })),
                  },
                ],
                queries: ({ db }) =>
                  Review.queries({
                    db,
                  }),
              })

              return null
            },
          },
          {
            path: `/ingredient/:id`,
            element: <IngredientDetail />,
            loader: async (props) => {
              const url = new URL(props.request.url)
              const key = url.pathname + url.search
              await electricSqlLoader<Electric>({
                key,
                shapes: ({ db }) => [
                  {
                    shape: db.ingredients.sync({
                      include: {
                        ingredients_photo_uploads: true,
                      },
                    }),
                    isReady: async () => {
                      const result = await db.rawQuery({
                        sql: `select id from ingredients`,
                      })

                      console.log({ result, boolean: !!result })
                      return !!result
                    },
                  },
                ],
                queries: ({ db }) =>
                  IngredientDetail.queries({
                    db,
                    id: props.params.id,
                  }),
              })

              return null
            },
          },
        ],
      },
    ],
  },
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error(`Missing Publishable Key`)
}

async function render() {
  ReactDOM.createRoot(document.getElementById(`root`)!).render(
    <React.StrictMode>
      <Theme accentColor="teal">
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <ElectricalProvider>
            <RouterProvider router={router} />
          </ElectricalProvider>
        </ClerkProvider>
      </Theme>
    </React.StrictMode>
  )
}

render()
