import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="text-2xl font-semibold">Admin Dashboard</div>
      <div className="text-white/60 mt-1">Publish content → students can see it instantly.</div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link to="/admin/content" className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15">Manage Content</Link>
        <Link to="/admin/leads" className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15">Leads</Link>
      </div>

      <div className="mt-10 p-5 rounded-3xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10">
        <div className="font-semibold">Ruthless reminder</div>
        <div className="text-white/70 text-sm mt-1">If you don’t publish content, students will stare at an empty page and bounce. Content is oxygen.</div>
      </div>
    </div>
  )
}
