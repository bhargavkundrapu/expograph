import { useEffect, useMemo, useState } from "react";
import { FiCheck, FiChevronDown, FiCopy } from "react-icons/fi";
import { buildPromptFromDefinition } from "./launchpadConfig";

/**
 * Shared UI: placeholder fields + live prompt + copy. Used by stage and founder-tool flows.
 */
export default function PlaceholderPromptPanel({
  definitionKey,
  definition,
  defaultOpen = true,
  compact = false,
  subtitle = "Placeholder prompt - customize with your startup, then copy",
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [vals, setVals] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOpen(defaultOpen);
  }, [definitionKey, defaultOpen]);

  useEffect(() => {
    if (!definitionKey || !definition) return;
    const next = {};
    definition.placeholders.forEach((p) => {
      next[p.key] = "";
    });
    setVals(next);
    setCopied(false);
  }, [definitionKey, definition]);

  const built = useMemo(() => {
    if (!definition) return "";
    return buildPromptFromDefinition(definition, vals);
  }, [definition, vals]);

  if (!definition) return null;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(built);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const setField = (key, value) => {
    setVals((prev) => ({ ...prev, [key]: value }));
  };

  const preMax = compact ? "max-h-36" : "max-h-56";

  return (
    <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50/90 to-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left min-h-[48px] hover:bg-violet-50/80 transition-colors"
        aria-expanded={open}
      >
        <div>
          <p className="text-sm font-semibold text-violet-900">{definition.title}</p>
          <p className="text-xs text-violet-800/80 mt-0.5">{subtitle}</p>
        </div>
        <FiChevronDown className={`w-5 h-5 text-violet-600 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-violet-100">
          <p className="text-xs text-slate-600 leading-relaxed pt-3">{definition.intro}</p>

          <div className="space-y-3">
            {definition.placeholders.map((p) => (
              <div key={p.key}>
                <label htmlFor={`pp-${definitionKey}-${p.key}`} className="block text-xs font-medium text-slate-700 mb-1">
                  {p.label}
                </label>
                <input
                  id={`pp-${definitionKey}-${p.key}`}
                  type="text"
                  value={vals[p.key] ?? ""}
                  onChange={(e) => setField(p.key, e.target.value)}
                  placeholder={p.hint}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
                  autoComplete="off"
                />
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Full prompt</p>
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center gap-1.5 min-h-[36px] px-3 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 shadow-sm"
              >
                {copied ? (
                  <>
                    <FiCheck className="w-3.5 h-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <FiCopy className="w-3.5 h-3.5" />
                    Copy prompt
                  </>
                )}
              </button>
            </div>
            <pre
              className={`text-[11px] sm:text-xs text-slate-700 whitespace-pre-wrap break-words ${preMax} overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/90 p-3 font-mono leading-relaxed`}
            >
              {built}
            </pre>
            <p className="mt-2 text-[11px] text-slate-500">
              Empty fields appear as <span className="font-mono text-slate-600">[label]</span> so you can copy a draft and finish in ChatGPT.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
