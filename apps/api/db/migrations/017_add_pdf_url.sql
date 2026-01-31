-- apps/api/db/migrations/017_add_pdf_url.sql
BEGIN;

-- Add pdf_url field to lessons table
ALTER TABLE lessons
  ADD COLUMN IF NOT EXISTS pdf_url TEXT;

-- Add index for pdf_url if needed
CREATE INDEX IF NOT EXISTS lessons_pdf_url_idx ON lessons(pdf_url) WHERE pdf_url IS NOT NULL;

INSERT INTO schema_migrations (filename)
VALUES ('017_add_pdf_url.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
