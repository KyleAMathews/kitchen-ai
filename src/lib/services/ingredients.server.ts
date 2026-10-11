import { z } from "zod"
import { grocerySectionSchema } from "@/db/zod-schemas"
import { chat, type ModelMessage } from "@tanstack/ai"
import { getEmbedding } from "./ai.server"
import { getKitchenAIAdapter, KITCHEN_AI_MODEL } from "@/lib/tanstack-ai.server"

// Schema for AI-extracted ingredient info
const aiIngredientSchema = z.object({
  description: z
    .string()
    .describe(
      `Short one sentence description of the ingredient and what kind of cuisines it's used with.`
    ),
  grocery_section: grocerySectionSchema.describe(
    `The section of a US grocery store that someone is most likely to find this ingredient. You can only pick from the allowed options.`
  ),
})

type AIIngredientInfo = z.infer<typeof aiIngredientSchema>

export async function describeIngredient(name: string) {
  const messages: Array<ModelMessage> = [
    {
      role: `user`,
      content: `A user wants more information about this kitchen ingredient: ${name}`,
    },
  ]

  async function extractIngredientInfo(
    maxAttempts = 3
  ): Promise<AIIngredientInfo> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(
        `TanStack AI ingredient extraction attempt ${attempt}/${maxAttempts} with ${KITCHEN_AI_MODEL}`
      )

      try {
        return await chat({
          adapter: getKitchenAIAdapter(),
          systemPrompts: [
            `You are an ingredient information assistant. Extract ingredient details.

IMPORTANT: For grocery_section, you MUST use exactly one of these values:
${grocerySectionSchema.options.join(`, `)}

Do NOT use underscores or any other variations. Use the exact capitalization and spacing shown above.`,
          ],
          messages,
          outputSchema: aiIngredientSchema,
          modelOptions: {
            max_output_tokens: 1024,
          },
        })
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error)

        if (attempt === maxAttempts) {
          throw new Error(
            `Failed to extract ingredient info after ${maxAttempts} attempts: ${error}`
          )
        }

        messages.push({
          role: `user`,
          content: `Please try again. Extract the ingredient description and grocery section. Use only the allowed grocery sections: ${grocerySectionSchema.options.join(`, `)}`,
        })
      }
    }

    throw new Error(`Should not reach here`)
  }

  const parsed = await extractIngredientInfo()

  // Get embedding for the ingredient name
  const embedding = await getEmbedding(name)

  return { parsed, embedding }
}
