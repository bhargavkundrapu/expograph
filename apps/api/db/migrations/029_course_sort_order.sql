-- Add sort_order column to courses for custom display ordering
BEGIN;

ALTER TABLE courses ADD COLUMN IF NOT EXISTS sort_order INT NOT NULL DEFAULT 0;

COMMIT;
