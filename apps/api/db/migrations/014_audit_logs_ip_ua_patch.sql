-- apps/api/db/migrations/014_audit_logs_ip_ua_patch.sql
BEGIN;

ALTER TABLE audit_logs
  ADD COLUMN IF NOT EXISTS ip text;

ALTER TABLE audit_logs
  ADD COLUMN IF NOT EXISTS user_agent text;

COMMIT;
