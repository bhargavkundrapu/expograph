// apps/api/src/modules/media/media.repo.js

// NOTE: adjust this require path if your db file is in a different place
// Common pattern: apps/api/src/db/index.js exports { query }
const db = require("../../db");

/**
 * Get the video UID for a lesson (tenant-safe).
 * Returns: { uid, videoStatus, lessonStatus }
 * 
 * Supports two approaches:
 * 1. video_asset_id → video_assets table (preferred)
 * 2. video_id + video_provider directly on lessons table (fallback)
 */
async function getVideoByLessonId({ tenantId, lessonId }) {
  const sql = `
    SELECT
      COALESCE(v.uid, l.video_id) AS uid,
      COALESCE(v.status, 'ready') AS video_status,
      l.status AS lesson_status,
      l.video_provider
    FROM lessons l
    LEFT JOIN video_assets v ON v.id = l.video_asset_id
    WHERE l.id = $1
      AND l.tenant_id = $2
    LIMIT 1
  `;
  const { rows } = await db.query(sql, [lessonId, tenantId]);
  if (rows.length === 0) return null;

  const row = rows[0];
  
  // Return uid if it exists and video_provider is cloudflare_stream (or NULL, treat as cloudflare_stream)
  // This handles both video_assets table and direct video_id on lessons table
  if (row.uid && (row.video_provider === 'cloudflare_stream' || !row.video_provider)) {
    return {
      uid: row.uid,
      videoStatus: row.video_status,
      lessonStatus: row.lesson_status,
    };
  }

  // If no video linked, return null uid (will trigger "Video not attached" error)
  return {
    uid: null,
    videoStatus: row.video_status,
    lessonStatus: row.lesson_status,
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
