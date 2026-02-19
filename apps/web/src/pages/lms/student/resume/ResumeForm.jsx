import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLink,
  FiBook,
  FiBriefcase,
  FiFolder,
  FiAward,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { LIMITS, INITIAL_DATA } from "./resumeConstants";

const emptyEducation = () => ({
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  gpa: "",
});
const emptyExperience = () => ({
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  bullets: [""],
});
const emptyProject = () => ({
  name: "",
  description: "",
  technologies: "",
  link: "",
  bullets: [""],
});
const emptyCert = () => ({
  name: "",
  issuer: "",
  date: "",
  credentialId: "",
});

export default function ResumeForm({ data, onChange, errors = {} }) {
  const d = data || INITIAL_DATA;

  const update = (path, value) => {
    const next = { ...d };
    const parts = path.split(".");
    let cur = next;
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      const idx = parseInt(key, 10);
      if (!isNaN(idx)) {
        cur = cur[key];
      } else {
        if (!cur[key]) cur[key] = Array.isArray(value) ? [] : {};
        cur = cur[key];
      }
    }
    cur[parts[parts.length - 1]] = value;
    onChange(next);
  };

  const addSkill = () => {
    if ((d.skills || []).length >= LIMITS.skillsMax) return;
    update("skills", [...(d.skills || []), ""]);
  };
  const setSkill = (i, v) => {
    const s = [...(d.skills || [])];
    s[i] = v.slice(0, LIMITS.skillField);
    update("skills", s);
  };
  const removeSkill = (i) => {
    update("skills", (d.skills || []).filter((_, j) => j !== i));
  };

  const addEducation = () => {
    if ((d.education || []).length >= LIMITS.educationMax) return;
    update("education", [...(d.education || []), emptyEducation()]);
  };
  const setEducation = (i, field, v) => {
    const arr = [...(d.education || [])];
    arr[i] = { ...arr[i], [field]: v };
    update("education", arr);
  };
  const removeEducation = (i) => {
    update("education", (d.education || []).filter((_, j) => j !== i));
  };

  const addExperience = () => {
    if ((d.experience || []).length >= LIMITS.experienceMax) return;
    update("experience", [...(d.experience || []), emptyExperience()]);
  };
  const setExperience = (i, field, v) => {
    const arr = [...(d.experience || [])];
    if (field === "bullets") {
      arr[i] = { ...arr[i], bullets: Array.isArray(v) ? v : [v] };
    } else {
      arr[i] = { ...arr[i], [field]: v };
    }
    update("experience", arr);
  };
  const setExperienceBullet = (i, bi, v) => {
    const arr = [...(d.experience || [])];
    const bullets = [...(arr[i].bullets || [])];
    bullets[bi] = v.slice(0, 400);
    if (bullets.length <= LIMITS.experienceBulletsMax) arr[i].bullets = bullets;
    update("experience", arr);
  };
  const addExperienceBullet = (i) => {
    const arr = [...(d.experience || [])];
    const bullets = [...(arr[i].bullets || []), ""];
    if (bullets.length <= LIMITS.experienceBulletsMax) {
      arr[i].bullets = bullets;
      update("experience", arr);
    }
  };
  const removeExperienceBullet = (i, bi) => {
    const arr = [...(d.experience || [])];
    arr[i].bullets = (arr[i].bullets || []).filter((_, j) => j !== bi);
    update("experience", arr);
  };
  const removeExperience = (i) => {
    update("experience", (d.experience || []).filter((_, j) => j !== i));
  };

  const addProject = () => {
    if ((d.projects || []).length >= LIMITS.projectsMax) return;
    update("projects", [...(d.projects || []), emptyProject()]);
  };
  const setProject = (i, field, v) => {
    const arr = [...(d.projects || [])];
    if (field === "bullets") {
      arr[i] = { ...arr[i], bullets: Array.isArray(v) ? v : [v] };
    } else {
      arr[i] = { ...arr[i], [field]: v };
    }
    update("projects", arr);
  };
  const setProjectBullet = (i, bi, v) => {
    const arr = [...(d.projects || [])];
    const bullets = [...(arr[i].bullets || [])];
    bullets[bi] = v.slice(0, 400);
    if (bullets.length <= LIMITS.projectBulletsMax) arr[i].bullets = bullets;
    update("projects", arr);
  };
  const addProjectBullet = (i) => {
    const arr = [...(d.projects || [])];
    const bullets = [...(arr[i].bullets || []), ""];
    if (bullets.length <= LIMITS.projectBulletsMax) {
      arr[i].bullets = bullets;
      update("projects", arr);
    }
  };
  const removeProjectBullet = (i, bi) => {
    const arr = [...(d.projects || [])];
    arr[i].bullets = (arr[i].bullets || []).filter((_, j) => j !== bi);
    update("projects", arr);
  };
  const removeProject = (i) => {
    update("projects", (d.projects || []).filter((_, j) => j !== i));
  };

  const addCert = () => {
    if ((d.certifications || []).length >= LIMITS.certificationsMax) return;
    update("certifications", [...(d.certifications || []), emptyCert()]);
  };
  const setCert = (i, field, v) => {
    const arr = [...(d.certifications || [])];
    arr[i] = { ...arr[i], [field]: v };
    update("certifications", arr);
  };
  const removeCert = (i) => {
    update("certifications", (d.certifications || []).filter((_, j) => j !== i));
  };

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <FiUser className="w-5 h-5" /> Contact
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full name *</label>
            <input
              type="text"
              value={d.fullName || ""}
              onChange={(e) => update("fullName", e.target.value.slice(0, 150))}
              className="w-full border border-slate-300 rounded-xl px-3 py-2"
              placeholder="Your full name"
            />
            {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
            <input
              type="email"
              value={d.email || ""}
              onChange={(e) => update("email", e.target.value.slice(0, 200))}
              className="w-full border border-slate-300 rounded-xl px-3 py-2"
              placeholder="email@example.com"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <input
              type="text"
              value={d.phone || ""}
              onChange={(e) => update("phone", e.target.value.slice(0, 80))}
              className="w-full border border-slate-300 rounded-xl px-3 py-2"
              placeholder="+1 234 567 8900"
            />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
              <FiLink className="w-4 h-4" /> Links
            </label>
            <input
              type="url"
              value={d.linkedinUrl || ""}
              onChange={(e) => update("linkedinUrl", e.target.value.slice(0, 500))}
              className="w-full border border-slate-300 rounded-xl px-3 py-2"
              placeholder="LinkedIn URL"
            />
            <input
              type="url"
              value={d.githubUrl || ""}
              onChange={(e) => update("githubUrl", e.target.value.slice(0, 500))}
              className="w-full border border-slate-300 rounded-xl px-3 py-2"
              placeholder="GitHub URL"
            />
            <input
              type="url"
              value={d.portfolioUrl || ""}
              onChange={(e) => update("portfolioUrl", e.target.value.slice(0, 500))}
              className="w-full border border-slate-300 rounded-xl px-3 py-2"
              placeholder="Portfolio URL"
            />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Summary</h3>
        <textarea
          value={d.summary || ""}
          onChange={(e) => update("summary", e.target.value.slice(0, LIMITS.summary))}
          rows={4}
          className="w-full border border-slate-300 rounded-xl px-3 py-2"
          placeholder="Brief professional summary..."
        />
        <p className="text-slate-500 text-sm mt-1">{((d.summary || "").length)} / {LIMITS.summary}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <FiBriefcase className="w-5 h-5" /> Skills (max {LIMITS.skillsMax})
        </h3>
        {(d.skills || []).map((s, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={typeof s === "string" ? s : (s?.name || "")}
              onChange={(e) => setSkill(i, e.target.value)}
              className="flex-1 border border-slate-300 rounded-xl px-3 py-2"
              placeholder="Skill"
            />
            <button
              type="button"
              onClick={() => removeSkill(i)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSkill}
          disabled={(d.skills || []).length >= LIMITS.skillsMax}
          className="inline-flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-xl text-sm"
        >
          <FiPlus className="w-4 h-4" /> Add skill
        </button>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <FiBook className="w-5 h-5" /> Education (max {LIMITS.educationMax})
        </h3>
        {(d.education || []).map((edu, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 mb-4 bg-slate-50/50">
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                value={edu.institution || ""}
                onChange={(e) => setEducation(i, "institution", e.target.value)}
                placeholder="Institution"
                className="border border-slate-300 rounded-lg px-3 py-2"
              />
              <input
                value={edu.degree || ""}
                onChange={(e) => setEducation(i, "degree", e.target.value)}
                placeholder="Degree"
                className="border border-slate-300 rounded-lg px-3 py-2"
              />
              <input
                value={edu.field || ""}
                onChange={(e) => setEducation(i, "field", e.target.value)}
                placeholder="Field"
                className="border border-slate-300 rounded-lg px-3 py-2"
              />
              <div className="flex gap-2">
                <input
                  value={edu.startDate || ""}
                  onChange={(e) => setEducation(i, "startDate", e.target.value)}
                  placeholder="Start"
                  className="border border-slate-300 rounded-lg px-3 py-2 flex-1"
                />
                <input
                  value={edu.endDate || ""}
                  onChange={(e) => setEducation(i, "endDate", e.target.value)}
                  placeholder="End"
                  className="border border-slate-300 rounded-lg px-3 py-2 flex-1"
                />
              </div>
              <input
                value={edu.gpa || ""}
                onChange={(e) => setEducation(i, "gpa", e.target.value)}
                placeholder="GPA (optional)"
                className="border border-slate-300 rounded-lg px-3 py-2 sm:col-span-2"
              />
            </div>
            <button
              type="button"
              onClick={() => removeEducation(i)}
              className="mt-2 text-red-600 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addEducation}
          disabled={(d.education || []).length >= LIMITS.educationMax}
          className="inline-flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-xl text-sm"
        >
          <FiPlus className="w-4 h-4" /> Add education
        </button>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <FiBriefcase className="w-5 h-5" /> Experience (max {LIMITS.experienceMax}, {LIMITS.experienceBulletsMax} bullets each)
        </h3>
        {(d.experience || []).map((exp, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 mb-4 bg-slate-50/50">
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                value={exp.company || ""}
                onChange={(e) => setExperience(i, "company", e.target.value)}
                placeholder="Company"
                className="border border-slate-300 rounded-lg px-3 py-2"
              />
              <input
                value={exp.position || ""}
                onChange={(e) => setExperience(i, "position", e.target.value)}
                placeholder="Position"
                className="border border-slate-300 rounded-lg px-3 py-2"
              />
              <input
                value={exp.startDate || ""}
                onChange={(e) => setExperience(i, "startDate", e.target.value)}
                placeholder="Start date"
                className="border border-slate-300 rounded-lg px-3 py-2"
              />
              <input
                value={exp.endDate || ""}
                onChange={(e) => setExperience(i, "endDate", e.target.value)}
                placeholder="End date"
                className="border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>
            <p className="text-sm text-slate-600 mt-2">Bullets:</p>
            {(exp.bullets || []).map((b, bi) => (
              <div key={bi} className="flex gap-2 mt-1">
                <input
                  value={b}
                  onChange={(e) => setExperienceBullet(i, bi, e.target.value)}
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Achievement or responsibility"
                />
                <button
                  type="button"
                  onClick={() => removeExperienceBullet(i, bi)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addExperienceBullet(i)}
              disabled={(exp.bullets || []).length >= LIMITS.experienceBulletsMax}
              className="mt-2 text-sm text-indigo-600 hover:underline"
            >
              + Add bullet
            </button>
            <button
              type="button"
              onClick={() => removeExperience(i)}
              className="block mt-2 text-red-600 text-sm hover:underline"
            >
              Remove experience
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addExperience}
          disabled={(d.experience || []).length >= LIMITS.experienceMax}
          className="inline-flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-xl text-sm"
        >
          <FiPlus className="w-4 h-4" /> Add experience
        </button>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <FiFolder className="w-5 h-5" /> Projects (max {LIMITS.projectsMax}, {LIMITS.projectBulletsMax} bullets each)
        </h3>
        {(d.projects || []).map((proj, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 mb-4 bg-slate-50/50">
            <input
              value={proj.name || ""}
              onChange={(e) => setProject(i, "name", e.target.value)}
              placeholder="Project name"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-2"
            />
            <input
              value={proj.description || ""}
              onChange={(e) => setProject(i, "description", e.target.value)}
              placeholder="Short description"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-2"
            />
            <input
              value={proj.technologies || ""}
              onChange={(e) => setProject(i, "technologies", e.target.value)}
              placeholder="Technologies"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-2"
            />
            <input
              value={proj.link || ""}
              onChange={(e) => setProject(i, "link", e.target.value)}
              placeholder="Link (URL)"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-2"
            />
            {(proj.bullets || []).map((b, bi) => (
              <div key={bi} className="flex gap-2 mt-1">
                <input
                  value={b}
                  onChange={(e) => setProjectBullet(i, bi, e.target.value)}
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Bullet"
                />
                <button
                  type="button"
                  onClick={() => removeProjectBullet(i, bi)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addProjectBullet(i)}
              disabled={(proj.bullets || []).length >= LIMITS.projectBulletsMax}
              className="mt-2 text-sm text-indigo-600 hover:underline"
            >
              + Add bullet
            </button>
            <button
              type="button"
              onClick={() => removeProject(i)}
              className="block mt-2 text-red-600 text-sm hover:underline"
            >
              Remove project
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          disabled={(d.projects || []).length >= LIMITS.projectsMax}
          className="inline-flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-xl text-sm"
        >
          <FiPlus className="w-4 h-4" /> Add project
        </button>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <FiAward className="w-5 h-5" /> Certifications (max {LIMITS.certificationsMax})
        </h3>
        {(d.certifications || []).map((cert, i) => (
          <div key={i} className="flex flex-wrap gap-2 mb-2 items-center">
            <input
              value={cert.name || ""}
              onChange={(e) => setCert(i, "name", e.target.value)}
              placeholder="Name"
              className="border border-slate-300 rounded-lg px-3 py-2 w-48"
            />
            <input
              value={cert.issuer || ""}
              onChange={(e) => setCert(i, "issuer", e.target.value)}
              placeholder="Issuer"
              className="border border-slate-300 rounded-lg px-3 py-2 w-40"
            />
            <input
              value={cert.date || ""}
              onChange={(e) => setCert(i, "date", e.target.value)}
              placeholder="Date"
              className="border border-slate-300 rounded-lg px-3 py-2 w-28"
            />
            <input
              value={cert.credentialId || ""}
              onChange={(e) => setCert(i, "credentialId", e.target.value)}
              placeholder="Credential ID"
              className="border border-slate-300 rounded-lg px-3 py-2 w-32"
            />
            <button
              type="button"
              onClick={() => removeCert(i)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addCert}
          disabled={(d.certifications || []).length >= LIMITS.certificationsMax}
          className="inline-flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-xl text-sm"
        >
          <FiPlus className="w-4 h-4" /> Add certification
        </button>
      </section>
    </div>
  );
}
