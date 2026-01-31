-- apps/api/db/migrations/016_lesson_enhancements.sql
BEGIN;

-- Add new fields to lessons table
ALTER TABLE lessons
  ADD COLUMN IF NOT EXISTS goal TEXT,
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  ADD COLUMN IF NOT EXISTS prompts JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS success_image_url TEXT;

-- Add index for video_url if needed
CREATE INDEX IF NOT EXISTS lessons_video_url_idx ON lessons(video_url) WHERE video_url IS NOT NULL;

INSERT INTO schema_migrations (filename)
VALUES ('016_lesson_enhancements.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;

