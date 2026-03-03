import { useState } from "react";
import {
  FiZap, FiHeart, FiBookOpen, FiGlobe, FiArrowRight,
  FiTool, FiList, FiCheckCircle, FiAlertTriangle,
  FiTrendingUp, FiClipboard, FiDollarSign, FiFileText,
  FiHelpCircle, FiCopy, FiChevronDown, FiChevronUp,
  FiCheck, FiStar, FiTarget, FiPlay, FiExternalLink,
} from "react-icons/fi";

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
      }}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 transition-all shadow-sm"
    >
      <FiCopy className="w-3 h-3" />
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function Wrap({ children, id }) {
  return <div id={id} className="scroll-mt-20">{children}</div>;
}

/* ── AA-01  TODAY'S WIN ──────────────────────────────────────── */

function SectionTodaysWin({ data }) {
  return (
    <Wrap id="aa-todays-win">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-white/10 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center ring-1 ring-white/30">
              <FiZap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">Today's Win</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold leading-tight tracking-tight">{data.headline}</h2>
          {data.description && (
            <p className="mt-3 text-emerald-50 text-sm leading-relaxed italic flex items-start gap-2">
              <FiTarget className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-200" />
              {data.description}
            </p>
          )}
        </div>
      </div>
    </Wrap>
  );
}

/* ── AA-02  WHY YOU SHOULD CARE ──────────────────────────────── */

function SectionWhyCare({ data }) {
  return (
    <Wrap id="aa-why-care">
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center">
            <FiHeart className="w-4 h-4 text-orange-500" />
          </div>
          <h3 className="text-base font-bold text-orange-900">Why You Should Care</h3>
        </div>
        <p className="text-orange-800 text-sm leading-relaxed">{data.benefit}</p>
        {data.real_example && (
          <div className="mt-3 p-3 bg-white/60 rounded-xl border border-orange-100">
            <p className="text-sm text-orange-700 leading-relaxed">
              <span className="font-bold text-orange-600">Real example:</span> {data.real_example}
            </p>
          </div>
        )}
      </div>
    </Wrap>
  );
}

/* ── AA-03  SIMPLE MEANING ───────────────────────────────────── */

function SectionSimpleMeaning({ data }) {
  return (
    <Wrap id="aa-simple-meaning">
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-sky-100 rounded-xl flex items-center justify-center">
            <FiBookOpen className="w-4 h-4 text-sky-600" />
          </div>
          <h3 className="text-base font-bold text-sky-900">Simple Meaning</h3>
          {data.term && (
            <span className="px-2.5 py-0.5 bg-sky-100 text-sky-700 text-xs font-bold rounded-full">{data.term}</span>
          )}
        </div>
        <p className="text-sky-800 text-sm leading-relaxed">{data.explanation}</p>
        {data.analogy && (
          <div className="mt-3 flex items-start gap-2.5 p-3 bg-white/60 rounded-xl border border-sky-100">
            <FiStar className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
            <p className="text-sm text-sky-700 leading-relaxed">
              <span className="font-semibold">Think of it like:</span> {data.analogy}
            </p>
          </div>
        )}
      </div>
    </Wrap>
  );
}

/* ── AA-04  WHERE IT'S USED ──────────────────────────────────── */

