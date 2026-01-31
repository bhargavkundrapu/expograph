-- Test user for local login (idempotent).
-- Email: test@expograph.com  Password: password123

BEGIN;

INSERT INTO users (email, full_name, password_hash, is_active)
VALUES (
  'test@expograph.com',
  'Test User',
  '$2b$10$tjGQyXLUx1vPp4KcLYRsuucbVD6s/gZdbH6AjbcE7Ce/mmdTEvsXG',
  true
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name;

INSERT INTO memberships (tenant_id, user_id, role_id)
SELECT t.id, u.id, r.id
FROM tenants t
CROSS JOIN users u
CROSS JOIN roles r
WHERE t.slug = 'expograph'
  AND u.email = 'test@expograph.com'
  AND r.name = 'Student'
  AND r.tenant_id = t.id
ON CONFLICT (tenant_id, user_id) DO NOTHING;

COMMIT;
