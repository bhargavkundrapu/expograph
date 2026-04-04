import { ALL_PLATFORM_IDS, platformMeta } from "./roleTaxonomy.js";

/**
 * Single-select platform chips (one active at a time).
 */
export default function PlatformPicker({ selectedId, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Platform</p>
      <div className="flex flex-wrap gap-2">
        {ALL_PLATFORM_IDS.map((id) => {
          const on = selectedId === id;
          const meta = platformMeta[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`min-h-[44px] px-3 py-2 rounded-full text-sm font-medium border shadow-sm transition-colors ${
                on
                  ? "border-violet-500 bg-violet-50 text-violet-900 ring-2 ring-violet-200"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {meta?.label || id}
            </button>
          );
        })}
      </div>
    </div>
  );
}
