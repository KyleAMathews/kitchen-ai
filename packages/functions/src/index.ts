import { Hono, Context } from "hono"
import { cors } from "hono/cors"
import { z } from "zod"
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import OpenAI from "openai"
import { ZodFunctionDef, toTool, parseArguments } from "openai-zod-functions"
import { randomUUID } from "crypto"

// Define types for environment variables
interface Env {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  OPENAI_KEY: string
  ELECTRIC_SECRET?: string // Optional as it's used by other routes
  ELECTRIC_ID?: string // Optional as it's used by other routes
}

const app = new Hono<{ Bindings: Env }>()

let supabase: SupabaseClient
let openai: OpenAI

// Middleware to initialize clients
app.use(`*`, async (c, next) => {
  // if (!supabase) {
  //   supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY)
  // }
  if (!openai) {
    openai = new OpenAI({ apiKey: c.env.OPENAI_KEY })
  }
  await next()
})

// Enable CORS
app.use(`*`, cors())

app.get(`/`, (c) => c.text(`hello world`))

// Proxy shape requests to Electric
app.get(`/v1/shape`, async (c) => {
  const env = c.env
  const request = c.req.raw

  const url = new URL(request.url)
  const shapeUrl = new URL(
    `https://api.electric-sql.cloud${url.pathname}${url.search}`
  )
  shapeUrl.searchParams.set(`secret`, env.ELECTRIC_SECRET!)
  shapeUrl.searchParams.set(`source_id`, env.ELECTRIC_ID!)
  const clonedHeaders = new Headers(request.headers)

  return await fetch(shapeUrl.toString(), {
    headers: clonedHeaders,
    cf: { cacheEverything: true },
  })
})

// Adapted getEmbedding function
async function getEmbedding(text: string, c: Context<{ Bindings: Env }>) {
  if (!openai) {
    openai = new OpenAI({ apiKey: c.env.OPENAI_KEY })
  }
  const result = await openai.embeddings.create({
    input: text,
    model: `text-embedding-3-small`,
    dimensions: 256,
  })
  return result.data[0].embedding
}

const recipeProcessingSchema = z.object({
  pasted: z.string(),
  id: z.string(), // Assuming 'id' (recipe id) is passed in the body
})

