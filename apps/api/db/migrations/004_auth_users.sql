BEGIN;

ALTER TABLE users
ADD COLUMN IF NOT EXISTS password_hash TEXT;

ALTER TABLE users
ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

INSERT INTO schema_migrations (filename)
VALUES ('004_auth_users.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
