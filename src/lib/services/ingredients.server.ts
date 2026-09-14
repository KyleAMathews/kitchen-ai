import { z } from "zod"
import { grocerySectionSchema } from "@/db/zod-schemas"
import type OpenAI from "openai"
import { zodFunction } from "openai/helpers/zod"
import { getEmbedding } from "./ai.server"
import { getOpenAIClient } from "@/lib/openai"

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
  const tool = zodFunction({
    name: `get_ingredient`,
    description: `Get ingredient arguments from name of ingredient`,
    parameters: aiIngredientSchema,
  })

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: `system`,
      content: `You are an ingredient information assistant. Extract ingredient details.

IMPORTANT: For grocery_section, you MUST use exactly one of these values:
${grocerySectionSchema.options.join(`, `)}

Do NOT use underscores or any other variations. Use the exact capitalization and spacing shown above.`,
    },
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
        `OpenAI ingredient extraction attempt ${attempt}/${maxAttempts}`
      )

      try {
        const client = getOpenAIClient()
        const response = await client.chat.completions.create({
          model: `gpt-3.5-turbo-0125`,
          max_tokens: 1024,
          messages,
          tools: [tool],
          tool_choice: {
            type: `function`,
            function: { name: `get_ingredient` },
          },
        })

        const { message } = response.choices[0]

        if (!message.tool_calls?.[0]) {
          throw new Error(`No function call in response`)
        }

        const toolCall = message.tool_calls[0]
        if (toolCall.type !== `function`) {
          throw new Error(`Expected function tool call`)
        }
        const parsed = aiIngredientSchema.parse(
          JSON.parse(toolCall.function.arguments)
        )

        return parsed
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error)

        if (attempt === maxAttempts) {
          throw new Error(
            `Failed to extract ingredient info after ${maxAttempts} attempts: ${error}`
          )
        }

        // Add error context for next attempt
        messages.push(
          {
            role: `assistant`,
            content: `I encountered an error processing the ingredient.`,
          },
          {
            role: `user`,
            content: `Please try again. Extract the ingredient description and grocery section. Use only the allowed grocery sections: ${grocerySectionSchema.options.join(`, `)}`,
          }
        )
      }
    }

    throw new Error(`Should not reach here`)
  }

  const parsed = await extractIngredientInfo()

  // Get embedding for the ingredient name
  const embedding = await getEmbedding(name)

  return { parsed, embedding }
}
