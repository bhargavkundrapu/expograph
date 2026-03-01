import { useState } from "react";
import {
  FiTarget, FiBriefcase, FiAlertTriangle, FiXCircle,
  FiAlertOctagon, FiCheckCircle, FiCheck, FiZap,
  FiEdit3, FiAward, FiList, FiBookOpen, FiHelpCircle, FiStar,
  FiCopy, FiChevronDown, FiChevronUp,
} from "react-icons/fi";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 transition-all shadow-sm"
    >
      <FiCopy className="w-3 h-3" />
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function PromptBlock({ label, content, variant = "default" }) {
  const styles = {
    bad: "bg-red-50 border-red-200 text-red-900",
    good: "bg-emerald-50 border-emerald-200 text-emerald-900",
    upgrade: "bg-violet-50 border-violet-200 text-violet-900",
    default: "bg-slate-50 border-slate-200 text-slate-800",
  };
  return (
    <div className="relative group">
      {label && (
        <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-t-md ${
          variant === "bad" ? "bg-red-100 text-red-600" :
          variant === "good" ? "bg-emerald-100 text-emerald-600" :
          variant === "upgrade" ? "bg-violet-100 text-violet-600" :
          "bg-slate-100 text-slate-500"
        }`}>{label}</span>
      )}
      <div className={`relative rounded-lg border p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap ${styles[variant]}`}>
        <CopyButton text={content} />
        {content}
      </div>
    </div>
  );
}

function OutputBlock({ content, variant = "default" }) {
  const styles = {
    bad: "border-l-4 border-l-red-400 bg-red-50/50",
    good: "border-l-4 border-l-emerald-400 bg-emerald-50/50",
    default: "border-l-4 border-l-slate-300 bg-slate-50/50",
  };
  return (
    <div className={`rounded-r-lg p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap ${styles[variant]}`}>
      {content}
    </div>
  );
}

function SectionWrapper({ children, id }) {
  return (
    <div id={id} className="scroll-mt-20">
      {children}
    </div>
  );
}

function SectionGoal({ data }) {
  return (
    <SectionWrapper id="sec-goal">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <FiTarget className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold tracking-tight">Your Mission</h3>
        </div>
        <p className="text-white/95 text-base font-medium leading-relaxed">{data.headline}</p>
        {data.real_world && (
          <p className="mt-2 text-blue-100 text-sm italic">{data.real_world}</p>
        )}
      </div>
    </SectionWrapper>
  );
}

function SectionUseCase({ data }) {
  return (
    <SectionWrapper id="sec-usecase">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <FiBriefcase className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="text-base font-bold text-amber-900">When You'll Use This</h3>
        </div>
        <p className="text-amber-800 text-sm leading-relaxed">{data.scenario}</p>
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {data.tags.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

function SectionBadPrompt({ data }) {
  return (
    <SectionWrapper id="sec-bad-prompt">
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <FiAlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <h3 className="text-base font-bold text-slate-900">The Beginner Prompt</h3>
          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">Avoid This</span>
        </div>
        <PromptBlock label="Prompt" content={data.prompt} variant="bad" />
      </div>
    </SectionWrapper>
  );
}

function SectionBadOutput({ data }) {
  return (
    <SectionWrapper id="sec-bad-output">
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <FiXCircle className="w-4 h-4 text-red-500" />
          </div>
          <h3 className="text-base font-bold text-slate-900">What AI Gives You</h3>
          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">Weak Result</span>
        </div>
        <OutputBlock content={data.output} variant="bad" />
      </div>
    </SectionWrapper>
  );
}

function SectionWhyFailed({ data }) {
  return (
    <SectionWrapper id="sec-why-failed">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
            <FiAlertOctagon className="w-4 h-4 text-slate-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">What Went Wrong</h3>
        </div>
        <ul className="space-y-2">
          {data.reasons.map((r, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
              <span className="flex-shrink-0 w-5 h-5 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
              <span className="leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}

function SectionGoodPrompt({ data }) {
  return (
    <SectionWrapper id="sec-good-prompt">
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <FiCheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-base font-bold text-slate-900">The Pro Prompt</h3>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-semibold rounded-full">Use This</span>
        </div>
        <PromptBlock label="Prompt" content={data.prompt} variant="good" />
        {data.framework_used && (
          <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <FiZap className="w-3 h-3" /> Framework: {data.framework_used}
          </p>
        )}
      </div>
    </SectionWrapper>
  );
}

function SectionGoodOutput({ data }) {
  return (
    <SectionWrapper id="sec-good-output">
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <FiCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-base font-bold text-slate-900">What AI Gives You Now</h3>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-semibold rounded-full">Great Result</span>
        </div>
        <OutputBlock content={data.output} variant="good" />
      </div>
    </SectionWrapper>
  );
}

function SectionUpgrade({ data }) {
  return (
    <SectionWrapper id="sec-upgrade">
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
            <FiZap className="w-4 h-4 text-violet-600" />
          </div>
          <h3 className="text-base font-bold text-violet-900">Level Up</h3>
          <span className="px-2 py-0.5 bg-violet-100 text-violet-600 text-xs font-semibold rounded-full">Advanced</span>
        </div>
        <PromptBlock label="Upgraded Prompt" content={data.prompt} variant="upgrade" />
        <p className="mt-3 text-sm text-violet-700 font-medium">{data.what_changed}</p>
      </div>
    </SectionWrapper>
  );
}

function SectionGuidedPractice({ data }) {
  return (
    <SectionWrapper id="sec-practice">
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
            <FiEdit3 className="w-4 h-4 text-sky-600" />
          </div>
          <h3 className="text-base font-bold text-sky-900">Try It Yourself</h3>
        </div>
        <ol className="space-y-3">
          {data.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-sky-200 text-sky-700 rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
              <span className="text-sm text-sky-800 leading-relaxed pt-1">{step}</span>
            </li>
          ))}
        </ol>
        {data.task && (
          <div className="mt-4 p-3 bg-white/60 rounded-lg border border-sky-200">
            <p className="text-sm font-semibold text-sky-900">Your Task: <span className="font-normal text-sky-700">{data.task}</span></p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

function SectionChallenge({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <SectionWrapper id="sec-challenge">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <FiAward className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold tracking-tight">5-Minute Challenge</h3>
        </div>
        <p className="text-white/95 text-sm leading-relaxed">{data.description}</p>
        {data.hint && (
          <button onClick={() => setOpen(!open)} className="mt-3 flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors">
            {open ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />}
            {open ? "Hide hint" : "Need a hint?"}
          </button>
        )}
        {open && data.hint && (
          <p className="mt-2 text-sm text-white/80 bg-white/10 rounded-lg p-3">{data.hint}</p>
        )}
      </div>
    </SectionWrapper>
  );
}

function SectionChecklist({ data }) {
  const [checked, setChecked] = useState({});
  return (
    <SectionWrapper id="sec-checklist">
      <div className="border border-slate-200 rounded-xl p-5 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <FiList className="w-4 h-4 text-slate-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Ready to Move On?</h3>
        </div>
        <div className="space-y-2.5">
          {data.items.map((item, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm leading-relaxed transition-colors ${checked[i] ? "text-slate-400 line-through" : "text-slate-700"}`}>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function SectionWhatYouLearned({ data }) {
  return (
    <SectionWrapper id="sec-learned">
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
            <FiBookOpen className="w-4 h-4 text-teal-600" />
          </div>
          <h3 className="text-base font-bold text-teal-900">Key Takeaways</h3>
        </div>
        <ul className="space-y-2">
          {data.points.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-teal-800">
              <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span className="leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}

function SectionMiniQuiz({ data }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  return (
    <SectionWrapper id="sec-quiz">
      <div className="border-2 border-indigo-200 rounded-xl p-5 bg-indigo-50/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <FiHelpCircle className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="text-base font-bold text-indigo-900">Quick Check</h3>
        </div>
        <div className="space-y-5">
          {data.questions.map((q, qi) => (
            <div key={qi}>
              <p className="text-sm font-semibold text-slate-900 mb-2">Q{qi + 1}. {q.question}</p>
              <div className="space-y-1.5">
                {q.options.map((opt, oi) => {
                  const selected = answers[qi] === oi;
                  const isCorrect = showResults && oi === q.correct;
                  const isWrong = showResults && selected && oi !== q.correct;
                  return (
                    <button
                      key={oi}
                      onClick={() => { if (!showResults) setAnswers(prev => ({ ...prev, [qi]: oi })); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${
                        isCorrect ? "bg-emerald-100 border-emerald-300 text-emerald-800 font-medium" :
                        isWrong ? "bg-red-100 border-red-300 text-red-800" :
                        selected ? "bg-indigo-100 border-indigo-300 text-indigo-800" :
                        "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {showResults && q.explanation && (
                <p className="mt-2 text-xs text-indigo-700 bg-indigo-50 rounded-lg p-2">{q.explanation}</p>
              )}
            </div>
          ))}
        </div>
        {!showResults && Object.keys(answers).length === data.questions.length && (
          <button
            onClick={() => setShowResults(true)}
            className="mt-4 w-full py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Check Answers
          </button>
        )}
        {showResults && (
          <div className="mt-3 text-center">
            <p className="text-sm font-semibold text-indigo-900">
              Score: {data.questions.filter((q, i) => answers[i] === q.correct).length}/{data.questions.length}
            </p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

function SectionTakeaway({ data }) {
  return (
    <SectionWrapper id="sec-takeaway">
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-center shadow-lg overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />
        <FiStar className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
        <p className="text-white text-base font-semibold leading-relaxed max-w-md mx-auto">{data.line}</p>
      </div>
    </SectionWrapper>
  );
}

const SECTION_RENDERERS = {
  "SEC-01_GOAL": SectionGoal,
  "SEC-02_USE_CASE": SectionUseCase,
  "SEC-03_BAD_PROMPT": SectionBadPrompt,
  "SEC-04_BAD_OUTPUT": SectionBadOutput,
  "SEC-05_WHY_FAILED": SectionWhyFailed,
  "SEC-06_GOOD_PROMPT": SectionGoodPrompt,
  "SEC-07_GOOD_OUTPUT": SectionGoodOutput,
  "SEC-08_UPGRADE_PROMPT": SectionUpgrade,
  "SEC-09_GUIDED_PRACTICE": SectionGuidedPractice,
  "SEC-10_CHALLENGE": SectionChallenge,
  "SEC-11_CHECKLIST": SectionChecklist,
  "SEC-12_WHAT_YOU_LEARNED": SectionWhatYouLearned,
  "SEC-13_MINI_QUIZ": SectionMiniQuiz,
  "SEC-14_ONE_LINE_TAKEAWAY": SectionTakeaway,
};

export default function PromptEngineeringSections({ sections }) {
  if (!sections || !Array.isArray(sections)) return null;

  return (
    <div className="space-y-5">
      {sections.map((sec, i) => {
        if (!sec || typeof sec !== "object") return null;
        const Renderer = SECTION_RENDERERS[sec.type];
        if (!Renderer) return null;
        return <Renderer key={`${sec.type}-${i}`} data={sec.data} />;
      })}
    </div>
  );
}

export { SECTION_RENDERERS };
