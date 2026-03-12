import React from "react";
import type { ResumeData } from "../types";

/**
 * Classic one-page resume (requirements layout): black on white, serif font.
 * Section headings with horizontal line below each; dates/CGPA right-aligned.
 * Preview and PDF look identical — simple and classic.
 */
function strip(text: string): string {
  return text.replace(/[\u{1F300}-\u{1F9FF}]/gu, "").trim();
}

function skillsList(data: ResumeData): string[] {
  return (data.skills || [])
    .map((s) => (typeof s === "string" ? s : s?.name ?? ""))
    .filter(Boolean);
}

const font = "'Times New Roman', Times, Georgia, serif";

const s = {
  root: {
    fontFamily: font,
    fontSize: 11,
    lineHeight: 1.4,
    color: "#000000",
    backgroundColor: "#ffffff",
  } as React.CSSProperties,
  name: {
    fontFamily: font,
    fontSize: 20,
    fontWeight: 700,
    color: "#000000",
    textAlign: "center" as const,
    marginBottom: 4,
    marginTop: 0,
  } as React.CSSProperties,
  contactWrap: {
    textAlign: "center" as const,
    fontSize: 10,
    color: "#000000",
    marginBottom: 14,
    paddingBottom: 10,
    borderBottom: "1px solid #000000",
  } as React.CSSProperties,
  contactLine: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "2px 6px",
  } as React.CSSProperties,
  link: {
    color: "#000000",
    textDecoration: "underline",
  } as React.CSSProperties,
  sectionTitle: {
    fontFamily: font,
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    color: "#000000",
    marginTop: 14,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: 6,
    borderBottom: "1px solid #000000",
  } as React.CSSProperties,
  sectionFirst: { marginTop: 0 } as React.CSSProperties,
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 12,
    marginBottom: 2,
  } as React.CSSProperties,
  bold: { fontWeight: 700, color: "#000000" } as React.CSSProperties,
  italic: { fontStyle: "italic" as const, color: "#000000" } as React.CSSProperties,
  regular: { fontWeight: 400, color: "#000000" } as React.CSSProperties,
  date: { fontSize: 10, whiteSpace: "nowrap" as const, flexShrink: 0 } as React.CSSProperties,
  bullets: {
    marginLeft: 18,
    paddingLeft: 4,
    marginTop: 4,
    marginBottom: 0,
    listStylePosition: "outside" as const,
  } as React.CSSProperties,
  bulletItem: { marginBottom: 2 } as React.CSSProperties,
};

