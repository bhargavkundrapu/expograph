// apps/api/src/modules/referrals/referrals.service.js
const { query } = require("../../db/query");
const { recordSignupReferral } = require("./referrals.repo");

async function captureSignupReferral({ tenantId, referredUserId, referralCode }) {
  if (!referralCode) return { captured: false, reason: "no_code" };

  const code = String(referralCode).trim().toUpperCase();
  if (!code) return { captured: false, reason: "empty_code" };

  // Find referrer by code (case-insensitive)
  const { rows } = await query(
    `SELECT owner_user_id, code
     FROM referral_codes
     WHERE tenant_id=$1 AND upper(code)=upper($2) AND is_active=true
     LIMIT 1`,
    [tenantId, code]
  );

  const ref = rows[0];
  if (!ref) return { captured: false, reason: "code_not_found" };
  if (ref.owner_user_id === referredUserId) return { captured: false, reason: "self_referral" };

  await recordSignupReferral({
    tenantId,
    referrerUserId: ref.owner_user_id,
    referredUserId,
    referralCode: ref.code,
  });

  return { captured: true };
}

module.exports = { captureSignupReferral };
