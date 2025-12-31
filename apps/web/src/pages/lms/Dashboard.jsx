import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'
import { useAuth } from '../../app/providers/AuthProvider'

export default function LmsDashboard() {
  const { token } = useAuth()
  const [summary, setSummary] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    api.lms.progressSummary(token)
      .then(r => setSummary(r.data))
      .catch(e => setErr(e.message))
  }, [token])

  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold">Student Dashboard</div>
          <div className="text-white/60 text-sm">Your progress + next steps.</div>
        </div>
        <Link to="/lms/courses" className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15">Browse Courses</Link>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-sm text-white/60">Lessons completed</div>
          <div className="text-3xl font-bold mt-2">{summary?.completedCount ?? '—'}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-sm text-white/60">Active streak</div>
          <div className="text-3xl font-bold mt-2">{summary?.streakDays ?? '—'}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-sm text-white/60">Last activity</div>
          <div className="text-base font-semibold mt-2">{summary?.lastActivityAt ? new Date(summary.lastActivityAt).toLocaleString() : '—'}</div>
        </div>
      </div>

      {err ? <div className="mt-4 text-sm text-red-200">{err}</div> : null}

      <div className="mt-10 p-5 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10">
        <div className="font-semibold">Tiny but important</div>
        <div className="text-white/70 text-sm mt-1">You don’t need motivation. You need a system. Just show up daily. 📈</div>
      </div>
    </div>
  )
}
