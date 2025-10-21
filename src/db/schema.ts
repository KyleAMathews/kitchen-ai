import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core"
export * from "./auth-schema"
import { users } from "./auth-schema"

// Enums
export const grocerySectionEnum = pgEnum(`grocery_section`, [
  `Produce`, // Fresh fruits and vegetables
  `Meat & Seafood`, // Fresh meat, poultry, fish
  `Dairy`, // Milk, cheese, yogurt, eggs
  `Bakery`, // Fresh bread, pastries, cakes
  `Deli`, // Sliced meats, prepared foods, cheeses
  `Frozen`, // Frozen foods, ice cream
  `Pantry`, // Dry goods, pasta, rice, cereal, canned goods
  `Condiments`, // Sauces, dressings, oils, vinegar
  `Spices & Baking`, // Spices, herbs, flour, sugar, baking supplies
  `Snacks`, // Chips, crackers, cookies, candy
  `Beverages`, // Drinks, coffee, tea, juice
  `Other`, // Everything else
])

export const ingredientsTrackingTypeEnum = pgEnum(`ingredients_tracking_type`, [
  `fill_level`,
  `count`,
  `pantry_staple`,
])

export const jobsStateEnum = pgEnum(`jobs_state`, [`working`, `done`, `error`])

// Ingredients system
export const ingredients = pgTable(`ingredients`, {
  id: uuid(`id`).primaryKey().defaultRandom(),
  name: text(`name`).notNull(),
  description: text(`description`).notNull(),
  is_reviewed: boolean(`is_reviewed`).notNull().default(false),
  embedding: text(`embedding`).notNull(),
  tracking_type: ingredientsTrackingTypeEnum(`tracking_type`),
  fill_level: integer(`fill_level`).notNull().default(0),
  grocery_section: grocerySectionEnum(`grocery_section`).notNull(),
  count: integer(`count`).notNull().default(0),
  trello_add_count: integer(`trello_add_count`).notNull().default(0),
  expiration_date: timestamp(`expiration_date`, {
    withTimezone: true,
  }).notNull(),
  user_id: text(`user_id`)
    .notNull()
    .references(() => users.id, { onDelete: `cascade` }), // Add user ownership
  created_at: timestamp(`created_at`, { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp(`updated_at`, { withTimezone: true })
    .notNull()
    .defaultNow(),
})

// Ingredient events for tracking changes
export const ingredientEvents = pgTable(`ingredient_events`, {
  id: uuid(`id`).primaryKey().defaultRandom(),
  ingredient_id: uuid(`ingredient_id`)
    .notNull()
    .references(() => ingredients.id, { onDelete: `cascade` }),
  user_id: text(`user_id`)
    .notNull()
    .references(() => users.id, { onDelete: `cascade` }),
  timestamp: timestamp(`timestamp`).notNull(),
  from_values: jsonb(`from_values`),
  to_values: jsonb(`to_values`),
})

// Recipe system
export const recipes = pgTable(`recipes`, {
  id: uuid(`id`).primaryKey().defaultRandom(),
  name: text(`name`).notNull(),
  description: text(`description`).notNull(),
  url: text(`url`).notNull(),
  user_id: text(`user_id`)
    .notNull()
    .references(() => users.id, { onDelete: `cascade` }),
  created_at: timestamp(`created_at`, { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp(`updated_at`, { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const recipeIngredients = pgTable(`recipe_ingredients`, {
  id: uuid(`id`).primaryKey().defaultRandom(),
  listing: text(`listing`).notNull(),
  extracted_name: text(`extracted_name`).notNull(),
  embedding: text(`embedding`).notNull(),
  grocery_section: grocerySectionEnum(`grocery_section`).notNull(), // Use main enum, not grocery_section2
  recipe_id: uuid(`recipe_id`)
    .notNull()
    .references(() => recipes.id, { onDelete: `cascade` }),
})

// Job queue system
export const jobs = pgTable(`jobs`, {
  id: uuid(`id`).primaryKey().defaultRandom(),
  state: jobsStateEnum(`state`).notNull(),
  target_id: uuid(`target_id`),
  type: text(`type`).notNull(),
  created_at: timestamp(`created_at`, { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp(`updated_at`, { withTimezone: true })
    .notNull()
    .defaultNow(),
  error: jsonb(`error`),
  result: jsonb(`result`),
})

// Recipe comments, ratings, and "made it" tracking
// Users can create multiple entries per recipe (e.g., made it multiple times, recipe notes, reviews)
// Entries can be just "made it" (no rating/comment) or full comments with ratings
export const recipeComments = pgTable(`recipe_comments`, {
  id: uuid(`id`).primaryKey().defaultRandom(),
  recipe_id: uuid(`recipe_id`)
    .notNull()
    .references(() => recipes.id, { onDelete: `cascade` }),
  user_id: text(`user_id`)
    .notNull()
    .references(() => users.id, { onDelete: `cascade` }),
  made_it: boolean(`made_it`).notNull().default(false), // Whether they actually made the recipe
  rating: integer(`rating`), // Optional: 1-5 stars
  comment: text(`comment`), // Optional: review, notes, modifications, etc.
  created_at: timestamp(`created_at`, { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp(`updated_at`, { withTimezone: true })
    .notNull()
    .defaultNow(),
})

// Export all tables for migrations and relations
export const schema = {
  users,
  ingredients,
  ingredientEvents,
  recipes,
  recipeIngredients,
  recipeComments,
  jobs,
}
