// apps/api/src/modules/auth/deviceSessions.service.js
const crypto = require("crypto");
const db = require("../../db"); // adjust path if your db export is different

function sha256(input) {
  return crypto.createHash("sha256").update(String(input)).digest("hex");
}

function getMaxDevices() {
  const n = Number(process.env.MAX_DEVICES_PER_USER || 2);
  return Number.isFinite(n) && n > 0 ? n : 2;
}

async function upsertDeviceSession({ tenantId, userId, deviceId, userAgent, ip }) {
  const ipHash = ip ? sha256(ip) : null;

  const sql = `
    INSERT INTO device_sessions (tenant_id, user_id, device_id, user_agent, ip_hash, last_seen_at)
    VALUES ($1, $2, $3, $4, $5, now())
    ON CONFLICT (tenant_id, user_id, device_id)
    DO UPDATE SET user_agent = EXCLUDED.user_agent,
                  ip_hash = EXCLUDED.ip_hash,
                  last_seen_at = now()
    RETURNING id;
  `;
  const { rows } = await db.query(sql, [tenantId, userId, deviceId, userAgent || null, ipHash]);
  return rows[0]?.id;
}

async function enforceMaxDevices({ tenantId, userId, keepDeviceId }) {
  const maxDevices = getMaxDevices();

  // get all devices newest first
  const listSql = `
    SELECT id, device_id
    FROM device_sessions
    WHERE tenant_id = $1 AND user_id = $2
    ORDER BY last_seen_at DESC
  `;
  const { rows } = await db.query(listSql, [tenantId, userId]);

  if (rows.length <= maxDevices) return { ok: true, removed: 0 };

  // keep current device + newest ones; remove the rest
  const keep = new Set();
  if (keepDeviceId) keep.add(keepDeviceId);

  const kept = [];
  for (const r of rows) {
    if (kept.length >= maxDevices) break;
    if (keep.has(r.device_id) || kept.length < maxDevices) {
      // we still want the newest N; ensure current device is included
      kept.push(r.device_id);
    }
  }

  // ensure keepDeviceId is in kept
  if (keepDeviceId && !kept.includes(keepDeviceId)) {
    kept.pop();
    kept.push(keepDeviceId);
  }

  const deleteSql = `
    DELETE FROM device_sessions
    WHERE tenant_id = $1 AND user_id = $2
      AND device_id <> ALL($3::text[])
  `;
  const result = await db.query(deleteSql, [tenantId, userId, kept]);
  return { ok: true, removed: result.rowCount || 0 };
}

async function isDeviceActive({ tenantId, userId, deviceId }) {
  const sql = `
    SELECT 1
    FROM device_sessions
    WHERE tenant_id = $1 AND user_id = $2 AND device_id = $3
    LIMIT 1
  `;
  const { rows } = await db.query(sql, [tenantId, userId, deviceId]);
  return rows.length > 0;
}

module.exports = {
  upsertDeviceSession,
  enforceMaxDevices,
  isDeviceActive,
};
