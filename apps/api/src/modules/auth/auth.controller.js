// apps/api/src/modules/auth/auth.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const authService = require("./auth.service");

const register = asyncHandler(async (req, res) => {
  const data = await authService.register({ tenant: req.tenant, body: req.body });
  res.status(201).json({ ok: true, data });
});

const login = asyncHandler(async (req, res) => {
  const data = await authService.login({ tenant: req.tenant, body: req.body });
  res.status(200).json({ ok: true, data });
});

module.exports = { register, login };
