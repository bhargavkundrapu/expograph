BEGIN;

-- Get ExpoGraph tenant id
WITH t AS (
  SELECT id AS tenant_id
  FROM tenants
  WHERE slug = 'expograph'
)

-- 1) Roles (tenant-scoped)
INSERT INTO roles (tenant_id, name)
SELECT t.tenant_id, v.name
FROM t
JOIN (VALUES
  ('SuperAdmin'),
  ('TenantAdmin'),
  ('Mentor'),
  ('Student')
) AS v(name) ON true
ON CONFLICT (tenant_id, name) DO NOTHING;

-- 2) Permissions (global, stable keys)
INSERT INTO permissions (key) VALUES
('tenant:settings'),
('user:manage'),
('content:read'),
('content:write'),
('practice:read'),
('practice:submit'),
('submissions:review'),
('featureflags:manage'),
('audit:read')
ON CONFLICT (key) DO NOTHING;

-- 3) Role -> Permissions mapping (for this tenant's roles)
-- SuperAdmin = everything
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN tenants t2 ON t2.id = r.tenant_id
CROSS JOIN permissions p
WHERE t2.slug = 'expograph' AND r.name = 'SuperAdmin'
ON CONFLICT DO NOTHING;

-- TenantAdmin
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN tenants t2 ON t2.id = r.tenant_id
JOIN permissions p ON p.key IN (
  'tenant:settings','user:manage','content:read','content:write','audit:read','featureflags:manage'
)
WHERE t2.slug = 'expograph' AND r.name = 'TenantAdmin'
ON CONFLICT DO NOTHING;

-- Mentor
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN tenants t2 ON t2.id = r.tenant_id
JOIN permissions p ON p.key IN (
  'content:read','practice:read','submissions:review'
)
WHERE t2.slug = 'expograph' AND r.name = 'Mentor'
ON CONFLICT DO NOTHING;

-- Student
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN tenants t2 ON t2.id = r.tenant_id
JOIN permissions p ON p.key IN (
  'content:read','practice:read','practice:submit'
)
WHERE t2.slug = 'expograph' AND r.name = 'Student'
ON CONFLICT DO NOTHING;

COMMIT;
