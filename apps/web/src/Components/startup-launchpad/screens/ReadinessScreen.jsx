import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { READINESS_QUESTIONS } from "../launchpadConfig";
import { useLaunchPad } from "../LaunchPadContext";
import { ReadinessScoreCard } from "../LaunchPadBlocks";

export default function ReadinessScreen() {
  const navigate = useNavigate();
  const { setReadinessAnswers, readinessResult } = useLaunchPad();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [retake, setRetake] = useState(false);

  const showResult = readinessResult && !retake;
  const q = READINESS_QUESTIONS[step];

  const onSelect = (value) => {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    if (step < READINESS_QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setReadinessAnswers(next);
      setRetake(false);
      setStep(0);
    }
  };

  if (showResult && readinessResult) {
    const result = readinessResult;
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <ReadinessScoreCard score={result.score} stageLabel={result.stageLabel} hint={result.subheadline} />
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">{result.headline}</h2>
          <p className="mt-2 text-sm text-slate-600">{result.subheadline}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Next actions</p>
          <ul className="mt-2 space-y-2">
            {result.nextActions.map((a) => (
              <li key={a} className="text-sm text-slate-800 flex gap-2">
                <span className="text-violet-600">→</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => navigate("/lms/startup-launchpad/path")}
            className="min-h-[48px] flex-1 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-md"
          >
            Start Validation Path
          </button>
          <button
            type="button"
            onClick={() => navigate("/lms/startup-launchpad/dashboard")}
            className="min-h-[48px] flex-1 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium shadow-sm"
          >
            View My Startup Plan
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setRetake(true);
            setStep(0);
            setAnswers({});
          }}
          className="text-sm text-slate-500 hover:text-slate-800"
        >
          Edit Answers
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">See where your startup stands</h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          Answer a few simple questions and we&apos;ll show your current stage, next steps, and what to focus on first.
        </p>
      </div>
      <div className="flex gap-2">
        {READINESS_QUESTIONS.map((rq, i) => (
          <div
            key={rq.id}
            className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-violet-500" : "bg-slate-200"}`}
            aria-hidden
          />
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <p className="text-sm text-violet-700 font-semibold">
          Question {step + 1} of {READINESS_QUESTIONS.length}
        </p>
        <p className="mt-4 text-lg font-semibold text-slate-900 leading-snug">{q.prompt}</p>
        <div className="mt-6 space-y-2">
          {q.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className="w-full text-left min-h-[48px] px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-violet-400 hover:bg-violet-50 text-sm sm:text-base text-slate-900 transition shadow-sm"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="text-sm text-slate-500 hover:text-slate-900 disabled:opacity-30"
          disabled={step === 0}
        >
          Back
        </button>
        {readinessResult && retake && (
          <button type="button" onClick={() => setRetake(false)} className="text-sm text-slate-500 hover:text-slate-800">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
