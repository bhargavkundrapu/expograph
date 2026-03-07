-- Course and lesson feedback from students (for SuperAdmin insights)
BEGIN;

CREATE TABLE IF NOT EXISTS course_feedback (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id   UUID REFERENCES lessons(id) ON DELETE CASCADE,
  rating      SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment     TEXT,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('course', 'lesson')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_course_feedback_tenant ON course_feedback (tenant_id);
CREATE INDEX IF NOT EXISTS idx_course_feedback_course ON course_feedback (course_id);
CREATE INDEX IF NOT EXISTS idx_course_feedback_lesson ON course_feedback (lesson_id) WHERE lesson_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_course_feedback_user ON course_feedback (user_id);
CREATE INDEX IF NOT EXISTS idx_course_feedback_created ON course_feedback (created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_course_feedback_user_course_once ON course_feedback (user_id, course_id) WHERE lesson_id IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_course_feedback_user_lesson_once ON course_feedback (user_id, lesson_id) WHERE lesson_id IS NOT NULL;

INSERT INTO schema_migrations (filename)
VALUES ('032_feedback.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
