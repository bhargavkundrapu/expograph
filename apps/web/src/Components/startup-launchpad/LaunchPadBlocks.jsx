import { motion } from "framer-motion";
import { FiAlertTriangle, FiCheck, FiChevronRight, FiLock } from "react-icons/fi";
import { REGISTRATION_SUPPORT_OFFER, STARTUP_REGISTRATION_PARTNER_NAME, STARTUP_REGISTRATION_PARTNER_URL } from "./launchpadConfig";

const cardBase =
  "rounded-2xl border border-slate-200/90 bg-white shadow-sm p-4 sm:p-5 transition-colors";

export function LaunchPadHero({
  eyebrow = "NEW FEATURE",
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  trustLine,
  onPrimary,
  onSecondary,
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-5 sm:p-8 md:p-10 shadow-sm">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl pointer-events-none" aria-hidden />
      <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-violet-700 mb-3">{eyebrow}</p>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight max-w-2xl">{title}</h1>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">{subtitle}</p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onPrimary}
          className="min-h-[48px] px-6 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:brightness-105 active:scale-[0.98] transition shadow-md shadow-violet-500/25"
        >
          {primaryCta}
        </button>
        <button
          type="button"
          onClick={onSecondary}
          className="min-h-[48px] px-6 rounded-2xl font-semibold border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition shadow-sm"
        >
          {secondaryCta}
        </button>
      </div>
      {trustLine && <p className="mt-5 text-xs sm:text-sm text-slate-500">{trustLine}</p>}
    </section>
  );
}

export function ReadinessScoreCard({ score, stageLabel, hint }) {
  return (
    <div className={cardBase}>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Your Startup Readiness Score</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">{score}</span>
        <span className="text-slate-400">/100</span>
      </div>
      <p className="mt-2 text-sm text-violet-700 font-semibold">{stageLabel}</p>
      {hint && <p className="mt-2 text-sm text-slate-600 leading-relaxed">{hint}</p>}
    </div>
  );
}

