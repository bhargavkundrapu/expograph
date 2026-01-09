/**
 * Script to check if there are projects available for Students
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { pool } = require("../src/db/pool");

async function query(text, params = []) {
  return pool.query(text, params);
}

async function checkProjects() {
  console.log("\n🔍 Checking available projects for Students\n");

  try {
    // Get tenant ID
    const { rows: tenantRows } = await query(
      `SELECT id FROM tenants WHERE slug = 'expograph'`
    );

    if (tenantRows.length === 0) {
      console.error("❌ Tenant 'expograph' not found!");
      process.exit(1);
    }

    const tenantId = tenantRows[0].id;

    // Check Internships projects
    console.log("📋 Internships Projects:\n");
    const { rows: internshipProjects } = await query(
      `SELECT
        p.id as project_id, 
        p.title, 
        p.status as project_status,
        b.id as batch_id, 
        b.batch_name, 
        b.status as batch_status,
        b.start_at, 
        b.end_at,
        b.max_seats
      FROM micro_projects p
      LEFT JOIN micro_project_batches b ON b.project_id = p.id AND b.tenant_id = p.tenant_id
      WHERE p.tenant_id = $1
      ORDER BY p.created_at DESC, b.start_at ASC`,
      [tenantId]
    );

    if (internshipProjects.length === 0) {
      console.log("  ⚠️  No internship projects found in database\n");
    } else {
      console.log(`  Found ${internshipProjects.length} project(s):\n`);
      internshipProjects.forEach((proj, idx) => {
        console.log(`  ${idx + 1}. ${proj.title || 'Untitled'}`);
        console.log(`     Project Status: ${proj.project_status || 'N/A'}`);
        if (proj.batch_name) {
          console.log(`     Batch: ${proj.batch_name} (${proj.batch_status || 'N/A'})`);
          console.log(`     Dates: ${proj.start_at ? new Date(proj.start_at).toLocaleDateString() : 'N/A'} - ${proj.end_at ? new Date(proj.end_at).toLocaleDateString() : 'N/A'}`);
        }
        console.log("");
      });

      // Check which projects are visible to students (published + open batch + within date range)
      const { rows: visibleProjects } = await query(
        `SELECT
          p.id as project_id, 
          p.title,
          b.batch_name,
          b.start_at,
          b.end_at
        FROM micro_projects p
        JOIN micro_project_batches b ON b.project_id = p.id AND b.tenant_id = p.tenant_id
        WHERE p.tenant_id = $1
          AND p.status = 'published'
          AND b.status = 'open'
          AND now() BETWEEN b.start_at AND b.end_at
        ORDER BY b.start_at ASC`,
        [tenantId]
      );

      console.log(`\n  ✅ Projects visible to Students: ${visibleProjects.length}\n`);
      if (visibleProjects.length === 0) {
        console.log("  ⚠️  No projects are currently visible to students because:");
        console.log("     - Projects must be 'published'");
        console.log("     - Batches must be 'open'");
        console.log("     - Current date must be between batch start_at and end_at\n");
      } else {
        visibleProjects.forEach((proj, idx) => {
          console.log(`  ${idx + 1}. ${proj.title}`);
          console.log(`     Batch: ${proj.batch_name}`);
          console.log(`     Available: ${new Date(proj.start_at).toLocaleDateString()} - ${new Date(proj.end_at).toLocaleDateString()}\n`);
        });
      }
    }

    // Check Client Lab projects
    console.log("\n📋 Client Lab Projects:\n");
    const { rows: clientLabProjects } = await query(
      `SELECT
        p.id,
        p.title,
        p.status,
        p.created_at,
        COUNT(pm.user_id) as member_count
      FROM client_projects p
      LEFT JOIN project_members pm ON pm.project_id = p.id AND pm.tenant_id = p.tenant_id
      WHERE p.tenant_id = $1
      GROUP BY p.id, p.title, p.status, p.created_at
      ORDER BY p.created_at DESC`,
      [tenantId]
    );

    if (clientLabProjects.length === 0) {
      console.log("  ⚠️  No client lab projects found in database\n");
    } else {
      console.log(`  Found ${clientLabProjects.length} project(s):\n`);
      clientLabProjects.forEach((proj, idx) => {
        console.log(`  ${idx + 1}. ${proj.title || 'Untitled'}`);
        console.log(`     Status: ${proj.status || 'N/A'}`);
        console.log(`     Members: ${proj.member_count || 0}\n`);
      });

      // Check which students are assigned to projects
      const { rows: studentAssignments } = await query(
        `SELECT
          u.email,
          p.title as project_title,
          COUNT(*) as project_count
        FROM users u
        JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
        JOIN roles r ON r.id = m.role_id AND r.name = 'Student'
        LEFT JOIN project_members pm ON pm.user_id = u.id AND pm.tenant_id = $1
        LEFT JOIN client_projects p ON p.id = pm.project_id AND p.tenant_id = $1
        WHERE m.tenant_id = $1
        GROUP BY u.email, p.title
        HAVING COUNT(p.id) > 0
        ORDER BY u.email`,
        [tenantId]
      );

      console.log(`\n  ✅ Students assigned to projects: ${studentAssignments.length}\n`);
      if (studentAssignments.length === 0) {
        console.log("  ⚠️  No students are currently assigned to any client lab projects.\n");
        console.log("     Students will only see projects they are members of.\n");
      } else {
        studentAssignments.forEach((assignment) => {
          console.log(`  - ${assignment.email}: ${assignment.project_title || 'N/A'}\n`);
        });
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

checkProjects()
  .then(() => {
    console.log("✅ Check complete!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  });
