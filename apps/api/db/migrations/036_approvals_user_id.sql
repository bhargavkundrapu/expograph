-- Store created user_id on approval when approved (for filtering/display)
BEGIN;

ALTER TABLE approvals
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_approvals_user_id ON approvals (user_id) WHERE user_id IS NOT NULL;

INSERT INTO schema_migrations (filename)
VALUES ('036_approvals_user_id.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
