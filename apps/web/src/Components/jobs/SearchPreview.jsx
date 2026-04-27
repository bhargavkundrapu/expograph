import { buildCopyKeywordString, urlBuilders } from "./platformUrls.js";
import { platformMeta } from "./roleTaxonomy.js";

/**
 * Live preview of keyword string + sample URLs (truncated).
 */
export default function SearchPreview({ filters, selectedPlatformIds }) {
  const line = buildCopyKeywordString(filters);
  const samples = selectedPlatformIds.slice(0, 3).map((id) => {
    const fn = urlBuilders[id];
    let url = "";
    try {
      url = typeof fn === "function" ? fn(filters) : "";
    } catch {
      url = "";
    }
    const label = platformMeta[id]?.label || id;
    return { id, label, url };
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 space-y-4 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Search preview</p>
        <p className="text-sm text-slate-800 line-clamp-4 break-words" title={line}>
          {line || <span className="text-slate-400">Add keywords or pick a role preset</span>}
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-[10px] uppercase text-slate-500">Sample URLs</p>
        <ul className="space-y-2 text-xs text-slate-600">
          {samples.map(({ id, label, url }) => (
            <li key={id} className="truncate" title={url}>
              <span className="text-violet-700 font-medium">{label}:</span>{" "}
              <span className="text-slate-500">
                {url ? (url.length > 72 ? `${url.slice(0, 72)}…` : url) : "-"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
