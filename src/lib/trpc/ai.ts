import { z } from "zod"
import { router, authedProcedure } from "@/lib/trpc"
import OpenAI from "openai"
import { ZodFunctionDef, toTool, parseArguments } from "openai-zod-functions"

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY 
})

// Helper function to get embeddings
async function getEmbedding(text: string) {
  const result = await openai.embeddings.create({
    input: text,
    model: `text-embedding-3-small`,
    dimensions: 256,
  })
  return result.data[0].embedding
}

const recipeProcessingSchema = z.object({
  pasted: z.string(),
  recipeId: z.string(),
})

const grocerySectionEnum = z.enum([
  "Produce",
  "Deli", 
  "Bakery",
  "Meat_Seafood",
  "Dairy_Eggs",
  "Dry__Goods",
  "Canned__Foods",
  "Spices_Herbs",
  "Beverages",
  "Frozen__Foods",
  "Oil_Vinegar",
  "Other__Aisles",
])

export const aiRouter = router({
  processRecipe: authedProcedure
    .input(recipeProcessingSchema)
    .mutation(async ({ ctx, input }) => {
      const { pasted, recipeId } = input
      const startTime = Date.now()

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
                grocery_section: grocerySectionEnum
                  .describe(
                    `The section of a US grocery store that someone is most likely to find this ingredient. You can only pick from options within this list. Any other option will be rejected. If you don't like the options, just pick 'Other__Aisles'. Pay special attention to the enums as they're not normal. If you return a value not listed here, your response will be rejected and you will be punished.`
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
            model: `gpt-4o`,
            max_tokens: 4096,
            messages,
            tools: functions.map(toTool),
            tool_choice: {
              type: `function`,
              function: { name: `get_ingredients` },
            },
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
              return parsed as returnType
            } catch (e: unknown) {
              console.error(`Attempt ${attempt}: Failed to parse OpenAI response arguments.`, e)
              console.error(`Attempt ${attempt}: Raw arguments from OpenAI:`, func.arguments)

              if (attempt >= maxAttempts) {
                throw new Error(`Failed to parse arguments from OpenAI after ${maxAttempts} attempts: ${(e instanceof Error ? e.message : String(e))}`)
              }

              messages.push({
                role: `system`,
                content: `The previous function call attempt with arguments ${func.arguments} failed validation. Please ensure your response strictly adheres to the provided schema, especially for enumerated values.`,
              })
              messages.push({
                role: `user`,
                content: `Your previous response was not parsable due to schema non-compliance (e.g., incorrect enum values). Please try again, ensuring the output strictly follows the JSON schema provided for the 'get_ingredients' function.`,
              })
            }
          } else {
            console.error(`Attempt ${attempt}: OpenAI did not call the expected function or no tool_calls were made.`, message)
            if (attempt >= maxAttempts) {
              throw new Error(`OpenAI did not return the expected function call after multiple attempts.`)
            }
            messages.push({
              role: `user`,
              content: `Your previous response did not include the required 'get_ingredients' function call. Please try again, ensuring you call the function with the correct arguments based on the provided schema.`,
            })
          }
        }
        throw new Error(`Exceeded maximum OpenAI call attempts (${maxAttempts}) without a successful parse.`)
      }

      const parsed = await callOpenAIWithRetry()

      // Get embeddings for each ingredient
      const ingredientsWithEmbeddings = await Promise.all(
        parsed.ingredients.map(async (ingredient) => {
          const embedding = await getEmbedding(ingredient.extracted_name)
          return { 
            ...ingredient, 
            embedding: JSON.stringify(embedding),
            recipeId 
          }
        })
      )

      const endTime = Date.now()
      const durationInSeconds = (endTime - startTime) / 1000
      console.log({ durationInSeconds })

      return {
        recipe: {
          name: parsed.name,
          description: parsed.description,
        },
        ingredients: ingredientsWithEmbeddings,
        processingTime: durationInSeconds,
      }
    }),
})