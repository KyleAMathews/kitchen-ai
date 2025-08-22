import { z } from "zod"
import { router, authedProcedure, generateTxId } from "@/lib/trpc"
import { recipes, recipeIngredients } from "@/db/schema"
import { grocerySectionSchema } from "@/db/zod-schemas"
import { eq, and } from "drizzle-orm"
import { processRecipeWithAI } from "./ai"

const createRecipeSchema = z.object({
  id: z.string().uuid(),
  url: z.string().optional(),
  pastedText: z.string(), // Required - we'll process this with AI
})

const updateRecipeSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
})

const createRecipeIngredientSchema = z.object({
  recipe_id: z.string(),
  listing: z.string(),
  extracted_name: z.string(),
  embedding: z.string(),
  grocery_section: grocerySectionSchema,
})

export const recipesRouter = router({
  create: authedProcedure
    .input(createRecipeSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)

        // Create a placeholder recipe first
        const [newRecipe] = await tx
          .insert(recipes)
          .values({
            id: input.id,
            name: `Processing...`,
            description: `AI processing in progress`,
            url: input.url || ``,
            user_id: ctx.session.user.id,
          })
          .returning()

        console.log({ input, newRecipe })
        
        // Process with AI in the same transaction
        await processRecipeWithAI(
          newRecipe.id,
          input.pastedText,
          input.url,
          ctx.session.user.id,
          tx // Pass the transaction instead of ctx.db
        )

        return { recipe: newRecipe, txid }
      })
      
      return result
    }),

  update: authedProcedure
    .input(
      z.object({
        id: z.string(),
        data: updateRecipeSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)

        const [updatedRecipe] = await tx
          .update(recipes)
          .set({
            ...input.data,
            updated_at: new Date(),
          })
          .where(
            and(
              eq(recipes.id, input.id),
              eq(recipes.user_id, ctx.session.user.id)
            )
          )
          .returning()

        if (!updatedRecipe) {
          throw new Error(`Recipe not found or not owned by user`)
        }

        return { recipe: updatedRecipe, txid }
      })
      return result
    }),

  delete: authedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)

        const [deletedRecipe] = await tx
          .delete(recipes)
          .where(
            and(
              eq(recipes.id, input.id),
              eq(recipes.user_id, ctx.session.user.id)
            )
          )
          .returning()

        if (!deletedRecipe) {
          throw new Error(`Recipe not found or not owned by user`)
        }

        return { recipe: deletedRecipe, txid }
      })
      return result
    }),

  getById: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [recipe] = await ctx.db
        .select()
        .from(recipes)
        .where(
          and(
            eq(recipes.id, input.id),
            eq(recipes.user_id, ctx.session.user.id)
          )
        )
        .limit(1)

      return recipe || null
    }),

  addIngredients: authedProcedure
    .input(
      z.object({
        recipeId: z.string(),
        ingredients: z.array(createRecipeIngredientSchema),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)

        // Verify recipe ownership
        const [recipe] = await tx
          .select()
          .from(recipes)
          .where(
            and(
              eq(recipes.id, input.recipeId),
              eq(recipes.user_id, ctx.session.user.id)
            )
          )

        if (!recipe) {
          throw new Error(`Recipe not found or not owned by user`)
        }

        // Insert ingredients
        const newIngredients = await tx
          .insert(recipeIngredients)
          .values(
            input.ingredients.map((ing) => ({
              ...ing,
              recipe_id: input.recipeId,
            }))
          )
          .returning()

        return { ingredients: newIngredients, txid }
      })
      return result
    }),
})
