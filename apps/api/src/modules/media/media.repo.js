// apps/api/src/modules/media/media.repo.js

// NOTE: adjust this require path if your db file is in a different place
// Common pattern: apps/api/src/db/index.js exports { query }
const db = require("../../db");

/**
 * Get the video UID for a lesson (tenant-safe).
 * Returns: { uid, videoStatus, lessonStatus }
 */
async function getVideoByLessonId({ tenantId, lessonId }) {
  const sql = `
    SELECT
      v.uid AS uid,
      v.status AS video_status,
      l.status AS lesson_status
    FROM lessons l
    LEFT JOIN video_assets v ON v.id = l.video_asset_id
    WHERE l.id = $1
      AND l.tenant_id = $2
    LIMIT 1
  `;
  const { rows } = await db.query(sql, [lessonId, tenantId]);
  if (rows.length === 0) return null;

  return {
    uid: rows[0].uid,
    videoStatus: rows[0].video_status,
    lessonStatus: rows[0].lesson_status,
  };
}

/**
 * Basic "membership active" check.
 * If you don't have memberships table yet, we can relax this later.
 */
async function isMemberActive({ tenantId, userId }) {
  const sql = `
    SELECT 1
    FROM memberships m
    WHERE m.tenant_id = $1
      AND m.user_id = $2
    LIMIT 1
  `;
  const { rows } = await db.query(sql, [tenantId, userId]);
  return rows.length > 0;
}

module.exports = {
  getVideoByLessonId,
  isMemberActive,
};
