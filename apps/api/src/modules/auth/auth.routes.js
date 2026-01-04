// apps/api/src/modules/auth/auth.routes.js

const { authLimiter } = require("../../middlewares/rate-limit/rateLimiters");

const attachDevice = require("../../middlewares/device/attachDevice");

const express = require("express");
const controller = require("./auth.controller");

const router = express.Router();

router.post("/login", authLimiter, attachDevice, controller.login);
router.post("/register", authLimiter, attachDevice, controller.register);



module.exports = { router };
