const { query } = require("../../db/query");
const referralsRepo = require("../referrals/referrals.repo");

const deviceSvc = require("./deviceSessions.service");

const { asyncHandler } = require("../../utils/asyncHandler");
const authService = require("./auth.service");

const register = asyncHandler(async (req, res) => {
  const data = await authService.register({ tenant: req.tenant, body: req.body });

  // Device session tracking (safe: runs only if deviceId exists)
  const tenantId = req.tenant?.id;
  const userId = data?.user?.id || data?.userId || data?.id; 
  const deviceId = req.deviceId || req.header("x-device-id") || null;
  const { referralCode } = req.body || {};
  
  // Referral tracking (safe + silent)
  if (tenantId && userId && referralCode) {
    const code = String(referralCode).trim();

    try {
      const { rows } = await query(
        `SELECT owner_user_id, code
         FROM referral_codes
         WHERE tenant_id = $1 AND upper(code) = upper($2) AND is_active = true
         LIMIT 1`,
        [tenantId, code]
      );

      const ref = rows[0];

      if (ref && ref.owner_user_id && ref.owner_user_id !== userId) {
        await referralsRepo.recordSignupReferral({
          tenantId,
          referrerUserId: ref.owner_user_id,
          referredUserId: userId,
          referralCode: ref.code,
        });
      }
    } catch (e) {
      // Never break signup because of referral insert errors
      console.error("Referral capture failed:", e.message);
    }
  }


  if (tenantId && userId && deviceId) {
    await deviceSvc.upsertDeviceSession({
      tenantId,
      userId,
      deviceId,
      userAgent: req.get("user-agent"),
      ip: req.ip,
    });

    await deviceSvc.enforceMaxDevices({ tenantId, userId, keepDeviceId: deviceId });
  }

  res.status(201).json({ ok: true, data });
});


const login = asyncHandler(async (req, res) => {
  const data = await authService.login({ tenant: req.tenant, body: req.body });

  // Device session tracking (safe: runs only if deviceId exists)
  const tenantId = req.tenant?.id;
  const userId = data?.user?.id || data?.userId || data?.id; // adjust depending on authService response
  const deviceId = req.deviceId || req.header("x-device-id") || null;

  if (tenantId && userId && deviceId) {
    await deviceSvc.upsertDeviceSession({
      tenantId,
      userId,
      deviceId,
      userAgent: req.get("user-agent"),
      ip: req.ip,
    });

    await deviceSvc.enforceMaxDevices({ tenantId, userId, keepDeviceId: deviceId });
  }

  res.status(200).json({ ok: true, data });
});

module.exports = { register, login };
