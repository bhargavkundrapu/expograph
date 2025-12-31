import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../app/providers/AuthProvider'

const ROLE_REDIRECT = {
  Student: '/lms',
  Mentor: '/mentor',
  TenantAdmin: '/admin',
  SuperAdmin: '/admin',
}

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pickedRole, setPickedRole] = useState('Student')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const roles = useMemo(() => ['Student', 'Mentor', 'TenantAdmin', 'SuperAdmin'], [])

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      const data = await login({ email, password })
      const actualRole = data.role || pickedRole
      nav(ROLE_REDIRECT[actualRole] || '/lms')
    } catch (e) {
      setErr(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
        <div className="font-semibold text-xl">Login</div>
        <div className="text-sm text-white/60 mt-1">Choose your portal and login.</div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {roles.map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setPickedRole(r)}
              className={`px-3 py-2 rounded-2xl border text-sm ${pickedRole === r ? 'bg-white/10 border-white/20' : 'bg-black/20 border-white/10 hover:bg-white/5'}`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

          <button disabled={busy} className="w-full px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 disabled:opacity-60">
            {busy ? 'Logging in…' : 'Login'}
          </button>

          {err ? <div className="text-sm text-red-200">{err}</div> : null}

          <div className="text-sm text-white/60">
            New student? <Link className="text-cyan-300 hover:underline" to="/auth/register">Create account</Link>
          </div>
        </form>
      </div>

      <div className="mt-6 text-xs text-white/50">
        Tip: Admin/Mentor accounts are created by your team. Students can self-register.
      </div>
    </div>
  )
}
