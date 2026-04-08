BEGIN;

CREATE TABLE IF NOT EXISTS student_lesson_notes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_path TEXT NOT NULL,
  note_text   TEXT NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, user_id, lesson_path)
);

CREATE INDEX IF NOT EXISTS student_lesson_notes_user_idx
  ON student_lesson_notes(tenant_id, user_id);

CREATE TABLE IF NOT EXISTS student_lesson_bookmarks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_path TEXT NOT NULL,
  title       TEXT,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, user_id, lesson_path)
);

CREATE INDEX IF NOT EXISTS student_lesson_bookmarks_user_idx
  ON student_lesson_bookmarks(tenant_id, user_id);

INSERT INTO schema_migrations (filename)
VALUES ('022_student_learning_state.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
