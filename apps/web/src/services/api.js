import { getDeviceId } from '../utils/deviceId'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

async function safeJson(res) {
  const text = await res.text()
  try { return text ? JSON.parse(text) : null } catch { return { ok: false, error: text || 'Invalid JSON' } }
}

export async function apiFetch(path, { method = 'GET', token, body, headers = {} } = {}) {
  const url = `${API_URL}${path}`
  const deviceId = getDeviceId()

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-device-id': deviceId,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const json = await safeJson(res)
  if (!res.ok || (json && json.ok === false)) {
    const msg = (json && (json.error || json.message)) || `Request failed (${res.status})`
    const err = new Error(msg)
    err.status = res.status
    err.payload = json
    throw err
  }

  return json
}

// ---- Convenience functions (keeps pages clean) ----
export const api = {
  health: () => apiFetch('/health'),

  auth: {
    login: ({ email, password }) => apiFetch('/api/v1/auth/login', { method: 'POST', body: { email, password } }),
    register: ({ name, email, phone, password }) => apiFetch('/api/v1/auth/register', { method: 'POST', body: { name, email, phone, password } }),
  },

  me: (token) => apiFetch('/api/v1/me', { token }),

  public: {
    listCourses: () => apiFetch('/api/v1/courses'),
    courseTreeBySlug: (courseSlug) => apiFetch(`/api/v1/courses/${courseSlug}`),
    lessonBySlugs: ({ courseSlug, moduleSlug, lessonSlug }) => apiFetch(`/api/v1/courses/${courseSlug}/modules/${moduleSlug}/lessons/${lessonSlug}`),
    listWorkshops: () => apiFetch('/api/v1/public/workshops'),
    createLead: (payload) => apiFetch('/api/v1/public/leads', { method: 'POST', body: payload }),
  },

  lms: {
    progressSummary: (token) => apiFetch('/api/v1/lms/progress/summary', { token }),
    startLesson: (token, lessonId) => apiFetch(`/api/v1/lms/lessons/${lessonId}/start`, { method: 'POST', token }),
    completeLesson: (token, lessonId) => apiFetch(`/api/v1/lms/lessons/${lessonId}/complete`, { method: 'POST', token }),
    submitTask: (token, taskId, { contentType = 'code', content }) => apiFetch(`/api/v1/lms/tasks/${taskId}/submissions`, { method: 'POST', token, body: { contentType, content } }),
    mySubmissions: (token) => apiFetch('/api/v1/lms/submissions/mine', { token }),
  },

  mentor: {
    queue: (token) => apiFetch('/api/v1/mentor/submissions/queue', { token }),
    review: (token, submissionId, { feedback, score, decision = 'in_review' }) => apiFetch(`/api/v1/mentor/submissions/${submissionId}/review`, { method: 'POST', token, body: { feedback, score, decision } }),
  },

  admin: {
    listCourses: (token) => apiFetch('/api/v1/admin/courses', { token }),
    createCourse: (token, payload) => apiFetch('/api/v1/admin/courses', { method: 'POST', token, body: payload }),
    setCourseStatus: (token, courseId, status) => apiFetch(`/api/v1/admin/courses/${courseId}/status`, { method: 'POST', token, body: { status } }),
    courseTree: (token, courseId) => apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token }),
  },

  media: {
    playbackToken: (token, lessonId) => apiFetch('/api/v1/media/playback-token', { method: 'POST', token, body: { lessonId } }),
  },
}
