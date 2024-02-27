import { APIGatewayProxyHandler } from "aws-lambda"
import { Config } from "sst/node/config"
import { z } from "zod"
import pg from "pg"
import { performance } from "perf_hooks"
import { ZodFunctionDef, toTool, parseArguments } from "openai-zod-functions"
import { randomUUID } from "crypto"
import { getEmbedding } from "./_get-embedding"

const { Client } = pg

import { S3Handler } from "aws-lambda"
import OpenAI from "openai"

const openai = new OpenAI({ apiKey: Config.OPENAI_KEY })

const connectionString = process.env.IS_LOCAL
  ? `postgresql://postgres:pg_password@localhost:5432/kitchen-ai`
  : ``

export const handler: APIGatewayProxyHandler = async (event) => {
  let client

  try {
    client = new Client({ connectionString })
    await client.connect()
  } catch (e) {
    console.log(e)
  }

  const startTime = performance.now()
  try {
    const body = JSON.parse(event.body || ``)

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
            .describe(`Short one sentece description of the recipe.`),
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
                  `The section of a US grocery store that someone is most likely to find this ingredient. You can only pick from options within this list. Any other option will be rejected. If you don't like the options, just pick 'Other Aisles'`
                ),
            })
          ),
        }),
      },
    ]
    const messages = [
      {
        role: `user`,
        content: [
          {
            type: `text`,
            text: `Process this recipe copy/pasted from an online recipe site.`,
          },
          {
            type: `text`,
            text: body.pasted,
          },
        ],
      },
    ]

    const schema = functions[0].schema
    type returnType = z.infer<typeof schema>
    let attempt = 0
    const maxAttempts = 4
    async function callOpenAI(): Promise<returnType> {
      while (attempt < maxAttempts) {
        attempt++
        console.log({ attempt })
        const response = await openai.chat.completions.create({
          model: `gpt-3.5-turbo-0125`,
          // model: `gpt-4`,
          max_tokens: 4096,
          messages,
          // Convert ZodFunctions for OpenAI
          tools: functions.map(toTool),
        })
        try {
          const { message } = response.choices[0]
          if (message.tool_calls) {
            const func = message.tool_calls[0].function
            if (func.name === `get_ingredients`) {
              const ingredientsFunction = functions[0]
              const parsed = parseArguments(
                func.name,
                func.arguments,
                ingredientsFunction.schema
              )

              return parsed
            }
          }
        } catch (e) {
          // Try again
          console.log(`json didn't parse`)
          console.log(e)

          // Add on the LLMs' response
          messages.push({
            role: `system`,
            content: [
              {
                type: `text`,
                text:
                  `previous function response` +
                  response.choices[0].message.tool_calls[0].function,
              },
            ],
          })

          // Add the error and a request to fix it.
          messages.push({
            role: `user`,
            content: [
              {
                type: `text`,
                text: `I couldn't parse your response correctly. Please try again to return valid JSON that strictly follows the JSON schema. This is the error I got: ${e.message}`,
              },
            ],
          })

          // Retry call.
          return await callOpenAI()
        }
      }

      throw new Error(`hit max attempts limit for calling open ai`)
    }

    const parsed = await callOpenAI()

    const endTime = performance.now()
    const durationInSeconds = (endTime - startTime) / 1000
    console.log({ durationInSeconds })
    console.log(parsed)

    const updateRecipe = `
    UPDATE recipes SET name = $1, description = $2 WHERE id = $3`
    const updateRecipeValues = [parsed.name, parsed.description, body.id]
    console.log({ updateRecipe, updateRecipeValues })

    // Execute the prepared query
    await client.query(updateRecipe, updateRecipeValues).catch((e) => {
      console.log(`update failed`, e)
    })

    // Get embeddings for each ingredient
    const ingredients = await Promise.all(
      parsed.ingredients.map(async (ingredient) => {
        const embedding = await getEmbedding(ingredient.extracted_name)
        return { embedding, ...ingredient }
      })
    )

    // Add each new ingredient
    try {
      await client.query(`BEGIN`)
      await Promise.all(
        ingredients.map((ingredient) => {
          const ingredientInsertQuery = {
            name: `ingredient-insert-query`,
            text: `INSERT INTO recipe_ingredients (id, listing, extracted_name, grocery_section, embedding, recipe_id)
    VALUES ($1, $2, $3, $4, $5, $6);`,
            values: [
              randomUUID(),
              ingredient.listing,
              ingredient.extracted_name,
              ingredient.grocery_section,
              JSON.stringify(ingredient.embedding),
              body.id,
            ],
          }

          return client.query(ingredientInsertQuery)
        })
      )
      await client.query(`COMMIT`)
    } catch (e) {
      console.log(`inserts failed`, e)
      await client.query(`ROLLBACK`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify(parsed),
    }
  } catch (error) {
    console.log(`error`, error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `There was an error processing your request`,
      }),
    }
  }
}
