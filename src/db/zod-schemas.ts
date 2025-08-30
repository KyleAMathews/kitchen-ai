import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod"
import { z } from "zod"
import {
  users,
  ingredientsPhotoUploads,
  ingredients,
  ingredientEvents,
  recipes,
  recipeIngredients,
  recipeComments,
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
export const selectIngredientsPhotoUploadsSchema = createSelectSchema(
  ingredientsPhotoUploads
)
export const selectIngredientsSchema = createSelectSchema(ingredients)
export const selectIngredientEventsSchema = createSelectSchema(ingredientEvents)
export const selectRecipesSchema = createSelectSchema(recipes)
export const selectRecipeIngredientsSchema =
  createSelectSchema(recipeIngredients)
export const selectRecipeCommentsSchema = createSelectSchema(recipeComments)
export const selectJobsSchema = createSelectSchema(jobs)

// Date coercion helper - transforms string dates to Date objects
// Needed because tRPC stringifies dates during HTTP transport
const dateCoercion = z.preprocess((val) => {
  if (typeof val === `string` || typeof val === `number`) {
    return new Date(val)
  }
  return val
}, z.date())

// Insert and update schemas for mutations
export const insertIngredientsSchema = createInsertSchema(ingredients, {
  expiration_date: dateCoercion,
  created_at: dateCoercion.optional(),
  updated_at: dateCoercion.optional(),
})
export const updateIngredientsSchema = createUpdateSchema(ingredients, {
  expiration_date: dateCoercion.optional(),
  updated_at: dateCoercion.optional(),
})

export const insertRecipesSchema = createInsertSchema(recipes, {
  created_at: dateCoercion.optional(),
  updated_at: dateCoercion.optional(),
})
export const updateRecipesSchema = createUpdateSchema(recipes, {
  updated_at: dateCoercion.optional(),
})

export const insertRecipeIngredientsSchema =
  createInsertSchema(recipeIngredients)
export const updateRecipeIngredientsSchema =
  createUpdateSchema(recipeIngredients)

export const insertRecipeCommentsSchema = createInsertSchema(recipeComments, {
  created_at: dateCoercion.optional(),
  updated_at: dateCoercion.optional(),
})
export const updateRecipeCommentsSchema = createUpdateSchema(recipeComments, {
  updated_at: dateCoercion.optional(),
})

// Re-export enum schemas for convenience
export const grocerySectionSchema = z.enum(grocerySectionEnum.enumValues)
export const ingredientsTrackingTypeSchema = z.enum(
  ingredientsTrackingTypeEnum.enumValues
)
export const ingredientPhotoUploadStateSchema = z.enum(
  ingredientPhotoUploadStateEnum.enumValues
)
export const jobsStateSchema = z.enum(jobsStateEnum.enumValues)

// Type inference from schemas - use these for type annotations
export type SelectUser = z.infer<typeof selectUsersSchema>
export type SelectIngredient = z.infer<typeof selectIngredientsSchema>
export type SelectRecipe = z.infer<typeof selectRecipesSchema>
export type SelectRecipeIngredient = z.infer<
  typeof selectRecipeIngredientsSchema
>
export type SelectRecipeComment = z.infer<typeof selectRecipeCommentsSchema>
export type SelectIngredientEvent = z.infer<typeof selectIngredientEventsSchema>
export type SelectJob = z.infer<typeof selectJobsSchema>
export type SelectIngredientsPhotoUpload = z.infer<
  typeof selectIngredientsPhotoUploadsSchema
>
