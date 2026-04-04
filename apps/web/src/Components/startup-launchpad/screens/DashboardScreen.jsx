import { useNavigate } from "react-router-dom";
import { useLaunchPad } from "../LaunchPadContext";
import { STAGE_SLUGS, STAGES } from "../launchpadConfig";
import { FounderProfileCard, JourneyRail, LegalReadinessCard, MilestoneStrip, ReadinessScoreCard } from "../LaunchPadBlocks";

export default function DashboardScreen() {
  const navigate = useNavigate();
  const lp = useLaunchPad();
  const {
    progressPercent,
    readinessResult,
    currentStageMeta,
    getStageState,
    setActiveSlug,
    completedSlugs,
    startupType,
    founderType,
    teamSize,
    legalStatus,
    market,
    businessModel,
    revenueStatus,
    registrationStatus,
  } = lp;

  const nextLine = currentStageMeta
    ? `Next step: focus on ${currentStageMeta.shortLabel} — ${currentStageMeta.subtitle}`
    : "Next step: define your idea in one line.";

  const stages = STAGE_SLUGS.map((slug) => ({ ...STAGES[slug], slug }));

  const legalHighlight = progressPercent >= 45 || STAGE_SLUGS.indexOf(lp.activeSlug || "idea") >= 8;

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-5 sm:p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Welcome back, founder</h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          You are {progressPercent}% through your startup path. {nextLine}
        </p>
        <div className="mt-5">
          <MilestoneStrip completed={completedSlugs.length} total={STAGE_SLUGS.length} />
        </div>
        <button
          type="button"
          onClick={() => navigate(`/lms/startup-launchpad/stage/${lp.activeSlug || "idea"}`)}
          className="mt-6 min-h-[48px] w-full sm:w-auto px-6 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:brightness-105 shadow-md"
        >
          Continue Next Step
        </button>
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Journey path</p>
        <JourneyRail
          stages={stages}
          getState={getStageState}
          onSelect={(slug) => {
            setActiveSlug(slug);
            navigate(`/lms/startup-launchpad/stage/${slug}`);
          }}
          compact
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-violet-200 bg-violet-50/80 p-4 sm:p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-800">Current focus</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{currentStageMeta?.title || "Define your startup idea"}</p>
          <p className="mt-1 text-sm text-slate-600">{currentStageMeta?.purpose}</p>
          <p className="mt-4 text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-xl p-3">{currentStageMeta?.warning}</p>
        </div>

        <FounderProfileCard
          profile={{
            stage: readinessResult?.stageLabel || currentStageMeta?.shortLabel || "—",
            startupType: startupType || "—",
            team: teamSize || founderType || "—",
            market: market || "—",
            revenue: revenueStatus,
            registration: registrationStatus,
          }}
        />
      </div>

      {readinessResult && (
        <ReadinessScoreCard
          score={readinessResult.score}
          stageLabel={readinessResult.stageLabel}
          hint="Focus on real user conversations before building more."
        />
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="font-semibold text-slate-900">Founder Tools</p>
            <p className="text-sm text-slate-600">Use practical templates to move faster.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/lms/startup-launchpad/tools")}
            className="min-h-[44px] px-4 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-800 hover:bg-slate-50 shadow-sm"
          >
            Open Founder Tools
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
        <p className="font-semibold text-slate-900">Ask Founder Guide</p>
        <p className="text-sm text-slate-600 mt-1">Use the “Ask Founder Guide” button in the header for prompts like:</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>Should I register now?</li>
          <li>What should my MVP include?</li>
          <li>Should I start as SaaS or service?</li>
          <li>How do I price my first offer?</li>
        </ul>
      </section>

      <LegalReadinessCard
        highlighted={legalHighlight}
        onCompare={() => navigate("/lms/startup-launchpad/legal")}
      />

      <section>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Milestones</p>
        <p className="text-sm text-slate-600">
          Completed steps: {completedSlugs.length} / {STAGE_SLUGS.length}
        </p>
      </section>
    </div>
  );
}
