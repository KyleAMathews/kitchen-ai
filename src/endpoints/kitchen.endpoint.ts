import { z } from "zod"
import { BasicIndex } from "@tanstack/db"
import { dbClient, currentUserId } from "@/lib/db-client"
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
import {
  ingredientInputSchema,
  tagWritesSchema,
  tagTargetSchema,
} from "./schemas"
const { query, mutation } = endpoints(dbClient)
export const usersCollection = query({
  input: z.object({}),
  schema: selectUsersSchema,
  async handler(req, res) {
    await requireUser(req)
    const rows = await db.select().from(users)
    return res.json(rows)
  },
})
export const ingredientsCollection = query({
  input: z.object({}),
  schema: selectIngredientsSchema,
  async handler(req, res) {
    await requireUser(req)
    const rows = await db.select().from(ingredients)
    return res.json(rows)
  },
})
ingredientsCollection.createIndex((row) => row.updated_at, {
  indexType: BasicIndex,
})

export const recipesCollection = query({
  input: z.object({}),
  schema: selectRecipesSchema,
  async handler(req, res) {
    await requireUser(req)
    const rows = await db.select().from(recipes)
    return res.json(rows)
  },
})
export const recipeIngredientsCollection = query({
  input: z.object({}),
  schema: selectRecipeIngredientsSchema,
  async handler(req, res) {
    await requireUser(req)
    const rows = await db.select().from(recipeIngredients)
    return res.json(rows)
  },
})
export const recipeCommentsCollection = query({
  input: z.object({}),
  schema: selectRecipeCommentsSchema,
  async handler(req, res) {
    await requireUser(req)
    const rows = await db.select().from(recipeComments)
    return res.json(rows)
  },
})
recipeCommentsCollection.createIndex((row) => row.recipe_id, {
  indexType: BasicIndex,
})

export const tagsCollection = query({
  input: z.object({}),
  schema: selectTagsSchema,
  async handler(req, res) {
    await requireUser(req)
    const rows = await db.select().from(tags)
    return res.json(rows)
  },
})
export const recipeTagsCollection = query({
  input: z.object({}),
  schema: selectRecipeTagsSchema,
  async handler(req, res) {
    await requireUser(req)
    const rows = await db.select().from(recipeTags)
    return res.json(rows)
  },
})
recipeTagsCollection.createIndex((row) => row.tag_id, { indexType: BasicIndex })

export const ingredientTagsCollection = query({
  input: z.object({}),
  schema: selectIngredientTagsSchema,
  async handler(req, res) {
    await requireUser(req)
    const rows = await db.select().from(ingredientTags)
    return res.json(rows)
  },
})
ingredientTagsCollection.createIndex((row) => row.tag_id, {
  indexType: BasicIndex,
})

