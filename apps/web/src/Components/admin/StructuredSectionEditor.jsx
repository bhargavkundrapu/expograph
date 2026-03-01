import { useState } from "react";
import {
  FiChevronDown, FiChevronUp, FiPlus, FiTrash2, FiX,
  FiTarget, FiBriefcase, FiAlertTriangle, FiXCircle,
  FiAlertOctagon, FiCheckCircle, FiCheck, FiZap,
  FiEdit3, FiAward, FiList, FiBookOpen, FiHelpCircle, FiStar,
  FiPackage, FiAlertCircle, FiCpu, FiTrendingUp, FiShield, FiCode,
} from "react-icons/fi";

const SEC_SCHEMA = {
  "SEC-01_GOAL": {
    label: "Your Mission",
    icon: FiTarget,
    color: "blue",
    fields: [
      { key: "headline", label: "Headline", type: "text" },
      { key: "real_world", label: "Real World Context", type: "textarea" },
    ],
  },
  "SEC-02_USE_CASE": {
    label: "When You'll Use This",
    icon: FiBriefcase,
    color: "amber",
    fields: [
      { key: "scenario", label: "Scenario", type: "textarea" },
      { key: "tags", label: "Tags", type: "string-array" },
    ],
  },
  "SEC-03_BAD_PROMPT": {
    label: "The Beginner Prompt",
    icon: FiAlertTriangle,
    color: "red",
    fields: [{ key: "prompt", label: "Bad Prompt", type: "textarea" }],
  },
  "SEC-04_BAD_OUTPUT": {
    label: "Weak Result",
    icon: FiXCircle,
    color: "red",
    fields: [{ key: "output", label: "Bad Output", type: "textarea" }],
  },
  "SEC-05_WHY_FAILED": {
    label: "What Went Wrong",
    icon: FiAlertOctagon,
    color: "slate",
    fields: [{ key: "reasons", label: "Reasons", type: "string-array" }],
  },
  "SEC-06_GOOD_PROMPT": {
    label: "The Pro Prompt",
    icon: FiCheckCircle,
    color: "emerald",
    fields: [
      { key: "prompt", label: "Good Prompt", type: "textarea" },
      { key: "framework_used", label: "Framework Used", type: "text" },
    ],
  },
  "SEC-07_GOOD_OUTPUT": {
    label: "Great Result",
    icon: FiCheck,
    color: "emerald",
    fields: [{ key: "output", label: "Good Output", type: "textarea" }],
  },
  "SEC-08_UPGRADE_PROMPT": {
    label: "Level Up",
    icon: FiZap,
    color: "violet",
    fields: [
      { key: "prompt", label: "Upgraded Prompt", type: "textarea" },
      { key: "what_changed", label: "What Changed", type: "textarea" },
    ],
  },
  "SEC-09_GUIDED_PRACTICE": {
    label: "Try It Yourself",
    icon: FiEdit3,
    color: "sky",
    fields: [
      { key: "steps", label: "Steps", type: "string-array" },
      { key: "task", label: "Task", type: "textarea" },
    ],
  },
  "SEC-10_CHALLENGE": {
    label: "5-Minute Challenge",
    icon: FiAward,
    color: "teal",
    fields: [
      { key: "description", label: "Description", type: "textarea" },
      { key: "hint", label: "Hint", type: "textarea" },
    ],
  },
  "SEC-11_CHECKLIST": {
    label: "Ready to Move On?",
    icon: FiList,
    color: "slate",
    fields: [{ key: "items", label: "Checklist Items", type: "string-array" }],
  },
  "SEC-12_WHAT_YOU_LEARNED": {
    label: "Key Takeaways",
    icon: FiBookOpen,
    color: "teal",
    fields: [{ key: "points", label: "Points", type: "string-array" }],
  },
  "SEC-13_MINI_QUIZ": {
    label: "Quick Check",
    icon: FiHelpCircle,
    color: "indigo",
    fields: [{ key: "questions", label: "Questions", type: "quiz-array" }],
  },
  "SEC-14_ONE_LINE_TAKEAWAY": {
    label: "One-Line Takeaway",
    icon: FiStar,
    color: "slate",
    fields: [{ key: "line", label: "Takeaway Line", type: "text" }],
  },
};

