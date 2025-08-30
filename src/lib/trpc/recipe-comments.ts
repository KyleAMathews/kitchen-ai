import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { router, authedProcedure, generateTxId } from "@/lib/trpc"
import { recipeComments } from "@/db/schema"
import {
  insertRecipeCommentsSchema,
  updateRecipeCommentsSchema,
} from "@/db/zod-schemas"
import { eq, and, sql, desc } from "drizzle-orm"

export const recipeCommentsRouter = router({
  // Add a comment/rating/made-it entry
  create: authedProcedure
    .input(
      insertRecipeCommentsSchema.omit({
        id: true,
        user_id: true,
        created_at: true,
        updated_at: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return await ctx.db.transaction(async (tx) => {
        const [result] = await tx
          .insert(recipeComments)
          .values({
            ...input,
            user_id: userId,
          })
          .returning({ id: recipeComments.id })

        const txid = await generateTxId(tx)
        return { id: result.id, txid }
      })
    }),

  // Update a comment
  update: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateRecipeCommentsSchema.omit({
          id: true,
          recipe_id: true,
          user_id: true,
          created_at: true,
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return await ctx.db.transaction(async (tx) => {
        // Verify ownership
        const [existing] = await tx
          .select()
          .from(recipeComments)
          .where(
            and(
              eq(recipeComments.id, input.id),
              eq(recipeComments.user_id, userId)
            )
          )

        if (!existing) {
          throw new TRPCError({
            code: `NOT_FOUND`,
            message: `Comment not found or you don't have permission to edit it`,
          })
        }

        await tx
          .update(recipeComments)
          .set({
            ...input.data,
            updated_at: new Date(),
          })
          .where(eq(recipeComments.id, input.id))

        const txid = await generateTxId(tx)
        return { txid }
      })
    }),

  // Delete a comment
  delete: authedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return await ctx.db.transaction(async (tx) => {
        // Verify ownership
        const [existing] = await tx
          .select()
          .from(recipeComments)
          .where(
            and(
              eq(recipeComments.id, input.id),
              eq(recipeComments.user_id, userId)
            )
          )

        if (!existing) {
          throw new TRPCError({
            code: `NOT_FOUND`,
            message: `Comment not found or you don't have permission to delete it`,
          })
        }

        await tx.delete(recipeComments).where(eq(recipeComments.id, input.id))

        const txid = await generateTxId(tx)
        return { txid }
      })
    }),

  // Quick "made it" action - creates entry with just made_it=true
  madeIt: authedProcedure
    .input(z.object({ recipe_id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return await ctx.db.transaction(async (tx) => {
        const [result] = await tx
          .insert(recipeComments)
          .values({
            recipe_id: input.recipe_id,
            user_id: userId,
            made_it: true,
          })
          .returning({ id: recipeComments.id })

        const txid = await generateTxId(tx)
        return { id: result.id, txid }
      })
    }),

  // Get aggregated stats for a recipe
  getStats: authedProcedure
    .input(z.object({ recipe_id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const stats = await ctx.db
        .select({
          total_made: sql<number>`count(*)::int`,
          total_ratings: sql<number>`count(${recipeComments.rating})::int`,
          avg_rating: sql<number>`avg(${recipeComments.rating})`,
          total_comments: sql<number>`count(${recipeComments.comment})::int`,
        })
        .from(recipeComments)
        .where(eq(recipeComments.recipe_id, input.recipe_id))

      return (
        stats[0] || {
          total_made: 0,
          total_ratings: 0,
          avg_rating: null,
          total_comments: 0,
        }
      )
    }),

  // Get all comments for a recipe
  getComments: authedProcedure
    .input(z.object({ recipe_id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db
        .select()
        .from(recipeComments)
        .where(eq(recipeComments.recipe_id, input.recipe_id))
        .orderBy(desc(recipeComments.created_at))

      return comments
    }),
})
