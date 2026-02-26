DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'lessons' AND column_name = 'video_captions_url'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'lessons' AND column_name = 'video_captions'
  ) THEN
    ALTER TABLE lessons RENAME COLUMN video_captions_url TO video_captions;
  END IF;
END $$;

INSERT INTO schema_migrations (filename)
VALUES ('022_rename_captions_column.sql')
ON CONFLICT (filename) DO NOTHING;
