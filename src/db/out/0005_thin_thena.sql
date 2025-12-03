DO $$ BEGIN
 ALTER TABLE "ingredients_photo_uploads" DISABLE ROW LEVEL SECURITY;
EXCEPTION
 WHEN undefined_table THEN NULL;
END $$;--> statement-breakpoint
DO $$ BEGIN
 DROP TABLE "ingredients_photo_uploads" CASCADE;
EXCEPTION
 WHEN undefined_table THEN NULL;
END $$;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_ingredients_photo_uploads_id_ingredients_photo_uploads_id_fk";
EXCEPTION
 WHEN undefined_object THEN NULL;
END $$;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD COLUMN "trello_add_count" integer DEFAULT 0 NOT NULL;
EXCEPTION
 WHEN duplicate_column THEN NULL;
END $$;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" DROP COLUMN "ingredients_photo_uploads_id";
EXCEPTION
 WHEN undefined_column THEN NULL;
END $$;--> statement-breakpoint
DO $$ BEGIN
 DROP TYPE "public"."ingredient_photo_upload_state";
EXCEPTION
 WHEN undefined_object THEN NULL;
END $$;