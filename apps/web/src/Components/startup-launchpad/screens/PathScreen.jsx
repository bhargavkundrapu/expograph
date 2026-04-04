import { useNavigate } from "react-router-dom";
import { STAGES, STAGE_SLUGS } from "../launchpadConfig";
import { useLaunchPad } from "../LaunchPadContext";
import { FiCheck, FiLock } from "react-icons/fi";

export default function PathScreen() {
  const navigate = useNavigate();
  const { getStageState, setActiveSlug } = useLaunchPad();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your founder path</h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
          Twelve stages in the right order. Complete each step to unlock the next—this is your startup operating system, not a content library.
        </p>
      </div>
      <ol className="space-y-3">
        {STAGE_SLUGS.map((slug, idx) => {
          const s = STAGES[slug];
          const st = getStageState(slug);
          const locked = st === "locked";
          const done = st === "completed";
          return (
            <li key={slug}>
              <button
                type="button"
                disabled={locked}
                onClick={() => {
                  if (locked) return;
                  setActiveSlug(slug);
                  navigate(`/lms/startup-launchpad/stage/${slug}`);
                }}
                className={`w-full text-left rounded-2xl border p-4 sm:p-5 flex gap-4 transition min-h-[72px] shadow-sm ${
                  locked
                    ? "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                    : "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50/50"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-sm font-bold text-slate-700">
                  {done ? <FiCheck className="w-5 h-5 text-emerald-600" /> : locked ? <FiLock className="w-4 h-4 text-slate-400" /> : idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Stage {s.order}</p>
                  <p className="font-semibold text-slate-900">{s.shortLabel}</p>
                  <p className="text-sm text-slate-600 mt-0.5 line-clamp-2">{s.subtitle}</p>
                  <p className="text-xs text-violet-700 mt-2 font-medium">
                    {locked ? "Complete the current step to unlock this stage." : done ? "Completed" : "Open stage workspace →"}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
