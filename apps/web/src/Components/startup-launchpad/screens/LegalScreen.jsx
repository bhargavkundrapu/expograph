import { useNavigate } from "react-router-dom";
import { useLaunchPadOptional } from "../LaunchPadContext";
import {
  REGISTRATION_SUPPORT_OFFER,
  STARTUP_REGISTRATION_PARTNER_NAME,
  STARTUP_REGISTRATION_PARTNER_URL,
} from "../launchpadConfig";

const blocks = [
  {
    title: "Do I need registration now?",
    body: "If you do not have repeatable clarity on problem, customer, and model, wait. Registration is a milestone-not a starting gun.",
  },
  {
    title: "Compare common startup structures",
    body: "Sole prop, partnership, Pvt Ltd, LLP-each fits different risk, funding, and compliance profiles. Decide with a checklist, not vibes.",
  },
  {
    title: "Legal basics checklist",
    body: "Bank account, PAN, agreements, IP assignment-capture only what matters for your stage.",
  },
  {
    title: "Document prep checklist",
    body: "Founder IDs, address proof, NOB, DSC-keep a small folder before you engage a partner.",
  },
  {
    title: "Registration support handoff",
    body: "When you are ready, route to a guided partner for filing-not a wall of statutes.",
  },
];

export default function LegalScreen() {
  const navigate = useNavigate();
  const lp = useLaunchPadOptional();
  const progressPercent = lp?.progressPercent ?? 0;
  const lockedHint = progressPercent < 25;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Legal setup & registration</h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Decision-first guidance. Best used after your idea, validation, and business model are clearer.
        </p>
      </div>

      {lockedHint && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          You&apos;ll get better legal guidance after your idea, validation, and business model are clearer. You can still browse basics anytime.
        </div>
      )}

      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 sm:p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">Registration support (LMS)</p>
        <p className="mt-2 text-lg font-bold text-emerald-950 tabular-nums">
          {REGISTRATION_SUPPORT_OFFER.price}{" "}
          <span className="text-sm font-semibold text-emerald-800"></span>
        </p>
        <p className="mt-2 text-sm text-emerald-950/90 leading-relaxed">{REGISTRATION_SUPPORT_OFFER.blurb}</p>
        <p className="mt-3 text-xs font-medium text-emerald-900">Included when you choose this registration package</p>
        <ul className="mt-2 space-y-1.5 text-sm text-emerald-950">
          {REGISTRATION_SUPPORT_OFFER.includes.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-emerald-600" aria-hidden>
                •
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-emerald-900/85">
          To register your startup with our partner ({STARTUP_REGISTRATION_PARTNER_NAME}), use the button above or &quot;Register startup&quot; at the bottom of this page. For LMS billing or account questions, use Support in the student portal.
        </p>
        <a
          href={STARTUP_REGISTRATION_PARTNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition-colors"
        >
          Register your startup - {STARTUP_REGISTRATION_PARTNER_NAME}
        </a>
      </div>

      <div className="space-y-3">
        {blocks.map((b) => (
          <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
            <p className="font-semibold text-slate-900">{b.title}</p>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{b.body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-3 shadow-sm">
        <p className="font-semibold text-slate-900">FAQ</p>
        <details className="group border-b border-slate-200 pb-3">
          <summary className="cursor-pointer text-sm text-slate-800">When should I incorporate?</summary>
          <p className="mt-2 text-sm text-slate-600">When liability, contracts, or revenue make informal structure risky-usually after validation signals.</p>
        </details>
        <details className="group">
          <summary className="cursor-pointer text-sm text-slate-800">Is this legal advice?</summary>
          <p className="mt-2 text-sm text-slate-600">No-this is structured orientation. Consult a qualified professional for your jurisdiction.</p>
        </details>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <a
          href={STARTUP_REGISTRATION_PARTNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[48px] flex-1 inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 shadow-md"
        >
          Register startup
        </a>
        <button
          type="button"
          onClick={() => navigate("/lms/startup-launchpad/dashboard")}
          className="min-h-[48px] flex-1 rounded-xl border border-slate-300 bg-white text-slate-800 shadow-sm"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
