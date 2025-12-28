// apps/api/src/modules/auth/auth.routes.js
const attachDevice = require("../../middlewares/device/attachDevice");

const express = require("express");
const controller = require("./auth.controller");

const router = express.Router();

router.post("/login", attachDevice, controller.login);
router.post("/register", attachDevice, controller.register);


module.exports = { router };
