import { useState } from "react";
import { FiMail, FiPhone, FiSend, FiCheckCircle, FiMessageCircle, FiHelpCircle } from "react-icons/fi";

const WA_NUMBER = "919014110638";

const TOPICS = [
  "Course help",
  "Payment issue",
  "Account / Login",
  "Technical problem",
  "Feature request",
  "Other",
];

function buildWhatsAppURL({ topic, message }) {
  const lines = [`*Topic:* ${topic}`, "", message];
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function StudentContact() {
  const [form, setForm] = useState({ topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const canSubmit = form.topic && form.message.trim().length >= 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    window.open(buildWhatsAppURL(form), "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white" style={{ minHeight: "calc(100vh - 60px)" }}>
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="w-full max-w-md text-center rounded-2xl bg-emerald-50 border border-emerald-200 p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <FiCheckCircle className="w-7 h-7 text-emerald-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800 mb-1">Message sent!</h2>
            <p className="text-sm text-slate-500 mb-5">We&apos;ll get back to you within 24 hours.</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ topic: "", message: "" }); }}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-all border border-slate-200"
            >
              Send another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white" style={{ minHeight: "calc(100vh - 60px)" }}>
      <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2.5 mb-1">
            <FiHelpCircle className="w-5 h-5 text-violet-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Contact Support</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">Need help? Reach out to us and we&apos;ll respond within 24 hours.</p>
        </div>

        {/* Quick contact cards */}
        <div className="grid grid-cols-2 gap-3 mb-6 sm:mb-8">
          <a
            href="mailto:kundrapu.bhargav@expograph.in"
            className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 p-3.5 sm:p-4 hover:bg-slate-100 hover:border-slate-300 transition-all group"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100">
              <FiMail className="w-4 h-4 text-violet-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">Email</p>
              <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-900 transition-colors truncate">kundrapu.bhargav@expograph.in</p>
            </div>
          </a>
          <a
            href="tel:+919014110638"
            className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 p-3.5 sm:p-4 hover:bg-slate-100 hover:border-slate-300 transition-all group"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-100">
              <FiPhone className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">Phone</p>
              <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-900 transition-colors truncate">+91 90141 10638</p>
            </div>
          </a>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <FiMessageCircle className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Send us a message</span>
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Topic</label>
            <select
              name="topic"
              value={form.topic}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all appearance-none"
            >
              <option value="" className="text-slate-400">Select a topic</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>{t}</option>
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
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
            />
            {form.message.length > 0 && form.message.trim().length < 10 && (
              <p className="text-xs text-amber-600 mt-1">Please write at least 10 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-700 px-5 py-2.5 text-sm font-medium text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <FiSend className="w-4 h-4" />
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
