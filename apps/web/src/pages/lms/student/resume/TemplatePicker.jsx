import { TEMPLATES } from "./resumeConstants";

export default function TemplatePicker({ selectedId, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSelect(t.id)}
          className={`
            border-2 rounded-xl p-4 text-left transition-all
            ${selectedId === t.id
              ? "border-indigo-600 bg-indigo-50 shadow-md"
              : "border-slate-200 hover:border-slate-300 bg-white"}
          `}
        >
          <div className="font-semibold text-slate-800">{t.name}</div>
          <div className="text-sm text-slate-500 capitalize mt-1">{t.style}</div>
        </button>
      ))}
    </div>
  );
}
