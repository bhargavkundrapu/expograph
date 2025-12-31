import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useAuth } from '../../app/providers/AuthProvider'

export default function AdminContent() {
  const { token } = useAuth()
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({ title: '', description: '', level: 'beginner' })
  const [msg, setMsg] = useState('')

  function load() {
    api.admin.listCourses(token)
      .then(r => setRows(r.data || []))
      .catch(e => setMsg(e.message))
  }

  useEffect(() => { load() }, [token])

  async function createCourse(e) {
    e.preventDefault()
    setMsg('')
    try {
      await api.admin.createCourse(token, form)
      setForm({ title: '', description: '', level: 'beginner' })
      load()
    } catch (e) {
      setMsg(e.message)
    }
  }

  async function publish(courseId, status) {
    setMsg('')
    try {
      await api.admin.setCourseStatus(token, courseId, status)
      load()
    } catch (e) {
      setMsg(e.message)
    }
  }

  return (
    <div className="p-6">
      <div className="text-2xl font-semibold">Content</div>
      <div className="text-white/60 text-sm">Create course → publish → students can see it.</div>

      <form onSubmit={createCourse} className="mt-5 p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
        <div className="font-semibold">Create course</div>
        <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <textarea className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <select className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15">Create</button>
      </form>

      {msg ? <div className="mt-4 text-sm text-white/80">{msg}</div> : null}

      <div className="mt-6 space-y-3">
        {rows.map(c => (
          <div key={c.id} className="p-5 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-white/60">Status: {c.status}</div>
              </div>
              <div className="flex gap-2">
                {c.status !== 'published' ? (
                  <button onClick={() => publish(c.id, 'published')} className="px-3 py-2 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 hover:bg-cyan-500/20 text-sm">Publish</button>
                ) : (
                  <button onClick={() => publish(c.id, 'draft')} className="px-3 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 text-sm">Unpublish</button>
                )}
              </div>
            </div>
          </div>
        ))}
        {rows.length === 0 ? <div className="text-white/60">No courses yet.</div> : null}
      </div>
    </div>
  )
}
