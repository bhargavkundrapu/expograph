# Permissions Fix Guide

## Problem
Students are getting 403 Forbidden errors when trying to access:
- `/api/v1/lms/internships/projects` (requires `internships:read`)
- `/api/v1/lms/internships/my/applications` (requires `internships:apply`)
- `/api/v1/lms/internships/my/assignments` (requires `internships:apply`)
- `/api/v1/lms/client-lab/projects` (requires `clientlab:read`)

## Root Cause
The Student role is missing the required permissions in the database, even though the seed file (`apps/api/db/seeds/001_seed_tenant_roles.sql`) defines them correctly.

## Solution

### Option 1: Run the Seed File (Recommended)

1. **Connect to your PostgreSQL database** and run the seed file:

```bash
# Using psql
psql -d your_database_name -f apps/api/db/seeds/001_seed_tenant_roles.sql

# Or using a database client (pgAdmin, DBeaver, etc.)
# Open and execute: apps/api/db/seeds/001_seed_tenant_roles.sql
```

2. **Verify permissions were granted**:

```sql
-- Check if Student role has the required permissions
SELECT 
  r.name as role_name,
  p.key as permission
FROM roles r
JOIN role_permissions rp ON rp.role_id = r.id
JOIN permissions p ON p.id = rp.permission_id
WHERE r.name = 'Student' 
  AND r.tenant_id = (SELECT id FROM tenants WHERE slug = 'expograph')
  AND p.key IN ('internships:read', 'internships:apply', 'clientlab:read', 'clientlab:update')
ORDER BY p.key;
```

You should see 4 rows returned.

### Option 2: Use the Verification Script

1. **Run the verification script** to check current state:

```bash
cd apps/api
node scripts/verify-permissions.js
```

2. **If permissions are missing, fix them automatically**:

```bash
node scripts/verify-permissions.js --fix
```

### Option 3: Manual SQL Fix

If the above options don't work, manually grant the permissions:

```sql
-- First, ensure permissions exist
INSERT INTO permissions (key) VALUES
  ('internships:read'),
  ('internships:apply'),
  ('clientlab:read'),
  ('clientlab:update')
ON CONFLICT (key) DO NOTHING;

-- Then grant them to Student role
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN tenants t ON t.id = r.tenant_id
JOIN permissions p ON p.key IN ('internships:read', 'internships:apply', 'clientlab:read', 'clientlab:update')
WHERE t.slug = 'expograph' AND r.name = 'Student'
ON CONFLICT DO NOTHING;
```

## After Fixing Permissions

1. **Users must log out and log back in** for the new permissions to take effect (permissions are cached in the JWT token).

2. **Clear browser cache/localStorage** if issues persist:
   - Open browser DevTools (F12)
   - Go to Application/Storage tab
   - Clear localStorage
   - Refresh the page

3. **Verify the fix**:
   - Check browser console - 403 errors should be gone
   - Projects should now load in Internships and Client Lab sections

## Frontend Changes Made

The frontend has been updated to:
- ✅ Check permissions before making API calls
- ✅ Show user-friendly error messages when permissions are missing
- ✅ Suppress 403 errors from console (they're handled gracefully in UI)
- ✅ Provide clear guidance on how to fix permission issues

## Verification

To verify everything is working:

1. **Backend**: Check that Student role has permissions:
   ```sql
   SELECT p.key 
   FROM role_permissions rp
   JOIN roles r ON r.id = rp.role_id
   JOIN permissions p ON p.id = rp.permission_id
   WHERE r.name = 'Student' 
     AND r.tenant_id = (SELECT id FROM tenants WHERE slug = 'expograph')
     AND p.key IN ('internships:read', 'clientlab:read');
   ```

2. **Frontend**: 
   - Log in as a Student
   - Navigate to Internships page - should see projects (or "No Projects Available" if none exist)
   - Navigate to Client Lab page - should see projects (or "No Client Lab Projects" if none exist)
   - Check browser console - no 403 errors

## Troubleshooting

### Still getting 403 errors after fixing permissions?

1. **Check user's role**:
   ```sql
   SELECT u.email, r.name as role_name
   FROM users u
   JOIN memberships m ON m.user_id = u.id
   JOIN roles r ON r.id = m.role_id
   WHERE u.email = 'your-email@example.com';
   ```

2. **Check user's actual permissions** (what the API sees):
   ```sql
   SELECT p.key
   FROM memberships m
   JOIN role_permissions rp ON rp.role_id = m.role_id
   JOIN permissions p ON p.id = rp.permission_id
   WHERE m.user_id = (SELECT id FROM users WHERE email = 'your-email@example.com')
     AND m.tenant_id = (SELECT id FROM tenants WHERE slug = 'expograph');
   ```

3. **Clear JWT token cache**:
   - The backend caches permissions for 60 seconds (see `apps/api/src/middlewares/rbac/requirePermission.js`)
   - Wait 60 seconds or restart the API server

4. **Check API logs** for detailed error messages

### No projects showing even after permissions are fixed?

1. **Internships**: Projects only show if:
   - Project status = 'published'
   - Batch status = 'open'
   - Current date is between batch start_at and end_at
   
   Check with:
   ```sql
   SELECT p.title, b.batch_name, b.status, b.start_at, b.end_at
   FROM micro_projects p
   JOIN micro_project_batches b ON b.project_id = p.id
   WHERE p.tenant_id = (SELECT id FROM tenants WHERE slug = 'expograph')
     AND p.status = 'published'
     AND b.status = 'open';
   ```

2. **Client Lab**: Projects only show if:
   - User is a member of the project (in `project_members` table)
   
   Check with:
   ```sql
   SELECT p.title, pm.user_id
   FROM client_projects p
   JOIN project_members pm ON pm.project_id = p.id
   WHERE p.tenant_id = (SELECT id FROM tenants WHERE slug = 'expograph')
     AND pm.user_id = (SELECT id FROM users WHERE email = 'your-email@example.com');
   ```

## Summary

The issue is a **backend database configuration problem**. The frontend now handles it gracefully by:
- Checking permissions before making API calls
- Showing clear error messages
- Suppressing console errors

But the **root cause** must be fixed in the database by granting the Student role the required permissions.
