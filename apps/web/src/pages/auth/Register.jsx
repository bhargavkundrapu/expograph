import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../app/providers/AuthProvider'

export default function Register() {
  const { register } = useAuth()
  const nav = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      await register(form)
      nav('/lms')
    } catch (e) {
      setErr(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
        <div className="font-semibold text-xl">Student signup</div>
        <div className="text-sm text-white/60 mt-1">Create your account and start learning.</div>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />

          <button disabled={busy} className="w-full px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 disabled:opacity-60">
            {busy ? 'Creating…' : 'Create account'}
          </button>

          {err ? <div className="text-sm text-red-200">{err}</div> : null}

          <div className="text-sm text-white/60">
            Already have account? <Link className="text-cyan-300 hover:underline" to="/auth/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
