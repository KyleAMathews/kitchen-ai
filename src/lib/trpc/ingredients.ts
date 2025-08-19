import { z } from "zod"
import { router, authedProcedure, generateTxId } from "@/lib/trpc"
import { ingredients } from "@/db/schema"
import {
  grocerySectionSchema,
  ingredientsTrackingTypeSchema,
} from "@/db/zod-schemas"
import { eq, and } from "drizzle-orm"

const createIngredientSchema = z.object({
  name: z.string(),
  description: z.string().default(""),
  embedding: z.string(),
  trackingType: ingredientsTrackingTypeSchema.optional(),
  fillLevel: z.number().default(100),
  grocerySection: grocerySectionSchema,
  count: z.number().default(1),
  expirationDate: z.date(),
  ingredientsPhotoUploadsId: z.string().optional(),
})

const updateIngredientSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isReviewed: z.boolean().optional(),
  trackingType: ingredientsTrackingTypeSchema.optional(),
  fillLevel: z.number().optional(),
  grocerySection: grocerySectionSchema.optional(),
  count: z.number().optional(),
  expirationDate: z.date().optional(),
  ingredientsPhotoUploadsId: z.string().optional(),
})

export const ingredientsRouter = router({
  create: authedProcedure
    .input(createIngredientSchema)
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
        data: updateIngredientSchema,
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
          throw new Error("Ingredient not found or not owned by user")
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
          throw new Error("Ingredient not found or not owned by user")
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
