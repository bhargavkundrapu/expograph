import { useNavigate } from "react-router-dom";
import { LaunchPadHero, MilestoneStrip, ValuePill } from "../LaunchPadBlocks";
import { useLaunchPad } from "../LaunchPadContext";
import {
  STAGES,
  STAGE_SLUGS,
  REGISTRATION_SUPPORT_OFFER,
  STARTUP_REGISTRATION_PARTNER_NAME,
  STARTUP_REGISTRATION_PARTNER_URL,
} from "../launchpadConfig";

const highlights = [
  "Know what to do first",
  "Avoid common founder mistakes",
  "Build with clarity, not confusion",
];

const miniCards = [
  { title: "Idea to MVP", body: "Turn your idea into a buildable startup plan" },
  { title: "Startup Readiness Score", body: "See your current stage in a few minutes" },
  { title: "Legal + Registration Guidance", body: "Know when to formalize and where to get help" },
  { title: "Launch + Growth Path", body: "Move from first user to first revenue" },
];

export default function HomeScreen() {
  const navigate = useNavigate();
  const { progressPercent, started, readinessResult } = useLaunchPad();

  return (
    <div className="space-y-6 sm:space-y-8">
      <LaunchPadHero
        eyebrow="NEW FEATURE"
        title="Build your startup without getting lost"
        subtitle="Startup LaunchPad gives you a clear founder path from idea to MVP, launch, legal setup, and growth."
        primaryCta="Start Your Founder Path"
        secondaryCta="Check Startup Readiness"
        trustLine="Made for students, solo founders, and early startup teams"
        onPrimary={() => navigate("/lms/startup-launchpad/path")}
        onSecondary={() => navigate("/lms/startup-launchpad/readiness")}
      />

      {started && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <p className="text-sm text-slate-500">Returning founder</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            You are {progressPercent}% through your startup path
            {readinessResult ? ` · ${readinessResult.stageLabel}` : ""}
          </p>
          <div className="mt-4">
            <MilestoneStrip completed={Math.round((progressPercent / 100) * STAGE_SLUGS.length)} total={STAGE_SLUGS.length} />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => navigate("/lms/startup-launchpad/dashboard")}
              className="min-h-[48px] px-5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-md"
            >
              Continue Next Step
            </button>
            <button
              type="button"
              onClick={() => navigate("/lms/startup-launchpad/path")}
              className="min-h-[48px] px-5 rounded-xl border border-slate-300 bg-white text-slate-800 shadow-sm"
            >
              View My Startup Plan
            </button>
          </div>
        </section>
      )}

      <section>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Why LaunchPad</p>
        <div className="flex flex-wrap gap-2">
          {highlights.map((h) => (
            <ValuePill key={h}>{h}</ValuePill>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {miniCards.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 hover:border-violet-300 transition shadow-sm"
          >
            <p className="font-semibold text-slate-900 text-sm sm:text-base">{c.title}</p>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">Optional registration package (LMS)</p>
        <p className="mt-2 text-sm text-slate-800 leading-relaxed">
          When you are ready to incorporate, guided registration support is available at{" "}
          <span className="font-semibold tabular-nums text-emerald-900">{REGISTRATION_SUPPORT_OFFER.price}</span>—positioned as best for{" "}
          <span className="font-medium">{REGISTRATION_SUPPORT_OFFER.priceLabel.toLowerCase()}</span> (features in that bundle only; see Legal).
        </p>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => navigate("/lms/startup-launchpad/legal")}
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 underline-offset-2 hover:underline text-left"
          >
            View legal & registration details
          </button>
          <a
            href={STARTUP_REGISTRATION_PARTNER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-emerald-900 hover:text-emerald-950 underline-offset-2 hover:underline"
          >
            Register your startup ({STARTUP_REGISTRATION_PARTNER_NAME})
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Path preview</p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {STAGE_SLUGS.slice(0, 6).map((slug) => (
            <span key={slug} className="shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 shadow-sm">
              {STAGES[slug].shortLabel}
            </span>
          ))}
          <span className="shrink-0 px-3 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-xs text-violet-800">+6 more</span>
        </div>
        <p className="mt-4 text-sm text-slate-600">Legal setup appears at the right time—after clarity, not before.</p>
      </section>
    </div>
  );
}
