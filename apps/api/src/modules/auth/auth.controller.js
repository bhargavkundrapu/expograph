const deviceSvc = require("./deviceSessions.service");

const { asyncHandler } = require("../../utils/asyncHandler");
const authService = require("./auth.service");

const register = asyncHandler(async (req, res) => {
  const data = await authService.register({ tenant: req.tenant, body: req.body });

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
