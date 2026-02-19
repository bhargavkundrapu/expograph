const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const { env } = require("../../config/env");
const { validateResumePdfBody } = require("./resume.validator");
const { runWithResumeLimiter } = require("./resume.limiter");
const { Readable } = require("stream");

async function postPdf(req, res, next) {
  const parsed = validateResumePdfBody(req.body);
  if (!parsed.success) {
    const msg = parsed.error.errors.map((e) => e.path.join(".") + ": " + e.message).join("; ");
    throw new HttpError(400, "Validation failed: " + msg);
  }
  const { templateId, data } = parsed.data;

  const serviceUrl = env.RESUME_PDF_SERVICE_URL.replace(/\/$/, "") + "/render";
  const timeoutMs = env.RESUME_PDF_TIMEOUT_MS;

  const run = await runWithResumeLimiter(async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(serviceUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, data }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!response.ok) {
        const text = await response.text();
        let detail = "Resume service error";
        try {
          const j = JSON.parse(text);
          detail = j.detail || j.error || detail;
        } catch (_) {}
        throw new HttpError(response.status === 429 ? 429 : 502, detail);
      }
      const body = Readable.fromWeb(response.body);
      return { body };
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === "AbortError") throw new HttpError(504, "Resume service timeout");
      const msg = (err.message || "").toLowerCase();
      const causeCode = err.cause?.code || err.cause?.errno || err.code;
      const isUnreachable = causeCode === "ECONNREFUSED" || causeCode === "ENOTFOUND" || msg.includes("econnrefused") || msg.includes("fetch failed") || msg.includes("network");
      if (isUnreachable) {
        throw new HttpError(503, "Resume PDF service is not running. From apps/api run: docker compose up -d resume-pdf (or: docker-compose up -d resume-pdf)");
      }
      throw new HttpError(502, err.message || "Resume PDF service error");
    }
  });

  if (run === "queue_full") {
    return res.status(429).json({
      ok: false,
      error: { message: "Server busy. Try again later." },
    });
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
  run.body.pipe(res);
  run.body.on("error", (err) => {
    if (!res.headersSent) res.status(500).json({ ok: false, error: { message: "Stream error" } });
  });
}

module.exports = { postPdf };
