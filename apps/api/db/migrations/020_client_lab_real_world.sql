-- Real-World Client Lab: SuperAdmin-only control, student eligibility, assignments, submissions
-- Eligibility: overall_progress_percent >= 75 and completed all courses; stored on users.

BEGIN;

-- Eligibility on user (student profile)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS eligible_client_lab BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS eligible_since TIMESTAMPTZ;

-- Client Lab Projects (SuperAdmin-managed; no client contact exposed to students)
CREATE TABLE IF NOT EXISTS client_lab_projects (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL,
  scope        TEXT,
  status       TEXT NOT NULL DEFAULT 'active',  -- active | paused | completed | archived
  start_date   DATE,
  end_date    DATE,
  archived_at  TIMESTAMPTZ,
  created_by   UUID REFERENCES users(id),
  updated_by   UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS client_lab_projects_tenant_slug_uq
  ON client_lab_projects(tenant_id, slug);
CREATE INDEX IF NOT EXISTS client_lab_projects_tenant_idx ON client_lab_projects(tenant_id);
CREATE INDEX IF NOT EXISTS client_lab_projects_archived_idx ON client_lab_projects(tenant_id, (archived_at IS NULL)) WHERE archived_at IS NULL;

-- Client Lab Tasks (under projects)
DO $$ BEGIN
  CREATE TYPE client_lab_task_status AS ENUM ('todo', 'doing', 'review', 'done');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS client_lab_tasks (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id   UUID NOT NULL REFERENCES client_lab_projects(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  status       client_lab_task_status NOT NULL DEFAULT 'todo',
  priority     SMALLINT NOT NULL DEFAULT 2,
  due_at       DATE,
  created_by   UUID REFERENCES users(id),
  updated_by   UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS client_lab_tasks_project_idx ON client_lab_tasks(project_id);
CREATE INDEX IF NOT EXISTS client_lab_tasks_tenant_idx ON client_lab_tasks(tenant_id);

-- Assignments: task -> student (one assignee per task; SuperAdmin assigns)
CREATE TABLE IF NOT EXISTS client_lab_assignments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  task_id      UUID NOT NULL REFERENCES client_lab_tasks(id) ON DELETE CASCADE,
  student_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assigned_by  UUID NOT NULL REFERENCES users(id),
  assigned_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, task_id)
);

CREATE INDEX IF NOT EXISTS client_lab_assignments_task_idx ON client_lab_assignments(task_id);
CREATE INDEX IF NOT EXISTS client_lab_assignments_student_idx ON client_lab_assignments(tenant_id, student_id);

-- Submissions: student submits PR link + notes; SuperAdmin reviews (approve / changes_requested)
DO $$ BEGIN
  CREATE TYPE client_lab_submission_status AS ENUM ('pending', 'approved', 'changes_requested');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS client_lab_submissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  task_id       UUID NOT NULL REFERENCES client_lab_tasks(id) ON DELETE CASCADE,
  student_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pr_link       TEXT,
  notes         TEXT,
  status        client_lab_submission_status NOT NULL DEFAULT 'pending',
  feedback      TEXT,
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at   TIMESTAMPTZ,
  reviewed_by   UUID REFERENCES users(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS client_lab_submissions_task_student_idx
  ON client_lab_submissions(tenant_id, task_id, student_id);
CREATE INDEX IF NOT EXISTS client_lab_submissions_status_idx
  ON client_lab_submissions(tenant_id, status);

INSERT INTO schema_migrations (filename)
VALUES ('020_client_lab_real_world.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
