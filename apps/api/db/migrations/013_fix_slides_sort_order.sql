BEGIN;

-- Add sort_order column to lesson_slides if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'lesson_slides' 
    AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE lesson_slides ADD COLUMN sort_order INT NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Mark migration applied
INSERT INTO schema_migrations (filename)
VALUES ('013_fix_slides_sort_order.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