function SectionWhereUsed({ data }) {
  return (
    <Wrap id="aa-where-used">
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
            <FiGlobe className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="text-base font-bold text-indigo-900">Where It's Used</h3>
        </div>
        <div className="space-y-2.5">
          {data.examples.map((ex, i) => (
            <div key={i} className="flex items-start gap-3 bg-white/60 rounded-xl p-3 border border-indigo-100">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-200 text-indigo-700 rounded-lg flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
              <div>
                <p className="text-sm font-semibold text-indigo-900">{ex.company}</p>
                <p className="text-sm text-indigo-700 leading-relaxed">{ex.use}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrap>
  );
}

/* ── AA-05  FLOW (Inputs → Steps → Output) ───────────────────── */

function SectionFlow({ data }) {
  return (
    <Wrap id="aa-flow">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center">
              <FiArrowRight className="w-4 h-4 text-teal-600" />
            </div>
            <h3 className="text-base font-bold text-teal-900">How It Flows</h3>
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            {/* Input */}
            <div className="flex-1 bg-teal-50 border border-teal-200 rounded-xl p-3.5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-teal-500 mb-1">Input</p>
              <p className="text-sm font-semibold text-teal-900">{data.input}</p>
            </div>
            <div className="hidden md:flex items-center text-teal-300">
              <FiArrowRight className="w-5 h-5" />
            </div>
            <div className="flex md:hidden justify-center text-teal-300">
              <FiChevronDown className="w-5 h-5" />
            </div>
            {/* Steps */}
            <div className="flex-[2] bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Steps</p>
              <div className="space-y-1.5">
                {data.steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="flex-shrink-0 w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                    <span className="leading-snug">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center text-teal-300">
              <FiArrowRight className="w-5 h-5" />
            </div>
            <div className="flex md:hidden justify-center text-teal-300">
              <FiChevronDown className="w-5 h-5" />
            </div>
            {/* Output */}
            <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-1">Output</p>
              <p className="text-sm font-semibold text-emerald-900">{data.output}</p>
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

/* ── AA-06  TOOL SETUP ───────────────────────────────────────── */

function SectionToolSetup({ data }) {
  const [checked, setChecked] = useState({});
  const allDone = data.items.every((_, i) => checked[i]);
  return (
    <Wrap id="aa-tool-setup">
      <div className={`rounded-2xl p-5 border-2 transition-colors duration-300 ${allDone ? "bg-emerald-50 border-emerald-300" : "bg-emerald-50/50 border-emerald-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${allDone ? "bg-emerald-200" : "bg-emerald-100"}`}>
            <FiTool className={`w-4 h-4 ${allDone ? "text-emerald-700" : "text-emerald-600"}`} />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-900">Tool Setup</h3>
            <p className="text-xs text-emerald-600">2-minute checklist</p>
          </div>
          {allDone && <span className="ml-auto px-2.5 py-0.5 bg-emerald-200 text-emerald-800 text-xs font-bold rounded-full">Ready!</span>}
        </div>
        <div className="space-y-2.5">
          {data.items.map((item, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer group bg-white/70 rounded-xl p-3 border border-emerald-100 hover:border-emerald-200 transition-colors">
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                className="mt-0.5 w-4 h-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold transition-colors ${checked[i] ? "text-emerald-400 line-through" : "text-emerald-900"}`}>{item.tool}</p>
                <p className={`text-xs leading-relaxed mt-0.5 transition-colors ${checked[i] ? "text-emerald-300" : "text-emerald-600"}`}>{item.action}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </Wrap>
  );
}

/* ── AA-07  BUILD STEPS ──────────────────────────────────────── */

function SectionBuildSteps({ data }) {
  const [expandedStep, setExpandedStep] = useState(0);
  return (
    <Wrap id="aa-build-steps">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
              <FiList className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-blue-900">Build Steps</h3>
              <p className="text-xs text-blue-500">Follow these exactly</p>
            </div>
            <span className="ml-auto px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{data.steps.length} steps</span>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {data.steps.map((step, i) => {
            const isOpen = expandedStep === i;
            return (
              <div key={i} className="group">
                <button
                  type="button"
                  onClick={() => setExpandedStep(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-blue-50/50 transition-colors"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-slate-900">{step.title}</span>
                  {isOpen ? <FiChevronUp className="w-4 h-4 text-slate-400" /> : <FiChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pl-[4.5rem]">
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{step.instruction}</p>
                    {step.tip && (
                      <div className="mt-3 flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-100 rounded-lg">
                        <FiStar className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700 leading-relaxed"><span className="font-bold">Tip:</span> {step.tip}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Wrap>
  );
}

/* ── AA-08  TEST LIKE A PRO ──────────────────────────────────── */

function SectionTest({ data }) {
  const [checked, setChecked] = useState({});
  const total = data.checks.length;
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <Wrap id="aa-test">
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center">
            <FiCheckCircle className="w-4 h-4 text-violet-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-violet-900">Test Like a Pro</h3>
            <p className="text-xs text-violet-500">Prove it works</p>
          </div>
          <span className="ml-auto px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">{done}/{total}</span>
        </div>
        <div className="w-full bg-violet-200/50 rounded-full h-1.5 mb-4">
          <div className="bg-violet-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }} />
        </div>
        <div className="space-y-2.5">
          {data.checks.map((c, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer bg-white/60 rounded-xl p-3 border border-violet-100 hover:border-violet-200 transition-colors">
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                className="mt-0.5 w-4 h-4 rounded border-violet-300 text-violet-600 focus:ring-violet-500"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold transition-colors ${checked[i] ? "text-violet-400 line-through" : "text-violet-900"}`}>{c.test}</p>
                <p className={`text-xs leading-relaxed mt-0.5 transition-colors ${checked[i] ? "text-violet-300" : "text-violet-500"}`}>Expected: {c.expected}</p>
              </div>
            </label>
          ))}
        </div>
        {done === total && total > 0 && (
          <div className="mt-4 text-center py-2 bg-violet-100 rounded-lg border border-violet-200">
            <p className="text-sm font-bold text-violet-700">All tests passed!</p>
          </div>
        )}
      </div>
    </Wrap>
  );
}

/* ── AA-09  COMMON MISTAKES ──────────────────────────────────── */

function SectionMistakes({ data }) {
  return (
    <Wrap id="aa-mistakes">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center">
            <FiAlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <h3 className="text-base font-bold text-red-900">Common Mistakes</h3>
          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">Avoid These</span>
        </div>
        <div className="space-y-3">
          {data.mistakes.map((m, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-3.5 border border-red-100">
              <p className="text-sm font-semibold text-red-800 flex items-center gap-2">
                <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-xs font-bold text-red-600">{i + 1}</span>
                {m.mistake}
              </p>
              <p className="text-sm text-red-700 mt-1.5 pl-7 leading-relaxed">
                <span className="font-semibold text-emerald-700">Fix: </span>{m.fix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Wrap>
  );
}

/* ── AA-10  UPGRADE MODE ─────────────────────────────────────── */

function SectionUpgrade({ data }) {
  return (
    <Wrap id="aa-upgrade">
      <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br from-indigo-500 to-violet-600 border border-indigo-400/30">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center ring-1 ring-white/30">
              <FiTrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Upgrade Mode</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400/25 text-amber-100">Level Up</span>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {data.ideas.map((idea, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-white/95">
                <FiArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-indigo-200" />
                <span className="leading-relaxed">{idea}</span>
              </div>
            ))}
          </div>
          {data.challenge && (
            <div className="p-3.5 bg-white/15 rounded-xl border border-white/20">
              <p className="text-sm text-white/95 leading-relaxed">
                <span className="font-bold text-amber-200">Challenge:</span> {data.challenge}
              </p>
            </div>
          )}
        </div>
      </div>
    </Wrap>
  );
}

/* ── AA-11  MINI TASK ────────────────────────────────────────── */

function SectionMiniTask({ data }) {
  return (
    <Wrap id="aa-mini-task">
      <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 border border-emerald-400/30">
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center ring-1 ring-white/30">
              <FiClipboard className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold">Mini Task</h3>
            {data.time && <span className="ml-auto text-xs font-semibold px-2.5 py-0.5 bg-white/15 rounded-full">{data.time}</span>}
          </div>
          <p className="text-white/95 text-sm leading-relaxed">{data.task}</p>
            {data.deliverable && (
            <div className="mt-3 p-3 bg-white/15 rounded-xl border border-white/20">
              <p className="text-sm text-white/95 leading-relaxed">
                <span className="font-bold text-amber-200">Deliverable:</span> {data.deliverable}
              </p>
            </div>
          )}
        </div>
      </div>
    </Wrap>
  );
}

/* ── AA-12  MONEY ANGLE ──────────────────────────────────────── */

function SectionMoneyAngle({ data }) {
  return (
    <Wrap id="aa-money">
      <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 border border-amber-400/30">
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center ring-1 ring-white/30">
              <FiDollarSign className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Money Angle</h3>
              <p className="text-xs text-amber-100">How to sell this skill</p>
            </div>
          </div>
          <div className="bg-white/15 rounded-xl p-4 border border-white/20 mb-3">
            <p className="text-sm font-semibold text-white">{data.service}</p>
            {data.price_range && (
              <p className="text-lg font-extrabold text-amber-100 mt-1">{data.price_range}</p>
            )}
          </div>
          <p className="text-white/95 text-sm leading-relaxed">{data.pitch}</p>
        </div>
      </div>
    </Wrap>
  );
}

/* ── AA-15  TRY IT YOURSELF ──────────────────────────────────── */

function SectionTryItYourself({ data }) {
  return (
    <Wrap id="aa-try-it">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 via-white to-sky-50 border border-rose-200/60 shadow-sm">
        <div className="h-1 bg-gradient-to-r from-rose-300 via-pink-300 to-sky-300" />
        <div className="p-5 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-rose-400 to-pink-400 rounded-xl flex items-center justify-center shadow-sm">
              <FiZap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">Try It Yourself</h3>
              <p className="text-[11px] text-slate-400">Best tool for this lesson</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center">
              <span className="text-white font-bold text-base">{(data.primary?.name || "?").charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-slate-900">{data.primary?.name || "Tool"}</span>
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
    </Wrap>
  );
}

/* ── AA-13  KEY NOTES ────────────────────────────────────────── */

function SectionKeyNotes({ data }) {
  return (
    <Wrap id="aa-notes">
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center">
            <FiFileText className="w-4 h-4 text-teal-600" />
          </div>
          <h3 className="text-base font-bold text-teal-900">Key Notes</h3>
        </div>
        <ul className="space-y-2">
          {data.notes.map((note, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-teal-800">
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span className="leading-relaxed">{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </Wrap>
  );
}

/* ── AA-14  QUICK QUIZ ───────────────────────────────────────── */

function SectionQuickQuiz({ data }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  return (
    <Wrap id="aa-quiz">
      <div className="border-2 border-indigo-200 rounded-2xl p-5 bg-indigo-50/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
            <FiHelpCircle className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="text-base font-bold text-indigo-900">Quick Quiz</h3>
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
    </Wrap>
  );
}

/* ── Registry ────────────────────────────────────────────────── */

const AA_RENDERERS = {
  "AA-01_TODAYS_WIN": SectionTodaysWin,
  "AA-15_TRY_IT_YOURSELF": SectionTryItYourself,
  "AA-02_WHY_CARE": SectionWhyCare,
  "AA-03_SIMPLE_MEANING": SectionSimpleMeaning,
  "AA-04_WHERE_USED": SectionWhereUsed,
  "AA-05_FLOW": SectionFlow,
  "AA-06_TOOL_SETUP": SectionToolSetup,
  "AA-07_BUILD_STEPS": SectionBuildSteps,
  "AA-08_TEST": SectionTest,
  "AA-09_MISTAKES": SectionMistakes,
  "AA-10_UPGRADE": SectionUpgrade,
  "AA-11_MINI_TASK": SectionMiniTask,
  "AA-12_MONEY_ANGLE": SectionMoneyAngle,
  "AA-13_KEY_NOTES": SectionKeyNotes,
  "AA-14_QUICK_QUIZ": SectionQuickQuiz,
};

export default function AiAutomationsSections({ sections }) {
  if (!sections || !Array.isArray(sections) || sections.length === 0) return null;
  return (
    <div className="space-y-5">
      {sections.map((sec, i) => {
        if (!sec || typeof sec !== "object") return null;
        const Renderer = AA_RENDERERS[sec.type];
        if (!Renderer) return null;
        return <Renderer key={`${sec.type}-${i}`} data={sec.data} />;
      })}
    </div>
  );
}

export { AA_RENDERERS };
