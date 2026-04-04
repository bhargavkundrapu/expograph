import { FiTrash2, FiPlay } from "react-icons/fi";

export default function SavedSearches({ items, onRun, onDelete }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">
        No saved searches yet. Name your filters below and save.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Saved searches</p>
      <ul className="space-y-2 max-h-48 overflow-y-auto">
        {items.map((s) => (
          <li
            key={s.id}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{s.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{new Date(s.savedAt).toLocaleString()}</p>
            </div>
            <button
              type="button"
              onClick={() => onRun(s)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-500 text-white shadow-sm"
              title="Run on saved platform"
            >
              <FiPlay className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(s.id)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-red-600 hover:border-red-200"
              title="Delete"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
