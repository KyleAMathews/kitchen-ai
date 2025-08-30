-- Remove photo upload feature
-- This migration removes the ingredients photo upload functionality

-- Drop foreign key constraint first
ALTER TABLE ingredients DROP CONSTRAINT IF EXISTS ingredients_ingredients_photo_uploads_id_fkey;

-- Remove the ingredients_photo_uploads_id column from ingredients table
ALTER TABLE ingredients DROP COLUMN IF EXISTS ingredients_photo_uploads_id;

-- Drop the ingredients_photo_uploads table
DROP TABLE IF EXISTS ingredients_photo_uploads;

-- Drop the ingredient_photo_upload_state enum
DROP TYPE IF EXISTS ingredient_photo_upload_state;