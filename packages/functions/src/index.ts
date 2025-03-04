import { Hono } from "hono"
import { cors } from "hono/cors"
// import { z } from "zod"
// import { zValidator } from "@hono/zod-validator"
// import postgres from "postgres"
import { Resource } from "sst"

const app = new Hono()

// Enable CORS
app.use(`*`, cors())

app.get(`/`, (c) => c.text(`hello world`))

// Proxy shape requests to Electric
app.get(`/v1/shape`, async (c) => {
  const request = c.req.raw

  const url = new URL(request.url)
  // console.log(`Resource`, Resource)
  // console.log(`ElectricUrl.url`, Resource.ElectricUrl.url)
  // console.log(`electricInfo`, Resource.electricInfo)
  // console.log(`${Resource.ElectricUrl.url}${url.pathname}${url.search}`)
  const shapeUrl = new URL(
    `${Resource.ElectricUrl.url}${url.pathname}${url.search}`
  )
  shapeUrl.searchParams.set(`source_secret`, Resource.ElectricUrl.SOURCE_SECRET)
  shapeUrl.searchParams.set(`source_id`, Resource.ElectricUrl.SOURCE_ID)
  const clonedHeaders = new Headers(request.headers)

  return await fetch(shapeUrl.toString(), {
    headers: clonedHeaders,
    cf: { cacheEverything: true },
  })
})

export default {
  fetch: app.fetch,
}
