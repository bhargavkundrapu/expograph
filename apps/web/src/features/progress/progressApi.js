import { apiFetch } from "../../services/api";

function unwrap(res) {
  if (res && typeof res === "object" && "ok" in res) return res.data;
  return res;
}

export async function startLesson({ token, lessonId, signal }) {
  const res = await apiFetch(`/api/v1/lms/lessons/${lessonId}/start`, {
    method: "POST",
    token,
    signal,
  });
  return unwrap(res);
}

export async function updateLessonProgress({ token, lessonId, watchSecondsDelta, lastPositionSeconds, signal }) {
  const res = await apiFetch(`/api/v1/lms/lessons/${lessonId}/progress`, {
    method: "POST",
    token,
    signal,
    body: { watchSecondsDelta, lastPositionSeconds },
  });
  return unwrap(res);
}

export async function completeLesson({ token, lessonId, signal }) {
  const res = await apiFetch(`/api/v1/lms/lessons/${lessonId}/complete`, {
    method: "POST",
    token,
    signal,
  });
  return unwrap(res);
}

export async function getProgressSummary({ token, signal }) {
  const res = await apiFetch(`/api/v1/lms/progress/summary`, { token, signal });
  return unwrap(res);
}