export default function TemplateClean({ data, forExport = false }: { data: ResumeData; forExport?: boolean }) {
  const d = data || ({} as ResumeData);
  const skills = skillsList(d);

  const contactParts: React.ReactNode[] = [];
  if (d.phone) contactParts.push(strip(String(d.phone)));
  if (d.email)
    contactParts.push(
      <a key="e" href={`mailto:${d.email}`} style={s.link} rel="noopener noreferrer">
        {strip(d.email)}
      </a>
    );
  if (d.linkedinUrl)
    contactParts.push(
      <a key="li" href={d.linkedinUrl} style={s.link} rel="noopener noreferrer">
        LinkedIn
      </a>
    );
  if (d.githubUrl)
    contactParts.push(
      <a key="gh" href={d.githubUrl} style={s.link} rel="noopener noreferrer">
        Github
      </a>
    );
  if (d.portfolioUrl)
    contactParts.push(
      <a key="pf" href={d.portfolioUrl} style={s.link} rel="noopener noreferrer">
        Portfolio
      </a>
    );
  if (d.location) contactParts.push(strip(String(d.location)));

  let sectionIdx = 0;
  const sectionStyle = () =>
    sectionIdx++ === 0 ? { ...s.sectionTitle, ...s.sectionFirst } : s.sectionTitle;

  return (
    <div
      className={forExport ? "template-clean resume-pdf-root" : "template-clean"}
      style={s.root}
    >
      <header style={s.contactWrap}>
        <h1 style={s.name}>{strip(d.fullName || "Your Name")}</h1>
        {contactParts.length > 0 && (
          <p style={s.contactLine}>
            {contactParts.map((node, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ userSelect: "none" }}> | </span>}
                {node}
              </React.Fragment>
            ))}
          </p>
        )}
      </header>

      {d.summary && (
        <section>
          <h2 style={sectionStyle()}>SUMMARY</h2>
          <p style={{ marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0, whiteSpace: "pre-wrap", textAlign: "justify" as const }}>{strip(d.summary)}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 style={sectionStyle()}>TECHNICAL SKILLS</h2>
          <p style={{ marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{skills.map((x) => strip(x)).join(", ")}</p>
        </section>
      )}

      {(d.education || []).filter((e) => e?.institution || e?.degree).length > 0 && (
        <section>
          <h2 style={sectionStyle()}>EDUCATION</h2>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 6, marginRight: 0, marginBottom: 0, marginLeft: 0 }}>
            {(d.education || []).map((edu, i) =>
              edu?.institution || edu?.degree ? (
                <li key={i} style={{ marginBottom: 10 }}>
                  <div style={s.row}>
                    <span style={s.bold}>{strip(edu.institution || "")}</span>
                    <span style={s.date}>
                      {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                    </span>
                  </div>
                  {[edu.degree, edu.field].filter(Boolean).length > 0 && (
                    <div style={s.row}>
                      <span style={{ ...s.regular, fontSize: 10 }}>{[edu.degree, edu.field].filter(Boolean).join(" in ")}</span>
                      {edu.gpa != null && edu.gpa !== "" && (
                        <span style={s.date}>CGPA: {strip(edu.gpa)}</span>
                      )}
                    </div>
                  )}
                </li>
              ) : null
            )}
          </ul>
        </section>
      )}

      {(d.experience || []).filter((e) => e?.company || e?.position).length > 0 && (
        <section>
          <h2 style={sectionStyle()}>WORK EXPERIENCE</h2>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 6, marginRight: 0, marginBottom: 0, marginLeft: 0 }}>
            {(d.experience || []).map((exp, i) =>
              exp?.company || exp?.position ? (
                <li key={i} style={{ marginBottom: 10 }}>
                  <div style={s.row}>
                    <span style={s.bold}>{strip(exp.position || "")}</span>
                    <span style={s.date}>
                      {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
                    </span>
                  </div>
                  {(exp.company || d.location) && (
                    <div style={s.row}>
                      <span style={{ fontSize: 10 }}>{strip(exp.company || "")}</span>
                      {d.location && (
                        <span style={s.date}>{strip(String(d.location))}</span>
                      )}
                    </div>
                  )}
                  {(exp.bullets || []).filter(Boolean).length > 0 && (
                    <ul style={s.bullets}>
                      {(exp.bullets || []).filter(Boolean).map((b, j) => (
                        <li key={j} style={s.bulletItem}>{strip(b)}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : null
            )}
          </ul>
        </section>
      )}

      {(d.projects || []).filter((p) => p?.name).length > 0 && (
        <section>
          <h2 style={sectionStyle()}>PROJECTS</h2>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 6, marginRight: 0, marginBottom: 0, marginLeft: 0 }}>
            {(d.projects || []).map((p, i) =>
              p?.name ? (
                <li key={i} style={{ marginBottom: 10 }}>
                  <div style={s.row}>
                    <span>
                      <span style={s.bold}>{strip(p.name)}</span>
                      {p.technologies && (
                        <>
                          {" | "}
                          <span style={{ fontWeight: 400 }}>{strip(p.technologies)}</span>
                        </>
                      )}
                      {p.link && (
                        <>
                          {" | "}
                          <a href={p.link} style={s.link} rel="noopener noreferrer">
                            Live Demo
                          </a>
                        </>
                      )}
                    </span>
                  </div>
                  {(p.bullets || []).filter(Boolean).length > 0 && (
                    <ul style={s.bullets}>
                      {(p.bullets || []).filter(Boolean).map((b, j) => (
                        <li key={j} style={s.bulletItem}>{strip(b)}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : null
            )}
          </ul>
        </section>
      )}

      {(d.certifications || []).filter((c) => c?.name).length > 0 && (
        <section>
          <h2 style={sectionStyle()}>CERTIFICATIONS</h2>
          <ul style={{ ...s.bullets, listStyle: "disc", marginTop: 6 }}>
            {(d.certifications || []).map((c, i) =>
              c?.name ? (
                <li key={i} style={s.bulletItem}>
                  <span style={s.bold}>{strip(c.name)}</span>
                  {(c.issuer || c.date) && ` | ${[c.issuer, c.date].filter(Boolean).join(" ")}`}
                </li>
              ) : null
            )}
          </ul>
        </section>
      )}

      {(d.achievements || []).filter(Boolean).length > 0 && (
        <section>
          <h2 style={sectionStyle()}>ACHIEVEMENTS</h2>
          <ul style={{ ...s.bullets, marginTop: 6 }}>
            {(d.achievements || []).filter(Boolean).map((a, i) => (
              <li key={i} style={s.bulletItem}>{strip(String(a))}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
