-- Add tenant_id to roles so 003_roles_tenant_fix (unique index on tenant_id, name) can run.
-- Ensures default tenant 'expograph' exists and roles are tenant-scoped.

BEGIN;

-- Default tenant (required for tenant-scoped roles)
INSERT INTO tenants (name, slug)
VALUES ('ExpoGraph', 'expograph')
ON CONFLICT (slug) DO NOTHING;

-- Add tenant_id to roles if missing (e.g. fresh 001_init)
ALTER TABLE roles
ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;

-- Backfill existing roles with default tenant
UPDATE roles
SET tenant_id = (SELECT id FROM tenants WHERE slug = 'expograph' LIMIT 1)
WHERE tenant_id IS NULL;

-- Enforce NOT NULL after backfill (safe when no rows or all backfilled)
ALTER TABLE roles
ALTER COLUMN tenant_id SET NOT NULL;

-- Mark applied
INSERT INTO schema_migrations (filename)
VALUES ('002a_add_roles_tenant_id.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
