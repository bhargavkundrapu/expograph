BEGIN;

-- Task Status enum: todo/doing/review/done
DO $$ BEGIN
  CREATE TYPE client_task_status AS ENUM ('todo', 'doing', 'review', 'done');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Clients
CREATE TABLE IF NOT EXISTS clients (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  industry      TEXT,
  contact_name  TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  nda_status    BOOLEAN NOT NULL DEFAULT FALSE,
  notes         TEXT,
  created_by    UUID REFERENCES users(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS clients_tenant_idx ON clients(tenant_id);

-- Client Projects
CREATE TABLE IF NOT EXISTS client_projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  client_id   UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL,
  scope       TEXT,
  status      TEXT NOT NULL DEFAULT 'active', -- active/paused/completed (simple text for now)
  start_date  DATE,
  end_date    DATE,
  created_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS client_projects_tenant_slug_uq
  ON client_projects(tenant_id, slug);

CREATE INDEX IF NOT EXISTS client_projects_client_idx
  ON client_projects(client_id);

-- Project Members (who can access this project)
DO $$ BEGIN
  CREATE TYPE project_member_role AS ENUM ('student', 'mentor', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS project_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id  UUID NOT NULL REFERENCES client_projects(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role        project_member_role NOT NULL DEFAULT 'student',
  joined_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, project_id, user_id)
);

CREATE INDEX IF NOT EXISTS project_members_project_idx
  ON project_members(project_id);

CREATE INDEX IF NOT EXISTS project_members_user_idx
  ON project_members(user_id);

-- Project Tasks (Kanban)
CREATE TABLE IF NOT EXISTS client_tasks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id      UUID NOT NULL REFERENCES client_projects(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  status          client_task_status NOT NULL DEFAULT 'todo',
  assignee_user_id UUID REFERENCES users(id),
  priority        SMALLINT NOT NULL DEFAULT 2, -- 1 high, 2 normal, 3 low
  due_at          DATE,

  -- Deliverables (basic MVP)
  repo_url        TEXT,
  deploy_url      TEXT,
  demo_url        TEXT,
  submit_notes    TEXT,

  last_moved_at   TIMESTAMPTZ,
  created_by      UUID REFERENCES users(id),
  updated_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS client_tasks_project_idx
  ON client_tasks(project_id);

CREATE INDEX IF NOT EXISTS client_tasks_status_idx
  ON client_tasks(project_id, status);

CREATE INDEX IF NOT EXISTS client_tasks_assignee_idx
  ON client_tasks(assignee_user_id);

-- Feedback (mentor/client/admin can add notes; task_id optional)
CREATE TABLE IF NOT EXISTS client_feedback (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id    UUID NOT NULL REFERENCES client_projects(id) ON DELETE CASCADE,
  task_id       UUID REFERENCES client_tasks(id) ON DELETE SET NULL,
  author_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  author_role   TEXT NOT NULL DEFAULT 'mentor', -- mentor/client/admin (text for MVP)
  rating        SMALLINT, -- optional
  message       TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS client_feedback_project_idx
  ON client_feedback(project_id);

-- mark migration applied
INSERT INTO schema_migrations (filename)
VALUES ('010_client_lab.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
