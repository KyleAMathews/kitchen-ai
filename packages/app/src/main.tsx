import React from "react"
import ReactDOM from "react-dom/client"
import "@fontsource/inter"
import "@fontsource/fira-mono"
import "@fontsource/caveat-brush"
import "@fontsource/josefin-sans"
import "@fontsource/della-respira"
import "@radix-ui/themes/styles.css"
import "./index.css"
import { Theme } from "@radix-ui/themes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./error-page"
import { ElectricalProvider } from "./context"
import { initElectric, electricSqlLoader } from "electric-query"
import { Electric, schema } from "./generated/client"
import sqliteWasm from "wa-sqlite/dist/wa-sqlite-async.wasm?asset"
import { authToken, dummyUserId } from "./auth"

import Root from "./routes/root"
import Index from "./routes/index"

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: async (props) => {
          const url = new URL(props.request.url)
          const key = url.pathname + url.search
          await electricSqlLoader<Electric>({
            key,
            shapes: ({ db }) => [
              {
                shape: db.spice_jar_photos_upload.sync(),
                isReady: async () =>
                  !!(await db.rawQuery({
                    sql: `select id from spice_jar_photos_upload limit 1`,
                  })),
              },
            ],
            queries: ({ db }) =>
              Index.queries({
                db,
              }),
          })

          return null
        },
      },
    ],
  },
])
const electricUrl = import.meta.env.VITE_ELECTRIC_URL // || `https://long-clowns-follow.loca.lt`
console.log({ electricUrl })
async function render() {
  const electric = await initElectric({
    appName: `kitchen-ai`,
    schema,
    sqliteWasmPath: sqliteWasm,
    config: {
      auth: {
        token: authToken(),
      },
      debug: false, //DEBUG_MODE,
      url: electricUrl,
    },
  })
  ReactDOM.createRoot(document.getElementById(`root`)!).render(
    <React.StrictMode>
      <Theme>
        <ElectricalProvider db={electric}>
          <RouterProvider router={router} />
        </ElectricalProvider>
      </Theme>
    </React.StrictMode>
  )
}

render()
