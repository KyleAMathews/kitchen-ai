import { z } from "zod"
import { router, authedProcedure, generateTxId } from "@/lib/trpc"
import { ingredients } from "@/db/schema"
import {
  grocerySectionSchema,
  ingredientsTrackingTypeSchema,
  insertIngredientsSchema,
  updateIngredientsSchema,
} from "@/db/zod-schemas"
import { eq, and } from "drizzle-orm"
import OpenAI from "openai"
import pkg from "openai-zod-functions"
import { getEmbedding } from "@/lib/trpc/ai"
const { ZodFunctionDef, toTool, parseArguments } = pkg

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY,
})

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

export const ingredientsRouter = router({
  createWithAI: authedProcedure
    .input(
      z.object({
        name: z.string(),
        tracking_type: ingredientsTrackingTypeSchema,
        fill_level: z.number().min(0).max(100).optional().nullable(),
        count: z.number().optional().nullable(),
        expiration_date: z.date().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const functions: ZodFunctionDef[] = [
        {
          name: `get_ingredient`,
          description: `Get ingredient arguments from name of ingredient`,
          schema: aiIngredientSchema,
        },
      ]

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
          content: `A user wants more information about this kitchen ingredient: ${input.name}`,
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
            const response = await openai.chat.completions.create({
              model: `gpt-3.5-turbo-0125`,
              max_tokens: 1024,
              messages,
              tools: functions.map(toTool),
              tool_choice: {
                type: `function`,
                function: { name: `get_ingredient` },
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
              aiIngredientSchema
            )

            return parsed as AIIngredientInfo
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
      const embedding = await getEmbedding(input.name)

      // Save to database
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)

        const [newIngredient] = await tx
          .insert(ingredients)
          .values({
            name: input.name,
            description: parsed.description,
            grocery_section: parsed.grocery_section,
            embedding: JSON.stringify(embedding),
            user_id: ctx.session.user.id,
            tracking_type: input.tracking_type,
            fill_level:
              input.tracking_type === `fill_level`
                ? (input.fill_level ?? 50)
                : input.tracking_type === `pantry_staple`
                  ? 100
                  : 0,
            count: input.tracking_type === `count` ? (input.count ?? 1) : 0,
            is_reviewed: true,
            // Use provided expiration date or default based on type
            expiration_date:
              input.tracking_type === `pantry_staple`
                ? new Date(Date.now() + 365 * 10 * 24 * 60 * 60 * 1000) // 10 years from now
                : (input.expiration_date ??
                  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // 30 days from now or provided date
          })
          .returning()

        return { ingredient: newIngredient, txid }
      })

      return result
    }),

  create: authedProcedure
    .input(
      insertIngredientsSchema.omit({
        id: true,
        user_id: true,
        created_at: true,
        updated_at: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)
        const [newIngredient] = await tx
          .insert(ingredients)
          .values({
            ...input,
            user_id: ctx.session.user.id,
          })
          .returning()
        return { ingredient: newIngredient, txid }
      })
      return result
    }),

  update: authedProcedure
    .input(
      z.object({
        id: z.string(),
        data: updateIngredientsSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)

        // Check ownership
        const [updatedIngredient] = await tx
          .update(ingredients)
          .set({
            ...input.data,
            updated_at: new Date(),
          })
          .where(
            and(
              eq(ingredients.id, input.id),
              eq(ingredients.user_id, ctx.session.user.id)
            )
          )
          .returning()

        if (!updatedIngredient) {
          throw new Error(`Ingredient not found or not owned by user`)
        }

        return { ingredient: updatedIngredient, txid }
      })
      return result
    }),

  delete: authedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)

        const [deletedIngredient] = await tx
          .delete(ingredients)
          .where(
            and(
              eq(ingredients.id, input.id),
              eq(ingredients.user_id, ctx.session.user.id)
            )
          )
          .returning()

        if (!deletedIngredient) {
          throw new Error(`Ingredient not found or not owned by user`)
        }

        return { ingredient: deletedIngredient, txid }
      })
      return result
    }),

  getById: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [ingredient] = await ctx.db
        .select()
        .from(ingredients)
        .where(
          and(
            eq(ingredients.id, input.id),
            eq(ingredients.user_id, ctx.session.user.id)
          )
        )
        .limit(1)

      return ingredient || null
    }),
})
