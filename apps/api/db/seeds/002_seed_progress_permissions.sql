BEGIN;

INSERT INTO permissions (key)
VALUES ('progress:read'), ('progress:write')
ON CONFLICT (key) DO NOTHING;

-- Attach to all roles for this tenant (simple v1)
WITH t AS (
  SELECT id AS tenant_id FROM tenants WHERE slug='expograph' LIMIT 1
),
r AS (
  SELECT id AS role_id FROM roles WHERE tenant_id=(SELECT tenant_id FROM t)
),
p AS (
  SELECT id AS permission_id FROM permissions WHERE key IN ('progress:read','progress:write')
)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM r CROSS JOIN p
ON CONFLICT DO NOTHING;

COMMIT;