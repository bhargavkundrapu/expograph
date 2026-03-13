import React from "react";
import type { ResumeData } from "../types";

/**
 * LaTeX-style compact resume template. ATS-friendly, tight spacing,
 * thin full-width section rules, single-line contact when possible.
 */
function strip(text: string): string {
  return text.replace(/[\u{1F300}-\u{1F9FF}]/gu, "").trim();
}

function skillsList(data: ResumeData): string[] {
  return (data.skills || [])
    .map((s) => (typeof s === "string" ? s : (s as { name?: string })?.name ?? ""))
    .filter(Boolean);
}

const SECTION_SPACING = "mt-2 mb-1";
const BULLET_SPACING = "mb-0.5";
const ITEM_SPACING = "mb-1.5";

export default function LatexClassic({ data }: { data: ResumeData }) {
  const d = data || ({} as ResumeData);
  const skills = skillsList(d);

  const contactParts: { label?: string; href?: string; text: string }[] = [];
  if (d.phone) contactParts.push({ text: strip(String(d.phone)) });
  if (d.email) contactParts.push({ label: "email", href: `mailto:${d.email}`, text: strip(d.email) });
  if (d.linkedinUrl) contactParts.push({ label: "LinkedIn", href: d.linkedinUrl, text: "LinkedIn" });
  if (d.githubUrl) contactParts.push({ label: "GitHub", href: d.githubUrl, text: "GitHub" });
  if (d.portfolioUrl) contactParts.push({ label: "Portfolio", href: d.portfolioUrl, text: "Portfolio" });

  const hasSummary = d.summary && strip(d.summary).length > 0;
  const hasSkills = skills.length > 0;
  const hasEducation = (d.education || []).some((e) => e?.institution || e?.degree);
  const hasExperience = (d.experience || []).some((e) => e?.company || e?.position);
  const hasProjects = (d.projects || []).some((p) => p?.name);
  const hasCertifications = (d.certifications || []).some((c) => c?.name);

  return (
    <div className="latex-classic resume-pdf-root text-[11px] leading-tight text-black bg-white font-sans antialiased">
      {/* Header: name + contact */}
      <header className="text-center mb-2">
        <h1 className="text-lg font-bold uppercase tracking-widest text-black mb-0.5">
          {strip(d.fullName || "Your Name")}
        </h1>
        {d.professionalTitle && (
          <p className="text-[10px] text-black/80 mb-1">{strip(d.professionalTitle)}</p>
        )}
        {contactParts.length > 0 && (
          <p className="flex flex-wrap justify-center items-center gap-x-1.5 gap-y-0.5 text-[10px] text-black break-words">
            {contactParts.map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-black/60 select-none">|</span>}
                {part.href ? (
                  <a
                    href={part.href}
                    className="text-black underline underline-offset-1 break-all hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {part.text}
                  </a>
                ) : (
                  <span>{part.text}</span>
                )}
              </React.Fragment>
            ))}
          </p>
        )}
      </header>

      {hasSummary && (
        <section className={`resume-export-section ${SECTION_SPACING}`}>
          <h2 className="text-[10px] font-semibold uppercase tracking-wide text-black border-b border-black/30 pb-0.5 mb-1 w-full">
            Summary
          </h2>
          <p className="whitespace-pre-wrap text-justify leading-snug">{strip(d.summary!)}</p>
        </section>
      )}

      {hasSkills && (
        <section className={`resume-export-section ${SECTION_SPACING}`}>
          <h2 className="text-[10px] font-semibold uppercase tracking-wide text-black border-b border-black/30 pb-0.5 mb-1 w-full">
            Technical Skills
          </h2>
          <p className="leading-snug">{skills.map((x) => strip(x)).join(", ")}</p>
        </section>
      )}

      {hasEducation && (
        <section className={`resume-export-section ${SECTION_SPACING}`}>
          <h2 className="text-[10px] font-semibold uppercase tracking-wide text-black border-b border-black/30 pb-0.5 mb-1 w-full">
            Education
          </h2>
          <ul className="list-none p-0 m-0 space-y-1.5">
            {(d.education || []).map(
              (edu, i) =>
                (edu?.institution || edu?.degree) && (
                  <li key={i} className={`resume-export-section ${ITEM_SPACING}`}>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-bold text-black">{strip(edu.institution || "")}</span>
                      <span className="text-[10px] whitespace-nowrap shrink-0">
                        {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="italic text-black/90">
                        {[edu.degree, edu.field].filter(Boolean).join(" in ") || "—"}
                      </span>
                      {edu.gpa != null && edu.gpa !== "" && (
                        <span className="text-[10px] italic whitespace-nowrap shrink-0">
                          CGPA: {strip(edu.gpa)}
                        </span>
                      )}
                    </div>
                  </li>
                )
            )}
          </ul>
        </section>
      )}

      {hasExperience && (
        <section className={`resume-export-section ${SECTION_SPACING}`}>
          <h2 className="text-[10px] font-semibold uppercase tracking-wide text-black border-b border-black/30 pb-0.5 mb-1 w-full">
            Work Experience
          </h2>
          <ul className="list-none p-0 m-0 space-y-1.5">
            {(d.experience || []).map(
              (exp, i) =>
                (exp?.company || exp?.position) && (
                  <li key={i} className={`resume-export-section ${ITEM_SPACING}`}>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-bold text-black">{strip(exp.position || "")}</span>
                      <span className="text-[10px] whitespace-nowrap shrink-0">
                        {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="italic text-black/90">{strip(exp.company || "")}</span>
                    </div>
                    {(exp.bullets || []).filter(Boolean).length > 0 && (
                      <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
                        {(exp.bullets || []).filter(Boolean).map((b, j) => (
                          <li key={j} className={BULLET_SPACING}>{strip(b)}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
            )}
          </ul>
        </section>
      )}

      {hasProjects && (
        <section className={`resume-export-section ${SECTION_SPACING}`}>
          <h2 className="text-[10px] font-semibold uppercase tracking-wide text-black border-b border-black/30 pb-0.5 mb-1 w-full">
            Projects
          </h2>
          <ul className="list-none p-0 m-0 space-y-1.5">
            {(d.projects || []).map(
              (p, i) =>
                p?.name && (
                  <li key={i} className={`resume-export-section ${ITEM_SPACING}`}>
                    <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                      <span className="font-bold text-black">{strip(p.name)}</span>
                      {p.technologies && strip(p.technologies) && (
                        <>
                          <span className="text-black/50 text-[10px]">|</span>
                          <span className="text-[10px] text-black/80">{strip(p.technologies)}</span>
                        </>
                      )}
                      {p.link && (
                        <>
                          <span className="text-black/50 text-[10px]">|</span>
                          <a
                            href={p.link}
                            className="text-[10px] text-black underline underline-offset-1 break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Demo
                          </a>
                        </>
                      )}
                    </div>
                    {(p.bullets || []).filter(Boolean).length > 0 && (
                      <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
                        {(p.bullets || []).filter(Boolean).map((b, j) => (
                          <li key={j} className={BULLET_SPACING}>{strip(b)}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
            )}
          </ul>
        </section>
      )}

      {hasCertifications && (
        <section className={`resume-export-section ${SECTION_SPACING}`}>
          <h2 className="text-[10px] font-semibold uppercase tracking-wide text-black border-b border-black/30 pb-0.5 mb-1 w-full">
            Certifications
          </h2>
          <ul className="list-none p-0 m-0 space-y-0.5">
            {(d.certifications || []).map(
              (c, i) =>
                c?.name && (
                  <li key={i} className="resume-export-section flex flex-wrap justify-between items-baseline gap-2">
                    <span className="font-medium text-black">{strip(c.name)}</span>
                    {(c.issuer || c.date || c.credentialId) && (
                      <span className="text-[10px] text-black/80 shrink-0">
                        {[c.issuer, c.date, c.credentialId].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </li>
                )
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
