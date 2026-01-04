BEGIN;

INSERT INTO permissions (key)
VALUES ('submissions:read')
ON CONFLICT (key) DO NOTHING;

-- attach to Student + Mentor + Admin roles (simple v1)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.key='submissions:read'
ON CONFLICT DO NOTHING;

COMMIT;