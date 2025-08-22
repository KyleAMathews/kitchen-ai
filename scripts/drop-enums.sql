-- Drop existing enums to allow Drizzle to recreate them
DROP TYPE IF EXISTS "public"."grocery_section" CASCADE;
DROP TYPE IF EXISTS "public"."ingredient_photo_upload_state" CASCADE;
DROP TYPE IF EXISTS "public"."ingredients_tracking_type" CASCADE;
DROP TYPE IF EXISTS "public"."jobs_state" CASCADE;