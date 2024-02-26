import { Config } from "sst/node/config"
import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"
import pg from "pg"
import { performance } from "perf_hooks"
import { getEmbedding } from "./_get-embedding"

const { Client } = pg

import { S3Handler } from "aws-lambda"
import OpenAI from "openai"
import { randomUUID } from "crypto"

const openai = new OpenAI({ apiKey: Config.OPENAI_KEY })

const connectionString = process.env.IS_LOCAL
  ? `postgresql://postgres:pg_password@localhost:5432/kitchen-ai`
  : ``

export const main: S3Handler = async (event) => {
  let client

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
    const uuid = objectKey.split(`---`)[1]

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
          `name of spice. Don't include "ground" in the name as we capture that in
          the is_ground boolean so "Nutmeg Ground" should just be "Nutmeg" but do 
          capture other descriptive adjectives e.g. if it's "whole" or "seeds" or 
          "flakes".Do capture other adjectives (other than ground) e.g. color.
          Always put adjectives first e.g. yellow in "yellow mustard seed" should be
         first not e.g. "mustard seed yellow"`
        ),
        description: z.string().describe(
          `Short one sentece description of the spice. Follow this template:

          A {{type of ingredient e.g. spice or her}} used
          for x,y,z types of dishes.
          `
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
        shelf_life_months: z
          .number()
          .describe(
            `how long does this spice or herb last until it looses flavor? If it's a ground spice/herb return 12 or if it's whole, return 24. Otherwise make your best guess.`
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

    // Get embeddings for each ingredient
    const ingredients = await Promise.all(
      parsed.map(async (ingredient) => {
        const embedding = await getEmbedding(ingredient.name)
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
            text: `INSERT INTO ingredients (id, name, description, is_reviewed, tracking_type, count, fill_level, embedding, fill_date, is_ground, shelf_life_months, ingredients_photo_uploads_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
            values: [
              randomUUID(),
              ingredient.name,
              ingredient.description,
              false,
              `fill_level`,
              0,
              ingredient.fill_level,
              JSON.stringify(ingredient.embedding),
              generateDateMonthsAgo(18),
              ingredient.is_ground,
              ingredient.shelf_life_months,
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