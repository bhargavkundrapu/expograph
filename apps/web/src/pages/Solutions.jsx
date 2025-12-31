import { useState } from 'react'
import { api } from '../services/api'

export default function Solutions() {
  const [lead, setLead] = useState({ name: '', phone: '', email: '', meta: { need: '' } })
  const [msg, setMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    setMsg('')
    try {
      await api.public.createLead({ name: lead.name, phone: lead.phone, email: lead.email, source: 'solutions', meta: { need: lead.meta.need } })
      setMsg('Received. We will contact you soon.')
      setLead({ name: '', phone: '', email: '', meta: { need: '' } })
    } catch (e) {
      setMsg(e.message)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
            🛠️ ExpoGraph IT Solutions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mt-5 leading-tight">
            Build fast. <span className="text-purple-300">Ship clean.</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg">
            Web apps, dashboards, SaaS builds, and ongoing support. We work like engineers, not like "website shop".
          </p>

          <div className="mt-8 grid gap-3">
            {[['MVP in weeks', 'Start small, iterate'], ['SaaS-ready', 'Multi-tenant mindset'], ['Clean delivery', 'QA + deployment + monitoring'], ['Student-first DNA', 'We can staff projects with trained interns later']].map(([t, d]) => (
              <div key={t} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-semibold">{t}</div>
                <div className="text-white/60 text-sm mt-1">{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <div className="font-semibold text-lg">Tell us what you need</div>
          <div className="text-sm text-white/60 mt-1">We’ll reply with a scope + realistic estimate.</div>

          <form onSubmit={submit} className="mt-5 space-y-3">
            <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Name" value={lead.name} onChange={e => setLead({ ...lead, name: e.target.value })} />
            <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Phone" value={lead.phone} onChange={e => setLead({ ...lead, phone: e.target.value })} />
            <input className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="Email" value={lead.email} onChange={e => setLead({ ...lead, email: e.target.value })} />
            <textarea className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/10" placeholder="What are you building?" rows={4} value={lead.meta.need} onChange={e => setLead({ ...lead, meta: { need: e.target.value } })} />
            <button className="w-full px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10">
              Send
            </button>
            {msg ? <div className="text-sm text-white/70">{msg}</div> : null}
          </form>
        </div>
      </div>
    </div>
  )
}
