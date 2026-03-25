-- Composite index for approvals list/poller queries: WHERE tenant_id = ? AND status = ? ORDER BY created_at
-- (027 already has separate indexes on tenant_id, status, created_at; this helps the combined filter + sort.)
-- Run via: cd apps/api && npm run migrate
BEGIN;

CREATE INDEX IF NOT EXISTS idx_approvals_tenant_status_created
  ON approvals (tenant_id, status, created_at DESC);

INSERT INTO schema_migrations (filename)
VALUES ('041_neon_optimization_indexes.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
