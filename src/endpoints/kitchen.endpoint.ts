import { z } from "zod"
import type { DbClient } from "@tanstack/db"
import { endpoints } from "./runtime"
import {
  db,
  requireUser,
  users,
  ingredients,
  recipes,
  recipeIngredients,
  recipeComments,
  tags,
  recipeTags,
  ingredientTags,
} from "./database.server"
import { eq, and, inArray, sql } from "drizzle-orm"
import { ServiceError } from "@/lib/services/context.server"
import { describeIngredient } from "@/lib/services/ingredients.server"
import { extractRecipe } from "@/lib/services/ai.server"
import { addShoppingCard } from "@/lib/services/shopping-list.server"
import {
  selectUsersSchema,
  selectIngredientsSchema,
  selectRecipesSchema,
  selectRecipeIngredientsSchema,
  selectRecipeCommentsSchema,
  selectTagsSchema,
  selectRecipeTagsSchema,
  selectIngredientTagsSchema,
  updateIngredientsSchema,
  updateRecipeCommentsSchema,
} from "@/db/zod-schemas"
import { tagWritesSchema, tagTargetSchema } from "./schemas"
export function createKitchenEndpoints(dbClient: DbClient) {
  const { query, mutation } = endpoints(dbClient)
  const usersCollection = query({
    input: z.object({}),
    schema: selectUsersSchema,
    async handler(req, res) {
      await requireUser(req)
      const rows = await db.select().from(users)
      return res.json(rows)
    },
  })
  const ingredientsCollection = query({
    input: z.object({}),
    schema: selectIngredientsSchema,
    async handler(req, res) {
      await requireUser(req)
      const rows = await db.select().from(ingredients)
      return res.json(rows)
    },
  })
  const recipesCollection = query({
    input: z.object({}),
    schema: selectRecipesSchema,
    async handler(req, res) {
      await requireUser(req)
      const rows = await db.select().from(recipes)
      return res.json(rows)
    },
  })
  const recipeIngredientsCollection = query({
    input: z.object({}),
    schema: selectRecipeIngredientsSchema,
    async handler(req, res) {
      await requireUser(req)
      const rows = await db.select().from(recipeIngredients)
      return res.json(rows)
    },
  })
  const recipeCommentsCollection = query({
    input: z.object({}),
    schema: selectRecipeCommentsSchema,
    async handler(req, res) {
      await requireUser(req)
      const rows = await db.select().from(recipeComments)
      return res.json(rows)
    },
  })
  const tagsCollection = query({
    input: z.object({}),
    schema: selectTagsSchema,
    async handler(req, res) {
      await requireUser(req)
      const rows = await db.select().from(tags)
      return res.json(rows)
    },
  })
  const recipeTagsCollection = query({
    input: z.object({}),
    schema: selectRecipeTagsSchema,
    async handler(req, res) {
      await requireUser(req)
      const rows = await db.select().from(recipeTags)
      return res.json(rows)
    },
  })
  const ingredientTagsCollection = query({
    input: z.object({}),
    schema: selectIngredientTagsSchema,
    async handler(req, res) {
      await requireUser(req)
      const rows = await db.select().from(ingredientTags)
      return res.json(rows)
    },
  })
  const saveIngredient = mutation({
    input: z.object({ id: z.string(), data: updateIngredientsSchema }),
    onMutate({ input }) {
      ingredientsCollection.update(input.id, (draft) => {
        Object.assign(draft, input.data)
      })
    },
    async handler(req, res) {
      const user = await requireUser(req)

      const input = req.body
      const result = await db.transaction(async (tx) => {
        // Check ownership
        const [updatedIngredient] = await tx
          .update(ingredients)
          .set({
            ...input.data,
            updated_at: new Date(),
          })
          .where(
            and(eq(ingredients.id, input.id), eq(ingredients.user_id, user.id))
          )
          .returning()

        if (!updatedIngredient) {
          throw new Error(`Ingredient not found or not owned by user`)
        }

        return { ingredient: updatedIngredient }
      })
      return res.json(result)
    },
  })
  const saveComment = mutation({
    input: z.object({
      id: z.string().uuid(),
      data: updateRecipeCommentsSchema.omit({
        id: true,
        recipe_id: true,
        user_id: true,
        created_at: true,
      }),
    }),
    onMutate({ input }) {
      recipeCommentsCollection.update(input.id, (draft) => {
        Object.assign(draft, input.data)
      })
    },
    async handler(req, res) {
      const user = await requireUser(req)

      const input = req.body
      const userId = user.id

      return res.json(
        await db.transaction(async (tx) => {
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
            throw new ServiceError({
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

          return { ok: true }
        })
      )
    },
  })
  const deleteIngredient = mutation({
    input: z.string(),
    onMutate({ input }) {
      ingredientsCollection.delete(input)
    },
    async handler(req, res) {
      const user = await requireUser(req)

      const id = req.body
      const result = await db.transaction(async (tx) => {
        const [deletedIngredient] = await tx
          .delete(ingredients)
          .where(and(eq(ingredients.id, id), eq(ingredients.user_id, user.id)))
          .returning()

        if (!deletedIngredient) {
          throw new Error(`Ingredient not found or not owned by user`)
        }

        return { ingredient: deletedIngredient }
      })
      return res.json(result)
    },
  })
  const deleteRecipe = mutation({
    input: z.string(),
    onMutate({ input }) {
      recipesCollection.delete(input)
    },
    async handler(req, res) {
      const user = await requireUser(req)

      const id = req.body
      const result = await db.transaction(async (tx) => {
        const [deletedRecipe] = await tx
          .delete(recipes)
          .where(and(eq(recipes.id, id), eq(recipes.user_id, user.id)))
          .returning()

        if (!deletedRecipe) {
          throw new Error(`Recipe not found or not owned by user`)
        }

        return { recipe: deletedRecipe }
      })
      return res.json(result)
    },
  })
  const deleteComment = mutation({
    input: z.string().uuid(),
    onMutate({ input }) {
      recipeCommentsCollection.delete(input)
    },
    async handler(req, res) {
      const user = await requireUser(req)

      const id = req.body
      const userId = user.id

      return res.json(
        await db.transaction(async (tx) => {
          // Verify ownership
          const [existing] = await tx
            .select()
            .from(recipeComments)
            .where(
              and(eq(recipeComments.id, id), eq(recipeComments.user_id, userId))
            )

          if (!existing) {
            throw new ServiceError({
              code: `NOT_FOUND`,
              message: `Comment not found or you don't have permission to delete it`,
            })
          }

          await tx.delete(recipeComments).where(eq(recipeComments.id, id))

          return { ok: true }
        })
      )
    },
  })
  const insertComment = mutation({
    input: selectRecipeCommentsSchema,
    onMutate({ input }) {
      recipeCommentsCollection.insert(input)
    },
    async handler(req, res) {
      const user = await requireUser(req)

      const input = req.body
      const userId = user.id

      return res.json(
        await db.transaction(async (tx) => {
          const [result] = await tx
            .insert(recipeComments)
            .values({
              id: input.id,
              recipe_id: input.recipe_id,
              made_it: input.made_it,
              rating: input.rating,
              comment: input.comment,
              user_id: userId,
            })
            .returning({ id: recipeComments.id })

          return { id: result.id }
        })
      )
    },
  })
  const createIngredientAction = mutation({
    input: tagWritesSchema.extend({
      ingredient: selectIngredientsSchema.extend({
        tracking_type: z.enum([`fill_level`, `count`, `pantry_staple`]),
        fill_level: z.number().min(0).max(100),
      }),
    }),
    onMutate({ input }) {
      ingredientsCollection.insert(input.ingredient)
      for (const tag of input.new_tags) tagsCollection.insert(tag)
      for (const link of input.links)
        ingredientTagsCollection.insert({
          ...link,
          ingredient_id: input.ingredient.id,
        })
    },
    async handler(req, res) {
      const user = await requireUser(req)

      const input = req.body.ingredient
      const { new_tags, links } = req.body
      const { parsed, embedding } = await describeIngredient(input.name)
      // Save to database
      const result = await db.transaction(async (tx) => {
        const [newIngredient] = await tx
          .insert(ingredients)
          .values({
            id: input.id,
            name: input.name,
            description: parsed.description,
            grocery_section: parsed.grocery_section,
            embedding: JSON.stringify(embedding),
            user_id: user.id,
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

        if (new_tags.length > 0) {
          await tx.insert(tags).values(
            new_tags.map((tag) => ({
              id: tag.id,
              name: tag.name,
              user_id: user.id,
            }))
          )
        }

        if (links.length > 0) {
          await tx.insert(ingredientTags).values(
            links.map((link) => ({
              id: link.id,
              tag_id: link.tag_id,
              ingredient_id: input.id,
            }))
          )
        }

        return { ingredient: newIngredient }
      })

      return res.json(result)
    },
  })
  const createRecipeAction = mutation({
    input: tagWritesSchema.extend({
      id: z.string().uuid(),
      url: z.string(),
      pastedText: z.string(),
      created_at: z.date(),
    }),
    onMutate({ input }) {
      recipesCollection.insert({
        id: input.id,
        name: `Processing...`,
        description: `AI processing in progress`,
        url: input.url,
        user_id: ``,
        created_at: input.created_at,
        updated_at: input.created_at,
      })
      for (const tag of input.new_tags) tagsCollection.insert(tag)
      for (const link of input.links)
        recipeTagsCollection.insert({ ...link, recipe_id: input.id })
    },
    async handler(req, res) {
      const user = await requireUser(req)

      const input = req.body
      const result = await db.transaction(async (tx) => {
        // Create a placeholder recipe first
        const [newRecipe] = await tx
          .insert(recipes)
          .values({
            id: input.id,
            name: `Processing...`,
            description: `AI processing in progress`,
            url: input.url || ``,
            user_id: user.id,
          })
          .returning()

        console.log({ input, newRecipe })

        // Process with AI in the same transaction
        const parsed = await extractRecipe(input.pastedText, input.url)
        await tx
          .update(recipes)
          .set({
            name: parsed.name,
            description: parsed.description,
            updated_at: new Date(),
          })
          .where(
            and(eq(recipes.id, newRecipe.id), eq(recipes.user_id, user.id))
          )
        await tx.insert(recipeIngredients).values(
          parsed.ingredients.map((ingredient) => ({
            recipe_id: newRecipe.id,
            ...ingredient,
          }))
        )

        if (input.new_tags.length > 0) {
          await tx.insert(tags).values(
            input.new_tags.map((tag) => ({
              id: tag.id,
              name: tag.name,
              user_id: user.id,
            }))
          )
        }

        if (input.links.length > 0) {
          await tx.insert(recipeTags).values(
            input.links.map((link) => ({
              id: link.id,
              tag_id: link.tag_id,
              recipe_id: input.id,
            }))
          )
        }

        return { recipe: newRecipe }
      })

      return res.json(result)
    },
  })
  const changeTagAssignmentsAction = mutation({
    input: tagWritesSchema.extend({
      target: tagTargetSchema,
      removed_link_ids: z.array(z.string().uuid()),
    }),
    onMutate({ input }) {
      for (const tag of input.new_tags) tagsCollection.insert(tag)
      if (input.target.entity === `recipe`) {
        for (const link of input.links)
          recipeTagsCollection.insert({
            ...link,
            recipe_id: input.target.entity_id,
          })
        if (input.removed_link_ids.length)
          recipeTagsCollection.delete(input.removed_link_ids)
      } else {
        for (const link of input.links)
          ingredientTagsCollection.insert({
            ...link,
            ingredient_id: input.target.entity_id,
          })
        if (input.removed_link_ids.length)
          ingredientTagsCollection.delete(input.removed_link_ids)
      }
    },
    async handler(req, res) {
      const user = await requireUser(req)

      const input = req.body
      const userId = user.id

      return res.json(
        await db.transaction(async (tx) => {
          // Recipes and ingredients are shared application data. user_id records
          // provenance; it does not restrict who may change tag assignments.
          if (input.target.entity === `recipe`) {
            const [recipe] = await tx
              .select({ id: recipes.id })
              .from(recipes)
              .where(eq(recipes.id, input.target.entity_id))

            if (!recipe) {
              throw new ServiceError({
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
              throw new ServiceError({
                code: `NOT_FOUND`,
                message: `Ingredient not found`,
              })
            }
          }

          if (input.new_tags.length > 0) {
            await tx.insert(tags).values(
              input.new_tags.map((tag) => ({
                id: tag.id,
                name: tag.name,
                user_id: userId,
              }))
            )
          }

          if (input.target.entity === `recipe`) {
            if (input.links.length > 0) {
              await tx.insert(recipeTags).values(
                input.links.map((link) => ({
                  id: link.id,
                  tag_id: link.tag_id,
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
                  id: link.id,
                  tag_id: link.tag_id,
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

          return { ok: true }
        })
      )
    },
  })
  const addToShoppingList = mutation({
    input: z.object({
      recipeName: z.string(),
      url: z.string().optional(),
      checklists: z.record(z.string(), z.array(z.string())),
      ingredientIds: z.array(z.string()).optional(),
    }),
    onMutate({ input }) {
      for (const id of new Set(input.ingredientIds ?? [])) {
        if (ingredientsCollection.has(id))
          ingredientsCollection.update(id, (draft) => {
            draft.trello_add_count += 1
          })
      }
    },
    async handler(req, res) {
      await requireUser(req)

      const input = req.body
      try {
        const card = await addShoppingCard(input)

        if (input.ingredientIds && input.ingredientIds.length > 0) {
          await db
            .update(ingredients)
            .set({
              trello_add_count: sql`${ingredients.trello_add_count} + 1`,
            })
            .where(inArray(ingredients.id, input.ingredientIds))
        }

        return res.json({
          success: true,
          cardId: card.id,
          cardName: card.name,
        })
      } catch (error) {
        console.error(`Error creating shopping list:`, error)
        throw new ServiceError({
          code: `INTERNAL_SERVER_ERROR`,
          message: `Failed to create shopping list`,
        })
      }
    },
  })
  return {
    usersCollection,
    ingredientsCollection,
    recipesCollection,
    recipeIngredientsCollection,
    recipeCommentsCollection,
    tagsCollection,
    recipeTagsCollection,
    ingredientTagsCollection,
    saveIngredient,
    saveComment,
    deleteIngredient,
    deleteRecipe,
    deleteComment,
    insertComment,
    createIngredientAction,
    createRecipeAction,
    changeTagAssignmentsAction,
    addToShoppingList,
  }
}
