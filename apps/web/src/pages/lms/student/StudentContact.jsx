import { useState } from "react";
import { FiMail, FiPhone, FiSend, FiCheckCircle, FiMessageCircle, FiHelpCircle } from "react-icons/fi";

const TOPICS = [
  "Course help",
  "Payment issue",
  "Account / Login",
  "Technical problem",
  "Feature request",
  "Other",
];

export default function StudentContact() {
  const [form, setForm] = useState({ topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1000);
  };

  const canSubmit = form.topic && form.message.trim().length >= 10;

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-md text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
            <FiCheckCircle className="w-7 h-7 text-emerald-400" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-1">Message sent!</h2>
          <p className="text-sm text-slate-400 mb-5">We&apos;ll get back to you within 24 hours.</p>
          <button
            onClick={() => { setSubmitted(false); setForm({ topic: "", message: "" }); }}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <FiHelpCircle className="w-5 h-5 text-violet-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-white">Contact Support</h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">Need help? Reach out to us and we&apos;ll respond within 24 hours.</p>
      </div>

      {/* Quick contact cards */}
      <div className="grid grid-cols-2 gap-3 mb-6 sm:mb-8">
        <a
          href="mailto:support@expograph.in"
          className="flex items-center gap-3 rounded-xl bg-slate-800/60 border border-slate-700/50 p-3.5 sm:p-4 hover:bg-slate-800 hover:border-slate-600/50 transition-all group"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15">
            <FiMail className="w-4 h-4 text-violet-400" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-500 uppercase tracking-wider">Email</p>
            <p className="text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors truncate">support@expograph.in</p>
          </div>
        </a>
        <a
          href="tel:+918309984473"
          className="flex items-center gap-3 rounded-xl bg-slate-800/60 border border-slate-700/50 p-3.5 sm:p-4 hover:bg-slate-800 hover:border-slate-600/50 transition-all group"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15">
            <FiPhone className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-500 uppercase tracking-wider">Phone</p>
            <p className="text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors truncate">+91 83099 84473</p>
          </div>
        </a>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <FiMessageCircle className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-300">Send us a message</span>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5">Topic</label>
          <select
            name="topic"
            value={form.topic}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-600/50 bg-slate-900/60 px-3.5 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all appearance-none"
          >
            <option value="" className="bg-slate-900 text-slate-500">Select a topic</option>
            {TOPICS.map((t) => (
              <option key={t} value={t} className="bg-slate-900 text-white">{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your issue or question..."
            className="w-full rounded-lg border border-slate-600/50 bg-slate-900/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
          />
          {form.message.length > 0 && form.message.trim().length < 10 && (
            <p className="text-xs text-amber-400/70 mt-1">Please write at least 10 characters</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit || sending}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-500 px-5 py-2.5 text-sm font-medium text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {sending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <FiSend className="w-4 h-4" />
              Send message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
