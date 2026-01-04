BEGIN;

-- If we created a wrong unique index earlier, remove it (safe if it doesn't exist)
DROP INDEX IF EXISTS roles_name_uq;

-- SaaS-correct: roles are tenant-scoped
CREATE UNIQUE INDEX IF NOT EXISTS roles_tenant_name_uq ON roles (tenant_id, name);

-- Keep permissions global + unique
CREATE UNIQUE INDEX IF NOT EXISTS permissions_key_uq ON permissions (key);

-- mark migration applied
INSERT INTO schema_migrations (filename)
VALUES ('003_roles_tenant_fix.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
