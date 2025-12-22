BEGIN;

-- Ensure the UNIQUE constraints exist (even if tables existed before)
CREATE UNIQUE INDEX IF NOT EXISTS tenants_slug_uq ON tenants (slug);
CREATE UNIQUE INDEX IF NOT EXISTS roles_name_uq ON roles (name);
CREATE UNIQUE INDEX IF NOT EXISTS permissions_key_uq ON permissions (key);

-- Users: allow multiple NULLs but unique when value exists
CREATE UNIQUE INDEX IF NOT EXISTS users_email_uq ON users (email) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS users_phone_uq ON users (phone) WHERE phone IS NOT NULL;

-- Mark migration applied
INSERT INTO schema_migrations (filename)
VALUES ('002_constraints.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
