import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useAuth } from '../../app/providers/AuthProvider'

export default function SubmissionsQueue() {
  const { token } = useAuth()
  const [rows, setRows] = useState([])
  const [err, setErr] = useState('')
  const [feedback, setFeedback] = useState('')

  function load() {
    api.mentor.queue(token)
      .then(r => setRows(r.data || []))
      .catch(e => setErr(e.message))
  }

  useEffect(() => { load() }, [token])

  async function review(submissionId, decision) {
    setErr('')
    try {
      await api.mentor.review(token, submissionId, { feedback: feedback || 'Reviewed', decision })
      setFeedback('')
      load()
    } catch (e) {
      setErr(e.message)
    }
  }

  return (
    <div className="p-6">
      <div className="text-2xl font-semibold">Submissions Queue</div>
      <div className="text-white/60 text-sm">Approve / request changes.</div>

      {err ? <div className="mt-4 text-sm text-red-200">{err}</div> : null}

      <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="text-sm font-semibold">Quick feedback (applies to whichever you review)</div>
        <textarea className="mt-2 w-full px-3 py-2 rounded-2xl bg-black/30 border border-white/10 text-sm" rows={3} value={feedback} onChange={e => setFeedback(e.target.value)} />
      </div>

      <div className="mt-6 space-y-3">
        {rows.length === 0 ? (
          <div className="text-white/60">No pending submissions.</div>
        ) : (
          rows.map(s => (
            <div key={s.id} className="p-4 rounded-3xl bg-white/5 border border-white/10">
              <div className="font-semibold">{s.task_title}</div>
              <div className="text-xs text-white/60">Student: {s.student_email || s.student_id}</div>
              <div className="mt-2 text-sm text-white/80 whitespace-pre-wrap">{s.content}</div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => review(s.id, 'approved')} className="px-3 py-2 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 hover:bg-cyan-500/20 text-sm">Approve</button>
                <button onClick={() => review(s.id, 'changes_requested')} className="px-3 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 text-sm">Request changes</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
