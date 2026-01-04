// apps/api/src/modules/referrals/referrals.repo.js
const { query } = require("../../db/query");

function genCode() {
  return "EXPO-" + Math.random().toString(16).slice(2, 6).toUpperCase();
}

async function getOrCreateMyCode({ tenantId, userId }) {
  const existing = await query(
    `SELECT code FROM referral_codes WHERE tenant_id=$1 AND owner_user_id=$2 LIMIT 1`,
    [tenantId, userId]
  );
  if (existing.rows[0]) return existing.rows[0];

  for (let i = 0; i < 10; i++) {
    const code = genCode();
    try {
      const { rows } = await query(
        `INSERT INTO referral_codes (tenant_id, owner_user_id, code)
         VALUES ($1,$2,$3)
         RETURNING code`,
        [tenantId, userId, code]
      );
      return rows[0];
    } catch (e) {
      if (e.code === "23505") continue;
      throw e;
    }
  }
  throw new Error("Unable to generate referral code");
}

async function recordSignupReferral({ tenantId, referrerUserId, referredUserId, referralCode }) {
  await query(
    `INSERT INTO referral_events (tenant_id, referrer_user_id, referred_user_id, referral_code, stage)
     VALUES ($1,$2,$3,$4,'signup')
     ON CONFLICT (tenant_id, referrer_user_id, referred_user_id) DO NOTHING`,
    [tenantId, referrerUserId, referredUserId, referralCode]
  );
}

async function listEvents({ tenantId }) {
  const { rows } = await query(
    `SELECT referrer_user_id, referred_user_id, referral_code, stage, reward_amount_paise, created_at
     FROM referral_events
     WHERE tenant_id=$1
     ORDER BY created_at DESC
     LIMIT 200`,
    [tenantId]
  );
  return rows;
}

module.exports = { getOrCreateMyCode, recordSignupReferral, listEvents };
