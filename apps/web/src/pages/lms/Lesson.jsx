import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../services/api'
import { useAuth } from '../../app/providers/AuthProvider'

export default function Lesson() {
  const { token } = useAuth()
  const { courseSlug, moduleSlug, lessonSlug } = useParams()

  const [data, setData] = useState(null)
  const [player, setPlayer] = useState(null) // playback urls
  const [submitText, setSubmitText] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setMsg('')
    api.public.lessonBySlugs({ courseSlug, moduleSlug, lessonSlug })
      .then(r => setData(r.data))
      .catch(e => setMsg(e.message))
  }, [courseSlug, moduleSlug, lessonSlug])

  async function loadVideo() {
    setMsg('')
    try {
      const lessonId = data.lesson.lesson_id
      await api.lms.startLesson(token, lessonId)
      const r = await api.media.playbackToken(token, lessonId)
      setPlayer(r.data)
    } catch (e) {
      setMsg(e.message)
    }
  }

  async function markComplete() {
    setMsg('')
    try {
      const lessonId = data.lesson.lesson_id
      await api.lms.completeLesson(token, lessonId)
      setMsg('✅ Marked as complete')
    } catch (e) {
      setMsg(e.message)
    }
  }

  async function submitPractice(taskId) {
    setMsg('')
    try {
      await api.lms.submitTask(token, taskId, { contentType: 'code', content: submitText })
      setSubmitText('')
      setMsg('✅ Submitted for review')
    } catch (e) {
      setMsg(e.message)
    }
  }

  if (!data) return <div className="p-6 text-white/60">Loading…</div>

  const { lesson, resources, practice } = data

  return (
    <div className="p-6 max-w-4xl">
      <div className="text-2xl font-semibold">{lesson.lesson_title}</div>
      <div className="text-white/60 text-sm mt-1">{lesson.course_title} • {lesson.module_title}</div>
      {lesson.summary ? <div className="mt-3 text-white/75">{lesson.summary}</div> : null}

      <div className="mt-6 p-5 rounded-3xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between gap-3">
          <div className="font-semibold">Video</div>
          <div className="flex gap-2">
            <button onClick={loadVideo} className="px-3 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15">Load video</button>
            <button onClick={markComplete} className="px-3 py-2 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 hover:bg-cyan-500/20">Mark complete</button>
          </div>
        </div>

        {!player ? (
          <div className="mt-3 text-sm text-white/60">Click “Load video” to fetch secure playback token.</div>
        ) : (
          <div className="mt-4 space-y-2">
            {/* Cloudflare Stream style URL will be embeddable */}
            {player.embedUrl ? (
              <iframe
                title="video"
                src={player.embedUrl}
                className="w-full aspect-video rounded-2xl border border-white/10 bg-black"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
              />
            ) : (
              <div className="text-sm text-white/60">Video token created, but embedUrl not available for this lesson.</div>
            )}
            <div className="text-xs text-white/50">Token expires at: {player.expiresAt ? new Date(player.expiresAt).toLocaleString() : '—'}</div>
          </div>
        )}
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
          <div className="font-semibold">Cheat sheet / Resources</div>
          <div className="mt-3 space-y-2">
            {(resources || []).length === 0 ? (
              <div className="text-sm text-white/60">No resources added yet.</div>
            ) : (
              resources.map(r => (
                <div key={r.id} className="p-3 rounded-2xl bg-black/20 border border-white/10">
                  <div className="text-sm font-semibold">{r.title}</div>
                  {r.url ? <a className="text-xs text-cyan-300 hover:underline" href={r.url} target="_blank" rel="noreferrer">Open</a> : null}
                  {r.body ? <div className="mt-2 text-xs text-white/70 whitespace-pre-wrap">{r.body}</div> : null}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
          <div className="font-semibold">Practice</div>
          <div className="mt-3 space-y-3">
            {(practice || []).length === 0 ? (
              <div className="text-sm text-white/60">No practice tasks yet.</div>
            ) : (
              practice.map(p => (
                <div key={p.id} className="p-3 rounded-2xl bg-black/20 border border-white/10">
                  <div className="font-semibold text-sm">{p.title} <span className="text-xs text-white/50">({p.language})</span></div>
                  <div className="mt-2 text-xs text-white/70 whitespace-pre-wrap">{p.prompt}</div>

                  <textarea
                    className="mt-3 w-full px-3 py-2 rounded-2xl bg-black/30 border border-white/10 text-sm"
                    rows={5}
                    placeholder="Paste your solution / code here"
                    value={submitText}
                    onChange={e => setSubmitText(e.target.value)}
                  />

                  <button
                    onClick={() => submitPractice(p.id)}
                    className="mt-2 px-3 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 text-sm"
                  >
                    Submit for review
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {msg ? <div className="mt-4 text-sm text-white/80">{msg}</div> : null}
    </div>
  )
}
