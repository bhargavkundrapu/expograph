import { roleTaxonomy } from "./roleTaxonomy.js";

/**
 * Quick preset tiles: category + sub-role selection.
 */
export default function RolePresets({ categoryId, subRoleId, onPick }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quick presets</p>
      <div className="flex flex-wrap gap-2">
        {roleTaxonomy.flatMap((cat) =>
          cat.subRoles.slice(0, 2).map((sr) => {
            const active = categoryId === cat.id && subRoleId === sr.id;
            return (
              <button
                key={`${cat.id}-${sr.id}`}
                type="button"
                onClick={() => onPick(cat.id, sr.id)}
                className={`min-h-[44px] px-3 py-2 rounded-xl text-left text-sm font-medium border shadow-sm transition-colors ${
                  active
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span className="block text-[10px] uppercase tracking-wide text-slate-500">{cat.label}</span>
                <span className="line-clamp-1">{sr.label}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
