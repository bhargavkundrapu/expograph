// apps/api/src/modules/onboarding/onboarding.service.js
const repo = require("./onboarding.repo");

/**
 * If tour_version increased and stored status is completed, treat as not_started
 * so frontend can show "What's New" prompt.
 */
function normalizeState(row, requestedVersion) {
  if (!row) return { status: "not_started", last_step: 0, tour_version: requestedVersion ?? 1 };
  const version = Number(row.tour_version) || 1;
  const requested = Number(requestedVersion) || 1;
  let status = row.status;
  if (requested > version && status === "completed") {
    status = "not_started";
  }
  return {
    id: row.id,
    tour_key: row.tour_key,
    tour_version: version,
    status,
    last_step: Math.max(0, row.last_step ?? 0),
    started_at: row.started_at,
    completed_at: row.completed_at,
    dismissed_at: row.dismissed_at,
    updated_at: row.updated_at,
  };
}

async function getState({ tenantId, userId, tourKey, tourVersion }) {
  const row = await repo.getState({ tenantId, userId, tourKey });
  return normalizeState(row, tourVersion);
}

async function start({ tenantId, userId, tourKey, tourVersion }) {
  const row = await repo.start({ tenantId, userId, tourKey, tourVersion });
  return { ok: true, data: normalizeState(row, tourVersion) };
}

async function progress({ tenantId, userId, tourKey, tourVersion, lastStep }) {
  await repo.progress({ tenantId, userId, tourKey, tourVersion, lastStep });
  const row = await repo.getState({ tenantId, userId, tourKey });
  return { ok: true, data: normalizeState(row, tourVersion) };
}

async function complete({ tenantId, userId, tourKey, tourVersion }) {
  const row = await repo.complete({ tenantId, userId, tourKey, tourVersion });
  return { ok: true, data: normalizeState(row, tourVersion) };
}

async function dismiss({ tenantId, userId, tourKey, tourVersion }) {
  const row = await repo.dismiss({ tenantId, userId, tourKey, tourVersion });
  return { ok: true, data: normalizeState(row, tourVersion) };
}

module.exports = {
  getState,
  start,
  progress,
  complete,
  dismiss,
};