export function JourneyRail({ stages, getState, onSelect, compact }) {
  return (
    <div className={compact ? "flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-thin" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"}>
      {stages.map((s) => {
        const st = getState(s.slug);
        const locked = st === "locked";
        const done = st === "completed";
        const active = st === "active";
        return (
          <button
            key={s.slug}
            type="button"
            disabled={locked}
            onClick={() => !locked && onSelect(s.slug)}
            className={`${compact ? "snap-start min-w-[140px] sm:min-w-[160px]" : ""} text-left rounded-2xl border p-3 sm:p-4 transition min-h-[88px] ${
              locked
                ? "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                : active
                  ? "border-violet-400 bg-violet-50 ring-2 ring-violet-200/80 shadow-sm"
                  : "border-slate-200 bg-white hover:bg-slate-50/80 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Stage {s.order}</span>
              {locked ? <FiLock className="w-4 h-4 text-slate-400" /> : done ? <FiCheck className="w-4 h-4 text-emerald-600" /> : null}
            </div>
            <p className="mt-1 font-semibold text-slate-900 text-sm">{s.shortLabel}</p>
          </button>
        );
      })}
    </div>
  );
}

export function ActionCard({ title, description }) {
  return (
    <div className={`${cardBase} hover:border-violet-200`}>
      <p className="font-semibold text-slate-900 text-sm sm:text-base">{title}</p>
      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

export function WarningBlock({ children }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
      <FiAlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden />
      <p className="text-sm text-amber-900 leading-relaxed">{children}</p>
    </div>
  );
}

export function ExpectedOutputBlock({ items }) {
  return (
    <div className={cardBase}>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">What you&apos;ll finish with</p>
      <ul className="mt-3 space-y-2">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
            <FiCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FounderProfileCard({ profile }) {
  const rows = [
    ["Stage", profile.stage],
    ["Startup Type", profile.startupType || "-"],
    ["Team", profile.team],
    ["Market", profile.market || "-"],
    ["Revenue", profile.revenue],
    ["Registration Status", profile.registration],
  ];
  return (
    <div className={cardBase}>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Startup profile</p>
      <dl className="mt-4 space-y-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 text-sm">
            <dt className="text-slate-500">{k}</dt>
            <dd className="text-slate-900 text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function LegalReadinessCard({ highlighted, onCompare, showRegistrationPricing = true }) {
  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 shadow-sm ${
        highlighted ? "border-emerald-200 bg-emerald-50/80" : "border-slate-200 bg-slate-50/50"
      }`}
    >
      <p className="font-semibold text-slate-900">Ready to formalize your startup?</p>
      <p className="mt-1 text-sm text-slate-600">Get guided help with registration, structure selection, and setup support.</p>
      {showRegistrationPricing && (
        <div className="mt-4 rounded-xl border border-emerald-200/90 bg-white/90 p-3 sm:p-4">
          <p className="text-sm font-semibold text-emerald-900">
            {REGISTRATION_SUPPORT_OFFER.priceLabel}{" "}
            <span className="tabular-nums text-emerald-700">- {REGISTRATION_SUPPORT_OFFER.price}</span>
          </p>
          <p className="mt-1.5 text-xs sm:text-sm text-emerald-900/90 leading-relaxed">{REGISTRATION_SUPPORT_OFFER.blurb}</p>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-emerald-800/80">Included in this package only</p>
          <ul className="mt-1.5 space-y-1 text-xs sm:text-sm text-emerald-950">
            {REGISTRATION_SUPPORT_OFFER.includes.map((line) => (
              <li key={line} className="flex items-start gap-2">
                <FiCheck className="w-3.5 h-3.5 mt-0.5 text-emerald-600 shrink-0" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={onCompare}
          className="min-h-[44px] px-4 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-800 hover:bg-slate-50 shadow-sm"
        >
          Compare Structures
        </button>
        <a
          href={STARTUP_REGISTRATION_PARTNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
        >
          Get Registration Help
        </a>
        <a
          href={STARTUP_REGISTRATION_PARTNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50/80 px-4 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
        >
          Talk to Setup Partner
        </a>
      </div>
    </div>
  );
}

export function MilestoneStrip({ completed, total }) {
  const pct = total ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-slate-500">
        <span>Path progress</span>
        <span className="tabular-nums font-medium text-slate-700">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

export function CtaFooterBar({ onBack, onSave, onComplete, sticky }) {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center pt-4 border-t border-slate-200 ${
        sticky ? "sticky bottom-0 z-20 bg-white/95 backdrop-blur-md pb-safe pb-4 -mx-4 px-4 sm:mx-0 sm:px-0" : ""
      }`}
    >
      <button type="button" onClick={onBack} className="order-2 sm:order-1 min-h-[48px] px-4 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-sm">
        Back
      </button>
      <div className="order-1 sm:order-2 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <button type="button" onClick={onSave} className="min-h-[48px] px-5 rounded-xl border border-violet-300 bg-violet-50 text-violet-900 font-medium hover:bg-violet-100">
          Save and Continue
        </button>
        <button
          type="button"
          onClick={onComplete}
          className="min-h-[48px] px-5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:brightness-105 shadow-md"
        >
          Mark Step Complete
        </button>
      </div>
    </div>
  );
}

export function MobileBottomActionBar({ onBack, onContinue, onComplete, onGuide }) {
  return (
    <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-40 md:hidden px-3 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-lg flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/98 backdrop-blur-xl p-2 shadow-xl shadow-slate-900/10">
        <div className="flex gap-2">
          <button type="button" onClick={onBack} className="flex-1 min-h-[48px] rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm">
            Back
          </button>
          <button type="button" onClick={onGuide} className="flex-1 min-h-[48px] rounded-xl border border-violet-200 bg-violet-50 text-sm font-medium text-violet-800">
            Ask Guide
          </button>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onContinue} className="flex-1 min-h-[48px] rounded-xl bg-slate-100 text-sm font-semibold text-slate-900">
            Save & continue
          </button>
          <button type="button" onClick={onComplete} className="flex-1 min-h-[48px] rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-semibold text-white shadow-md">
            Complete Step
          </button>
        </div>
      </div>
    </div>
  );
}

export function ValuePill({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-700 shadow-sm">
      <FiChevronRight className="w-4 h-4 text-violet-600" />
      {children}
    </div>
  );
}
