import { useLaunchPad } from "../LaunchPadContext";
import {
  STAGES,
  STAGE_SLUGS,
  REGISTRATION_SUPPORT_OFFER,
  STARTUP_REGISTRATION_PARTNER_NAME,
  STARTUP_REGISTRATION_PARTNER_URL,
} from "../launchpadConfig";

export default function ProfileScreen() {
  const lp = useLaunchPad();
  const {
    startupName,
    startupType,
    founderType,
    teamSize,
    legalStatus,
    market,
    businessModel,
    revenueStatus,
    registrationStatus,
    validationNotes,
    mvpPlanNotes,
    updateProfile,
    activeSlug,
    completedSlugs,
  } = lp;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Startup profile</h1>
        <p className="mt-2 text-sm text-slate-600">Your founder context powers better prompts and progress tracking.</p>
        <p className="mt-3 text-xs sm:text-sm text-emerald-900/90 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2 leading-relaxed">
          Optional guided registration in LaunchPad: <span className="font-semibold tabular-nums">{REGISTRATION_SUPPORT_OFFER.price}</span> Details under Legal in LaunchPad. To register your startup with our partner,{" "}
          <a
            href={STARTUP_REGISTRATION_PARTNER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-emerald-950 underline underline-offset-2 hover:text-emerald-900"
          >
            {STARTUP_REGISTRATION_PARTNER_NAME}
          </a>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-1">
          <span className="text-xs text-slate-500">Startup name</span>
          <input
            value={startupName}
            onChange={(e) => updateProfile({ startupName: e.target.value })}
            className="w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-3 text-slate-900 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            placeholder="Working title"
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-500">Startup type</span>
          <input
            value={startupType}
            onChange={(e) => updateProfile({ startupType: e.target.value })}
            className="w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-3 text-slate-900 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            placeholder="SaaS, service, marketplace…"
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-500">Founder type</span>
          <select
            value={founderType}
            onChange={(e) => updateProfile({ founderType: e.target.value })}
            className="w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-3 text-slate-900 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          >
            <option value="solo">Solo</option>
            <option value="team">Team</option>
            <option value="student">Student</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-500">Team size</span>
          <select
            value={teamSize}
            onChange={(e) => updateProfile({ teamSize: e.target.value })}
            className="w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-3 text-slate-900 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          >
            <option value="solo">Just me</option>
            <option value="2-5">2–5</option>
            <option value="6+">6+</option>
          </select>
        </label>
        <label className="space-y-1 sm:col-span-2">
          <span className="text-xs text-slate-500">Market</span>
          <input
            value={market}
            onChange={(e) => updateProfile({ market: e.target.value })}
            className="w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-3 text-slate-900 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            placeholder="Geo + segment"
          />
        </label>
        <label className="space-y-1 sm:col-span-2">
          <span className="text-xs text-slate-500">Business model snapshot</span>
          <input
            value={businessModel}
            onChange={(e) => updateProfile({ businessModel: e.target.value })}
            className="w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-3 text-slate-900 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-500">Revenue</span>
          <select
            value={revenueStatus}
            onChange={(e) => updateProfile({ revenueStatus: e.target.value })}
            className="w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-3 text-slate-900 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          >
            <option value="None yet">None yet</option>
            <option value="First revenue">First revenue</option>
            <option value="Recurring">Recurring</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-500">Registration status</span>
          <select
            value={registrationStatus}
            onChange={(e) => updateProfile({ registrationStatus: e.target.value })}
            className="w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-3 text-slate-900 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          >
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </label>
        <label className="space-y-1 sm:col-span-2">
          <span className="text-xs text-slate-500">Legal status</span>
          <input
            value={legalStatus}
            onChange={(e) => updateProfile({ legalStatus: e.target.value })}
            className="w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-3 text-slate-900 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </label>
      </div>

      <label className="block space-y-1">
        <span className="text-xs text-slate-500">Validation notes</span>
        <textarea
          value={validationNotes}
          onChange={(e) => updateProfile({ validationNotes: e.target.value })}
          rows={4}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          placeholder="Patterns from conversations…"
        />
      </label>
      <label className="block space-y-1">
        <span className="text-xs text-slate-500">MVP plan</span>
        <textarea
          value={mvpPlanNotes}
          onChange={(e) => updateProfile({ mvpPlanNotes: e.target.value })}
          rows={4}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          placeholder="Must-haves, build approach…"
        />
      </label>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 shadow-sm">
        <p>
          Active stage: <span className="text-slate-900 font-medium">{activeSlug ? STAGES[activeSlug]?.shortLabel : "-"}</span>
        </p>
        <p className="mt-1">
          Completed steps: {completedSlugs.length} / {STAGE_SLUGS.length}
        </p>
      </div>
    </div>
  );
}
