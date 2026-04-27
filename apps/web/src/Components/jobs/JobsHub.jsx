import { useCallback, useEffect, useMemo, useState } from "react";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import RolePresets from "./RolePresets.jsx";
import JobsFilters, { MAX_CHIPS } from "./JobsFilters.jsx";
import PlatformPicker from "./PlatformPicker.jsx";
import SearchPreview from "./SearchPreview.jsx";
import SavedSearches from "./SavedSearches.jsx";
import { buildUrlForPlatform, buildCopyKeywordString } from "./platformUrls.js";
import { getSubRole, ALL_PLATFORM_IDS, platformMeta, OTHERS_SUB_ROLE_ID } from "./roleTaxonomy.js";
import { STORAGE_SAVED, STORAGE_SKILL_HINTS, loadJson, saveJson } from "./jobsStorage.js";

const DEFAULT_PLATFORM = ALL_PLATFORM_IDS[0] || "linkedin";

function useToast() {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(""), 2200);
    return () => clearTimeout(t);
  }, [msg]);
  return [msg, setMsg];
}

/** @param {unknown} s */
function platformFromSaved(s) {
  if (s && typeof s === "object" && typeof s.platform === "string") return s.platform;
  const pl = s && typeof s === "object" && Array.isArray(s.platforms) ? s.platforms : [];
  if (pl.length && typeof pl[0] === "string") return pl[0];
  return DEFAULT_PLATFORM;
}