app.post(`/recipes/process`, async (c) => {
  try {
    const body = await c.req.json()
    const validation = recipeProcessingSchema.safeParse(body)

    if (!validation.success) {
      return c.json(
        { error: `Invalid request body`, details: validation.error.flatten() },
        400
      )
    }

    const { pasted, id } = validation.data
    const startTime = Date.now() // Using Date.now() as performance.now() is not standard in CF workers

    const functions: ZodFunctionDef[] = [
      {
        name: `get_ingredients`,
        description: `Get ingredients from recipe`,
        schema: z.object({
          name: z
            .string()
            .describe(`name of the recipe. Always return in Capitalized Case`),
          description: z
            .string()
            .describe(`Short one sentence description of the recipe.`),
          ingredients: z.array(
            z.object({
              listing: z
                .string()
                .max(140)
                .describe(
                  `A specific ingredient listing (make sure not to accidentally combine all ingredients). Include the name and the amount and description as written in the recipe. Specify if they're optional`
                ),
              extracted_name: z
                .string()
                .describe(
                  `try to extract the name of the ingredient from the ingredient listing`
                ),
              grocery_section: z
                .enum([
                  `Produce`,
                  `Deli`,
                  `Bakery`,
                  `Meat_Seafood`,
                  `Dairy_Eggs`,
                  `Dry__Goods`,
                  `Canned__Foods`,
                  `Spices_Herbs`,
                  `Beverages`,
                  `Frozen__Foods`,
                  `Oil_Vinegar`,
                  `Other__Aisles`,
                ])
                .describe(
                  `The section of a US grocery store that someone is most likely to find this ingredient. You can only pick from options within this list. Any other option will be rejected. If you don't like the options, just pick 'Other Aisles'. Pay special attention to the enums as they're not normal. If you return a value not listed here, your response will be rejected and you will be punished.`
                ),
            })
          ),
        }),
      },
    ]

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: `user`,
        content: [
          {
            type: `text`,
            text: `Process this recipe copy/pasted from an online recipe site.`,
          },
          {
            type: `text`,
            text: pasted,
          },
        ],
      },
    ]

    const schema = functions[0].schema
    type returnType = z.infer<typeof schema>
    let attempt = 0
    const maxAttempts = 4

    async function callOpenAIWithRetry(): Promise<returnType> {
      while (attempt < maxAttempts) {
        attempt++
        console.log(`OpenAI call attempt: ${attempt}`)
        const response = await openai.chat.completions.create({
          model: `gpt-4o`, // Using gpt-4o as the latest model
          max_tokens: 4096,
          messages,
          tools: functions.map(toTool),
          tool_choice: {
            type: `function`,
            function: { name: `get_ingredients` },
          }, // Force the model to call the function
        })

        const { message } = response.choices[0]
        if (
          message.tool_calls &&
          message.tool_calls[0].function.name === `get_ingredients`
        ) {
          const func = message.tool_calls[0].function
          const ingredientsFunction = functions[0]
          try {
            const parsed = parseArguments(
              func.name,
              func.arguments,
              ingredientsFunction.schema
            )
            return parsed as returnType // Successfully parsed
          } catch (e: unknown) {
            console.error(`Attempt ${attempt}: Failed to parse OpenAI response arguments.`, e)
            console.error(`Attempt ${attempt}: Raw arguments from OpenAI:`, func.arguments)

            if (attempt >= maxAttempts) {
              throw new Error(`Failed to parse arguments from OpenAI after ${maxAttempts} attempts: ${(e instanceof Error ? e.message : String(e))}`)
            }

            // Add model's previous (incorrect) response as a system message for context
            messages.push({
              role: `system`,
              content: `The previous function call attempt with arguments ${func.arguments} failed validation. Please ensure your response strictly adheres to the provided schema, especially for enumerated values.`,
            })
            // Add a user message asking to retry with correct adherence to schema
            messages.push({
              role: `user`,
              content: `Your previous response was not parsable due to schema non-compliance (e.g., incorrect enum values). Please try again, ensuring the output strictly follows the JSON schema provided for the 'get_ingredients' function.`,
            })
            // Loop will continue for the next attempt
          }
        } else {
          console.error(`Attempt ${attempt}: OpenAI did not call the expected function or no tool_calls were made.`, message)
          if (attempt >= maxAttempts) {
            throw new Error(`OpenAI did not return the expected function call after multiple attempts.`)
          }
          // Add a user message asking to retry with correct adherence to schema
          messages.push({
            role: `user`,
            content: `Your previous response did not include the required 'get_ingredients' function call. Please try again, ensuring you call the function with the correct arguments based on the provided schema.`,
          })
        }
      }
      // This line should ideally not be reached if logic is correct, but as a fallback:
      throw new Error(`Exceeded maximum OpenAI call attempts (${maxAttempts}) without a successful parse.`)
    }

    const parsed = await callOpenAIWithRetry()

    const endTime = Date.now()
    const durationInSeconds = (endTime - startTime) / 1000
    console.log({ durationInSeconds })
    console.log(parsed)

    // Update recipe in Supabase
    // const { error: updateError } = await supabase
    //   .from(`recipes`)
    //   .update({ name: parsed.name, description: parsed.description })
    //   .eq(`id`, id)
    //
    // if (updateError) {
    //   console.log(`Supabase update failed`, updateError)
    //   // Decide if you want to throw or return an error response
    // }
    //
    // // Get embeddings for each ingredient
    // const ingredientsWithEmbeddings = await Promise.all(
    //   parsed.ingredients.map(async (ingredient) => {
    //     const embedding = await getEmbedding(ingredient.extracted_name, c)
    //     return { ...ingredient, embedding, recipe_id: id, id: randomUUID() } // Add recipe_id and generate UUID for ingredient
    //   })
    // )
    //
    // // Insert ingredients into Supabase
    // // Supabase client typically handles transactions implicitly for batch operations if supported,
    // // or you might need to use a plpgsql function for explicit transaction control if doing multiple separate calls that need to be atomic.
    // // For batch insert, .insert() on an array of objects is usually atomic.
    // const { error: insertError } = await supabase
    //   .from(`recipe_ingredients`)
    //   .insert(
    //     ingredientsWithEmbeddings.map((ing) => ({
    //       id: ing.id,
    //       listing: ing.listing,
    //       extracted_name: ing.extracted_name,
    //       grocery_section: ing.grocery_section,
    //       embedding: JSON.stringify(ing.embedding), // Ensure embedding is stringified if your column type expects JSON string
    //       recipe_id: ing.recipe_id,
    //     }))
    //   )
    //
    // if (insertError) {
    //   console.log(`Supabase insert failed`, insertError)
    //   // Handle insert error, potentially rollback if part of a larger transaction not handled by Supabase client directly
    //   return c.json({ error: `Failed to save ingredients` }, 500)
    // }

    return c.json(parsed)
  } catch (error: unknown) {
    console.log(`error`, error)
    return c.json(
      {
        error: `There was an error processing your request`,
        details: error instanceof Error ? error.message : String(error),
      },
      500
    )
  }
})

export default {
  fetch: app.fetch,
}
