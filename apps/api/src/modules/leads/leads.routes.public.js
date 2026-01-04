// apps/api/src/modules/leads/leads.routes.public.js
const express = require("express");
const ctrl = require("./leads.controller");

const router = express.Router();
router.post("/leads", ctrl.createPublicLead);

module.exports = { router };
