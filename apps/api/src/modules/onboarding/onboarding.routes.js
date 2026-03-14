// apps/api/src/modules/onboarding/onboarding.routes.js
const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const onboardingService = require("./onboarding.service");

const router = express.Router();

router.use(requireAuth);

function getContext(req) {
  const tenantId = req.tenant?.id ?? req.auth?.tenantId;
  const userId = req.auth?.userId ?? req.auth?.sub;
  if (!tenantId || !userId) {
    const err = new Error("Missing tenant or user context");
    err.statusCode = 401;
    throw err;
  }
  return { tenantId, userId };
}

// GET /api/v1/onboarding/state?tour_key=...&tour_version=...
router.get("/state", (req, res, next) => {
  const { tour_key: tourKey, tour_version: tourVersion } = req.query;
  if (!tourKey || typeof tourKey !== "string") {
    return res.status(400).json({ ok: false, error: { message: "tour_key is required" } });
  }
  const { tenantId, userId } = getContext(req);
  onboardingService
    .getState({ tenantId, userId, tourKey, tourVersion })
    .then((data) => res.json({ ok: true, data }))
    .catch(next);
});

// POST /api/v1/onboarding/start { tour_key, tour_version? }
router.post("/start", (req, res, next) => {
  const { tour_key: tourKey, tour_version: tourVersion } = req.body || {};
  if (!tourKey || typeof tourKey !== "string") {
    return res.status(400).json({ ok: false, error: { message: "tour_key is required" } });
  }
  const { tenantId, userId } = getContext(req);
  onboardingService
    .start({ tenantId, userId, tourKey, tourVersion: tourVersion ?? 1 })
    .then((payload) => res.json(payload))
    .catch(next);
});

// POST /api/v1/onboarding/progress { tour_key, tour_version?, last_step }
router.post("/progress", (req, res, next) => {
  const { tour_key: tourKey, tour_version: tourVersion, last_step: lastStep } = req.body || {};
  if (!tourKey || typeof tourKey !== "string") {
    return res.status(400).json({ ok: false, error: { message: "tour_key is required" } });
  }
  const { tenantId, userId } = getContext(req);
  onboardingService
    .progress({
      tenantId,
      userId,
      tourKey,
      tourVersion: tourVersion ?? 1,
      lastStep: typeof lastStep === "number" ? lastStep : parseInt(lastStep, 10) || 0,
    })
    .then((payload) => res.json(payload))
    .catch(next);
});

// POST /api/v1/onboarding/complete { tour_key, tour_version? }
router.post("/complete", (req, res, next) => {
  const { tour_key: tourKey, tour_version: tourVersion } = req.body || {};
  if (!tourKey || typeof tourKey !== "string") {
    return res.status(400).json({ ok: false, error: { message: "tour_key is required" } });
  }
  const { tenantId, userId } = getContext(req);
  onboardingService
    .complete({ tenantId, userId, tourKey, tourVersion: tourVersion ?? 1 })
    .then((payload) => res.json(payload))
    .catch(next);
});

// POST /api/v1/onboarding/dismiss { tour_key, tour_version? }
router.post("/dismiss", (req, res, next) => {
  const { tour_key: tourKey, tour_version: tourVersion } = req.body || {};
  if (!tourKey || typeof tourKey !== "string") {
    return res.status(400).json({ ok: false, error: { message: "tour_key is required" } });
  }
  const { tenantId, userId } = getContext(req);
  onboardingService
    .dismiss({ tenantId, userId, tourKey, tourVersion: tourVersion ?? 1 })
    .then((payload) => res.json(payload))
    .catch(next);
});

module.exports = { router };
