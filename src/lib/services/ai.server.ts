import { z } from "zod"

import { grocerySectionSchema } from "@/db/zod-schemas"
import { chat, embed, type ModelMessage } from "@tanstack/ai"
import {
  getIngredientEmbeddingAdapter,
  getKitchenAIAdapter,
  KITCHEN_AI_MODEL,
} from "@/lib/tanstack-ai.server"

// Helper function to get embeddings
export async function getEmbedding(text: string) {
  const result = await embed({
    adapter: getIngredientEmbeddingAdapter(),
    input: text,
    dimensions: 256,
  })

  const embedding = result.embeddings[0]?.vector
  if (!embedding) {
    throw new Error(`TanStack AI returned no embedding for the ingredient.`)
  }

  return embedding
}

// Use the centralized grocery section schema
const grocerySectionEnum = grocerySectionSchema

const recipeExtractionSchema = z.object({
  name: z.string().describe(`Recipe name in Title Case`),
  description: z.string().describe(`One sentence description of the recipe`),
  ingredients: z
    .array(
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
    )
    .min(1),
})

type RecipeExtraction = z.infer<typeof recipeExtractionSchema>

// Extract recipe data and embeddings without accessing the database.
export async function extractRecipe(
  pastedText: string,
  url: string | undefined
) {
  const startTime = Date.now()

  async function extractRecipeWithRetry(
    messages: Array<ModelMessage>,
    maxAttempts = 3
  ): Promise<RecipeExtraction> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(
        `TanStack AI recipe extraction attempt ${attempt}/${maxAttempts} with ${KITCHEN_AI_MODEL}`
      )

      try {
        return await chat({
          adapter: getKitchenAIAdapter(),
          systemPrompts: [
            `You are a recipe parsing assistant. Extract recipe information from user-provided text.

IMPORTANT: For grocery_section, you MUST use exactly one of these values:
${grocerySectionEnum.options.join(`, `)}

Do NOT use underscores, hyphens, or any other variations. Use the exact capitalization and spacing shown above.`,
          ],
          messages,
          outputSchema: recipeExtractionSchema,
          modelOptions: {
            max_output_tokens: 2048,
          },
        })
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error)

        if (attempt === maxAttempts) {
          throw new Error(
            `Failed to extract recipe after ${maxAttempts} attempts: ${error}`
          )
        }

        // Add error context for the next independent attempt.
        messages = [
          ...messages,
          {
            role: `user`,
            content: `Please try again. Extract the recipe name, description, and ingredients. Use only the allowed grocery sections: ${grocerySectionEnum.options.join(`, `)}`,
          },
        ]
      }
    }

    throw new Error(`Should not reach here`)
  }

  const initialMessages: Array<ModelMessage> = [
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

  const durationInSeconds = (Date.now() - startTime) / 1000
  console.log(`Recipe extracted in ${durationInSeconds} seconds`)
  return { ...parsed, ingredients: ingredientsWithEmbeddings }
}
