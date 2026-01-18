// apps/api/src/modules/podcasts/podcasts.repo.js
const { query } = require("../../db/query");

// Series functions
async function createSeries({ tenantId, title, slug, description, coverImageUrl, status, createdBy }) {
  const { rows } = await query(
    `INSERT INTO podcast_series (tenant_id, title, slug, description, cover_image_url, status, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [tenantId, title, slug, description ?? null, coverImageUrl ?? null, status ?? "published", createdBy ?? null]
  );
  return rows[0];
}

async function listSeries({ tenantId }) {
  const { rows } = await query(
    `SELECT * FROM podcast_series
     WHERE tenant_id=$1 AND deleted_at IS NULL
     ORDER BY created_at DESC`,
    [tenantId]
  );
  return rows;
}

async function getSeries({ tenantId, id }) {
  const { rows } = await query(
    `SELECT * FROM podcast_series WHERE tenant_id=$1 AND id=$2 AND deleted_at IS NULL LIMIT 1`,
    [tenantId, id]
  );
  return rows[0] ?? null;
}

async function updateSeries({ tenantId, id, patch }) {
  const fields = [];
  const values = [];
  let i = 1;

  if (patch.title !== undefined) { fields.push(`title=$${i++}`); values.push(patch.title); }
  if (patch.description !== undefined) { fields.push(`description=$${i++}`); values.push(patch.description); }
  if (patch.coverImageUrl !== undefined) { fields.push(`cover_image_url=$${i++}`); values.push(patch.coverImageUrl); }
  if (patch.status !== undefined) { fields.push(`status=$${i++}`); values.push(patch.status); }

  if (!fields.length) return null;

  values.push(tenantId);
  values.push(id);

  const sql = `
    UPDATE podcast_series
    SET ${fields.join(", ")}, updated_at=now()
    WHERE tenant_id=$${i++} AND id=$${i++} AND deleted_at IS NULL
    RETURNING *
  `;

  const { rows } = await query(sql, values);
  return rows[0] || null;
}

async function deleteSeries({ tenantId, id }) {
  const { rows } = await query(
    `UPDATE podcast_series 
     SET deleted_at = now(), updated_at = now()
     WHERE tenant_id=$1 AND id=$2 AND deleted_at IS NULL
     RETURNING *`,
    [tenantId, id]
  );
  return rows[0] || null;
}

// Episode functions
async function createEpisode({ tenantId, seriesId, title, slug, description, showNotes, audioUrl, audioDurationSeconds, fileSizeBytes, coverImageUrl, episodeNumber, publishedAt, status, transcriptUrl, transcriptText, meta, createdBy }) {
  const { rows } = await query(
    `INSERT INTO podcast_episodes 
     (tenant_id, series_id, title, slug, description, show_notes, audio_url, audio_duration_seconds, file_size_bytes, 
      cover_image_url, episode_number, published_at, status, transcript_url, transcript_text, meta, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
     RETURNING *`,
    [
      tenantId, seriesId ?? null, title, slug, description ?? null, showNotes ?? null,
      audioUrl, audioDurationSeconds ?? null, fileSizeBytes ?? null, coverImageUrl ?? null,
      episodeNumber ?? null, publishedAt ?? null, status ?? "draft",
      transcriptUrl ?? null, transcriptText ?? null, JSON.stringify(meta || {}), createdBy ?? null
    ]
  );
  return rows[0];
}

async function listEpisodes({ tenantId, seriesId, status }) {
  let sql = `
    SELECT e.*, s.title AS series_title
    FROM podcast_episodes e
    LEFT JOIN podcast_series s ON s.id = e.series_id AND s.tenant_id = e.tenant_id
    WHERE e.tenant_id=$1 AND e.deleted_at IS NULL
  `;
  const params = [tenantId];
  let paramIndex = 2;

  if (seriesId) {
    sql += ` AND e.series_id=$${paramIndex++}`;
    params.push(seriesId);
  }

  if (status) {
    sql += ` AND e.status=$${paramIndex++}`;
    params.push(status);
  }

  sql += ` ORDER BY e.published_at DESC NULLS LAST, e.created_at DESC`;

  const { rows } = await query(sql, params);
  return rows;
}

async function getEpisode({ tenantId, id }) {
  const { rows } = await query(
    `SELECT e.*, s.title AS series_title
     FROM podcast_episodes e
     LEFT JOIN podcast_series s ON s.id = e.series_id AND s.tenant_id = e.tenant_id
     WHERE e.tenant_id=$1 AND e.id=$2 AND e.deleted_at IS NULL LIMIT 1`,
    [tenantId, id]
  );
  return rows[0] ?? null;
}

async function getEpisodeWithStats({ tenantId, id }) {
  const episodeRows = await query(
    `SELECT e.*, s.title AS series_title
     FROM podcast_episodes e
     LEFT JOIN podcast_series s ON s.id = e.series_id AND s.tenant_id = e.tenant_id
     WHERE e.tenant_id=$1 AND e.id=$2 AND e.deleted_at IS NULL LIMIT 1`,
    [tenantId, id]
  );
  
  if (!episodeRows.rows[0]) return null;
  
  const episode = episodeRows.rows[0];
  
  // Get progress stats
  const statsRows = await query(
    `SELECT 
       COUNT(*)::int AS total_listeners,
       COUNT(*) FILTER (WHERE completed = true)::int AS completed_count,
       COALESCE(AVG(listened_seconds), 0)::int AS avg_listened_seconds
     FROM podcast_episode_progress
     WHERE tenant_id=$1 AND episode_id=$2`,
    [tenantId, id]
  );
  
  episode.stats = statsRows.rows[0] || {
    total_listeners: 0,
    completed_count: 0,
    avg_listened_seconds: 0,
  };
  
  return episode;
}

async function updateEpisode({ tenantId, id, patch }) {
  const fields = [];
  const values = [];
  let i = 1;

  if (patch.title !== undefined) { fields.push(`title=$${i++}`); values.push(patch.title); }
  if (patch.description !== undefined) { fields.push(`description=$${i++}`); values.push(patch.description); }
  if (patch.showNotes !== undefined) { fields.push(`show_notes=$${i++}`); values.push(patch.showNotes); }
  if (patch.audioUrl !== undefined) { fields.push(`audio_url=$${i++}`); values.push(patch.audioUrl); }
  if (patch.audioDurationSeconds !== undefined) { fields.push(`audio_duration_seconds=$${i++}`); values.push(patch.audioDurationSeconds); }
  if (patch.fileSizeBytes !== undefined) { fields.push(`file_size_bytes=$${i++}`); values.push(patch.fileSizeBytes); }
  if (patch.coverImageUrl !== undefined) { fields.push(`cover_image_url=$${i++}`); values.push(patch.coverImageUrl); }
  if (patch.episodeNumber !== undefined) { fields.push(`episode_number=$${i++}`); values.push(patch.episodeNumber); }
  if (patch.publishedAt !== undefined) { fields.push(`published_at=$${i++}`); values.push(patch.publishedAt); }
  if (patch.status !== undefined) { fields.push(`status=$${i++}`); values.push(patch.status); }
  if (patch.transcriptUrl !== undefined) { fields.push(`transcript_url=$${i++}`); values.push(patch.transcriptUrl); }
  if (patch.transcriptText !== undefined) { fields.push(`transcript_text=$${i++}`); values.push(patch.transcriptText); }
  if (patch.seriesId !== undefined) { fields.push(`series_id=$${i++}`); values.push(patch.seriesId); }
  if (patch.meta !== undefined) { fields.push(`meta=$${i++}`); values.push(JSON.stringify(patch.meta)); }

  if (!fields.length) return null;

  values.push(tenantId);
  values.push(id);

  const sql = `
    UPDATE podcast_episodes
    SET ${fields.join(", ")}, updated_at=now()
    WHERE tenant_id=$${i++} AND id=$${i++} AND deleted_at IS NULL
    RETURNING *
  `;

  const { rows } = await query(sql, values);
  return rows[0] || null;
}

async function deleteEpisode({ tenantId, id }) {
  const { rows } = await query(
    `UPDATE podcast_episodes 
     SET deleted_at = now(), updated_at = now()
     WHERE tenant_id=$1 AND id=$2 AND deleted_at IS NULL
     RETURNING *`,
    [tenantId, id]
  );
  return rows[0] || null;
}

module.exports = {
  // Series
  createSeries,
  listSeries,
  getSeries,
  updateSeries,
  deleteSeries,
  // Episodes
  createEpisode,
  listEpisodes,
  getEpisode,
  getEpisodeWithStats,
  updateEpisode,
  deleteEpisode,
};
