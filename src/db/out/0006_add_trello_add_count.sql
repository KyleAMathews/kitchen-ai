-- Add trello_add_count column to track ingredient frequency
-- This column tracks how many times each ingredient has been added to Trello

ALTER TABLE ingredients ADD COLUMN trello_add_count integer NOT NULL DEFAULT 0;
