-- Colleges / Institutions for purchase form dropdown (SuperAdmin managed)
BEGIN;

CREATE TABLE IF NOT EXISTS colleges (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id  UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, name)
);

CREATE INDEX IF NOT EXISTS idx_colleges_tenant ON colleges (tenant_id);
CREATE INDEX IF NOT EXISTS idx_colleges_sort ON colleges (tenant_id, sort_order);

INSERT INTO schema_migrations (filename)
VALUES ('031_colleges.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
