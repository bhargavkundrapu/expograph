// apps/api/src/modules/approvals/approvals.service.js
const { HttpError } = require("../../utils/httpError");
const { withTransaction } = require("../../db/query");
const approvalsRepo = require("./approvals.repo");
const paymentsRepo = require("../payments/payments.repo");
const { findRoleIdForTenant, upsertMembership } = require("../users/users.repo");

async function listApprovals({ tenantId, status }) {
  if (status) {
    return approvalsRepo.listByStatus({ tenantId, status });
  }
  return approvalsRepo.listAll({ tenantId });
}

async function approveById({ approvalId, approvedByUserId }) {
  const approval = await approvalsRepo.findById(approvalId);
  if (!approval) throw new HttpError(404, "Approval not found");
  if (approval.status !== "pending") {
    throw new HttpError(400, `Approval is already ${approval.status}`);
  }

  const result = await withTransaction(async (client) => {
    // Step 1: Create or reactivate user
    let userId;
    try {
      userId = await paymentsRepo.upsertUserFromPayment(
        {
          email: approval.customer_email,
          fullName: approval.customer_name,
          phone: approval.customer_phone,
          college: approval.customer_college,
        },
        client
      );
    } catch (e) {
      console.error("[Approvals] upsertUserFromPayment failed:", e.message, "code:", e.code, "constraint:", e.constraint);
      const hint = e.code === "23505" ? " (Duplicate email or phone)" : "";
      throw new HttpError(500, `Failed to create user${hint}`, { originalError: e.message, code: e.code, constraint: e.constraint });
    }

    if (!userId) {
      throw new HttpError(500, "User creation returned no ID");
    }

    // Step 2: Assign Student role (fail hard if role is missing)
    const roleId = await findRoleIdForTenant({ tenantId: approval.tenant_id, roleName: "Student" }, client);
    if (!roleId) {
      throw new HttpError(500, "Student role not found for this tenant. Please seed roles first.");
    }
    await upsertMembership({ tenantId: approval.tenant_id, userId, roleId }, client);

    // Step 3: Enroll in course/pack
    try {
      await paymentsRepo.ensureEnrollment(
        {
          userId,
          tenantId: approval.tenant_id,
          itemType: approval.item_type,
          itemId: approval.item_id,
        },
        client
      );
    } catch (e) {
      console.error("[Approvals] ensureEnrollment failed:", e.message);
      throw new HttpError(500, "Failed to enroll user", { originalError: e.message });
    }

    // Step 4: Mark approval as approved (inside transaction so it rolls back on failure)
    await client.query(
      `UPDATE approvals
       SET status = 'approved', approved_by = $2, approved_at = now(), updated_at = now()
       WHERE id = $1 AND status = 'pending'`,
      [approvalId, approvedByUserId]
    );

    return userId;
  });

  return { success: true, userId: result };
}

async function rejectById({ approvalId, notes }) {
  const approval = await approvalsRepo.findById(approvalId);
  if (!approval) throw new HttpError(404, "Approval not found");
  if (approval.status !== "pending") {
    throw new HttpError(400, `Approval is already ${approval.status}`);
  }
  await approvalsRepo.markRejected(approvalId, notes);
  return { success: true };
}

module.exports = {
  listApprovals,
  approveById,
  rejectById,
};
