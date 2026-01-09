/**
 * Script to check a specific user's permissions and fix any issues
 * 
 * Usage: node scripts/check-user-permissions.js [email]
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { pool } = require("../src/db/pool");

async function query(text, params = []) {
  return pool.query(text, params);
}

async function checkUserPermissions(userEmail = null) {
  console.log("\n🔍 Checking user permissions\n");

  try {
    const tenantSlug = "expograph";
    
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

    // Get user(s)
    let userQuery = `SELECT id, email, full_name FROM users`;
    let userParams = [];
    
    if (userEmail) {
      userQuery += ` WHERE email = $1`;
      userParams = [userEmail];
    } else {
      // Get first student user
      userQuery += ` WHERE id IN (
        SELECT user_id FROM memberships 
        WHERE tenant_id = $1 AND role_id IN (
          SELECT id FROM roles WHERE tenant_id = $1 AND name = 'Student'
        )
      ) LIMIT 1`;
      userParams = [tenantId];
    }

    const { rows: userRows } = await query(userQuery, userParams);

    if (userRows.length === 0) {
      console.error(`❌ User not found!`);
      process.exit(1);
    }

    for (const user of userRows) {
      console.log(`\n👤 User: ${user.email} (ID: ${user.id})`);
      console.log(`   Name: ${user.full_name || 'N/A'}\n`);

      // Check membership
      const { rows: membershipRows } = await query(
        `SELECT 
          m.id as membership_id,
          m.role_id,
          r.name as role_name,
          r.tenant_id
        FROM memberships m
        JOIN roles r ON r.id = m.role_id
        WHERE m.tenant_id = $1 AND m.user_id = $2`,
        [tenantId, user.id]
      );

      if (membershipRows.length === 0) {
        console.log(`  ❌ No membership found for this user in tenant '${tenantSlug}'`);
        console.log(`  💡 User needs to be assigned a role in this tenant\n`);
        continue;
      }

      for (const membership of membershipRows) {
        console.log(`  📋 Membership: ${membership.role_name} (Role ID: ${membership.role_id})`);

        // Check role permissions
        const { rows: rolePermRows } = await query(
          `SELECT p.key
           FROM role_permissions rp
           JOIN permissions p ON p.id = rp.permission_id
           WHERE rp.role_id = $1
           ORDER BY p.key`,
          [membership.role_id]
        );

        console.log(`  🔑 Role has ${rolePermRows.length} permissions:`);
        rolePermRows.forEach(perm => {
          console.log(`     ✅ ${perm.key}`);
        });

        // Check what permissions the user actually has (via listPermissionsForUser query)
        const { rows: userPermRows } = await query(
          `SELECT p.key
           FROM memberships m
           JOIN role_permissions rp ON rp.role_id = m.role_id
           JOIN permissions p ON p.id = rp.permission_id
           WHERE m.tenant_id = $1 AND m.user_id = $2
           ORDER BY p.key`,
          [tenantId, user.id]
        );

        console.log(`\n  🔍 User actually has ${userPermRows.length} permissions (via membership):`);
        userPermRows.forEach(perm => {
          console.log(`     ${perm.key}`);
        });

        // Check for required permissions
        const requiredPerms = ["internships:read", "internships:apply", "clientlab:read", "clientlab:update"];
        console.log(`\n  📊 Required permissions check:`);
        const missingPerms = [];
        requiredPerms.forEach(perm => {
          const has = userPermRows.some(p => p.key === perm);
          console.log(`     ${has ? "✅" : "❌"} ${perm}`);
          if (!has) missingPerms.push(perm);
        });

        if (missingPerms.length > 0) {
          console.log(`\n  ⚠️  Missing permissions: ${missingPerms.join(", ")}`);
          console.log(`\n  💡 To fix, run:`);
          console.log(`     node scripts/verify-permissions.js --fix\n`);
        } else {
          console.log(`\n  ✅ All required permissions are present!\n`);
        }
      }
    }

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const userEmail = args[0] || null;

checkUserPermissions(userEmail)
  .then(() => {
    console.log("✅ Check complete!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  });
