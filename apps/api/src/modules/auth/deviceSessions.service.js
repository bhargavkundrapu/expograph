// apps/api/src/modules/auth/deviceSessions.repo.js
const db = require("../../db"); // if this path is wrong, tell me your db file path and I’ll fix it

async function upsertDeviceSession({ tenantId, userId, deviceId, userAgent, ip }) {
  const sql = `
    INSERT INTO device_sessions (tenant_id, user_id, device_id, user_agent, ip_hash, last_seen_at)
    VALUES ($1, $2, $3, $4, $5, now())
    ON CONFLICT (tenant_id, user_id, device_id)
    DO UPDATE SET user_agent = EXCLUDED.user_agent,
                  ip_hash = EXCLUDED.ip_hash,
                  last_seen_at = now()
  `;
  await db.query(sql, [tenantId, userId, deviceId, userAgent || null, ip || null]);
}

async function enforceMaxDevices({ tenantId, userId, keepDeviceId, maxDevices }) {
  const { rows } = await db.query(
    `
    SELECT device_id
    FROM device_sessions
    WHERE tenant_id=$1 AND user_id=$2
    ORDER BY last_seen_at DESC
    `,
    [tenantId, userId]
  );

  if (rows.length <= maxDevices) return;

  const keep = rows.slice(0, maxDevices).map((r) => r.device_id);

  // ensure current device stays
  if (keepDeviceId && !keep.includes(keepDeviceId)) {
    keep.pop();
    keep.push(keepDeviceId);
  }

  await db.query(
    `
    DELETE FROM device_sessions
    WHERE tenant_id=$1 AND user_id=$2
      AND device_id <> ALL($3::text[])
    `,
    [tenantId, userId, keep]
  );
}

module.exports = { upsertDeviceSession, enforceMaxDevices };
