BEGIN;

CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,

  started_at   TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  watch_seconds         INT NOT NULL DEFAULT 0,
  last_position_seconds INT NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT lesson_progress_unique UNIQUE (tenant_id, user_id, lesson_id),
  CONSTRAINT watch_seconds_nonneg CHECK (watch_seconds >= 0),
  CONSTRAINT last_pos_nonneg CHECK (last_position_seconds >= 0)
);

CREATE INDEX IF NOT EXISTS lesson_progress_tenant_user_idx
  ON lesson_progress (tenant_id, user_id);

CREATE INDEX IF NOT EXISTS lesson_progress_tenant_lesson_idx
  ON lesson_progress (tenant_id, lesson_id);

INSERT INTO schema_migrations (filename)
VALUES ('006_progress.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
