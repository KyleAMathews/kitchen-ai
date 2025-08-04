import { 
  pgTable, 
  text, 
  timestamp, 
  boolean, 
  integer,
  uuid,
  pgEnum,
  jsonb,
  real
} from "drizzle-orm/pg-core"
import { users } from "./auth-schema"

// Enums
export const ingredientPhotoUploadStateEnum = pgEnum("ingredient_photo_upload_state", [
  "uploading", 
  "ai_processing", 
  "reviewing", 
  "done"
])

export const grocerySectionEnum = pgEnum("grocery_section", [
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
  "Other__Aisles"
])

export const ingredientsTrackingTypeEnum = pgEnum("ingredients_tracking_type", [
  "fill_level",
  "count"
])

export const jobsStateEnum = pgEnum("jobs_state", [
  "working",
  "done", 
  "error"
])

// Photo upload system
export const ingredientsPhotoUploads = pgTable("ingredients_photo_uploads", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }),
  state: ingredientPhotoUploadStateEnum("state").notNull(),
  uploadDurationSec: real("upload_duration_sec"),
  aiProcessingDurationSec: real("ai_processing_duration_sec"),
  photoUrl: text("photo_url"),
})

// Ingredients system
export const ingredients = pgTable("ingredients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  isReviewed: boolean("is_reviewed").notNull().default(false),
  embedding: text("embedding").notNull(),
  trackingType: ingredientsTrackingTypeEnum("tracking_type"),
  fillLevel: integer("fill_level").notNull().default(0),
  grocerySection: grocerySectionEnum("grocery_section").notNull(),
  count: integer("count").notNull().default(0),
  expirationDate: timestamp("expiration_date", { withTimezone: true }).notNull(),
  ingredientsPhotoUploadsId: uuid("ingredients_photo_uploads_id").references(() => ingredientsPhotoUploads.id),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), // Add user ownership
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

// Ingredient events for tracking changes
export const ingredientEvents = pgTable("ingredient_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  ingredientId: uuid("ingredient_id").notNull().references(() => ingredients.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  timestamp: timestamp("timestamp").notNull(),
  fromValues: jsonb("from_values"),
  toValues: jsonb("to_values"),
})

// Recipe system
export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const recipeIngredients = pgTable("recipe_ingredients", {
  id: uuid("id").primaryKey().defaultRandom(),
  listing: text("listing").notNull(),
  extractedName: text("extracted_name").notNull(),
  embedding: text("embedding").notNull(),
  grocerySection: grocerySectionEnum("grocery_section").notNull(), // Use main enum, not grocery_section2
  recipeId: uuid("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
})

// Job queue system
export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  state: jobsStateEnum("state").notNull(),
  targetId: uuid("target_id"),
  type: text("type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  error: jsonb("error"),
  result: jsonb("result"),
})

// Export all tables for migrations and relations
export const schema = {
  users,
  ingredientsPhotoUploads,
  ingredients,
  ingredientEvents,
  recipes,
  recipeIngredients,
  jobs,
}