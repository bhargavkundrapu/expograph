import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

export default function Academy() {
  const [workshops, setWorkshops] = useState([])
  const [lead, setLead] = useState({ name: '', phone: '', email: '' })
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.public.listWorkshops().then(r => setWorkshops(r.data || [])).catch(() => {})
  }, [])

  async function submitLead(e) {
    e.preventDefault()
    setMsg('')
    try {
      await api.public.createLead({ ...lead, source: 'academy' })
      setMsg('Done! We will ping you for the next workshop.')
      setLead({ name: '', phone: '', email: '' })
    } catch (e) {
      setMsg(e.message)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
            📈 ExpoGraph Academy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mt-5 leading-tight">
            Learn like a pro. <span className="text-cyan-300">Grow exponentially.</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg">
            Recorded sessions + cheat sheets + practice + real-world labs. Not "notes selling". We build your proof.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Link to="/auth/login" className="px-5 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 hover:bg-cyan-500/25">
              Login / Start
            </Link>
            <a href="#join" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10">
              Join Workshop
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 text-sm">
            {[['Student-first', 'You win → we win'], ['Micro-Internships', 'Step-by-step projects'], ['Real Client Lab', 'Actual delivery vibes'], ['LaunchPad', 'VS Code + templates']].map(([t, d]) => (
              <div key={t} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-semibold">{t}</div>
                <div className="text-white/60 mt-1">{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="join" className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <div className="font-semibold text-lg">Get workshop updates</div>
          <div className="text-sm text-white/60 mt-1">Leave phone/email. We’ll message you when a new batch opens.</div>

          <form onSubmit={submitLead} className="mt-5 space-y-3">
            <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Your name" value={lead.name} onChange={e => setLead({ ...lead, name: e.target.value })} />
            <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Phone" value={lead.phone} onChange={e => setLead({ ...lead, phone: e.target.value })} />
            <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Email (optional)" value={lead.email} onChange={e => setLead({ ...lead, email: e.target.value })} />
            <button className="w-full px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10">
              Notify me
            </button>
            {msg ? <div className="text-sm text-white/70">{msg}</div> : null}
          </form>

          <div className="mt-8">
            <div className="font-semibold">Upcoming workshops</div>
            <div className="text-sm text-white/60">(If empty, we haven’t published the next date yet.)</div>
            <div className="mt-3 space-y-2">
              {workshops.length === 0 ? (
                <div className="text-white/50 text-sm">No workshops listed yet.</div>
              ) : (
                workshops.map(w => (
                  <div key={w.id} className="p-3 rounded-2xl bg-black/20 border border-white/10">
                    <div className="font-semibold">{w.title}</div>
                    <div className="text-xs text-white/60">{new Date(w.starts_at).toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10">
        <div className="font-semibold">Cutie note 🤭</div>
        <div className="text-white/70 text-sm mt-1">
          Chinnoda, if you keep shipping like this, students won’t just learn… they’ll start flexing their GitHub like it’s a gold chain.
        </div>
      </div>
    </div>
  )
}
