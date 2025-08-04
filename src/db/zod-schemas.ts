import { z } from "zod"

// Enum schemas
export const grocerySectionSchema = z.enum([
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
])

export const ingredientsTrackingTypeSchema = z.enum([
  "fill_level",
  "count",
])

export const ingredientPhotoUploadStateSchema = z.enum([
  "uploading", 
  "ai_processing", 
  "reviewing", 
  "done"
])

export const jobsStateSchema = z.enum([
  "working",
  "done", 
  "error"
])

// User schema (from auth)
export const selectUsersSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Ingredients photo uploads schema
export const selectIngredientsPhotoUploadsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  uploadedAt: z.date().nullable(),
  state: ingredientPhotoUploadStateSchema,
  uploadDurationSec: z.number().nullable(),
  aiProcessingDurationSec: z.number().nullable(),
  photoUrl: z.string().nullable(),
})

// Ingredients schema
export const selectIngredientsSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  isReviewed: z.boolean(),
  embedding: z.string(),
  trackingType: ingredientsTrackingTypeSchema.nullable(),
  fillLevel: z.number(),
  grocerySection: grocerySectionSchema,
  count: z.number(),
  expirationDate: z.date(),
  ingredientsPhotoUploadsId: z.string().nullable(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Ingredient events schema
export const selectIngredientEventsSchema = z.object({
  id: z.string(),
  ingredientId: z.string(),
  userId: z.string(),
  timestamp: z.date(),
  fromValues: z.record(z.any()).nullable(),
  toValues: z.record(z.any()).nullable(),
})

// Recipes schema
export const selectRecipesSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  url: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Recipe ingredients schema
export const selectRecipeIngredientsSchema = z.object({
  id: z.string(),
  listing: z.string(),
  extractedName: z.string(),
  embedding: z.string(),
  grocerySection: grocerySectionSchema,
  recipeId: z.string(),
})

// Jobs schema
export const selectJobsSchema = z.object({
  id: z.string(),
  state: jobsStateSchema,
  targetId: z.string().nullable(),
  type: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  error: z.record(z.any()).nullable(),
  result: z.record(z.any()).nullable(),
})