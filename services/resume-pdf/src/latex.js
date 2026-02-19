/**
 * Safe LaTeX placeholder replacement: escape special chars and build blocks.
 * Do NOT allow raw LaTeX from user input.
 */

const LATEX_SPECIAL = /[\\{}$&#^_~%]/g;

function escapeLaTeX(str) {
  if (str == null || typeof str !== "string") return "";
  return str.replace(LATEX_SPECIAL, (c) => {
    const map = {
      "\\": "\\textbackslash{}",
      "{": "\\{",
      "}": "\\}",
      "$": "\\$",
      "&": "\\&",
      "#": "\\#",
      "^": "\\textasciicircum{}",
      "_": "\\_",
      "~": "\\textasciitilde{}",
      "%": "\\%",
    };
    return map[c] ?? c;
  });
}

/** Single-line field: no newlines, trim */
function sanitizeSingleLine(str) {
  if (str == null || typeof str !== "string") return "";
  return str.replace(/\s+/g, " ").trim();
}

/** URL: trim, basic validation */
function sanitizeUrl(str) {
  if (str == null || typeof str !== "string") return "";
  const s = str.trim();
  if (!s) return "";
  if (!/^https?:\/\/[^\s]+$/i.test(s)) return s; // allow non-URL as-is but trimmed
  return s;
}

function escapeAndSanitizeSingleLine(str) {
  return escapeLaTeX(sanitizeSingleLine(str));
}

function escapeAndSanitizeUrl(str) {
  return escapeLaTeX(sanitizeUrl(str));
}

/** Build education LaTeX block (tabularx: left = institution + degree, right = dates) */
function buildEducationBlock(items) {
  if (!Array.isArray(items) || items.length === 0) return "";
  const rows = items.slice(0, 5).map((e) => {
    const inst = escapeLaTeX(sanitizeSingleLine(e.institution || ""));
    const degree = escapeLaTeX(sanitizeSingleLine(e.degree || ""));
    const field = escapeLaTeX(sanitizeSingleLine(e.field || ""));
    const start = escapeLaTeX(sanitizeSingleLine(e.startDate || ""));
    const end = escapeLaTeX(sanitizeSingleLine(e.endDate || ""));
    const gpa = e.gpa ? escapeLaTeX(sanitizeSingleLine(String(e.gpa))) : "";
    const right = [start, end].filter(Boolean).join(" -- ") || "---";
    const left = [degree, field].filter(Boolean).join(" in ");
    const leftCell = left ? `\\textbf{${inst}}, ${left}${gpa ? ` (GPA: ${gpa})` : ""}` : `\\textbf{${inst}}`;
    return `${leftCell} & \\textit{${right}}`;
  });
  return rows.join(" \\\\\n");
}

/** Build experience LaTeX block; each item has bullets (max 6) */
function buildExperienceBlock(items) {
  if (!Array.isArray(items) || items.length === 0) return "";
  const out = [];
  items.slice(0, 5).forEach((e) => {
    const company = escapeLaTeX(sanitizeSingleLine(e.company || ""));
    const position = escapeLaTeX(sanitizeSingleLine(e.position || ""));
    const start = escapeLaTeX(sanitizeSingleLine(e.startDate || ""));
    const end = escapeLaTeX(sanitizeSingleLine(e.endDate || ""));
    const right = [start, end].filter(Boolean).join(" -- ") || "---";
    out.push(`\\textbf{${position}} at ${company} \\hfill \\textit{${right}}`);
    const bullets = Array.isArray(e.bullets) ? e.bullets : [];
    const bulletItems = bullets.slice(0, 6)
      .map((b) => escapeLaTeX(sanitizeSingleLine(String(b))))
      .filter(Boolean);
    if (bulletItems.length > 0) {
      out.push("\\begin{itemize}[leftmargin=*]");
      bulletItems.forEach((text) => { out.push(`  \\item ${text}`); });
      out.push("\\end{itemize}");
    }
  });
  return out.join("\n\n");
}

/** Build projects block; each project max 5 bullets */
function buildProjectsBlock(items) {
  if (!Array.isArray(items) || items.length === 0) return "";
  const out = [];
  items.slice(0, 6).forEach((p) => {
    const name = escapeLaTeX(sanitizeSingleLine(p.name || ""));
    const desc = escapeLaTeX(sanitizeSingleLine(p.description || ""));
    const tech = escapeLaTeX(sanitizeSingleLine(p.technologies || ""));
    const link = sanitizeUrl(p.link || "");
    out.push(`\\textbf{${name}}${tech ? ` \\textit{(${tech})}` : ""}`);
    if (desc) out.push(desc);
    const bullets = Array.isArray(p.bullets) ? p.bullets : [];
    const bulletItems = bullets.slice(0, 5)
      .map((b) => escapeLaTeX(sanitizeSingleLine(String(b))))
      .filter(Boolean);
    if (bulletItems.length > 0) {
      out.push("\\begin{itemize}[leftmargin=*]");
      bulletItems.forEach((text) => { out.push(`  \\item ${text}`); });
      out.push("\\end{itemize}");
    }
    if (link) out.push(`\\url{${escapeLaTeX(link)}}`);
  });
  return out.join("\n\n");
}

/** Build certifications block */
function buildCertificationsBlock(items) {
  if (!Array.isArray(items) || items.length === 0) return "";
  const lines = items.slice(0, 8).map((c) => {
    const name = escapeLaTeX(sanitizeSingleLine(c.name || ""));
    const issuer = escapeLaTeX(sanitizeSingleLine(c.issuer || ""));
    const date = escapeLaTeX(sanitizeSingleLine(c.date || ""));
    const id = c.credentialId ? escapeLaTeX(sanitizeSingleLine(String(c.credentialId))) : "";
    return `${name}${issuer ? ` (${issuer})` : ""}${date ? ` -- ${date}` : ""}${id ? ` [${id}]` : ""}`;
  });
  return lines.join(" \\\\\n  ");
}

/** Skills: comma-separated or itemize; max 15 */
function buildSkillsBlock(skills) {
  if (!Array.isArray(skills) || skills.length === 0) return "";
  const list = skills.slice(0, 15).map((s) => {
    const name = typeof s === "string" ? s : (s && s.name) ? String(s.name) : "";
    return escapeLaTeX(sanitizeSingleLine(name));
  }).filter(Boolean);
  return list.join(", ");
}

function fillTemplate(texSource, data) {
  const d = data || {};
  const fullName = escapeAndSanitizeSingleLine(d.fullName || "");
  const email = escapeAndSanitizeSingleLine(d.email || "");
  const phone = escapeAndSanitizeSingleLine(d.phone || "");
  const linkedinUrl = escapeAndSanitizeUrl(d.linkedinUrl || "") || "#";
  const githubUrl = escapeAndSanitizeUrl(d.githubUrl || "") || "#";
  const portfolioUrl = escapeAndSanitizeUrl(d.portfolioUrl || "") || "#";
  const summary = escapeLaTeX(sanitizeSingleLine((d.summary || "").slice(0, 600)));
  const skillsSection = buildSkillsBlock(d.skills || []);
  const educationBlock = buildEducationBlock(d.education || []);
  const experienceBlock = buildExperienceBlock(d.experience || []);
  const projectsBlock = buildProjectsBlock(d.projects || []);
  const certificationsBlock = buildCertificationsBlock(d.certifications || []);

  return texSource
    .replace(/\{\{\{FULL_NAME\}\}\}/g, fullName)
    .replace(/\{\{\{EMAIL\}\}\}/g, email)
    .replace(/\{\{\{PHONE\}\}\}/g, phone)
    .replace(/\{\{\{LINKEDIN_URL\}\}\}/g, linkedinUrl)
    .replace(/\{\{\{GITHUB_URL\}\}\}/g, githubUrl)
    .replace(/\{\{\{PORTFOLIO_URL\}\}\}/g, portfolioUrl)
    .replace(/\{\{\{SUMMARY\}\}\}/g, summary)
    .replace(/\{\{\{SKILLS_SECTION\}\}\}/g, skillsSection)
    .replace(/\{\{\{EDUCATION_BLOCK\}\}\}/g, educationBlock)
    .replace(/\{\{\{EXPERIENCE_BLOCK\}\}\}/g, experienceBlock)
    .replace(/\{\{\{PROJECTS_BLOCK\}\}\}/g, projectsBlock)
    .replace(/\{\{\{CERTIFICATIONS_BLOCK\}\}\}/g, certificationsBlock);
}

module.exports = {
  escapeLaTeX,
  sanitizeSingleLine,
  sanitizeUrl,
  buildEducationBlock,
  buildExperienceBlock,
  buildProjectsBlock,
  buildCertificationsBlock,
  buildSkillsBlock,
  fillTemplate,
};
