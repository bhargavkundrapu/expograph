import { useState } from "react";
import {
  FiTarget, FiBriefcase, FiList, FiAlertTriangle, FiXCircle,
  FiAlertOctagon, FiCheckCircle, FiCheck, FiZap,
  FiLayers, FiFileText, FiEdit3, FiAward, FiBookOpen, FiStar,
  FiCopy, FiChevronDown, FiChevronUp, FiTag, FiExternalLink,
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
  return <div id={id} className="scroll-mt-20">{children}</div>;
}

/* CBM-00: Lesson ID badge */
function SectionLessonId({ data }) {
  return (
    <SectionWrapper id="cbm-lesson-id">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-full">{data.code}</span>
        <span className="text-slate-600">•</span>
        <span className="font-semibold text-slate-800">{data.title}</span>
        <span className="text-slate-400">•</span>
        <span className="text-slate-500">{data.time}</span>
        {data.difficulty && (
          <>
            <span className="text-slate-400">•</span>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">{data.difficulty}</span>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}

/* CBM-01: Outcome Goal — blue-indigo gradient (clean, professional) */
function SectionOutcomeGoal({ data }) {
  return (
    <SectionWrapper id="cbm-outcome">
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <FiTarget className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold tracking-tight">Outcome Goal</h3>
        </div>
        <p className="text-white/95 text-base font-medium leading-relaxed">{data.headline}</p>
        {data.real_world && (
          <p className="mt-2 text-blue-100 text-sm italic">{data.real_world}</p>
        )}
      </div>
    </SectionWrapper>
  );
}

/* CBM-02: Where You Use It — warm amber (use case) */
function SectionWhereYouUseIt({ data }) {
  return (
    <SectionWrapper id="cbm-where-use">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <FiBriefcase className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="text-base font-bold text-amber-900">Where You Use It</h3>
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

/* CBM-03: Inputs You Need — slate checklist */
function SectionInputsYouNeed({ data }) {
  return (
    <SectionWrapper id="cbm-inputs">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
            <FiList className="w-4 h-4 text-slate-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Inputs You Need</h3>
        </div>
        <ul className="space-y-2">
          {data.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
              <span className="flex-shrink-0 w-5 h-5 bg-slate-300 text-slate-600 rounded flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}

/* CBM-04: Bad Prompt */
function SectionBadPrompt({ data }) {
  return (
    <SectionWrapper id="cbm-bad-prompt">
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <FiAlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Bad Prompt</h3>
          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">Avoid</span>
        </div>
        <PromptBlock label="Prompt" content={data.prompt} variant="bad" />
      </div>
    </SectionWrapper>
  );
}

/* CBM-05: Bad Output Example */
function SectionBadOutputExample({ data }) {
  return (
    <SectionWrapper id="cbm-bad-output">
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <FiXCircle className="w-4 h-4 text-red-500" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Bad Output Example</h3>
        </div>
        <OutputBlock content={data.output} variant="bad" />
      </div>
    </SectionWrapper>
  );
}

/* CBM-06: Why It Failed */
function SectionWhyItFailed({ data }) {
  return (
    <SectionWrapper id="cbm-why-failed">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
            <FiAlertOctagon className="w-4 h-4 text-slate-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Why It Failed</h3>
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

/* CBM-07: Good Prompt */
function SectionGoodPrompt({ data }) {
  return (
    <SectionWrapper id="cbm-good-prompt">
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <FiCheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Good Prompt</h3>
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

/* CBM-08: Good Output Example */
function SectionGoodOutputExample({ data }) {
  return (
    <SectionWrapper id="cbm-good-output">
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <FiCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Good Output Example</h3>
        </div>
        <OutputBlock content={data.output} variant="good" />
      </div>
    </SectionWrapper>
  );
}

/* CBM-09: Upgrade Prompt Pro */
function SectionUpgradePromptPro({ data }) {
  return (
    <SectionWrapper id="cbm-upgrade">
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
            <FiZap className="w-4 h-4 text-violet-600" />
          </div>
          <h3 className="text-base font-bold text-violet-900">Upgrade Prompt Pro</h3>
          <span className="px-2 py-0.5 bg-violet-100 text-violet-600 text-xs font-semibold rounded-full">Stronger</span>
        </div>
        <PromptBlock label="Upgraded Prompt" content={data.prompt} variant="upgrade" />
        {data.what_changed && (
          <p className="mt-3 text-sm text-violet-700 font-medium">{data.what_changed}</p>
        )}
      </div>
    </SectionWrapper>
  );
}

/* CBM-10: 3 Variations — teal (variety) */
function Section3Variations({ data }) {
  return (
    <SectionWrapper id="cbm-variations">
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
            <FiLayers className="w-4 h-4 text-teal-600" />
          </div>
          <h3 className="text-base font-bold text-teal-900">3 Variations</h3>
          <span className="px-2 py-0.5 bg-teal-100 text-teal-600 text-xs font-semibold rounded-full">Copy-Ready</span>
        </div>
        <div className="space-y-3">
          {data.variants.map((v, i) => (
            <div key={i} className="relative bg-white rounded-lg border border-teal-100 p-3">
              <span className="text-[10px] font-bold text-teal-500 uppercase tracking-wider">{v.title}</span>
              <div className="mt-1 font-mono text-sm text-slate-700 whitespace-pre-wrap">{v.prompt}</div>
              <CopyButton text={v.prompt} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* CBM-11: Prompt Card Final — amber/gold premium */
function SectionPromptCardFinal({ data }) {
  return (
    <SectionWrapper id="cbm-prompt-card">
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <FiFileText className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="text-base font-bold text-amber-900">Prompt Card Final</h3>
          <span className="px-2 py-0.5 bg-amber-200 text-amber-800 text-xs font-bold rounded-full">Reusable Template</span>
        </div>
        <div className="relative bg-white rounded-lg border border-amber-200 p-4 font-mono text-sm text-slate-800 whitespace-pre-wrap">
          <CopyButton text={data.template} />
          {data.template}
        </div>
        {data.notes && (
          <p className="mt-3 text-sm text-amber-700 italic">{data.notes}</p>
        )}
      </div>
    </SectionWrapper>
  );
}

/* CBM-12: Guided Practice */
function SectionGuidedPractice({ data }) {
  return (
    <SectionWrapper id="cbm-guided">
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
            <FiEdit3 className="w-4 h-4 text-sky-600" />
          </div>
          <h3 className="text-base font-bold text-sky-900">Guided Practice</h3>
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

/* CBM-13: Challenge Task */
function SectionChallengeTask({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <SectionWrapper id="cbm-challenge">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <FiAward className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold tracking-tight">Challenge Task</h3>
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

/* CBM-14: Checklist */
function SectionChecklist({ data }) {
  const [checked, setChecked] = useState({});
  return (
    <SectionWrapper id="cbm-checklist">
      <div className="border border-slate-200 rounded-xl p-5 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <FiList className="w-4 h-4 text-slate-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Quick Checklist</h3>
        </div>
        <div className="space-y-2.5">
          {data.items.map((item, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className={`text-sm leading-relaxed transition-colors ${checked[i] ? "text-slate-400 line-through" : "text-slate-700"}`}>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* CBM-15: What You Learned */
function SectionWhatYouLearned({ data }) {
  return (
    <SectionWrapper id="cbm-learned">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <FiBookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-emerald-900">What You Learned</h3>
        </div>
        <ul className="space-y-2">
          {data.points.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-emerald-800">
              <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}

/* CBM-17: Try It Yourself */
function SectionTryItYourself({ data }) {
  return (
    <SectionWrapper id="cbm-try-it">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 via-white to-sky-50 border border-rose-200/60 shadow-sm">
        <div className="h-1 bg-gradient-to-r from-rose-300 via-pink-300 to-sky-300" />
        <div className="p-5 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-rose-400 to-pink-400 rounded-xl flex items-center justify-center shadow-sm">
              <FiZap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">Try It Yourself</h3>
              <p className="text-[11px] text-slate-400">Best AI for this lesson</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center">
              <span className="text-white font-bold text-base">{(data.primary?.name || "?").charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-slate-900">{data.primary?.name || "ChatGPT"}</span>
                {data.primary?.free && (
                  <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full">Free</span>
                )}
              </div>
              <p className="text-[13px] text-slate-500 leading-relaxed mt-1">{data.primary?.why}</p>
              {data.primary?.url && (
                <a
                  href={data.primary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
                >
                  Open {data.primary.name}
                  <FiExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
          {data.try_prompt && (
            <div className="mt-4 p-3.5 bg-white rounded-xl border border-pink-100">
              <p className="text-[13px] text-slate-600 leading-relaxed">
                <span className="font-bold text-rose-500">Try this:</span> {data.try_prompt}
              </p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* CBM-16: One Line Takeaway */
function SectionOneLineTakeaway({ data }) {
  return (
    <SectionWrapper id="cbm-takeaway">
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-center shadow-lg overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-teal-500" />
        <FiStar className="w-5 h-5 text-amber-400 mx-auto mb-2" />
        <p className="text-white text-base font-semibold leading-relaxed max-w-md mx-auto">{data.line}</p>
      </div>
    </SectionWrapper>
  );
}

const CBM_RENDERERS = {
  "CBM-00_LESSON_ID": SectionLessonId,
  "CBM-01_OUTCOME_GOAL": SectionOutcomeGoal,
  "CBM-02_WHERE_YOU_USE_IT": SectionWhereYouUseIt,
  "CBM-03_INPUTS_YOU_NEED": SectionInputsYouNeed,
  "CBM-04_BAD_PROMPT": SectionBadPrompt,
  "CBM-05_BAD_OUTPUT_EXAMPLE": SectionBadOutputExample,
  "CBM-06_WHY_IT_FAILED": SectionWhyItFailed,
  "CBM-07_GOOD_PROMPT": SectionGoodPrompt,
  "CBM-08_GOOD_OUTPUT_EXAMPLE": SectionGoodOutputExample,
  "CBM-09_UPGRADE_PROMPT_PRO": SectionUpgradePromptPro,
  "CBM-10_3_VARIATIONS": Section3Variations,
  "CBM-11_PROMPT_CARD_FINAL": SectionPromptCardFinal,
  "CBM-12_GUIDED_PRACTICE": SectionGuidedPractice,
  "CBM-13_CHALLENGE_TASK": SectionChallengeTask,
  "CBM-14_CHECKLIST": SectionChecklist,
  "CBM-15_WHAT_YOU_LEARNED": SectionWhatYouLearned,
  "CBM-16_ONE_LINE_TAKEAWAY": SectionOneLineTakeaway,
  "CBM-17_TRY_IT_YOURSELF": SectionTryItYourself,
};

export default function ChatGptBusinessSections({ sections }) {
  if (!sections || !Array.isArray(sections)) return null;
  return (
    <div className="space-y-5">
      {sections.map((sec, i) => {
        if (!sec || typeof sec !== "object") return null;
        const Renderer = CBM_RENDERERS[sec.type];
        if (!Renderer) return null;
        return <Renderer key={`${sec.type}-${i}`} data={sec.data} />;
      })}
    </div>
  );
}

export { CBM_RENDERERS };
