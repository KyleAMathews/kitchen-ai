import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { router, authedProcedure, generateTxId } from "@/lib/trpc"
import {
  tags,
  recipeTags,
  ingredientTags,
  recipes,
  ingredients,
} from "@/db/schema"
import { eq, and } from "drizzle-orm"

export const tagsRouter = router({
  // Create a tag (id is client-generated for optimistic sync).
  // Idempotent: re-running with the same id is a no-op.
  create: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().trim().min(1).max(50),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return await ctx.db.transaction(async (tx) => {
        await tx
          .insert(tags)
          .values({
            id: input.id,
            name: input.name,
            user_id: userId,
          })
          .onConflictDoNothing()

        const txid = await generateTxId(tx)
        return { id: input.id, txid }
      })
    }),

  update: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: z.object({ name: z.string().trim().min(1).max(50) }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return await ctx.db.transaction(async (tx) => {
        const [updated] = await tx
          .update(tags)
          .set({ name: input.data.name })
          .where(and(eq(tags.id, input.id), eq(tags.user_id, userId)))
          .returning({ id: tags.id })

        if (!updated) {
          throw new TRPCError({
            code: `NOT_FOUND`,
            message: `Tag not found or not owned by user`,
          })
        }

        const txid = await generateTxId(tx)
        return { txid }
      })
    }),

  // Deleting a tag cascades to its recipe/ingredient join rows.
  delete: authedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return await ctx.db.transaction(async (tx) => {
        const [deleted] = await tx
          .delete(tags)
          .where(and(eq(tags.id, input.id), eq(tags.user_id, userId)))
          .returning({ id: tags.id })

        if (!deleted) {
          throw new TRPCError({
            code: `NOT_FOUND`,
            message: `Tag not found or not owned by user`,
          })
        }

        const txid = await generateTxId(tx)
        return { txid }
      })
    }),

  // Attach a tag to a recipe
  addToRecipe: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        recipe_id: z.string().uuid(),
        tag_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return await ctx.db.transaction(async (tx) => {
        // Verify the recipe and tag belong to the user
        const [recipe] = await tx
          .select({ id: recipes.id })
          .from(recipes)
          .where(
            and(eq(recipes.id, input.recipe_id), eq(recipes.user_id, userId))
          )
        const [tag] = await tx
          .select({ id: tags.id })
          .from(tags)
          .where(and(eq(tags.id, input.tag_id), eq(tags.user_id, userId)))

        if (!recipe || !tag) {
          throw new TRPCError({
            code: `NOT_FOUND`,
            message: `Recipe or tag not found or not owned by user`,
          })
        }

        await tx
          .insert(recipeTags)
          .values({
            id: input.id,
            recipe_id: input.recipe_id,
            tag_id: input.tag_id,
          })
          .onConflictDoNothing()

        const txid = await generateTxId(tx)
        return { id: input.id, txid }
      })
    }),

  removeFromRecipe: authedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        await tx.delete(recipeTags).where(eq(recipeTags.id, input.id))
        const txid = await generateTxId(tx)
        return { txid }
      })
    }),

  // Attach a tag to an ingredient
  addToIngredient: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        ingredient_id: z.string().uuid(),
        tag_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return await ctx.db.transaction(async (tx) => {
        const [ingredient] = await tx
          .select({ id: ingredients.id })
          .from(ingredients)
          .where(
            and(
              eq(ingredients.id, input.ingredient_id),
              eq(ingredients.user_id, userId)
            )
          )
        const [tag] = await tx
          .select({ id: tags.id })
          .from(tags)
          .where(and(eq(tags.id, input.tag_id), eq(tags.user_id, userId)))

        if (!ingredient || !tag) {
          throw new TRPCError({
            code: `NOT_FOUND`,
            message: `Ingredient or tag not found or not owned by user`,
          })
        }

        await tx
          .insert(ingredientTags)
          .values({
            id: input.id,
            ingredient_id: input.ingredient_id,
            tag_id: input.tag_id,
          })
          .onConflictDoNothing()

        const txid = await generateTxId(tx)
        return { id: input.id, txid }
      })
    }),

  removeFromIngredient: authedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        await tx.delete(ingredientTags).where(eq(ingredientTags.id, input.id))
        const txid = await generateTxId(tx)
        return { txid }
      })
    }),
})
