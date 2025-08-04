import { z } from "zod"
import { router, authedProcedure, generateTxId } from "@/lib/trpc"
import { recipes, recipeIngredients } from "@/db/schema"
import { eq, and } from "drizzle-orm"

const createRecipeSchema = z.object({
  name: z.string(),
  description: z.string().default(""),
  url: z.string().default(""),
})

const updateRecipeSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
})

const createRecipeIngredientSchema = z.object({
  recipeId: z.string(),
  listing: z.string(),
  extractedName: z.string(),
  embedding: z.string(),
  grocerySection: z.enum([
    "Produce",
    "Deli", 
    "Bakery",
    "Meat_Seafood",
    "Dairy_Eggs",
    "Dry__Goods",
    "Canned__Foods",
    "Spices_Herbs",
    "Beverages",
    "Frozen__Foods",
    "Oil_Vinegar",
    "Other__Aisles",
  ]),
})

export const recipesRouter = router({
  create: authedProcedure
    .input(createRecipeSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)
        const [newRecipe] = await tx.insert(recipes).values({
          ...input,
          userId: ctx.session.user.id,
        }).returning()
        return { recipe: newRecipe, txid }
      })
      return result
    }),

  update: authedProcedure
    .input(z.object({ 
      id: z.string(), 
      data: updateRecipeSchema 
    }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)
        
        const [updatedRecipe] = await tx
          .update(recipes)
          .set({
            ...input.data,
            updatedAt: new Date(),
          })
          .where(and(
            eq(recipes.id, input.id),
            eq(recipes.userId, ctx.session.user.id)
          ))
          .returning()
          
        if (!updatedRecipe) {
          throw new Error("Recipe not found or not owned by user")
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
          .where(and(
            eq(recipes.id, input.id),
            eq(recipes.userId, ctx.session.user.id)
          ))
          .returning()
          
        if (!deletedRecipe) {
          throw new Error("Recipe not found or not owned by user")
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
        .where(and(
          eq(recipes.id, input.id),
          eq(recipes.userId, ctx.session.user.id)
        ))
        .limit(1)
        
      return recipe || null
    }),

  addIngredients: authedProcedure
    .input(z.object({
      recipeId: z.string(),
      ingredients: z.array(createRecipeIngredientSchema)
    }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)
        
        // Verify recipe ownership
        const [recipe] = await tx
          .select()
          .from(recipes)
          .where(and(
            eq(recipes.id, input.recipeId),
            eq(recipes.userId, ctx.session.user.id)
          ))
          
        if (!recipe) {
          throw new Error("Recipe not found or not owned by user")
        }
        
        // Insert ingredients
        const newIngredients = await tx
          .insert(recipeIngredients)
          .values(input.ingredients.map(ing => ({
            ...ing,
            recipeId: input.recipeId,
          })))
          .returning()
        
        return { ingredients: newIngredients, txid }
      })
      return result
    }),

  processAndUpdate: authedProcedure
    .input(z.object({
      recipeId: z.string(),
      name: z.string(),
      description: z.string(),
      ingredients: z.array(z.object({
        listing: z.string(),
        extracted_name: z.string(),
        embedding: z.string(),
        grocery_section: z.enum([
          "Produce",
          "Deli", 
          "Bakery",
          "Meat_Seafood",
          "Dairy_Eggs",
          "Dry__Goods",
          "Canned__Foods",
          "Spices_Herbs",
          "Beverages",
          "Frozen__Foods",
          "Oil_Vinegar",
          "Other__Aisles",
        ]),
      }))
    }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        const txid = await generateTxId(tx)
        
        // Update recipe
        const [updatedRecipe] = await tx
          .update(recipes)
          .set({
            name: input.name,
            description: input.description,
            updatedAt: new Date(),
          })
          .where(and(
            eq(recipes.id, input.recipeId),
            eq(recipes.userId, ctx.session.user.id)
          ))
          .returning()
          
        if (!updatedRecipe) {
          throw new Error("Recipe not found or not owned by user")
        }
        
        // Delete existing ingredients
        await tx
          .delete(recipeIngredients)
          .where(eq(recipeIngredients.recipeId, input.recipeId))
        
        // Insert new ingredients
        const newIngredients = await tx
          .insert(recipeIngredients)
          .values(input.ingredients.map(ing => ({
            recipeId: input.recipeId,
            listing: ing.listing,
            extractedName: ing.extracted_name,
            embedding: ing.embedding,
            grocerySection: ing.grocery_section,
          })))
          .returning()
        
        return { recipe: updatedRecipe, ingredients: newIngredients, txid }
      })
      return result
    }),
})