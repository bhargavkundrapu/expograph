/**
 * Alternate-language MP4 sources for specific Vibe Coding lessons (no DB change).
 * Module: Setup & Accounts - Lesson: Setup Fullstack environment
 */

const VIBE_SETUP_FULLSTACK_VIDEOS = {
  english:
    "https://res.cloudinary.com/da2wrgabu/video/upload/v1776000002/3%E6%9C%8827%E6%97%A5_1_ry2yda.mp4",
  telugu:
    "https://res.cloudinary.com/da2wrgabu/video/upload/v1776007472/3%E6%9C%8827%E6%97%A5_xbldx9.mp4",
};

export const VIBE_SETUP_FULLSTACK_VIDEO_LANG_KEY = "expograph_vc_setup_fullstack_video_lang";

function normalizeSlug(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/_/g, "-")
    .trim();
}

/**
 * @returns {{ english: string, telugu: string } | null}
 */
export function getVibeSetupFullstackAlternateVideos({
  courseSlug,
  moduleSlug,
  lessonSlug,
  moduleTitle,
  lessonTitle,
}) {
  const c = normalizeSlug(courseSlug);
  const isVibeCourse = c.includes("vibe") && (c.includes("cod") || c.includes("coad"));
  if (!isVibeCourse) return null;

  const mSlug = normalizeSlug(moduleSlug);
  const mTit = String(moduleTitle || "").toLowerCase();
  const setupModule =
    (mSlug.includes("setup") && (mSlug.includes("account") || mSlug.includes("accounts"))) ||
    (mTit.includes("setup") && mTit.includes("account"));

  const lSlug = normalizeSlug(lessonSlug);
  const lTit = String(lessonTitle || "").toLowerCase();
  const fullstackLesson =
    (lSlug.includes("fullstack") && (lSlug.includes("environment") || lSlug.includes("env"))) ||
    (lTit.includes("fullstack") && (lTit.includes("environment") || lTit.includes("env")));

  if (!setupModule || !fullstackLesson) return null;
  return VIBE_SETUP_FULLSTACK_VIDEOS;
}
