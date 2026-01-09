/**
 * Script to verify and fix Student role permissions
 * 
 * This script checks if Students have the required permissions:
 * - internships:read
 * - internships:apply
 * - clientlab:read
 * - clientlab:update
 * 
 * Usage: node scripts/verify-permissions.js [--fix]
 * 
 * If --fix is provided, it will automatically grant missing permissions.
 */

// Import database connection
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// Initialize database connection
const { pool } = require("../src/db/pool");

async function query(text, params = []) {
  return pool.query(text, params);
}

async function verifyPermissions(tenantSlug = "expograph", fix = false) {
  console.log(`\n🔍 Verifying permissions for Student role in tenant: ${tenantSlug}\n`);

  try {
    // Get tenant ID
    const { rows: tenantRows } = await query(
      `SELECT id FROM tenants WHERE slug = $1`,
      [tenantSlug]
    );

    if (tenantRows.length === 0) {
      console.error(`❌ Tenant '${tenantSlug}' not found!`);
      process.exit(1);
    }

    const tenantId = tenantRows[0].id;
    console.log(`✅ Found tenant: ${tenantSlug} (ID: ${tenantId})\n`);

    // Get Student role
    const { rows: roleRows } = await query(
      `SELECT id, name FROM roles WHERE tenant_id = $1 AND name = 'Student'`,
      [tenantId]
    );

    if (roleRows.length === 0) {
      console.error(`❌ Student role not found for tenant '${tenantSlug}'!`);
      process.exit(1);
    }

    const roleId = roleRows[0].id;
    console.log(`✅ Found Student role (ID: ${roleId})\n`);

    // Required permissions for Students
    const requiredPermissions = [
      "internships:read",
      "internships:apply",
      "clientlab:read",
      "clientlab:update",
    ];

    console.log("📋 Checking required permissions:\n");

    let allGood = true;
    const missingPermissions = [];

    for (const permKey of requiredPermissions) {
      // Check if permission exists
      const { rows: permRows } = await query(
        `SELECT id FROM permissions WHERE key = $1`,
        [permKey]
      );

      if (permRows.length === 0) {
        console.error(`  ❌ Permission '${permKey}' does not exist in database!`);
        allGood = false;
        missingPermissions.push(permKey);
        continue;
      }

      const permissionId = permRows[0].id;

      // Check if role has this permission
      const { rows: rolePermRows } = await query(
        `SELECT 1 
         FROM role_permissions rp
         WHERE rp.role_id = $1 AND rp.permission_id = $2`,
        [roleId, permissionId]
      );

      if (rolePermRows.length === 0) {
        console.warn(`  ⚠️  Missing: ${permKey}`);
        allGood = false;
        missingPermissions.push(permKey);

        if (fix) {
          // Grant the permission
          await query(
            `INSERT INTO role_permissions (role_id, permission_id)
             VALUES ($1, $2)
             ON CONFLICT DO NOTHING`,
            [roleId, permissionId]
          );
          console.log(`     ✅ Granted: ${permKey}`);
        }
      } else {
        console.log(`  ✅ Has: ${permKey}`);
      }
    }

    console.log("");

    if (allGood) {
      console.log("✅ All required permissions are correctly assigned!\n");
    } else {
      if (fix) {
        console.log("✅ Fixed missing permissions!\n");
        console.log("⚠️  Note: Users may need to log out and log back in for changes to take effect.\n");
      } else {
        console.log("❌ Some permissions are missing!\n");
        console.log("💡 To fix automatically, run: node scripts/verify-permissions.js --fix\n");
        console.log("   Or manually run the seed file: npm run seed\n");
      }
    }

    // Also check current user permissions (if we can)
    console.log("📊 Checking a sample user's permissions:\n");
    const { rows: userRows } = await query(
      `SELECT u.id, u.email, m.role_id, r.name as role_name
       FROM users u
       JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
       JOIN roles r ON r.id = m.role_id AND r.tenant_id = $1
       WHERE r.name = 'Student'
       LIMIT 1`,
      [tenantId]
    );

    if (userRows.length > 0) {
      const userId = userRows[0].id;
      const userEmail = userRows[0].email;
      console.log(`   Sample Student user: ${userEmail} (ID: ${userId})\n`);

      const { rows: userPermRows } = await query(
        `SELECT p.key
         FROM memberships m
         JOIN role_permissions rp ON rp.role_id = m.role_id
         JOIN permissions p ON p.id = rp.permission_id
         WHERE m.tenant_id = $1 AND m.user_id = $2`,
        [tenantId, userId]
      );

      const userPerms = userPermRows.map((r) => r.key);
      console.log(`   User has ${userPerms.length} permissions:`);
      for (const perm of requiredPermissions) {
        const has = userPerms.includes(perm);
        console.log(`     ${has ? "✅" : "❌"} ${perm}`);
      }
      console.log("");
    } else {
      console.log("   ⚠️  No Student users found in this tenant.\n");
    }

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const fix = args.includes("--fix") || args.includes("-f");
const tenantSlug = args.find((arg) => arg.startsWith("--tenant="))?.split("=")[1] || "expograph";

verifyPermissions(tenantSlug, fix)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  });
