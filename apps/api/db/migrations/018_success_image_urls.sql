BEGIN;

-- Add success_image_urls JSONB column for multiple images
ALTER TABLE lessons
  ADD COLUMN IF NOT EXISTS success_image_urls JSONB DEFAULT '[]'::jsonb;

-- Migrate existing success_image_url to success_image_urls (single-item array)
UPDATE lessons
SET success_image_urls = jsonb_build_array(success_image_url)
WHERE success_image_url IS NOT NULL
  AND success_image_url != ''
  AND (success_image_urls IS NULL OR success_image_urls = '[]'::jsonb);

-- Keep success_image_url for backward compatibility; API will prefer success_image_urls

COMMIT;
