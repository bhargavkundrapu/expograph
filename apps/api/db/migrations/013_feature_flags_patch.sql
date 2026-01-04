BEGIN;

ALTER TABLE feature_flags
  ADD COLUMN IF NOT EXISTS config jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE feature_flags
  ADD COLUMN IF NOT EXISTS updated_by uuid;

ALTER TABLE feature_flags
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

COMMIT;
