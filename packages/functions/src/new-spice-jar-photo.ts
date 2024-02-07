import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Config } from "sst/node/config"
import { ZodFunctionDef, toTool } from "openai-zod-functions"
import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"
import pg from "pg"
import { performance } from "perf_hooks"

const { Client } = pg

const S3 = new S3Client({})

import { S3Handler } from "aws-lambda"
import OpenAI from "openai"
import { randomUUID } from "crypto"

const openai = new OpenAI({ apiKey: Config.OPENAI_KEY })

const connectionString = process.env.IS_LOCAL
  ? `postgresql://postgres:pg_password@localhost:5432/kitchen-ai`
  : ``

export const main: S3Handler = async (event) => {
  let client

  // Extract the bucket name and object key from the event
  const bucketName = event.Records[0].s3.bucket.name
  const objectKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, ` `)
  )

  const uuid = objectKey.split(`---`)[1]

  try {
    client = new Client({ connectionString })
    await client.connect()
  } catch (e) {
    console.log(e)
  }

  const startTime = performance.now()
  try {
    const bucketName = event.Records[0].s3.bucket.name
    const objectKey = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, ` `)
    )

    // Construct the public URL
    const publicUrl = `https://${bucketName}.s3.amazonaws.com/${objectKey}`

    // Update the record
    const updateQuery1 = `
      UPDATE ingredients_photo_uploads set uploaded_at = $1, photo_url = $2, state = $3 WHERE id = $4;`
    const values1 = [new Date(), publicUrl, `ai_processing`, uuid]

    // Execute the query
    client
      .query(updateQuery1, values1)
      .catch((e) => {
        console.log(`insert failed`, e)
      })
      .then(() => console.log(`first update succeeded`))

    const SpiceJarSchema = z.array(
      z.object({
        name: z.string().describe(
          `name of spice. Return the canonical name for the spice, not
              necessarily what is written on the label e.g. so "Nutmeg Ground"
            should just be "Nutmeg". Whether the spice is ground or not is
            captured elsewhere. Do capture other adjectives (other than ground) e.g. color. Always put adjectives first e.g. "yellow mustard" not e.g. "mustard, yellow"`
        ),
        fill_level: z
          .number()
          .min(0)
          .max(100)
          .describe(
            `how full roughly is the jar of spices? From 0-100% (as an integer)`
          ),
        is_ground: z
          .boolean()
          .describe(
            `is the spice ground (or crushed into small flakes) or still whole (larger pieces counts)?`
          ),
      })
    )
    const jsonSchema = zodToJsonSchema(SpiceJarSchema)
    const messages = [
      {
        role: `user`,
        content: [
          {
            type: `text`,
            text: `Interpret this photo of spice jars according to the json schema. ONLY return
              JSON with no other text around it i.e. your response MUST start
              with a { and end with a } and you MUST follow this JSON schema:
                ${JSON.stringify(jsonSchema)}`,
          },
          {
            type: `image_url`,
            image_url: {
              url: publicUrl,
            },
          },
        ],
      },
    ]

    let attempt = 0
    const maxAttempts = 4
    async function callOpenAI() {
      while (attempt < maxAttempts) {
        attempt++
        console.log({ attempt })
        const response = await openai.chat.completions.create({
          model: `gpt-4-vision-preview`,
          max_tokens: 4096,
          messages,
        })
        console.log(response.choices[0].message.content)
        let parsed
        try {
          parsed = SpiceJarSchema.parse(
            JSON.parse(response.choices[0].message.content)
          )

          return parsed
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

    console.log({ parsed })
    const endTime = performance.now()
    const durationInSeconds = (endTime - startTime) / 1000
    const updateQuery2 = `
      UPDATE ingredients_photo_uploads SET ai_processing_duration_sec = $1, state = $2 WHERE id = $3`
    const values2 = [durationInSeconds, `reviewing`, uuid]

    // Execute the prepared query
    await client.query(updateQuery2, values2).catch((e) => {
      console.log(`update failed`, e)
    })

    function generateDateMonthsAgo(monthsAgo) {
      const currentDate = new Date() // Get the current date
      currentDate.setMonth(currentDate.getMonth() - monthsAgo) // Subtract the specified number of months

      const year = currentDate.getFullYear() // Get the year
      let month = currentDate.getMonth() + 1 // Get the month (add 1 because getMonth() returns 0-11)

      // Ensure month is in 'MM' format
      month = month < 10 ? `0${month}` : month

      return `${year}/${month}` // Return the formatted date string
    }

    // Add each new ingredient
    try {
      await client.query(`BEGIN`)
      await Promise.all(
        parsed.map((ingredient) => {
          const ingredientInsertQuery = {
            name: `ingredient-insert-query`,
            text: `INSERT INTO ingredients (id, name, is_reviewed, fill_level, fill_date, is_ground, ingredients_photo_uploads_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            values: [
              randomUUID(),
              ingredient.name,
              false,
              ingredient.fill_level,
              generateDateMonthsAgo(18),
              ingredient.is_ground,
              uuid,
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
  } catch (err) {
    console.log(`Error generating pre-signed URL`, err)
    throw err
  }
}
