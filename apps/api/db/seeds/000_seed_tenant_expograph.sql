-- Ensure default tenant exists (idempotent).
BEGIN;

INSERT INTO tenants (name, slug)
VALUES ('ExpoGraph', 'expograph')
ON CONFLICT (slug) DO NOTHING;

COMMIT;
