// apps/api/src/modules/podcasts/podcasts.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./podcasts.repo");
const { audit } = require("../audit/audit.service");

function slugify(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

// ADMIN: Series endpoints
const createSeries = asyncHandler(async (req, res) => {
  const { title, slug, description, coverImageUrl, status } = req.body || {};
  if (!title) throw new HttpError(400, "title required");

  const finalSlug = slug ? slugify(slug) : slugify(title);
  if (!finalSlug) throw new HttpError(400, "Invalid slug");

  const created = await repo.createSeries({
    tenantId: req.tenant.id,
    title,
    slug: finalSlug,
    description,
    coverImageUrl,
    status,
    createdBy: req.auth?.userId,
  });

  await audit(req, {
    action: "podcast.series.create",
    entityType: "podcast_series",
    entityId: created.id,
  });

  res.status(201).json({ ok: true, data: created });
});

const listSeries = asyncHandler(async (req, res) => {
  const rows = await repo.listSeries({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

const getSeries = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const series = await repo.getSeries({ tenantId: req.tenant.id, id });
  if (!series) throw new HttpError(404, "Series not found");
  res.json({ ok: true, data: series });
});

const updateSeries = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const patch = {
    title: req.body?.title,
    description: req.body?.description,
    coverImageUrl: req.body?.coverImageUrl,
    status: req.body?.status,
  };

  const updated = await repo.updateSeries({ tenantId: req.tenant.id, id, patch });
  if (!updated) throw new HttpError(404, "Series not found");

  await audit(req, {
    action: "podcast.series.update",
    entityType: "podcast_series",
    entityId: id,
  });

  res.json({ ok: true, data: updated });
});

const deleteSeries = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleted = await repo.deleteSeries({ tenantId: req.tenant.id, id });
  if (!deleted) throw new HttpError(404, "Series not found");
  
  await audit(req, {
    action: "podcast.series.delete",
    entityType: "podcast_series",
    entityId: id,
  });
  
  res.json({ ok: true, data: deleted });
});

// ADMIN: Episode endpoints
const createEpisode = asyncHandler(async (req, res) => {
  const { title, slug, description, showNotes, seriesId, audioUrl, audioDurationSeconds, fileSizeBytes, 
          coverImageUrl, episodeNumber, publishedAt, status, transcriptUrl, transcriptText, meta } = req.body || {};
  
  if (!title) throw new HttpError(400, "title required");
  if (!audioUrl) throw new HttpError(400, "audioUrl required");

  const finalSlug = slug ? slugify(slug) : slugify(title);
  if (!finalSlug) throw new HttpError(400, "Invalid slug");

  const created = await repo.createEpisode({
    tenantId: req.tenant.id,
    seriesId: seriesId || null,
    title,
    slug: finalSlug,
    description,
    showNotes,
    audioUrl,
    audioDurationSeconds,
    fileSizeBytes,
    coverImageUrl,
    episodeNumber,
    publishedAt: publishedAt || null,
    status: status || "draft",
    transcriptUrl,
    transcriptText,
    meta: meta || {},
    createdBy: req.auth?.userId,
  });

  await audit(req, {
    action: "podcast.episode.create",
    entityType: "podcast_episode",
    entityId: created.id,
  });

  res.status(201).json({ ok: true, data: created });
});

const listEpisodes = asyncHandler(async (req, res) => {
  const { seriesId, status } = req.query || {};
  const rows = await repo.listEpisodes({ 
    tenantId: req.tenant.id, 
    seriesId: seriesId || null,
    status: status || null
  });
  res.json({ ok: true, data: rows });
});

const getEpisode = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const episode = await repo.getEpisodeWithStats({ tenantId: req.tenant.id, id });
  if (!episode) throw new HttpError(404, "Episode not found");
  res.json({ ok: true, data: episode });
});

const updateEpisode = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const patch = {
    title: req.body?.title,
    description: req.body?.description,
    showNotes: req.body?.showNotes,
    seriesId: req.body?.seriesId,
    audioUrl: req.body?.audioUrl,
    audioDurationSeconds: req.body?.audioDurationSeconds,
    fileSizeBytes: req.body?.fileSizeBytes,
    coverImageUrl: req.body?.coverImageUrl,
    episodeNumber: req.body?.episodeNumber,
    publishedAt: req.body?.publishedAt,
    status: req.body?.status,
    transcriptUrl: req.body?.transcriptUrl,
    transcriptText: req.body?.transcriptText,
    meta: req.body?.meta,
  };

  const updated = await repo.updateEpisode({ tenantId: req.tenant.id, id, patch });
  if (!updated) throw new HttpError(404, "Episode not found");

  await audit(req, {
    action: "podcast.episode.update",
    entityType: "podcast_episode",
    entityId: id,
  });

  res.json({ ok: true, data: updated });
});

const deleteEpisode = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleted = await repo.deleteEpisode({ tenantId: req.tenant.id, id });
  if (!deleted) throw new HttpError(404, "Episode not found");
  
  await audit(req, {
    action: "podcast.episode.delete",
    entityType: "podcast_episode",
    entityId: id,
  });
  
  res.json({ ok: true, data: deleted });
});

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
  updateEpisode,
  deleteEpisode,
};
