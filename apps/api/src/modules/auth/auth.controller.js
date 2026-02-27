const deviceSvc = require("./deviceSessions.service");
const { asyncHandler } = require("../../utils/asyncHandler");
const authService = require("./auth.service");

const requestOtp = asyncHandler(async (req, res) => {
  const result = await authService.requestOtp({ tenant: req.tenant, body: req.body });
  res.status(200).json({ ok: true, data: result });
});

const verifyOtp = asyncHandler(async (req, res) => {
  const data = await authService.verifyOtpAndLogin({ tenant: req.tenant, body: req.body });

  // Device session tracking (safe: runs only if deviceId exists)
  const tenantId = req.tenant?.id;
  const userId = data?.user?.id || data?.userId || data?.id;
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

const adminLogin = asyncHandler(async (req, res) => {
  const data = await authService.adminLogin({ tenant: req.tenant, body: req.body });

  const tenantId = req.tenant?.id;
  const userId = data?.user?.id;
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

module.exports = { requestOtp, verifyOtp, adminLogin };
