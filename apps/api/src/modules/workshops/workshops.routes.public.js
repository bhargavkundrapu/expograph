// apps/api/src/modules/workshops/workshops.routes.public.js
const express = require("express");
const ctrl = require("./workshops.controller");

const router = express.Router();

router.get("/workshops", ctrl.listPublic);
router.post("/workshops/:slug/register", ctrl.registerPublic);

module.exports = { router };