export const updateIngredient = mutation({
  input: z.object({
    id: z.string(),
    data: updateIngredientsSchema.omit({
      id: true,
      user_id: true,
      created_at: true,
      updated_at: true,
    }),
  }),
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
export const updateComment = mutation({
  input: z.object({
    id: z.string().uuid(),
    data: updateRecipeCommentsSchema.omit({
      id: true,
      recipe_id: true,
      user_id: true,
      created_at: true,
      updated_at: true,
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

    return res.json(
      await db.transaction(async (tx) => {
        // Verify ownership
        const [existing] = await tx
          .select()
          .from(recipeComments)
          .where(
            and(
              eq(recipeComments.id, input.id),
              eq(recipeComments.user_id, user.id)
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
export const deleteIngredient = mutation({
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
export const deleteRecipe = mutation({
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
export const deleteComment = mutation({
  input: z.string().uuid(),
  onMutate({ input }) {
    recipeCommentsCollection.delete(input)
  },
  async handler(req, res) {
    const user = await requireUser(req)

    const id = req.body

    return res.json(
      await db.transaction(async (tx) => {
        // Verify ownership
        const [existing] = await tx
          .select()
          .from(recipeComments)
          .where(
            and(eq(recipeComments.id, id), eq(recipeComments.user_id, user.id))
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
export const insertComment = mutation({
  input: selectRecipeCommentsSchema.omit({
    user_id: true,
    created_at: true,
    updated_at: true,
  }),
  onMutate({ input }) {
    const now = new Date()
    recipeCommentsCollection.insert({
      ...input,
      user_id: currentUserId(),
      created_at: now,
      updated_at: now,
    })
  },
  async handler(req, res) {
    const user = await requireUser(req)

    return res.json(
      await db.transaction(async (tx) => {
        const [result] = await tx
          .insert(recipeComments)
          .values({
            ...req.body,
            user_id: user.id,
          })
          .returning({ id: recipeComments.id })

        return { id: result.id }
      })
    )
  },
})
export const insertIngredient = mutation({
  input: tagWritesSchema.extend({
    ingredient: ingredientInputSchema,
  }),
  onMutate({ input }) {
    const now = new Date()
    ingredientsCollection.insert({
      ...input.ingredient,
      description: `AI processing in progress`,
      grocery_section: `Other`,
      embedding: `[]`,
      is_reviewed: true,
      trello_add_count: 0,
      user_id: currentUserId(),
      created_at: now,
      updated_at: now,
    })
    for (const tag of input.new_tags)
      tagsCollection.insert({
        ...tag,
        user_id: currentUserId(),
        created_at: now,
      })
    for (const link of input.links)
      ingredientTagsCollection.insert({
        ...link,
        ingredient_id: input.ingredient.id,
        created_at: now,
      })
  },
  async handler(req, res) {
    const user = await requireUser(req)

    const { ingredient: input, new_tags, links } = req.body
    const { parsed, embedding } = await describeIngredient(input.name)
    const result = await db.transaction(async (tx) => {
      const [newIngredient] = await tx
        .insert(ingredients)
        .values({
          ...input,
          ...parsed,
          embedding: JSON.stringify(embedding),
          user_id: user.id,
          fill_level:
            input.tracking_type === `fill_level`
              ? input.fill_level
              : input.tracking_type === `pantry_staple`
                ? 100
                : 0,
          count: input.tracking_type === `count` ? input.count : 0,
          is_reviewed: true,
          expiration_date:
            input.tracking_type === `pantry_staple`
              ? new Date(Date.now() + 365 * 10 * 24 * 60 * 60 * 1000) // 10 years from now
              : input.expiration_date,
        })
        .returning()

      if (new_tags.length > 0) {
        await tx.insert(tags).values(
          new_tags.map((tag) => ({
            ...tag,
            user_id: user.id,
          }))
        )
      }

      if (links.length > 0) {
        await tx.insert(ingredientTags).values(
          links.map((link) => ({
            ...link,
            ingredient_id: input.id,
          }))
        )
      }

      return { ingredient: newIngredient }
    })

    return res.json(result)
  },
})
export const insertRecipe = mutation({
  input: tagWritesSchema.extend({
    id: z.string().uuid(),
    url: z.string(),
    pastedText: z.string(),
  }),
  onMutate({ input }) {
    const now = new Date()
    recipesCollection.insert({
      id: input.id,
      name: `Processing...`,
      description: `AI processing in progress`,
      url: input.url,
      user_id: currentUserId(),
      created_at: now,
      updated_at: now,
    })
    for (const tag of input.new_tags)
      tagsCollection.insert({
        ...tag,
        user_id: currentUserId(),
        created_at: now,
      })
    for (const link of input.links)
      recipeTagsCollection.insert({
        ...link,
        recipe_id: input.id,
        created_at: now,
      })
  },
  async handler(req, res) {
    const user = await requireUser(req)

    const { pastedText, new_tags, links, ...input } = req.body
    const { ingredients: extractedIngredients, ...recipeData } =
      await extractRecipe(pastedText, input.url)
    const result = await db.transaction(async (tx) => {
      const [newRecipe] = await tx
        .insert(recipes)
        .values({
          ...input,
          ...recipeData,
          user_id: user.id,
        })
        .returning()

      await tx.insert(recipeIngredients).values(
        extractedIngredients.map((ingredient) => ({
          ...ingredient,
          recipe_id: newRecipe.id,
        }))
      )

      if (new_tags.length > 0) {
        await tx.insert(tags).values(
          new_tags.map((tag) => ({
            ...tag,
            user_id: user.id,
          }))
        )
      }

      if (links.length > 0) {
        await tx.insert(recipeTags).values(
          links.map((link) => ({
            ...link,
            recipe_id: input.id,
          }))
        )
      }

      return { recipe: newRecipe }
    })

    return res.json(result)
  },
})
export const updateTagAssignments = mutation({
  input: tagWritesSchema.extend({
    target: tagTargetSchema,
    removed_link_ids: z.array(z.string().uuid()),
  }),
  onMutate({ input }) {
    const now = new Date()
    for (const tag of input.new_tags)
      tagsCollection.insert({
        ...tag,
        user_id: currentUserId(),
        created_at: now,
      })
    if (input.target.entity === `recipe`) {
      for (const link of input.links)
        recipeTagsCollection.insert({
          ...link,
          recipe_id: input.target.entity_id,
          created_at: now,
        })
      if (input.removed_link_ids.length)
        recipeTagsCollection.delete(input.removed_link_ids)
    } else {
      for (const link of input.links)
        ingredientTagsCollection.insert({
          ...link,
          ingredient_id: input.target.entity_id,
          created_at: now,
        })
      if (input.removed_link_ids.length)
        ingredientTagsCollection.delete(input.removed_link_ids)
    }
  },
  async handler(req, res) {
    const user = await requireUser(req)

    const input = req.body

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
              ...tag,
              user_id: user.id,
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

        return { ok: true }
      })
    )
  },
})
export const addToShoppingList = mutation({
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
