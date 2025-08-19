-- Convert columns to text temporarily to allow data migration
ALTER TABLE "ingredients" ALTER COLUMN "grocery_section" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "recipe_ingredients" ALTER COLUMN "grocery_section" SET DATA TYPE text;--> statement-breakpoint

-- Migrate existing data to new enum values
UPDATE "ingredients" SET "grocery_section" = 'Meat & Seafood' WHERE "grocery_section" = 'Meat_Seafood';--> statement-breakpoint
UPDATE "ingredients" SET "grocery_section" = 'Dairy' WHERE "grocery_section" = 'Dairy_Eggs';--> statement-breakpoint
UPDATE "ingredients" SET "grocery_section" = 'Pantry' WHERE "grocery_section" = 'Dry__Goods';--> statement-breakpoint
UPDATE "ingredients" SET "grocery_section" = 'Pantry' WHERE "grocery_section" = 'Canned__Foods';--> statement-breakpoint
UPDATE "ingredients" SET "grocery_section" = 'Spices & Baking' WHERE "grocery_section" = 'Spices_Herbs';--> statement-breakpoint
UPDATE "ingredients" SET "grocery_section" = 'Frozen' WHERE "grocery_section" = 'Frozen__Foods';--> statement-breakpoint
UPDATE "ingredients" SET "grocery_section" = 'Condiments' WHERE "grocery_section" = 'Oil_Vinegar';--> statement-breakpoint
UPDATE "ingredients" SET "grocery_section" = 'Other' WHERE "grocery_section" = 'Other__Aisles';--> statement-breakpoint

UPDATE "recipe_ingredients" SET "grocery_section" = 'Meat & Seafood' WHERE "grocery_section" = 'Meat_Seafood';--> statement-breakpoint
UPDATE "recipe_ingredients" SET "grocery_section" = 'Dairy' WHERE "grocery_section" = 'Dairy_Eggs';--> statement-breakpoint
UPDATE "recipe_ingredients" SET "grocery_section" = 'Pantry' WHERE "grocery_section" = 'Dry__Goods';--> statement-breakpoint
UPDATE "recipe_ingredients" SET "grocery_section" = 'Pantry' WHERE "grocery_section" = 'Canned__Foods';--> statement-breakpoint
UPDATE "recipe_ingredients" SET "grocery_section" = 'Spices & Baking' WHERE "grocery_section" = 'Spices_Herbs';--> statement-breakpoint
UPDATE "recipe_ingredients" SET "grocery_section" = 'Frozen' WHERE "grocery_section" = 'Frozen__Foods';--> statement-breakpoint
UPDATE "recipe_ingredients" SET "grocery_section" = 'Condiments' WHERE "grocery_section" = 'Oil_Vinegar';--> statement-breakpoint
UPDATE "recipe_ingredients" SET "grocery_section" = 'Other' WHERE "grocery_section" = 'Other__Aisles';--> statement-breakpoint

-- Drop old enum and create new one
DROP TYPE "public"."grocery_section";--> statement-breakpoint
CREATE TYPE "public"."grocery_section" AS ENUM('Produce', 'Meat & Seafood', 'Dairy', 'Bakery', 'Deli', 'Frozen', 'Pantry', 'Condiments', 'Spices & Baking', 'Snacks', 'Beverages', 'Other');--> statement-breakpoint

-- Convert columns back to enum type
ALTER TABLE "ingredients" ALTER COLUMN "grocery_section" SET DATA TYPE "public"."grocery_section" USING "grocery_section"::"public"."grocery_section";--> statement-breakpoint
ALTER TABLE "recipe_ingredients" ALTER COLUMN "grocery_section" SET DATA TYPE "public"."grocery_section" USING "grocery_section"::"public"."grocery_section";