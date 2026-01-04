// apps/api/src/modules/certificates/certificates.routes.public.js
const express = require("express");
const ctrl = require("./certificates.controller");

const router = express.Router();
router.get("/verify/cert/:code", ctrl.verifyPublic);

module.exports = { router };
