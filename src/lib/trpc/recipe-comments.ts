import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { router, authedProcedure, generateTxId } from "@/lib/trpc"
import { recipeComments } from "@/db/schema"
import {
  insertRecipeCommentsSchema,
  updateRecipeCommentsSchema,
} from "@/db/zod-schemas"
import { eq, and } from "drizzle-orm"

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
            made_it: true, // Explicitly set to true for "made it" action
          })
          .returning({ id: recipeComments.id })

        const txid = await generateTxId(tx)
        return { id: result.id, txid }
      })
    }),

})
