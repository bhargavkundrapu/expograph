-- Real Client Lab: project-level assignments for "Your Projects" tab
BEGIN;

CREATE TABLE IF NOT EXISTS client_lab_project_assignments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id   UUID NOT NULL REFERENCES client_lab_projects(id) ON DELETE CASCADE,
  student_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assigned_by  UUID NOT NULL REFERENCES users(id),
  assigned_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, project_id, student_id)
);

CREATE INDEX IF NOT EXISTS client_lab_project_assignments_project_idx
  ON client_lab_project_assignments(tenant_id, project_id);
CREATE INDEX IF NOT EXISTS client_lab_project_assignments_student_idx
  ON client_lab_project_assignments(tenant_id, student_id);

INSERT INTO schema_migrations (filename)
VALUES ('021_client_lab_project_assignments.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
