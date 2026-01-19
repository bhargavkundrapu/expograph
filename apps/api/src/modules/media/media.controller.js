// apps/api/src/modules/media/media.controller.js
// path: apps/api/src/modules/media/media.controller.js
const deviceSvc = require("../auth/deviceSessions.service");

const mediaRepo = require("./media.repo");
const mediaService = require("./media.service");

async function playbackToken(req, res, next) {
  console.log("MEDIA_DEBUG_IN", {
  userId_from_user: req.user?.id,
  userId_from_auth: req.auth?.userId || req.auth?.sub,
  tenantId: req.tenant?.id,
  lessonId: req.body?.lessonId,
});


  try {
    const { lessonId } = req.body || {};
    if (!lessonId) {
      return res.status(400).json({ message: "lessonId is required" });
    }

    // These should come from your auth + tenant middleware
    const userId = req.user?.id || req.auth?.userId || req.auth?.sub;
    const tenantId = req.tenant?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!tenantId) return res.status(400).json({ message: "Tenant not resolved" });

    // 1) fetch lesson → video uid (check happens here)
    const videoRow = await mediaRepo.getVideoByLessonId({ tenantId, lessonId });
    if (!videoRow) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // 2) only published lessons (student-first rules)
    if (videoRow.lessonStatus !== "published") {
      return res.status(403).json({ message: "Lesson not published" });
    }

    // 3) For published lessons, allow access without membership check
    // Students can access published content directly
    // If you need stricter access control, check membership here:
    // const active = await mediaRepo.isMemberActive({ tenantId, userId });
    // if (!active) {
    //   return res.status(403).json({ message: "Subscription required" });
    // }

    console.log("MEDIA_DEBUG_IN", {
      userId: req.user?.id,
      tenantId: req.tenant?.id,
      permissionCheck: req.requiredPermission,
      lessonId: req.body?.lessonId,
      lessonStatus: videoRow.lessonStatus,
    });

    // 4) if video not linked or not ready
    if (!videoRow.uid) {
      return res.status(409).json({ message: "Video not attached to lesson" });
    }
    if (videoRow.videoStatus && videoRow.videoStatus !== "ready") {
      return res.status(409).json({ message: "Video processing" });
    }

    // 5) create token via Cloudflare
    const token = await mediaService.createCloudflarePlaybackToken({
      videoUid: videoRow.uid,
    });

    // 6) build URLs
    const urls = mediaService.buildPlaybackUrls({ token });


    const enforce = String(process.env.ENFORCE_DEVICE_SESSIONS || "false") === "true";
const deviceId = req.header("x-device-id") || null;

if (enforce) {
  if (!deviceId) return res.status(400).json({ message: "x-device-id header required" });

  const ok = await deviceSvc.isDeviceActive({ tenantId, userId, deviceId });
  if (!ok) return res.status(403).json({ message: "Device not allowed. Please login again." });
}


    return res.json({
      lessonId,
      provider: "cloudflare_stream",
      ...urls,
      // default token expiry is 1 hour when you don't pass a body
      expiresInSeconds: 3600,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  playbackToken,
};
