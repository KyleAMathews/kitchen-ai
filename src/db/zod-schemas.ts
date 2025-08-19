import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import {
  users,
  ingredientsPhotoUploads,
  ingredients,
  ingredientEvents,
  recipes,
  recipeIngredients,
  jobs,
  grocerySectionEnum,
  ingredientsTrackingTypeEnum,
  ingredientPhotoUploadStateEnum,
  jobsStateEnum,
} from "./schema"

// Generate base schemas from Drizzle tables
const baseSelectUsersSchema = createSelectSchema(users)

// Transform user schema to snake_case for Electric sync compatibility
// Better-auth uses camelCase internally, but Electric syncs with snake_case
export const selectUsersSchema = baseSelectUsersSchema.transform((data) => ({
  id: data.id,
  name: data.name,
  email: data.email,
  email_verified: data.emailVerified,
  image: data.image,
  created_at: data.createdAt,
  updated_at: data.updatedAt,
}))

// Other schemas are already in snake_case in the Drizzle schema
export const selectIngredientsPhotoUploadsSchema = createSelectSchema(ingredientsPhotoUploads)
export const selectIngredientsSchema = createSelectSchema(ingredients)
export const selectIngredientEventsSchema = createSelectSchema(ingredientEvents)
export const selectRecipesSchema = createSelectSchema(recipes)
export const selectRecipeIngredientsSchema = createSelectSchema(recipeIngredients)
export const selectJobsSchema = createSelectSchema(jobs)

// Re-export enum schemas for convenience
export const grocerySectionSchema = z.enum(grocerySectionEnum.enumValues)
export const ingredientsTrackingTypeSchema = z.enum(ingredientsTrackingTypeEnum.enumValues)
export const ingredientPhotoUploadStateSchema = z.enum(ingredientPhotoUploadStateEnum.enumValues)
export const jobsStateSchema = z.enum(jobsStateEnum.enumValues)
