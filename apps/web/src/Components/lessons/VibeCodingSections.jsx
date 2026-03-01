import { useState } from "react";
import {
  FiTarget, FiPackage, FiAlertCircle, FiList,
  FiCheckCircle, FiCpu, FiZap, FiAlertTriangle,
  FiTrendingUp, FiShield, FiCopy, FiChevronDown,
  FiChevronUp, FiArrowRight, FiStar, FiCode,
} from "react-icons/fi";

/* ── Shared helpers ─────────────────────────────────────────── */

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

/* ── VC-01  MISSION ─────────────────────────────────────────── */

function SectionMission({ data }) {
  return (
    <Wrap id="vc-mission">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center ring-1 ring-white/20">
              <FiTarget className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Your Mission</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold leading-tight tracking-tight">{data.headline}</h2>
          {data.real_world && (
            <p className="mt-3 text-blue-100 text-sm leading-relaxed italic flex items-start gap-2">
              <FiStar className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-300" />
              {data.real_world}
            </p>
          )}
        </div>
      </div>
    </Wrap>
  );
}

/* ── VC-02  WHAT YOU'LL BUILD ───────────────────────────────── */

function SectionWhatYoullBuild({ data }) {
  return (
    <Wrap id="vc-build">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
            <FiPackage className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">What You'll Build</h3>
        </div>
        <ul className="space-y-2.5">
          {data.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="flex-shrink-0 mt-1 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold">{i + 1}</span>
              <span className="leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
        {data.tech && data.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
            {data.tech.map((t, i) => (
              <span key={i} className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">{t}</span>
            ))}
          </div>
        )}
      </div>
    </Wrap>
  );
}

/* ── VC-03  PREREQUISITES ───────────────────────────────────── */

