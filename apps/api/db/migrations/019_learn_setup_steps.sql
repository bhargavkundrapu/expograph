BEGIN;

-- Add learn_setup_steps JSONB column for multiple steps (like success_image_urls)
ALTER TABLE lessons
  ADD COLUMN IF NOT EXISTS learn_setup_steps JSONB DEFAULT '[]'::jsonb;

-- Migrate existing summary to learn_setup_steps (single-item array) if summary has content
UPDATE lessons
SET learn_setup_steps = jsonb_build_array(summary)
WHERE summary IS NOT NULL
  AND summary != ''
  AND (learn_setup_steps IS NULL OR learn_setup_steps = '[]'::jsonb);

COMMIT;
