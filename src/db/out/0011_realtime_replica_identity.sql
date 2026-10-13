-- Neon Realtime works with any primary key, but REPLICA IDENTITY FULL saves
-- the engine a lookup on every update and delete of a live-queried table.
ALTER TABLE "users" REPLICA IDENTITY FULL;--> statement-breakpoint
ALTER TABLE "ingredients" REPLICA IDENTITY FULL;--> statement-breakpoint
ALTER TABLE "recipes" REPLICA IDENTITY FULL;--> statement-breakpoint
ALTER TABLE "recipe_ingredients" REPLICA IDENTITY FULL;--> statement-breakpoint
ALTER TABLE "recipe_comments" REPLICA IDENTITY FULL;--> statement-breakpoint
ALTER TABLE "tags" REPLICA IDENTITY FULL;--> statement-breakpoint
ALTER TABLE "recipe_tags" REPLICA IDENTITY FULL;--> statement-breakpoint
ALTER TABLE "ingredient_tags" REPLICA IDENTITY FULL;
