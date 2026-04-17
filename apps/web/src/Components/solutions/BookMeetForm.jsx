import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SITE_CONTACT } from "../../config/siteContact";
import {
  SOLUTIONS_BUDGET_RANGES,
  SOLUTIONS_CONTACT_INTENTS,
  SOLUTIONS_TIMELINES,
} from "../../content/solutions/contact";

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please add your name";
  if (!values.businessName.trim()) errors.businessName = "Please add your business or team name";
  if (!values.phone.trim()) errors.phone = "Please add a phone number we can reach you on";
  if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Please add a valid email";
  if (!values.service) errors.service = "Choose the area closest to what you need — we can refine together";
  if (!values.requirement.trim() || values.requirement.trim().length < 12) {
    errors.requirement = "A few more words help us prepare — share what you are hoping for (at least 12 characters)";
  }
  return errors;
}

function buildWhatsappMessage(values) {
  const lines = [
    "ExpoGraph Solutions — Book a Meet",
    `Name: ${values.name}`,
    `Business: ${values.businessName}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    `Interest: ${values.service}`,
    `Budget: ${values.budgetRange || "Not sure yet"}`,
    `Timeline: ${values.timeline || "Flexible"}`,
    "",
    values.requirement,
  ];
  return `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

export default function BookMeetForm({ showProposalButton = true, redirectOnSuccess = false }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    service: "",
    budgetRange: "",
    timeline: "",
    requirement: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const mailtoHref = useMemo(() => {
    const subject = "ExpoGraph Solutions — Proposal request";
    const body = [
      `Name: ${values.name}`,
      `Business: ${values.businessName}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `Interest: ${values.service}`,
      `Budget: ${values.budgetRange || "Not sure yet"}`,
      `Timeline: ${values.timeline || "Flexible"}`,
      "",
      values.requirement,
    ].join("\n");
    return `mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [values]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    window.open(buildWhatsappMessage(values), "_blank", "noopener,noreferrer");
    setLoading(false);
    if (redirectOnSuccess) {
      setTimeout(() => navigate("/solutions/thank-you"), 500);
      return;
    }
    setSubmitted(true);
  };

  const update = (field) => (e) => setValues((prev) => ({ ...prev, [field]: e.target.value }));

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm sm:text-left">
        <h3 className="text-lg font-bold text-emerald-900">Thank you — we have received your request.</h3>
        <p className="mt-3 text-sm leading-relaxed text-emerald-800 sm:text-base">
          We opened WhatsApp with your details so our team can see your message. We will follow up shortly with clear next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm leading-relaxed text-slate-600">
        Take your time filling this in — there are no wrong answers. We read every submission with care.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={errors.name}>
          <input value={values.name} onChange={update("name")} autoComplete="name" className={inputClass} placeholder="How should we address you?" />
        </Field>
        <Field label="Company or team name" error={errors.businessName}>
          <input
            value={values.businessName}
            onChange={update("businessName")}
            className={inputClass}
            placeholder="Business, school, clinic, or startup"
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" error={errors.phone}>
          <input value={values.phone} onChange={update("phone")} type="tel" autoComplete="tel" className={inputClass} placeholder="Best number to reach you" />
        </Field>
        <Field label="Email" error={errors.email}>
          <input type="email" value={values.email} onChange={update("email")} autoComplete="email" className={inputClass} placeholder="you@example.com" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="What are you interested in?" error={errors.service}>
          <select value={values.service} onChange={update("service")} className={inputClass}>
            <option value="">Choose the closest match</option>
            {SOLUTIONS_CONTACT_INTENTS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget range (optional)">
          <select value={values.budgetRange} onChange={update("budgetRange")} className={inputClass}>
            <option value="">Prefer not to say</option>
            {SOLUTIONS_BUDGET_RANGES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="When are you hoping to start? (optional)">
        <select value={values.timeline} onChange={update("timeline")} className={inputClass}>
          <option value="">Flexible</option>
          {SOLUTIONS_TIMELINES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Tell us what you are looking for" error={errors.requirement}>
        <textarea
          value={values.requirement}
          onChange={update("requirement")}
          className={`${inputClass} min-h-[120px] resize-y`}
          placeholder="Goals, current tools, pain points — anything that helps us understand you better."
        />
      </Field>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60"
        >
          {loading ? "Sending…" : "Book a meet via WhatsApp"}
        </button>
        {showProposalButton ? (
          <a
            href={mailtoHref}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-violet-200 hover:bg-violet-50/50"
          >
            Request a proposal by email
          </a>
        ) : null}
      </div>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      {children}
      {error ? <span className="mt-1.5 block text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
}
