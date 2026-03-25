-- These indexes reduce Neon compute hours by helping the approvals query avoid extra work.
-- Your schema may already have:
--   - memberships (tenant_id, user_id) via 011_indexes.sql (memberships_tenant_user_idx)
--   - approvals(payment_order_id) via unique index 030
--   - role_permissions PK (role_id, permission_id)
--
-- Optional: run this file manually in production for zero blocking (CONCURRENTLY cannot run inside a transaction).
-- Run one statement at a time, or use psql with -f only if your client does not wrap in a transaction.
--
-- psql (recommended for CONCURRENTLY):
--   set PGPASSWORD or use connection URL:
--   psql "postgresql://USER:PASS@HOST/neondb?sslmode=require" -f apps/api/src/db/migrations/add_neon_optimization_indexes.sql
--
-- Note: If 041_neon_optimization_indexes.sql was already applied via npm run migrate, this index may already exist.

CREATE INDEX CONCURRENTLY IF NOT EXISTS
idx_approvals_tenant_status_created
ON approvals (tenant_id, status, created_at DESC);
