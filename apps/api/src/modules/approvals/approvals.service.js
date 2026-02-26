// apps/api/src/modules/approvals/approvals.service.js
const { HttpError } = require("../../utils/httpError");
const approvalsRepo = require("./approvals.repo");
const paymentsRepo = require("../payments/payments.repo");
const { findRoleIdForTenant, upsertMembership } = require("../users/users.repo");
const { createOtp } = require("../auth/auth.otp.repo");
const { sendOtpEmail } = require("../auth/auth.email.service");

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

  let userId;
  try {
    userId = await paymentsRepo.upsertUserFromPayment({
      email: approval.customer_email,
      fullName: approval.customer_name,
      phone: approval.customer_phone,
      college: approval.customer_college,
    });
  } catch (e) {
    console.error("[Approvals] upsertUserFromPayment failed:", e.message, "code:", e.code, "constraint:", e.constraint);
    const hint = e.code === "23505" ? " (Duplicate email or phone - try with different details)" : "";
    throw new HttpError(500, `Failed to create user${hint}`, { originalError: e.message, code: e.code, constraint: e.constraint });
  }

  const roleId = await findRoleIdForTenant({ tenantId: approval.tenant_id, roleName: "Student" });
  if (roleId) {
    await upsertMembership({ tenantId: approval.tenant_id, userId, roleId });
  }

  try {
    await paymentsRepo.ensureEnrollment({
      userId,
      tenantId: approval.tenant_id,
      itemType: approval.item_type,
      itemId: approval.item_id,
    });
  } catch (e) {
    console.error("[Approvals] ensureEnrollment failed:", e.message);
    throw new HttpError(500, "Failed to enroll user", { originalError: e.message });
  }

  try {
    const { otpCode } = await createOtp(approval.customer_email);
    await sendOtpEmail({ to: approval.customer_email, otpCode, appName: "ExpoGraph" });
  } catch (e) {
    console.warn("[Approvals] OTP send failed:", e.message);
  }

  await approvalsRepo.markApproved(approvalId, approvedByUserId);
  return { success: true, userId };
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
