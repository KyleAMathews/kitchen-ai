ALTER TABLE "tags" DROP CONSTRAINT "tags_user_id_users_id_fk";
--> statement-breakpoint
DROP INDEX "tags_user_id_name_unique";--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "tags_name_unique" ON "tags" USING btree ("name");