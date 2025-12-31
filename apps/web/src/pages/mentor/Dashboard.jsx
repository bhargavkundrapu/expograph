import { Link } from 'react-router-dom'

export default function MentorDashboard() {
  return (
    <div className="p-6">
      <div className="text-2xl font-semibold">Mentor Dashboard</div>
      <div className="text-white/60 mt-1">Review submissions and unblock students.</div>
      <Link to="/mentor/submissions" className="inline-block mt-4 px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15">Open Queue</Link>
    </div>
  )
}
