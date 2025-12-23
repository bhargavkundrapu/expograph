BEGIN;

-- Status enum (draft/published)
DO $$ BEGIN
  CREATE TYPE content_status AS ENUM ('draft', 'published');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL,
  description TEXT,
  level       TEXT,
  status      content_status NOT NULL DEFAULT 'draft',
  created_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS courses_tenant_slug_uq ON courses (tenant_id, slug);
CREATE INDEX IF NOT EXISTS courses_tenant_idx ON courses (tenant_id);

-- Modules
CREATE TABLE IF NOT EXISTS course_modules (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id  UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id  UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  slug       TEXT NOT NULL,
  position   INT NOT NULL DEFAULT 0,
  status     content_status NOT NULL DEFAULT 'draft',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS modules_tenant_course_slug_uq ON course_modules (tenant_id, course_id, slug);
CREATE INDEX IF NOT EXISTS modules_course_idx ON course_modules (course_id);

-- Lessons
CREATE TABLE IF NOT EXISTS lessons (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  module_id     UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL,
  summary       TEXT,
  video_provider TEXT,     -- e.g., "cloudflare_stream"
  video_id      TEXT,      -- provider video id
  duration_seconds INT,
  position      INT NOT NULL DEFAULT 0,
  status        content_status NOT NULL DEFAULT 'draft',
  created_by    UUID REFERENCES users(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS lessons_tenant_module_slug_uq ON lessons (tenant_id, module_id, slug);
CREATE INDEX IF NOT EXISTS lessons_module_idx ON lessons (module_id);

-- Resources (cheatsheets/links/text)
CREATE TABLE IF NOT EXISTS resources (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  lesson_id   UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  type        TEXT NOT NULL,   -- "cheatsheet" | "link" | "text"
  title       TEXT NOT NULL,
  url         TEXT,            -- for link/pdf
  body        TEXT,            -- for text content
  sort_order  INT NOT NULL DEFAULT 0,
  created_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS resources_lesson_idx ON resources (lesson_id);

-- Practice tasks
CREATE TABLE IF NOT EXISTS practice_tasks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  lesson_id     UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  prompt        TEXT NOT NULL,
  language      TEXT,         -- "js" | "python" etc
  starter_code  TEXT,
  expected_output TEXT,
  sort_order    INT NOT NULL DEFAULT 0,
  created_by    UUID REFERENCES users(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS practice_lesson_idx ON practice_tasks (lesson_id);

-- Mark migration applied
INSERT INTO schema_migrations (filename)
VALUES ('005_content_engine.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
