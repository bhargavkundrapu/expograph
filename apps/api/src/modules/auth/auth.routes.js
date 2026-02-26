// apps/api/src/modules/auth/auth.routes.js

const { authLimiter } = require("../../middlewares/rate-limit/rateLimiters");

const attachDevice = require("../../middlewares/device/attachDevice");

const express = require("express");
const controller = require("./auth.controller");

const router = express.Router();

router.post("/request-otp", authLimiter, attachDevice, controller.requestOtp);
router.post("/verify-otp", authLimiter, attachDevice, controller.verifyOtp);



module.exports = { router };
