import { useLayoutEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { STAGES, STAGE_SLUGS } from "../launchpadConfig";
import { useLaunchPad } from "../LaunchPadContext";
import {
  ActionCard,
  CtaFooterBar,
  ExpectedOutputBlock,
  LegalReadinessCard,
  MobileBottomActionBar,
  WarningBlock,
} from "../LaunchPadBlocks";

function scrollStudentMainToTop() {
  const main = document.querySelector("main.flex-1.overflow-y-auto");
  if (main) main.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export default function StageScreen() {
  const { stageSlug } = useParams();
  const navigate = useNavigate();
  const { openGuide } = useOutletContext() || {};
  const { getStageState, completeStage, setActiveSlug, stageNotes, saveStageNotes } = useLaunchPad();
  const [showComplete, setShowComplete] = useState(false);
  const [toast, setToast] = useState("");

  const slug = stageSlug && STAGES[stageSlug] ? stageSlug : null;
  const meta = slug ? STAGES[slug] : null;
  const st = slug ? getStageState(slug) : "locked";

  const notesValue = slug ? stageNotes[slug] ?? "" : "";

  useLayoutEffect(() => {
    scrollStudentMainToTop();
  }, [stageSlug]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3200);
  };

  const onSaveContinue = () => {
    if (!slug) return;
    const idx = STAGE_SLUGS.indexOf(slug);
    completeStage(slug);
    if (idx >= 0 && idx < STAGE_SLUGS.length - 1) {
      const next = STAGE_SLUGS[idx + 1];
      showToast("Progress saved. Opening the next stage.");
      navigate(`/lms/startup-launchpad/stage/${next}`);
    } else {
      showToast("Progress saved. You're at the final stage—back to your dashboard.");
      navigate("/lms/startup-launchpad/dashboard");
      requestAnimationFrame(() => scrollStudentMainToTop());
    }
  };

  if (!meta) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600">Stage not found.</p>
        <button type="button" onClick={() => navigate("/lms/startup-launchpad/path")} className="mt-4 text-violet-700 font-medium">
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (st === "locked") {
    return (
      <div className="max-w-lg mx-auto rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-slate-900 font-semibold">This stage unlocks after you complete the previous step.</p>
        <p className="mt-2 text-sm text-slate-600">Complete the current step to unlock this stage.</p>
        <button
          type="button"
          onClick={() => navigate("/lms/startup-launchpad/path")}
          className="mt-6 min-h-[48px] px-6 rounded-xl bg-violet-600 text-white font-semibold shadow-md"
        >
          View path
        </button>
      </div>
    );
  }

  const onComplete = () => {
    completeStage(slug);
    setShowComplete(false);
    showToast("Step completed. You're ready for the next stage.");
    const idx = STAGE_SLUGS.indexOf(slug);
    if (idx < STAGE_SLUGS.length - 1) {
      const next = STAGE_SLUGS[idx + 1];
      setActiveSlug(next);
      navigate(`/lms/startup-launchpad/stage/${next}`);
    } else {
      navigate("/lms/startup-launchpad/dashboard");
    }
  };

  return (
    <div className="pb-28 md:pb-8 max-w-3xl mx-auto space-y-5 sm:space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-700">Stage {meta.order}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">{meta.title}</h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">{meta.subtitle}</p>
        <p className="mt-3 text-sm text-slate-500">{meta.purpose}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {meta.actions.map((a) => (
          <ActionCard key={a.title} title={a.title} description={a.description} />
        ))}
      </div>

      <WarningBlock>{meta.warning}</WarningBlock>
      <ExpectedOutputBlock items={meta.expected} />

      {meta.legalPanel && (
        <LegalReadinessCard
          highlighted
          onCompare={() => navigate("/lms/startup-launchpad/legal")}
        />
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label htmlFor={`stage-notes-${slug}`} className="text-sm font-medium text-slate-900">
          Your notes for this stage
        </label>
        <p className="text-xs text-slate-500 mt-1">Saved on your device with your LaunchPad progress.</p>
        <textarea
          id={`stage-notes-${slug}`}
          value={notesValue}
          onChange={(e) => saveStageNotes(slug, e.target.value)}
          rows={5}
          className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
          placeholder="Capture decisions, open questions, or next experiments…"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
        <p className="text-sm font-medium text-slate-900">Founder Guide</p>
        <p className="text-sm text-slate-600 mt-1">Use “Ask Founder Guide” in the header for guided prompts—answers appear in the panel.</p>
      </div>

      <div className="hidden md:block">
        <CtaFooterBar
          onBack={() => navigate(-1)}
          onSave={onSaveContinue}
          onComplete={() => setShowComplete(true)}
          sticky={false}
        />
      </div>

      <div className="md:hidden">
        <MobileBottomActionBar
          onBack={() => navigate(-1)}
          onContinue={onSaveContinue}
          onComplete={() => setShowComplete(true)}
          onGuide={() => openGuide?.()}
        />
      </div>

      <AnimatePresence>
        {showComplete && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[70] bg-slate-900/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowComplete(false)}
              aria-label="Close"
            />
            <motion.div
              role="dialog"
              className="fixed left-4 right-4 bottom-24 md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md z-[71] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <p className="text-lg font-semibold text-slate-900">Mark step complete?</p>
              <p className="mt-2 text-sm text-slate-600">You can always revisit this stage from your path.</p>
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setShowComplete(false)} className="flex-1 min-h-[44px] rounded-xl border border-slate-300 bg-white text-slate-800 shadow-sm">
                  Back
                </button>
                <button type="button" onClick={onComplete} className="flex-1 min-h-[44px] rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-md">
                  Mark Step Complete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {toast && (
        <div
          className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white shadow-xl max-w-[min(100vw-2rem,28rem)] text-center"
          role="status"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
