import { useState } from "react";
import { Header } from "../../Components/ui/header-2";
import { TubesBackground } from "../../Components/ui/neon-flow";
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageCircle, FiClock, FiCheckCircle } from "react-icons/fi";
import "../../styles/academy-tokens.css";

const WA_NUMBER = "919014110638";

const CONTACT_INFO = [
  {
    icon: FiMail,
    label: "Email",
    value: "kundrapu.bhargav@expograph.in",
    href: "mailto:kundrapu.bhargav@expograph.in",
    color: "from-violet-400 to-fuchsia-400",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+91 90141 10638",
    href: "tel:+919014110638",
    color: "from-cyan-400 to-blue-400",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Hyderabad, India",
    href: null,
    color: "from-amber-400 to-orange-400",
  },
  {
    icon: FiClock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
    color: "from-emerald-400 to-teal-400",
  },
];

const TOPICS = [
  "Course inquiry",
  "Payment issue",
  "Technical support",
  "Partnership",
  "Feedback",
  "Other",
];

function buildWhatsAppURL({ name, email, topic, message }) {
  const lines = [
    `*Name:* ${name}`,
    `*Email:* ${email}`,
    `*Topic:* ${topic}`,
    "",
    message,
  ];
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canSubmit = form.name.trim() && form.email.trim() && form.topic && form.message.trim().length >= 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    window.open(buildWhatsAppURL(form), "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen relative w-full" style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)", backgroundColor: "black", color: "var(--text-secondary)" }}>
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 px-4" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-white/[0.06] text-white/60 border border-white/[0.08] mb-6">
            Get in touch
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              connect
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/50 max-w-xl mx-auto">
            Have a question, feedback, or want to partner with us? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="px-4 pb-12 sm:pb-16" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {CONTACT_INFO.map((item) => (
            <a
              key={item.label}
              href={item.href || undefined}
              className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 sm:p-5 text-center transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.12] ${item.href ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className={`mx-auto mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-white/40 mb-1">{item.label}</p>
              <p className="text-xs sm:text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {item.value}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Form section */}
      <section className="px-4 pb-20 sm:pb-28" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8 md:gap-12">
          {/* Left */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              We&apos;re here to{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">help</span>
            </h2>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-6">
              Whether you need guidance picking the right course, facing a payment issue, or want to collaborate — drop us a message and we&apos;ll get back to you quickly.
            </p>
            <div className="space-y-4">
              {[
                { icon: FiMessageCircle, text: "Friendly and fast support" },
                { icon: FiCheckCircle, text: "Replies within 24 hours" },
                { icon: FiSend, text: "Direct access to our team" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06]">
                    <item.icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-sm text-white/60">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-8 sm:p-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
                  <FiCheckCircle className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message sent via WhatsApp!</h3>
                <p className="text-sm text-white/50 mb-6">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", topic: "", message: "" }); }}
                  className="px-5 py-2 text-sm font-medium rounded-lg bg-white/[0.06] text-white/70 hover:bg-white/[0.1] hover:text-white transition-all border border-white/[0.08]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1.5">Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1.5">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1.5">Topic</label>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all appearance-none"
                  >
                    <option value="" className="bg-neutral-900 text-white/40">Select a topic</option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t} className="bg-neutral-900 text-white">{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <FiSend className="w-4 h-4" />
                  Send via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full min-h-[560px] sm:min-h-[70vh] border-t border-black">
        <TubesBackground className="min-h-[560px] sm:min-h-[70vh] bg-[#0a0a0a]" enableClickInteraction={true}>
          <div className="flex flex-col items-center justify-center w-full min-h-[560px] sm:min-h-[70vh] gap-6 text-center px-4">
            <div className="space-y-2 pointer-events-auto cursor-default select-none">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
                ExpoGraph flow
              </h2>
            </div>
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 text-white/50 pointer-events-none">
              <span className="text-xs uppercase tracking-widest">Move the cursor around to interact and Click to randomize.</span>
              <span className="text-xs text-white/40">&copy; 2024 ExpoGraph Academy</span>
            </div>
          </div>
        </TubesBackground>
      </footer>
    </div>
  );
}
