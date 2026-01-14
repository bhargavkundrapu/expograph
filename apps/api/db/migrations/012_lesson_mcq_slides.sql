BEGIN;

-- MCQ Questions table
CREATE TABLE IF NOT EXISTS lesson_mcqs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  lesson_id    UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  question      TEXT NOT NULL,
  options       JSONB NOT NULL, -- Array of option objects: [{"text": "...", "isCorrect": true/false}]
  explanation   TEXT,
  sort_order    INT NOT NULL DEFAULT 0,
  created_by    UUID REFERENCES users(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lesson_mcqs_lesson_idx ON lesson_mcqs (lesson_id);
CREATE INDEX IF NOT EXISTS lesson_mcqs_tenant_idx ON lesson_mcqs (tenant_id);

-- Slides table
CREATE TABLE IF NOT EXISTS lesson_slides (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  lesson_id    UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  content       TEXT, -- Markdown or HTML content
  slide_number  INT NOT NULL DEFAULT 0,
  image_url     TEXT,
  sort_order    INT NOT NULL DEFAULT 0,
  created_by    UUID REFERENCES users(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lesson_slides_lesson_idx ON lesson_slides (lesson_id);
CREATE INDEX IF NOT EXISTS lesson_slides_tenant_idx ON lesson_slides (tenant_id);

-- Mark migration applied
INSERT INTO schema_migrations (filename)
VALUES ('012_lesson_mcq_slides.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
