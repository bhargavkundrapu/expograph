import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../../services/api'

export default function CourseTree() {
  const { courseSlug } = useParams()
  const [tree, setTree] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    api.public.courseTreeBySlug(courseSlug)
      .then(r => setTree(r.data))
      .catch(e => setErr(e.message))
  }, [courseSlug])

  const lessonsByModule = useMemo(() => {
    const map = new Map()
    for (const l of tree?.lessons || []) {
      const arr = map.get(l.module_id) || []
      arr.push(l)
      map.set(l.module_id, arr)
    }
    return map
  }, [tree])

  if (err) return <div className="p-6 text-red-200">{err}</div>
  if (!tree) return <div className="p-6 text-white/60">Loading…</div>

  return (
    <div className="p-6">
      <div className="text-2xl font-semibold">{tree.course.title}</div>
      <div className="text-white/70 mt-2">{tree.course.description || ''}</div>

      <div className="mt-6 space-y-4">
        {(tree.modules || []).map(m => (
          <div key={m.id} className="p-5 rounded-3xl bg-white/5 border border-white/10">
            <div className="font-semibold">{m.position}. {m.title}</div>
            <div className="mt-3 space-y-2">
              {(lessonsByModule.get(m.id) || []).map(l => (
                <Link
                  key={l.id}
                  to={`/lms/courses/${courseSlug}/modules/${m.slug}/lessons/${l.slug}`}
                  className="block p-3 rounded-2xl bg-black/20 border border-white/10 hover:bg-white/5"
                >
                  <div className="font-semibold text-sm">{l.position}. {l.title}</div>
                  <div className="text-xs text-white/60 mt-1">{l.summary || ''}</div>
                </Link>
              ))}
              {(lessonsByModule.get(m.id) || []).length === 0 ? (
                <div className="text-white/50 text-sm">No lessons published in this module yet.</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
