// apps/api/src/modules/dashboard/dashboard.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const repo = require("./dashboard.repo");

// Get dashboard statistics
const getDashboardStats = asyncHandler(async (req, res) => {
  const tenantId = req.tenant?.id;
  
  if (!tenantId) {
    return res.status(400).json({
      ok: false,
      error: { message: "Tenant ID is required" },
    });
  }

  try {
    const [totalStudents, activeUsers, totalMentors] = await Promise.all([
      repo.getTotalStudents({ tenantId }),
      repo.getActiveUsers({ tenantId }),
      repo.getTotalMentors({ tenantId }),
    ]);

    res.json({
      ok: true,
      data: {
        totalStudents: totalStudents || 0,
        activeUsers: activeUsers || 0,
        totalMentors: totalMentors || 0,
        systemHealth: "99.8%", // Can be made dynamic later
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      ok: false,
      error: { message: "Failed to fetch dashboard statistics" },
    });
  }
});

// Get recent activity (audit logs)
const getRecentActivity = asyncHandler(async (req, res) => {
  const tenantId = req.tenant?.id;
  
  if (!tenantId) {
    return res.status(400).json({
      ok: false,
      error: { message: "Tenant ID is required" },
    });
  }

  const limit = parseInt(req.query.limit) || 10;

  try {
    const logs = await repo.getRecentAuditLogs({ tenantId, limit });

    // Format logs for frontend
    const activities = (logs || []).map((log) => {
      // Format action for display
      let actionText = log.action || "Action";
      if (log.action && log.action.includes(".")) {
        const parts = log.action.split(".");
        actionText = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : log.action;
      }

      // Determine activity type based on action
      let type = "info";
      if (log.action) {
        if (log.action.includes("create") || log.action.includes("complete") || log.action.includes("publish")) {
          type = "success";
        } else if (log.action.includes("error") || log.action.includes("fail")) {
          type = "error";
        } else if (log.action.includes("warning")) {
          type = "warning";
        }
      }

      return {
        id: log.id,
        action: `${actionText}${log.entity_type ? ` (${log.entity_type})` : ""}`,
        user: log.user_name || log.user_email || "System",
        timestamp: log.created_at,
        type,
      };
    });

    res.json({
      ok: true,
      data: activities,
    });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({
      ok: false,
      error: { message: "Failed to fetch recent activity" },
    });
  }
});

// Get system alerts
const getSystemAlerts = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const alerts = await repo.getSystemAlerts({ tenantId });

  // For now, return mock alerts structure
  // This can be extended with real alert logic
  res.json({
    ok: true,
    data: alerts,
  });
});

module.exports = {
  getDashboardStats,
  getRecentActivity,
  getSystemAlerts,
};