function SectionPrerequisites({ data }) {
  return (
    <Wrap id="vc-prereqs">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
            <FiAlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="text-base font-bold text-amber-900">Before You Start</h3>
        </div>
        <ul className="space-y-2">
          {data.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-amber-800">
              <FiCheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Wrap>
  );
}

/* ── VC-04  WORKFLOW ─────────────────────────────────────────── */

function SectionWorkflow({ data }) {
  const [expandedStep, setExpandedStep] = useState(null);
  return (
    <Wrap id="vc-workflow">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
              <FiList className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Follow These Steps</h3>
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
                  className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-slate-900">{step.title}</span>
                  {isOpen ? <FiChevronUp className="w-4 h-4 text-slate-400" /> : <FiChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pl-[4.5rem]">
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{step.description}</p>
                    {step.command && (
                      <div className="mt-3 relative group/cmd">
                        <div className="bg-slate-900 rounded-lg p-3 pr-20 font-mono text-sm text-green-400 whitespace-pre-wrap overflow-x-auto">
                          {step.command}
                        </div>
                        <div className="absolute top-2 right-2">
                          <CopyBtn text={step.command} />
                        </div>
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

/* ── VC-05  SUCCESS CRITERIA ─────────────────────────────────── */

function SectionSuccessCriteria({ data }) {
  const [checked, setChecked] = useState({});
  const allChecked = data.checks.every((_, i) => checked[i]);
  return (
    <Wrap id="vc-success">
      <div className={`rounded-2xl p-5 border-2 transition-colors duration-300 ${allChecked ? "bg-emerald-50 border-emerald-300" : "bg-white border-emerald-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${allChecked ? "bg-emerald-200" : "bg-emerald-100"}`}>
            <FiCheckCircle className={`w-4 h-4 ${allChecked ? "text-emerald-700" : "text-emerald-600"}`} />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-900">Success Looks Like</h3>
            {allChecked && <p className="text-xs text-emerald-600 font-medium">All verified!</p>}
          </div>
        </div>
        <div className="space-y-2.5">
          {data.checks.map((check, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                className="mt-0.5 w-4 h-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className={`text-sm leading-relaxed transition-colors ${checked[i] ? "text-emerald-400 line-through" : "text-emerald-800"}`}>{check}</span>
            </label>
          ))}
        </div>
      </div>
    </Wrap>
  );
}

/* ── VC-06  UNDER THE HOOD ───────────────────────────────────── */

function SectionUnderTheHood({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <Wrap id="vc-hood">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-100 transition-colors"
        >
          <div className="w-9 h-9 bg-slate-200 rounded-xl flex items-center justify-center">
            <FiCpu className="w-4 h-4 text-slate-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900">Under the Hood</h3>
            <p className="text-xs text-slate-500">What the code actually does</p>
          </div>
          {open ? <FiChevronUp className="w-4 h-4 text-slate-400" /> : <FiChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {open && (
          <div className="px-5 pb-5 border-t border-slate-200 pt-4">
            <div className="space-y-4">
              {data.concepts.map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-slate-200 rounded-lg flex items-center justify-center">
                    <FiCode className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{c.term}</p>
                    <p className="text-sm text-slate-600 leading-relaxed mt-0.5">{c.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Wrap>
  );
}

/* ── VC-07  PRO TIPS ─────────────────────────────────────────── */

function SectionProTips({ data }) {
  return (
    <Wrap id="vc-tips">
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center">
            <FiZap className="w-4 h-4 text-violet-600" />
          </div>
          <h3 className="text-base font-bold text-violet-900">Pro Tips</h3>
          <span className="px-2 py-0.5 bg-violet-100 text-violet-600 text-xs font-bold rounded-full">Expert</span>
        </div>
        <div className="space-y-2.5">
          {data.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-violet-800">
              <FiArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-violet-500" />
              <span className="leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </Wrap>
  );
}

/* ── VC-08  COMMON PITFALLS ──────────────────────────────────── */

function SectionCommonPitfalls({ data }) {
  return (
    <Wrap id="vc-pitfalls">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center">
            <FiAlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <h3 className="text-base font-bold text-red-900">Watch Out For</h3>
        </div>
        <div className="space-y-3">
          {data.pitfalls.map((p, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-3.5 border border-red-100">
              <p className="text-sm font-semibold text-red-800 flex items-center gap-2">
                <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-xs font-bold text-red-600">{i + 1}</span>
                {p.mistake}
              </p>
              <p className="text-sm text-red-700 mt-1.5 pl-7 leading-relaxed">
                <span className="font-semibold text-emerald-700">Fix: </span>{p.fix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Wrap>
  );
}

/* ── VC-09  LEVEL UP ─────────────────────────────────────────── */

function SectionLevelUp({ data }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <Wrap id="vc-levelup">
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center ring-1 ring-white/20">
              <FiTrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Level Up Challenge</h3>
              {data.difficulty && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  data.difficulty === "beginner" ? "bg-green-400/20 text-green-100" :
                  data.difficulty === "intermediate" ? "bg-yellow-400/20 text-yellow-100" :
                  "bg-red-400/20 text-red-100"
                }`}>{data.difficulty}</span>
              )}
            </div>
          </div>
          <p className="text-white/95 text-sm leading-relaxed">{data.challenge}</p>
          {data.hint && (
            <>
              <button onClick={() => setShowHint(!showHint)} className="mt-3 flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors">
                {showHint ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />}
                {showHint ? "Hide hint" : "Need a hint?"}
              </button>
              {showHint && (
                <p className="mt-2 text-sm text-white/80 bg-white/10 rounded-lg p-3">{data.hint}</p>
              )}
            </>
          )}
        </div>
      </div>
    </Wrap>
  );
}

/* ── VC-10  CHECKPOINT ───────────────────────────────────────── */

function SectionCheckpoint({ data }) {
  const [checked, setChecked] = useState({});
  const total = data.items.length;
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <Wrap id="vc-checkpoint">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center ring-1 ring-white/10">
              <FiShield className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-base font-bold">Final Checkpoint</h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-blue-300">{done}/{total}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 mb-4">
          <div className="bg-blue-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${(done / total) * 100}%` }} />
        </div>
        <div className="space-y-2.5">
          {data.items.map((item, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
              />
              <span className={`text-sm leading-relaxed transition-colors ${checked[i] ? "text-slate-500 line-through" : "text-slate-200"}`}>{item}</span>
            </label>
          ))}
        </div>
        {done === total && (
          <div className="mt-4 text-center py-2 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
            <p className="text-sm font-bold text-emerald-300">All clear — you're ready for the next lesson!</p>
          </div>
        )}
      </div>
    </Wrap>
  );
}

/* ── Registry ────────────────────────────────────────────────── */

const VC_RENDERERS = {
  "VC-01_MISSION": SectionMission,
  "VC-02_WHAT_YOULL_BUILD": SectionWhatYoullBuild,
  "VC-03_PREREQUISITES": SectionPrerequisites,
  "VC-04_WORKFLOW": SectionWorkflow,
  "VC-05_SUCCESS_CRITERIA": SectionSuccessCriteria,
  "VC-06_UNDER_THE_HOOD": SectionUnderTheHood,
  "VC-07_PRO_TIPS": SectionProTips,
  "VC-08_COMMON_PITFALLS": SectionCommonPitfalls,
  "VC-09_LEVEL_UP": SectionLevelUp,
  "VC-10_CHECKPOINT": SectionCheckpoint,
};

export default function VibeCodingSections({ sections }) {
  if (!sections || !Array.isArray(sections) || sections.length === 0) return null;
  return (
    <div className="space-y-5">
      {sections.map((sec, i) => {
        if (!sec || typeof sec !== "object") return null;
        const Renderer = VC_RENDERERS[sec.type];
        if (!Renderer) return null;
        return <Renderer key={`${sec.type}-${i}`} data={sec.data} />;
      })}
    </div>
  );
}

export { VC_RENDERERS };
