import { useState } from "react";
import { FiChevronDown, FiPlus, FiX } from "react-icons/fi";
import { roleTaxonomy, getSubRolesForCategory } from "./roleTaxonomy.js";

const MAX_CHIPS = 12;

const WORK_MODES = [
  { value: "", label: "Any" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "Onsite" },
];

const EXPERIENCE = [
  { value: "", label: "Any" },
  { value: "internship", label: "Internship" },
  { value: "fresher", label: "Fresher" },
  { value: "0-1", label: "0–1 yr" },
  { value: "1-3", label: "1–3 yr" },
  { value: "3-5", label: "3–5 yr" },
];

const DATE_POSTED = [
  { value: "", label: "Any time" },
  { value: "24h", label: "24h" },
  { value: "3d", label: "3d" },
  { value: "7d", label: "7d" },
  { value: "14d", label: "14d" },
];

const JOB_TYPES = [
  { value: "", label: "Any" },
  { value: "internship", label: "Internship" },
  { value: "full-time", label: "Full-time" },
  { value: "apprenticeship", label: "Apprenticeship" },
];

const inputClass =
  "w-full min-h-[44px] rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20";

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-600">{label}</label>
      {children}
    </div>
  );
}

export default function JobsFilters({
  filters,
  setFilters,
  chipInput,
  setChipInput,
  onAddChip,
  onRemoveChip,
  suggestedToAdd,
  onAddSuggested,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const subRoles = getSubRolesForCategory(filters.categoryId);

  const setField = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const onCategoryChange = (categoryId) => {
    if (!categoryId) {
      setFilters((prev) => ({ ...prev, categoryId: "", subRoleId: "" }));
      return;
    }
    const firstSub = getSubRolesForCategory(categoryId)[0];
    setFilters((prev) => ({
      ...prev,
      categoryId,
      subRoleId: firstSub?.id || "",
      keywords: firstSub ? [...firstSub.defaultKeywords] : prev.keywords,
    }));
  };

  const onSubRoleChange = (subRoleId) => {
    const cat = roleTaxonomy.find((c) => c.id === filters.categoryId);
    const sr = cat?.subRoles.find((s) => s.id === subRoleId);
    setFilters((prev) => ({
      ...prev,
      subRoleId,
      keywords: sr ? [...sr.defaultKeywords] : prev.keywords,
    }));
  };

  const filterBody = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Role category">
          <select
            className={inputClass}
            value={filters.categoryId}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">Select…</option>
            {roleTaxonomy.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sub role">
          <select
            className={`${inputClass} disabled:bg-slate-100 disabled:text-slate-500`}
            disabled={!filters.categoryId}
            value={filters.subRoleId}
            onChange={(e) => onSubRoleChange(e.target.value)}
          >
            <option value="">Select…</option>
            {subRoles.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={`Keywords (${filters.keywords.length}/${MAX_CHIPS})`}>
        <div className="flex flex-wrap gap-2 mb-2">
          {filters.keywords.map((kw) => (
            <span
              key={kw}
              className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-full border border-violet-200 bg-violet-50 text-sm text-violet-900"
            >
              {kw}
              <button type="button" className="p-1 rounded-full hover:bg-violet-100 text-violet-700" onClick={() => onRemoveChip(kw)} aria-label={`Remove ${kw}`}>
                <FiX className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            className="flex-1 min-w-[140px] min-h-[44px] rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            placeholder="Add keyword + Enter"
            value={chipInput}
            onChange={(e) => setChipInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddChip();
              }
            }}
          />
          <button
            type="button"
            onClick={onAddChip}
            disabled={filters.keywords.length >= MAX_CHIPS}
            className="min-h-[44px] px-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-sm font-medium flex items-center gap-1"
          >
            <FiPlus className="w-4 h-4" /> Add
          </button>
        </div>
        {suggestedToAdd.length > 0 && (
          <button
            type="button"
            onClick={onAddSuggested}
            className="mt-2 text-xs text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
          >
            Add missing keywords ({suggestedToAdd.slice(0, 3).join(", ")})
          </button>
        )}
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Location (city)">
          <input
            className={inputClass}
            placeholder="e.g. Bengaluru, Hyderabad"
            value={filters.location}
            onChange={(e) => setField("location", e.target.value)}
          />
        </Field>
        <Field label="Work mode">
          <select
            className={inputClass}
            value={filters.workMode}
            onChange={(e) => setField("workMode", e.target.value)}
          >
            {WORK_MODES.map((o) => (
              <option key={o.value || "any"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Experience">
          <select
            className={inputClass}
            value={filters.experience}
            onChange={(e) => setField("experience", e.target.value)}
          >
            {EXPERIENCE.map((o) => (
              <option key={o.value || "any"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Date posted">
          <select
            className={inputClass}
            value={filters.datePosted}
            onChange={(e) => setField("datePosted", e.target.value)}
          >
            {DATE_POSTED.map((o) => (
              <option key={o.value || "any"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Job type">
          <select
            className={inputClass}
            value={filters.jobType}
            onChange={(e) => setField("jobType", e.target.value)}
          >
            {JOB_TYPES.map((o) => (
              <option key={o.value || "any"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Company (optional)">
          <input
            className={inputClass}
            value={filters.companyKeyword}
            onChange={(e) => setField("companyKeyword", e.target.value)}
            placeholder="Company name"
          />
        </Field>
        <Field label="Salary note (optional)">
          <input
            className={inputClass}
            value={filters.salaryKeyword}
            onChange={(e) => setField("salaryKeyword", e.target.value)}
            placeholder="e.g. 6 LPA"
          />
        </Field>
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
      {/* Mobile accordion */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-left text-sm font-semibold text-slate-900"
        >
          Filters & keywords
          <FiChevronDown className={`w-5 h-5 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
        </button>
        {mobileOpen && <div className="mt-4">{filterBody}</div>}
      </div>
      <div className="hidden md:block">{filterBody}</div>
    </div>
  );
}

export { MAX_CHIPS };