export default function JobsHub() {
  const [filters, setFilters] = useState({
    keywords: [],
    location: "",
    workMode: "",
    experience: "",
    datePosted: "",
    jobType: "",
    companyKeyword: "",
    salaryKeyword: "",
    categoryId: "",
    subRoleId: "",
    customSubRoleText: "",
  });
  const [chipInput, setChipInput] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(DEFAULT_PLATFORM);
  const [savedName, setSavedName] = useState("");
  const [savedList, setSavedList] = useState(() => loadJson(STORAGE_SAVED, []));
  const [popupHint, setPopupHint] = useState("");
  const [toast, setToast] = useToast();

  useEffect(() => {
    saveJson(STORAGE_SAVED, savedList);
  }, [savedList]);

  const suggestedToAdd = useMemo(() => {
    const sr = filters.categoryId && filters.subRoleId ? getSubRole(filters.categoryId, filters.subRoleId) : null;
    const optional = sr?.optionalKeywords || [];
    const hints = loadJson(STORAGE_SKILL_HINTS, []);
    const hintsArr = Array.isArray(hints) ? hints : [];
    const pool = [...new Set([...optional, ...hintsArr])];
    const lower = new Set(filters.keywords.map((k) => k.toLowerCase()));
    return pool.filter((k) => k && !lower.has(k.toLowerCase())).slice(0, 8);
  }, [filters.keywords, filters.categoryId, filters.subRoleId]);

  const canSearch = filters.keywords.length > 0;

  const onPickPreset = useCallback((categoryId, subRoleId) => {
    const sr = getSubRole(categoryId, subRoleId);
    setFilters((prev) => ({
      ...prev,
      categoryId,
      subRoleId,
      customSubRoleText: subRoleId === OTHERS_SUB_ROLE_ID ? prev.customSubRoleText : "",
      keywords:
        subRoleId === OTHERS_SUB_ROLE_ID
          ? prev.keywords
          : sr
            ? [...sr.defaultKeywords]
            : prev.keywords,
    }));
  }, []);

  const onAddChip = useCallback(() => {
    const v = chipInput.trim();
    if (!v) return;
    setFilters((prev) => {
      if (prev.keywords.length >= MAX_CHIPS) return prev;
      const lower = new Set(prev.keywords.map((k) => k.toLowerCase()));
      if (lower.has(v.toLowerCase())) return prev;
      const keywords = [...prev.keywords, v];
      return {
        ...prev,
        keywords,
        ...(prev.subRoleId === OTHERS_SUB_ROLE_ID ? { customSubRoleText: keywords.join(", ") } : {}),
      };
    });
    setChipInput("");
  }, [chipInput]);

  const onRemoveChip = useCallback((kw) => {
    setFilters((prev) => {
      const keywords = prev.keywords.filter((k) => k !== kw);
      return {
        ...prev,
        keywords,
        ...(prev.subRoleId === OTHERS_SUB_ROLE_ID ? { customSubRoleText: keywords.join(", ") } : {}),
      };
    });
  }, []);

  const onAddSuggested = useCallback(() => {
    setFilters((prev) => {
      const lower = new Set(prev.keywords.map((k) => k.toLowerCase()));
      const next = [...prev.keywords];
      for (const s of suggestedToAdd) {
        if (next.length >= MAX_CHIPS) break;
        if (!lower.has(s.toLowerCase())) {
          next.push(s);
          lower.add(s.toLowerCase());
        }
      }
      return {
        ...prev,
        keywords: next,
        ...(prev.subRoleId === OTHERS_SUB_ROLE_ID ? { customSubRoleText: next.join(", ") } : {}),
      };
    });
  }, [suggestedToAdd]);

  const copyKeywords = useCallback(() => {
    const text = buildCopyKeywordString(filters);
    if (!text) {
      setToast("Add keywords first");
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => setToast("Copied"),
      () => setToast("Copy failed")
    );
  }, [filters, setToast]);

  const openUrls = useCallback(
    (ids, filtersOverride) => {
      const f = filtersOverride ?? filters;
      const okKeywords = (f.keywords || []).length > 0;
      if (!okKeywords || !ids.length) return;
      let opened = 0;
      for (let i = 0; i < ids.length; i += 1) {
        const id = ids[i];
        const url = buildUrlForPlatform(id, f);
        const w = window.open(url, "_blank");
        if (w) {
          opened += 1;
          try {
            w.opener = null;
          } catch {
            /* ignore */
          }
        }
      }
      if (opened === 0) {
        setPopupHint("Pop-up blocked. Allow pop-ups for this site to open the job search.");
      } else {
        setPopupHint("");
      }
    },
    [filters]
  );

  const saveCurrent = useCallback(() => {
    const name = savedName.trim() || `Search ${savedList.length + 1}`;
    if (!canSearch) {
      setToast("Nothing to save - add keywords");
      return;
    }
    const entry = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `s_${Date.now()}`,
      name,
      savedAt: Date.now(),
      filters: { ...filters },
      platform: selectedPlatform,
    };
    setSavedList((prev) => [entry, ...prev].slice(0, 40));
    setSavedName("");
    setToast("Saved");
  }, [savedName, canSearch, filters, selectedPlatform, savedList.length, setToast]);

  const runSaved = useCallback(
    (s) => {
      let nextFilters = s.filters;
      if (
        nextFilters?.subRoleId === OTHERS_SUB_ROLE_ID &&
        !nextFilters.customSubRoleText &&
        Array.isArray(nextFilters.keywords) &&
        nextFilters.keywords.length > 0
      ) {
        nextFilters = { ...nextFilters, customSubRoleText: nextFilters.keywords.join(", ") };
      }
      setFilters(nextFilters);
      const plat = platformFromSaved(s);
      setSelectedPlatform(plat);
      setToast("Opening saved search…");
      window.setTimeout(() => openUrls([plat], nextFilters), 80);
    },
    [openUrls, setToast]
  );

  const deleteSaved = useCallback((id) => {
    setSavedList((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return (
    <div className="max-w-6xl mx-auto pb-28 md:pb-10 px-4 sm:px-6 space-y-6 text-slate-900">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm shadow-lg shadow-emerald-600/25">
          {toast}
        </div>
      )}
      {popupHint && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{popupHint}</div>
      )}

      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Career command center</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Jobs Search Hub</h1>
        <p className="text-sm text-slate-600 max-w-2xl line-clamp-3">
          India-first presets, smart keyword chips, and one-click redirects to LinkedIn, Naukri, Indeed, Internshala & more - pick{" "}
          <strong className="font-semibold text-slate-800">one platform</strong> at a time. No scraping - you apply on the original site.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <RolePresets categoryId={filters.categoryId} subRoleId={filters.subRoleId} onPick={onPickPreset} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <JobsFilters
            filters={filters}
            setFilters={setFilters}
            chipInput={chipInput}
            setChipInput={setChipInput}
            onAddChip={onAddChip}
            onRemoveChip={onRemoveChip}
            suggestedToAdd={suggestedToAdd}
            onAddSuggested={onAddSuggested}
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
            <PlatformPicker selectedId={selectedPlatform} onChange={setSelectedPlatform} />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="button"
              onClick={copyKeywords}
              disabled={!canSearch}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-medium shadow-sm hover:bg-slate-50 disabled:opacity-40"
            >
              <FiCopy className="w-4 h-4" /> Copy keywords
            </button>
            <button
              type="button"
              onClick={() => openUrls([selectedPlatform])}
              disabled={!canSearch}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold shadow-sm shadow-violet-600/20 disabled:opacity-40"
            >
              <FiExternalLink className="w-4 h-4" /> Open on {platformMeta[selectedPlatform]?.label || selectedPlatform}
            </button>
          </div>
          {!canSearch && (
            <p className="text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              Pick a role preset or add at least one keyword to search.
            </p>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Save this search</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                className="flex-1 min-h-[44px] rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                placeholder="Name (e.g. React Bangalore)"
                value={savedName}
                onChange={(e) => setSavedName(e.target.value)}
              />
              <button
                type="button"
                onClick={saveCurrent}
                className="min-h-[44px] px-5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium"
              >
                Save
              </button>
            </div>
            <SavedSearches items={savedList} onRun={runSaved} onDelete={deleteSaved} />
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-4">
          <SearchPreview filters={filters} selectedPlatformIds={[selectedPlatform]} />
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 border-t border-slate-200 backdrop-blur-md shadow-[0_-4px_24px_rgba(15,23,42,0.08)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex gap-2 max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => openUrls([selectedPlatform])}
            disabled={!canSearch}
            className="flex-1 min-h-[48px] rounded-xl bg-violet-600 text-white text-sm font-semibold shadow-sm disabled:opacity-40"
          >
            Open search
          </button>
          <button
            type="button"
            onClick={copyKeywords}
            disabled={!canSearch}
            className="min-h-[48px] px-4 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm shadow-sm disabled:opacity-40"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
