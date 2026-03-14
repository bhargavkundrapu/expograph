// apps/api/src/modules/onboarding/onboarding.repo.js
const { query } = require("../../db/query");

const VALID_STATUSES = ["not_started", "started", "completed", "dismissed"];

function validateStatus(s) {
  if (VALID_STATUSES.includes(s)) return s;
  return "not_started";
}

/**
 * Get onboarding state for a user/tenant/tour. Returns null if no row.
 */
async function getState({ tenantId, userId, tourKey }) {
  const { rows } = await query(
    `SELECT id, tenant_id, user_id, tour_key, tour_version, status, last_step,
            started_at, completed_at, dismissed_at, updated_at
     FROM onboarding_state
     WHERE tenant_id = $1 AND user_id = $2 AND tour_key = $3
     LIMIT 1`,
    [tenantId, userId, tourKey]
  );
  return rows[0] || null;
}

/**
 * Upsert state: create or update. Used for start, progress, complete, dismiss.
 */
async function upsertState({
  tenantId,
  userId,
  tourKey,
  tourVersion = 1,
  status,
  lastStep = 0,
  startedAt = null,
  completedAt = null,
  dismissedAt = null,
}) {
  status = validateStatus(status);
  const { rows } = await query(
    `INSERT INTO onboarding_state (
       tenant_id, user_id, tour_key, tour_version, status, last_step,
       started_at, completed_at, dismissed_at, updated_at
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now())
     ON CONFLICT (tenant_id, user_id, tour_key)
     DO UPDATE SET
       tour_version = $4,
       status = $5,
       last_step = $6,
       started_at = CASE WHEN EXCLUDED.started_at IS NOT NULL THEN EXCLUDED.started_at ELSE onboarding_state.started_at END,
       completed_at = CASE WHEN EXCLUDED.completed_at IS NOT NULL THEN EXCLUDED.completed_at ELSE onboarding_state.completed_at END,
       dismissed_at = CASE WHEN EXCLUDED.dismissed_at IS NOT NULL THEN EXCLUDED.dismissed_at ELSE onboarding_state.dismissed_at END,
       updated_at = now()
     RETURNING *`,
    [
      tenantId,
      userId,
      tourKey,
      tourVersion,
      status,
      lastStep,
      startedAt,
      completedAt,
      dismissedAt,
    ]
  );
  return rows[0];
}

/**
 * Start tour: set status started, started_at = now if not already set.
 */
async function start({ tenantId, userId, tourKey, tourVersion = 1 }) {
  const existing = await getState({ tenantId, userId, tourKey });
  const startedAt = existing?.started_at || new Date();
  return upsertState({
    tenantId,
    userId,
    tourKey,
    tourVersion,
    status: "started",
    lastStep: 0,
    startedAt,
    completedAt: null,
    dismissedAt: null,
  });
}

/**
 * Update progress (last_step).
 */
async function progress({ tenantId, userId, tourKey, tourVersion, lastStep }) {
  return upsertState({
    tenantId,
    userId,
    tourKey,
    tourVersion: tourVersion ?? 1,
    status: "started",
    lastStep: Math.max(0, lastStep),
    startedAt: null,
    completedAt: null,
    dismissedAt: null,
  });
}

/**
 * Complete tour.
 */
async function complete({ tenantId, userId, tourKey, tourVersion = 1 }) {
  return upsertState({
    tenantId,
    userId,
    tourKey,
    tourVersion,
    status: "completed",
    lastStep: 0,
    startedAt: null,
    completedAt: new Date(),
    dismissedAt: null,
  });
}

/**
 * Dismiss tour.
 */
async function dismiss({ tenantId, userId, tourKey, tourVersion = 1 }) {
  return upsertState({
    tenantId,
    userId,
    tourKey,
    tourVersion,
    status: "dismissed",
    lastStep: 0,
    startedAt: null,
    completedAt: null,
    dismissedAt: new Date(),
  });
}

module.exports = {
  getState,
  upsertState,
  start,
  progress,
  complete,
  dismiss,
};
