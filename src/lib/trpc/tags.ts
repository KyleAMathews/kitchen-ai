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
import { eq, and, inArray } from "drizzle-orm"
import { newTagInputSchema, tagLinkInputSchema } from "@/lib/trpc/tag-schemas"

const changeTagAssignmentsInput = z.object({
  target: z.discriminatedUnion(`entity`, [
    z.object({
      entity: z.literal(`recipe`),
      entity_id: z.string().uuid(),
    }),
    z.object({
      entity: z.literal(`ingredient`),
      entity_id: z.string().uuid(),
    }),
  ]),
  new_tags: z.array(newTagInputSchema),
  links: z.array(tagLinkInputSchema),
  removed_link_ids: z.array(z.string().uuid()),
})

export const tagsRouter = router({
  // Persist the complete assignment diff for one entity in one transaction.
  // The one txid is visible in every Electric shape changed by the transaction.
  changeAssignments: authedProcedure
    .input(changeTagAssignmentsInput)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return await ctx.db.transaction(async (tx) => {
        // Recipes and ingredients are shared application data. user_id records
        // provenance; it does not restrict who may change tag assignments.
        if (input.target.entity === `recipe`) {
          const [recipe] = await tx
            .select({ id: recipes.id })
            .from(recipes)
            .where(eq(recipes.id, input.target.entity_id))

          if (!recipe) {
            throw new TRPCError({
              code: `NOT_FOUND`,
              message: `Recipe not found`,
            })
          }
        } else {
          const [ingredient] = await tx
            .select({ id: ingredients.id })
            .from(ingredients)
            .where(eq(ingredients.id, input.target.entity_id))

          if (!ingredient) {
            throw new TRPCError({
              code: `NOT_FOUND`,
              message: `Ingredient not found`,
            })
          }
        }

        if (input.new_tags.length > 0) {
          await tx.insert(tags).values(
            input.new_tags.map((tag) => ({
              ...tag,
              user_id: userId,
            }))
          )
        }

        if (input.target.entity === `recipe`) {
          if (input.links.length > 0) {
            await tx.insert(recipeTags).values(
              input.links.map((link) => ({
                ...link,
                recipe_id: input.target.entity_id,
              }))
            )
          }
          if (input.removed_link_ids.length > 0) {
            await tx
              .delete(recipeTags)
              .where(
                and(
                  eq(recipeTags.recipe_id, input.target.entity_id),
                  inArray(recipeTags.id, input.removed_link_ids)
                )
              )
          }
        } else {
          if (input.links.length > 0) {
            await tx.insert(ingredientTags).values(
              input.links.map((link) => ({
                ...link,
                ingredient_id: input.target.entity_id,
              }))
            )
          }
          if (input.removed_link_ids.length > 0) {
            await tx
              .delete(ingredientTags)
              .where(
                and(
                  eq(ingredientTags.ingredient_id, input.target.entity_id),
                  inArray(ingredientTags.id, input.removed_link_ids)
                )
              )
          }
        }

        const txid = await generateTxId(tx)
        return { txid }
      })
    }),

  // Create a tag using the client-generated id.
  //
  // Deliberately a plain insert, not an upsert-on-name. The collection confirms
  // its optimistic row by matching this txid against the synced row, so the
  // write has to land on the id the client already has. Upserting would touch a
  // different row and the optimistic tag would never confirm.
  //
  // Tags are global and the client syncs the whole vocabulary, so it reuses an
  // existing tag rather than re-creating a name. A duplicate name therefore only
  // means two users created it simultaneously: the unique index rejects it, the
  // collection rolls the optimistic tag back, and no join rows are written.
  create: authedProcedure
    .input(newTagInputSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      return await ctx.db.transaction(async (tx) => {
        await tx.insert(tags).values({
          id: input.id,
          name: input.name,
          user_id: userId,
        })

        const txid = await generateTxId(tx)
        return { id: input.id, txid }
      })
    }),

  // Tags are global, so any signed-in user can rename one — including tags
  // they didn't create. The rename is visible to everyone.
  update: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: z.object({ name: z.string().trim().min(1).max(50) }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const [updated] = await tx
          .update(tags)
          .set({ name: input.data.name })
          .where(eq(tags.id, input.id))
          .returning({ id: tags.id })

        if (!updated) {
          throw new TRPCError({
            code: `NOT_FOUND`,
            message: `Tag not found`,
          })
        }

        const txid = await generateTxId(tx)
        return { txid }
      })
    }),

  // Deleting a tag cascades to its recipe/ingredient join rows — for every
  // user, since the vocabulary is global. No UI exposes this today.
  delete: authedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const [deleted] = await tx
          .delete(tags)
          .where(eq(tags.id, input.id))
          .returning({ id: tags.id })

        if (!deleted) {
          throw new TRPCError({
            code: `NOT_FOUND`,
            message: `Tag not found`,
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
      return await ctx.db.transaction(async (tx) => {
        // Recipes, ingredients, and tags are shared across signed-in users.
        const [recipe] = await tx
          .select({ id: recipes.id })
          .from(recipes)
          .where(eq(recipes.id, input.recipe_id))
        const [tag] = await tx
          .select({ id: tags.id })
          .from(tags)
          .where(eq(tags.id, input.tag_id))

        if (!recipe || !tag) {
          throw new TRPCError({
            code: `NOT_FOUND`,
            message: `Recipe or tag not found`,
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
      return await ctx.db.transaction(async (tx) => {
        // Recipes, ingredients, and tags are shared across signed-in users.
        const [ingredient] = await tx
          .select({ id: ingredients.id })
          .from(ingredients)
          .where(eq(ingredients.id, input.ingredient_id))
        const [tag] = await tx
          .select({ id: tags.id })
          .from(tags)
          .where(eq(tags.id, input.tag_id))

        if (!ingredient || !tag) {
          throw new TRPCError({
            code: `NOT_FOUND`,
            message: `Ingredient or tag not found`,
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
