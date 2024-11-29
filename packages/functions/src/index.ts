import { Hono } from "hono"
import { cors } from "hono/cors"
// import { z } from "zod"
// import { zValidator } from "@hono/zod-validator"
// import postgres from "postgres"
// import { Resource } from "sst"

const app = new Hono()

// Enable CORS
app.use(`*`, cors())

app.get(`/`, (c) => c.text(`hello world`))

export default {
  fetch: app.fetch,
}
