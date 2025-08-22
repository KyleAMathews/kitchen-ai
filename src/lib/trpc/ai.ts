import { z } from "zod"
import { router, authedProcedure, generateTxId } from "@/lib/trpc"
import { recipes, recipeIngredients } from "@/db/schema"
import { grocerySectionSchema } from "@/db/zod-schemas"
import { eq, and } from "drizzle-orm"
import OpenAI from "openai"
import pkg from "openai-zod-functions"
const { ZodFunctionDef, toTool, parseArguments } = pkg

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY,
})

// Helper function to get embeddings
export async function getEmbedding(text: string) {
  const result = await openai.embeddings.create({
    input: text,
    model: `text-embedding-3-small`,
    dimensions: 256,
  })
  return result.data[0].embedding
}

// Use the centralized grocery section schema
const grocerySectionEnum = grocerySectionSchema

const recipeExtractionSchema = z.object({
  name: z.string().describe(`Recipe name in Title Case`),
  description: z.string().describe(`One sentence description of the recipe`),
  ingredients: z.array(
    z.object({
      listing: z
        .string()
        .max(140)
        .describe(
          `The complete ingredient line as written (e.g., "2 cups flour, sifted")`
        ),
      extracted_name: z
        .string()
        .describe(`Core ingredient name only (e.g., "flour")`),
      grocery_section: grocerySectionEnum.describe(
        `Grocery store section. Use the exact values provided (e.g., 'Pantry', 'Meat & Seafood', 'Spices & Baking')`
      ),
    })
  ),
})

type RecipeExtraction = z.infer<typeof recipeExtractionSchema>

// Process recipe with AI and save to database
export async function processRecipeWithAI(
  recipeId: string,
  pastedText: string,
  url: string | undefined,
  userId: string,
  tx: any
) {
  const startTime = Date.now()

  const functions: ZodFunctionDef[] = [
    {
      name: `extract_recipe`,
      description: `Extract recipe name, description, and ingredients from pasted text`,
      schema: recipeExtractionSchema,
    },
  ]

  async function extractRecipeWithRetry(
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    maxAttempts = 3
  ): Promise<RecipeExtraction> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`OpenAI extraction attempt ${attempt}/${maxAttempts}`)

      try {
        const response = await openai.chat.completions.create({
          model: `gpt-4o`,
          max_tokens: 2048,
          messages,
          tools: functions.map(toTool),
          tool_choice: {
            type: `function`,
            function: { name: `extract_recipe` },
          },
        })

        const { message } = response.choices[0]

        if (!message.tool_calls?.[0]) {
          throw new Error(`No function call in response`)
        }

        const func = message.tool_calls[0].function
        const parsed = parseArguments(
          func.name,
          func.arguments,
          recipeExtractionSchema
        )

        return parsed as RecipeExtraction
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error)

        if (attempt === maxAttempts) {
          throw new Error(
            `Failed to extract recipe after ${maxAttempts} attempts: ${error}`
          )
        }

        // Add error context for next attempt
        messages = [
          ...messages,
          {
            role: `assistant`,
            content: `I encountered an error processing the recipe.`,
          },
          {
            role: `user`,
            content: `Please try again. Extract the recipe name, description, and ingredients. Use only the allowed grocery sections: ${grocerySectionEnum.options.join(`, `)}`,
          },
        ]
      }
    }

    throw new Error(`Should not reach here`)
  }

  const initialMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
    [
      {
        role: `system`,
        content: `You are a recipe parsing assistant. Extract recipe information from user-provided text.

IMPORTANT: For grocery_section, you MUST use exactly one of these values:
${grocerySectionEnum.options.join(`, `)}

Do NOT use underscores, hyphens, or any other variations. Use the exact capitalization and spacing shown above.`,
      },
      {
        role: `user`,
        content: `Extract the recipe details from this text${url ? ` (source: ${url})` : ``}:\n\n${pastedText}`,
      },
    ]

  const parsed = await extractRecipeWithRetry(initialMessages)

  // Get embeddings for each ingredient
  const ingredientsWithEmbeddings = await Promise.all(
    parsed.ingredients.map(async (ingredient) => {
      const embedding = await getEmbedding(ingredient.extracted_name)
      return {
        ...ingredient,
        embedding: JSON.stringify(embedding),
      }
    })
  )

  // Update the recipe and add ingredients using the provided transaction
  try {
    console.log(`Updating recipe with:`, {
      name: parsed.name,
      description: parsed.description,
    })

    // Update recipe with processed data
    await tx
      .update(recipes)
      .set({
        name: parsed.name,
        description: parsed.description,
        updated_at: new Date(),
      })
      .where(and(eq(recipes.id, recipeId), eq(recipes.user_id, userId)))

    console.log(
      `Inserting ingredients:`,
      ingredientsWithEmbeddings.map((ing) => ({
        listing: ing.listing,
        extracted_name: ing.extracted_name,
        grocery_section: ing.grocery_section,
      }))
    )

    // Insert ingredients
    await tx.insert(recipeIngredients).values(
      ingredientsWithEmbeddings.map((ing) => ({
        recipe_id: recipeId,
        listing: ing.listing,
        extracted_name: ing.extracted_name,
        embedding: ing.embedding,
        grocery_section: ing.grocery_section,
      }))
    )
  } catch (dbError) {
    console.error(`Database error during recipe processing:`, dbError)
    console.error(`Parsed data:`, parsed)
    console.error(`Ingredients with embeddings:`, ingredientsWithEmbeddings)
    throw dbError
  }

  const endTime = Date.now()
  const durationInSeconds = (endTime - startTime) / 1000
  console.log(`Recipe processed in ${durationInSeconds} seconds`)
}

// Empty router for now - we're handling everything through recipes.create
export const aiRouter = router({})
