BEGIN;

-- Enums (safe: won't recreate if exists)
DO $$ BEGIN
  CREATE TYPE micro_project_status AS ENUM ('draft','published','archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE micro_application_status AS ENUM ('applied','rejected','approved','withdrawn');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE micro_assignment_status AS ENUM ('assigned','in_progress','submitted','reviewed','approved','changes_requested','dropped','expired');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE micro_deliverable_status AS ENUM ('submitted','reviewed','approved','changes_requested');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 1) micro_projects (catalog of projects)
CREATE TABLE IF NOT EXISTS micro_projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL,
  track       TEXT,              -- "frontend" | "backend" | "fullstack" etc
  difficulty  TEXT,              -- "easy" | "medium" | "hard"
  brief       TEXT NOT NULL,      -- project brief
  skills      TEXT[],            -- optional tags list
  status      micro_project_status NOT NULL DEFAULT 'draft',
  created_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS micro_projects_tenant_slug_uq
  ON micro_projects (tenant_id, slug);

CREATE INDEX IF NOT EXISTS micro_projects_tenant_idx
  ON micro_projects (tenant_id);

-- 2) micro_project_batches (deadlines + seats)
CREATE TABLE IF NOT EXISTS micro_project_batches (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id  UUID NOT NULL REFERENCES micro_projects(id) ON DELETE CASCADE,
  batch_name  TEXT NOT NULL,        -- "Batch Jan-2026"
  start_at    TIMESTAMPTZ NOT NULL,
  end_at      TIMESTAMPTZ NOT NULL,
  max_seats   INT NOT NULL DEFAULT 50,
  status      TEXT NOT NULL DEFAULT 'open', -- open/closed
  created_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS micro_batches_project_idx
  ON micro_project_batches (project_id);

CREATE INDEX IF NOT EXISTS micro_batches_tenant_idx
  ON micro_project_batches (tenant_id);

-- 3) micro_applications (student applies to batch)
CREATE TABLE IF NOT EXISTS micro_applications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id  UUID NOT NULL REFERENCES micro_projects(id) ON DELETE CASCADE,
  batch_id    UUID NOT NULL REFERENCES micro_project_batches(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  note        TEXT,
  status      micro_application_status NOT NULL DEFAULT 'applied',
  applied_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1 student can apply once per batch
CREATE UNIQUE INDEX IF NOT EXISTS micro_app_unique_apply
  ON micro_applications (tenant_id, batch_id, user_id);

CREATE INDEX IF NOT EXISTS micro_app_batch_status_idx
  ON micro_applications (batch_id, status);

-- 4) micro_assignments (approved student gets assignment)
CREATE TABLE IF NOT EXISTS micro_assignments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id  UUID NOT NULL REFERENCES micro_projects(id) ON DELETE CASCADE,
  batch_id    UUID NOT NULL REFERENCES micro_project_batches(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mentor_id   UUID REFERENCES users(id), -- mentor user
  status      micro_assignment_status NOT NULL DEFAULT 'assigned',
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  due_at      TIMESTAMPTZ, -- usually batch end_at copy
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1 student can have only 1 active assignment per tenant (basic anti-overload)
-- We'll treat these statuses as "active": assigned, in_progress, submitted, changes_requested
CREATE UNIQUE INDEX IF NOT EXISTS micro_one_active_assignment_per_student
  ON micro_assignments (tenant_id, user_id)
  WHERE status IN ('assigned','in_progress','submitted','changes_requested');

CREATE INDEX IF NOT EXISTS micro_assign_batch_idx
  ON micro_assignments (batch_id);

-- 5) micro_deliverables (student submits repo/deploy links)
CREATE TABLE IF NOT EXISTS micro_deliverables (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  assignment_id UUID NOT NULL REFERENCES micro_assignments(id) ON DELETE CASCADE,
  version_no    INT NOT NULL DEFAULT 1,
  repo_url      TEXT,
  deploy_url    TEXT,
  demo_url      TEXT,
  notes         TEXT,
  status        micro_deliverable_status NOT NULL DEFAULT 'submitted',
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- versioning: one assignment can have v1, v2, v3...
CREATE UNIQUE INDEX IF NOT EXISTS micro_deliverable_version_uq
  ON micro_deliverables (tenant_id, assignment_id, version_no);

CREATE INDEX IF NOT EXISTS micro_deliverable_assign_idx
  ON micro_deliverables (assignment_id);

-- Mark migration applied
INSERT INTO schema_migrations (filename)
VALUES ('009_micro_internships.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
