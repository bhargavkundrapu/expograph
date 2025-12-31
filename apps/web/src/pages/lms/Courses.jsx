import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [err, setErr] = useState('')

  useEffect(() => {
    api.public.listCourses()
      .then(r => setCourses(r.data || []))
      .catch(e => setErr(e.message))
  }, [])

  return (
    <div className="p-6">
      <div className="text-2xl font-semibold">Courses</div>
      <div className="text-white/60 text-sm">Only published courses show here.</div>

      {err ? <div className="mt-4 text-sm text-red-200">{err}</div> : null}

      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {courses.length === 0 ? (
          <div className="text-white/60">No published courses yet. (Admin has to publish first.)</div>
        ) : (
          courses.map(c => (
            <Link key={c.id} to={`/lms/courses/${c.slug}`} className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/7">
              <div className="font-semibold">{c.title}</div>
              <div className="text-xs text-white/60 mt-1">Level: {c.level || '—'}</div>
              <div className="text-sm text-white/70 mt-3 line-clamp-3">{c.description || 'No description yet.'}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
