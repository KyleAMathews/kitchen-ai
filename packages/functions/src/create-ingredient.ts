import { APIGatewayProxyHandler } from "aws-lambda"
import { Config } from "sst/node/config"
import { z } from "zod"
import pg from "pg"
import { performance } from "perf_hooks"
import { ZodFunctionDef, toTool, parseArguments } from "openai-zod-functions"
import { randomUUID } from "crypto"
import { getEmbedding } from "./_get-embedding"

const { Client } = pg

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
    console.log({ body })

    const functions: ZodFunctionDef[] = [
      {
        name: `get_ingredient`,
        description: `Get ingredient arguments from name of ingredient`,
        schema: z.object({
          description: z
            .string()
            .describe(
              `Short one sentence description of the ingredient and what kind of cuisines it's used with.`
            ),
          shelf_life_months: z
            .number()
            .describe(
              `how long does this spice or herb last until it looses flavor? If it's a ground spice/herb return 12 or if it's whole or a full leaf, return 24. Otherwise make your best guess.`
            ),
          is_ground: z
            .boolean()
            .describe(
              `If the ingredient is a spice or herb — is it ground (or crushed into small flakes) or still whole (larger pieces counts)? If the question is irrelevant to this type of ingredient, just return false `
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
            text: `A user wants more informationa about this kitchen ingredient`,
          },
          {
            type: `text`,
            text: body.ingredient,
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
          console.log(message.tool_calls[0])
          if (message.tool_calls) {
            const func = message.tool_calls[0].function
            if (func.name === `get_ingredient`) {
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

          if (attempt === 1) {
            // Remove the image this time
            messages[0].content.pop()
          }

          // Add on the LLMs' response
          messages.push({
            role: `system`,
            content: [
              {
                type: `text`,
                text: response.choices[0].message.content,
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

    // Get embeddings for the ingredient
    const embedding = await getEmbedding(body.ingredient)

    return {
      statusCode: 200,
      body: JSON.stringify({ ...parsed, embedding }),
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