const VC_SCHEMA = {
  "VC-01_MISSION": {
    label: "Mission",
    icon: FiTarget,
    color: "blue",
    fields: [
      { key: "headline", label: "Headline", type: "text" },
      { key: "real_world", label: "Real World Context", type: "textarea" },
    ],
  },
  "VC-02_WHAT_YOULL_BUILD": {
    label: "What You'll Build",
    icon: FiPackage,
    color: "indigo",
    fields: [
      { key: "features", label: "Features", type: "string-array" },
      { key: "tech", label: "Tech Stack", type: "string-array" },
    ],
  },
  "VC-03_PREREQUISITES": {
    label: "Prerequisites",
    icon: FiAlertCircle,
    color: "amber",
    fields: [{ key: "items", label: "Items", type: "string-array" }],
  },
  "VC-04_WORKFLOW": {
    label: "Workflow Steps",
    icon: FiList,
    color: "blue",
    fields: [{ key: "steps", label: "Steps", type: "workflow-array" }],
  },
  "VC-05_SUCCESS_CRITERIA": {
    label: "Success Criteria",
    icon: FiCheckCircle,
    color: "emerald",
    fields: [{ key: "checks", label: "Checks", type: "string-array" }],
  },
  "VC-06_UNDER_THE_HOOD": {
    label: "Under the Hood",
    icon: FiCpu,
    color: "slate",
    fields: [{ key: "concepts", label: "Concepts", type: "concept-array" }],
  },
  "VC-07_PRO_TIPS": {
    label: "Pro Tips",
    icon: FiZap,
    color: "violet",
    fields: [{ key: "tips", label: "Tips", type: "string-array" }],
  },
  "VC-08_COMMON_PITFALLS": {
    label: "Common Pitfalls",
    icon: FiAlertTriangle,
    color: "red",
    fields: [{ key: "pitfalls", label: "Pitfalls", type: "pitfall-array" }],
  },
  "VC-09_LEVEL_UP": {
    label: "Level Up Challenge",
    icon: FiTrendingUp,
    color: "purple",
    fields: [
      { key: "challenge", label: "Challenge", type: "textarea" },
      { key: "hint", label: "Hint", type: "textarea" },
      { key: "difficulty", label: "Difficulty", type: "select", options: ["beginner", "intermediate", "advanced"] },
    ],
  },
  "VC-10_CHECKPOINT": {
    label: "Checkpoint",
    icon: FiShield,
    color: "slate",
    fields: [{ key: "items", label: "Items", type: "string-array" }],
  },
};

const COLOR_MAP = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-100 text-blue-700", icon: "text-blue-600" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-700", icon: "text-amber-600" },
  red: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-100 text-red-700", icon: "text-red-600" },
  slate: { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-100 text-slate-700", icon: "text-slate-600" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700", icon: "text-emerald-600" },
  violet: { bg: "bg-violet-50", border: "border-violet-200", badge: "bg-violet-100 text-violet-700", icon: "text-violet-600" },
  sky: { bg: "bg-sky-50", border: "border-sky-200", badge: "bg-sky-100 text-sky-700", icon: "text-sky-600" },
  teal: { bg: "bg-teal-50", border: "border-teal-200", badge: "bg-teal-100 text-teal-700", icon: "text-teal-600" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", badge: "bg-indigo-100 text-indigo-700", icon: "text-indigo-600" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-100 text-purple-700", icon: "text-purple-600" },
};

function StringArrayEditor({ value, onChange, placeholder }) {
  const items = Array.isArray(value) ? value : [];
  const update = (idx, val) => { const next = [...items]; next[idx] = val; onChange(next); };
  const add = () => onChange([...items, ""]);
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder || `Item ${i + 1}`}
            className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
          <button type="button" onClick={() => remove(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-md">
            <FiX className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
        <FiPlus className="w-3.5 h-3.5" /> Add item
      </button>
    </div>
  );
}

function WorkflowArrayEditor({ value, onChange }) {
  const steps = Array.isArray(value) ? value : [];
  const update = (idx, field, val) => {
    const next = [...steps];
    next[idx] = { ...next[idx], [field]: val };
    onChange(next);
  };
  const add = () => onChange([...steps, { title: "", description: "", command: "" }]);
  const remove = (idx) => onChange(steps.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      {steps.map((step, i) => (
        <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Step {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="p-1 text-red-500 hover:bg-red-50 rounded">
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <input
            value={step.title || ""}
            onChange={(e) => update(i, "title", e.target.value)}
            placeholder="Step title"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <textarea
            value={step.description || ""}
            onChange={(e) => update(i, "description", e.target.value)}
            placeholder="Description"
            rows={2}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
          />
          <input
            value={step.command || ""}
            onChange={(e) => update(i, "command", e.target.value)}
            placeholder="Command (optional)"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      ))}
      <button type="button" onClick={add} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
        <FiPlus className="w-3.5 h-3.5" /> Add step
      </button>
    </div>
  );
}

function ConceptArrayEditor({ value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const update = (idx, field, val) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: val };
    onChange(next);
  };
  const add = () => onChange([...items, { term: "", explanation: "" }]);
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Concept {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="p-1 text-red-500 hover:bg-red-50 rounded">
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <input
            value={item.term || ""}
            onChange={(e) => update(i, "term", e.target.value)}
            placeholder="Term"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <textarea
            value={item.explanation || ""}
            onChange={(e) => update(i, "explanation", e.target.value)}
            placeholder="Explanation"
            rows={2}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
          />
        </div>
      ))}
      <button type="button" onClick={add} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
        <FiPlus className="w-3.5 h-3.5" /> Add concept
      </button>
    </div>
  );
}

