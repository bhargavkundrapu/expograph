-- apps/api/db/migrations/013_audit_logs_patch.sql
BEGIN;

ALTER TABLE audit_logs
  ADD COLUMN IF NOT EXISTS entity_type text;

ALTER TABLE audit_logs
  ADD COLUMN IF NOT EXISTS entity_id uuid;

-- Helpful index for admin audit list screens
CREATE INDEX IF NOT EXISTS audit_logs_tenant_time_idx
ON audit_logs(tenant_id, created_at DESC);

COMMIT;