function PitfallArrayEditor({ value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const update = (idx, field, val) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: val };
    onChange(next);
  };
  const add = () => onChange([...items, { mistake: "", fix: "" }]);
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-red-100 rounded-lg p-3 bg-red-50/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-400">Pitfall {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="p-1 text-red-500 hover:bg-red-50 rounded">
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <input
            value={item.mistake || ""}
            onChange={(e) => update(i, "mistake", e.target.value)}
            placeholder="Common mistake"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
          />
          <input
            value={item.fix || ""}
            onChange={(e) => update(i, "fix", e.target.value)}
            placeholder="How to fix it"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
      ))}
      <button type="button" onClick={add} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
        <FiPlus className="w-3.5 h-3.5" /> Add pitfall
      </button>
    </div>
  );
}

function QuizArrayEditor({ value, onChange }) {
  const questions = Array.isArray(value) ? value : [];
  const updateQ = (qi, field, val) => {
    const next = [...questions];
    next[qi] = { ...next[qi], [field]: val };
    onChange(next);
  };
  const updateOption = (qi, oi, val) => {
    const next = [...questions];
    const opts = [...(next[qi].options || [])];
    opts[oi] = val;
    next[qi] = { ...next[qi], options: opts };
    onChange(next);
  };
  const addOption = (qi) => {
    const next = [...questions];
    next[qi] = { ...next[qi], options: [...(next[qi].options || []), ""] };
    onChange(next);
  };
  const removeOption = (qi, oi) => {
    const next = [...questions];
    next[qi] = { ...next[qi], options: (next[qi].options || []).filter((_, i) => i !== oi) };
    onChange(next);
  };
  const addQ = () => onChange([...questions, { question: "", options: ["", ""], correct: 0, explanation: "" }]);
  const removeQ = (qi) => onChange(questions.filter((_, i) => i !== qi));

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => (
        <div key={qi} className="border border-indigo-200 rounded-lg p-4 bg-indigo-50/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-500">Question {qi + 1}</span>
            <button type="button" onClick={() => removeQ(qi)} className="p-1 text-red-500 hover:bg-red-50 rounded">
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <input
            value={q.question || ""}
            onChange={(e) => updateQ(qi, "question", e.target.value)}
            placeholder="Question text"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500">Options (click radio to set correct answer)</p>
            {(q.options || []).map((opt, oi) => (
              <div key={oi} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`quiz-${qi}`}
                  checked={q.correct === oi}
                  onChange={() => updateQ(qi, "correct", oi)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <input
                  value={opt}
                  onChange={(e) => updateOption(qi, oi, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                {(q.options || []).length > 2 && (
                  <button type="button" onClick={() => removeOption(qi, oi)} className="p-1 text-red-400 hover:text-red-600">
                    <FiX className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addOption(qi)} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              <FiPlus className="w-3 h-3" /> Add option
            </button>
          </div>
          <input
            value={q.explanation || ""}
            onChange={(e) => updateQ(qi, "explanation", e.target.value)}
            placeholder="Explanation (optional)"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
      ))}
      <button type="button" onClick={addQ} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
        <FiPlus className="w-3.5 h-3.5" /> Add question
      </button>
    </div>
  );
}

function FieldEditor({ field, value, onChange }) {
  switch (field.type) {
    case "text":
      return (
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.label}
          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
        />
      );
    case "textarea":
      return (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.label}
          rows={3}
          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none"
        />
      );
    case "select":
      return (
        <select
          value={value || field.options?.[0] || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
        >
          {(field.options || []).map((opt) => (
            <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
          ))}
        </select>
      );
    case "string-array":
      return <StringArrayEditor value={value} onChange={onChange} placeholder={field.label} />;
    case "workflow-array":
      return <WorkflowArrayEditor value={value} onChange={onChange} />;
    case "concept-array":
      return <ConceptArrayEditor value={value} onChange={onChange} />;
    case "pitfall-array":
      return <PitfallArrayEditor value={value} onChange={onChange} />;
    case "quiz-array":
      return <QuizArrayEditor value={value} onChange={onChange} />;
    default:
      return null;
  }
}

function SingleSectionEditor({ section, schema, onChange, onRemove, index }) {
  const [open, setOpen] = useState(true);
  const s = schema || {};
  const Icon = s.icon || FiCode;
  const c = COLOR_MAP[s.color] || COLOR_MAP.slate;

  const updateData = (key, val) => {
    onChange({ ...section, data: { ...(section.data || {}), [key]: val } });
  };

  return (
    <div className={`rounded-xl border ${c.border} overflow-hidden`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left ${c.bg} hover:opacity-90 transition-opacity`}
      >
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${c.badge}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`text-xs font-bold ${c.badge} px-2 py-0.5 rounded-full`}>{section.type}</span>
          <span className="text-sm font-semibold text-slate-700 ml-2">{s.label || section.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
            title="Remove section"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
          {open ? <FiChevronUp className="w-4 h-4 text-slate-400" /> : <FiChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>
      {open && (
        <div className="p-4 bg-white space-y-4">
          {(s.fields || []).map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">{field.label}</label>
              <FieldEditor
                field={field}
                value={section.data?.[field.key]}
                onChange={(val) => updateData(field.key, val)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getSchemaForType(type) {
  if (type?.startsWith("SEC-")) return { map: SEC_SCHEMA, all: Object.keys(SEC_SCHEMA) };
  if (type?.startsWith("VC-")) return { map: VC_SCHEMA, all: Object.keys(VC_SCHEMA) };
  return null;
}

export default function StructuredSectionEditor({ sections, onChange }) {
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  if (!sections || !Array.isArray(sections) || sections.length === 0) return null;

  const firstType = sections[0]?.type;
  const schemaInfo = getSchemaForType(firstType);
  if (!schemaInfo) return null;

  const courseType = firstType?.startsWith("SEC-") ? "PE" : "VC";

  const updateSection = (idx, updated) => {
    const next = [...sections];
    next[idx] = updated;
    onChange(next);
  };

  const removeSection = (idx) => {
    onChange(sections.filter((_, i) => i !== idx));
  };

  const addSection = (type) => {
    const schema = schemaInfo.map[type];
    const newData = {};
    (schema?.fields || []).forEach((f) => {
      if (f.type === "string-array") newData[f.key] = [];
      else if (f.type === "workflow-array") newData[f.key] = [];
      else if (f.type === "concept-array") newData[f.key] = [];
      else if (f.type === "pitfall-array") newData[f.key] = [];
      else if (f.type === "quiz-array") newData[f.key] = [];
      else newData[f.key] = "";
    });
    onChange([...sections, { type, data: newData }]);
    setAddMenuOpen(false);
  };

  const existingTypes = new Set(sections.map((s) => s.type));
  const availableTypes = schemaInfo.all.filter((t) => !existingTypes.has(t));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            courseType === "PE" ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700"
          }`}>
            {courseType === "PE" ? "Prompt Engineering" : "Vibe Coding"} Sections
          </span>
          <span className="text-xs text-slate-400">{sections.length} sections</span>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((sec, i) => (
          <SingleSectionEditor
            key={`${sec.type}-${i}`}
            section={sec}
            schema={schemaInfo.map[sec.type]}
            onChange={(updated) => updateSection(i, updated)}
            onRemove={() => removeSection(i)}
            index={i}
          />
        ))}
      </div>

      {availableTypes.length > 0 && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setAddMenuOpen(!addMenuOpen)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5 px-3 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <FiPlus className="w-4 h-4" /> Add Section
          </button>
          {addMenuOpen && (
            <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
              {availableTypes.map((type) => {
                const s = schemaInfo.map[type];
                const Icon = s?.icon || FiCode;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => addSection(type)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <Icon className={`w-4 h-4 ${COLOR_MAP[s?.color]?.icon || "text-slate-500"}`} />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{s?.label || type}</p>
                      <p className="text-xs text-slate-400">{type}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function isStructuredSections(steps) {
  return (
    Array.isArray(steps) &&
    steps.length > 0 &&
    typeof steps[0] === "object" &&
    steps[0] !== null &&
    (steps[0]?.type?.startsWith("SEC-") || steps[0]?.type?.startsWith("VC-"))
  );
}
