import React from "react";
import type { ResumeData } from "../types";

/**
 * Single resume template from scratch — matches classic layout:
 * Name + contact centered; section headings with horizontal line under each;
 * dates/CGPA/location right-aligned; black on white, Arial/Helvetica.
 */
function strip(text: string): string {
  return text.replace(/[\u{1F300}-\u{1F9FF}]/gu, "").trim();
}

function skillsList(data: ResumeData): string[] {
  return (data.skills || [])
    .map((s) => (typeof s === "string" ? s : s?.name ?? ""))
    .filter(Boolean);
}

const font = "Arial, Helvetica, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: font,
    fontSize: 8,
    lineHeight: 1.35,
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  name: {
    fontFamily: font,
    fontSize: 14,
    fontWeight: 700,
    color: "#000000",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 4,
    marginLeft: 0,
    marginRight: 0,
  },
  contactWrap: {
    textAlign: "center",
    fontSize: 8,
    color: "#000000",
    marginTop: 0,
    marginBottom: 8,
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: 5,
    borderBottom: "1px solid #000000",
  },
  contactLine: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "2px 8px",
  },
  link: {
    color: "#000000",
    textDecoration: "underline",
  },
  sectionTitle: {
    fontFamily: font,
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#000000",
    marginTop: 8,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: 2,
    borderBottom: "1px solid #000000",
  },
  sectionFirst: { marginTop: 0 },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 12,
    marginBottom: 2,
  },
  bold: { fontWeight: 700, color: "#000000" },
  regular: { fontWeight: 400, color: "#000000", fontSize: 8 },
  date: { fontSize: 8, whiteSpace: "nowrap", flexShrink: 0 },
  bullets: {
    marginLeft: 16,
    paddingLeft: 4,
    marginTop: 4,
    marginBottom: 0,
    listStylePosition: "outside",
  },
  bulletItem: { marginBottom: 2 },
};

export default function ResumeTemplate({ data }: { data: ResumeData }) {
  const d = data || ({} as ResumeData);
  const skills = skillsList(d);

  const contactParts: React.ReactNode[] = [];
  if (d.phone) contactParts.push(strip(String(d.phone)));
  if (d.email)
    contactParts.push(
      <a key="e" href={`mailto:${d.email}`} style={styles.link} rel="noopener noreferrer">
        {strip(d.email)}
      </a>
    );
  if (d.linkedinUrl)
    contactParts.push(
      <a key="li" href={d.linkedinUrl} style={styles.link} rel="noopener noreferrer">
        LinkedIn
      </a>
    );
  if (d.githubUrl)
    contactParts.push(
      <a key="gh" href={d.githubUrl} style={styles.link} rel="noopener noreferrer">
        Github
      </a>
    );
  if (d.portfolioUrl)
    contactParts.push(
      <a key="pf" href={d.portfolioUrl} style={styles.link} rel="noopener noreferrer">
        Portfolio
      </a>
    );
  if (d.location) contactParts.push(strip(String(d.location)));

  let sectionIdx = 0;
  const sectionStyle = (): React.CSSProperties =>
    sectionIdx++ === 0 ? { ...styles.sectionTitle, ...styles.sectionFirst } : styles.sectionTitle;

  return (
    <div style={styles.root}>
      <header style={styles.contactWrap}>
        <h1 style={styles.name}>{strip(d.fullName || "Your Name")}</h1>
        {contactParts.length > 0 && (
          <p style={styles.contactLine}>
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
          <p style={{ marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0, whiteSpace: "pre-wrap", textAlign: "justify", fontSize: 8 }}>
            {strip(d.summary)}
          </p>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 style={sectionStyle()}>TECHNICAL SKILLS</h2>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
            {skills.map((skill, i) => (
              <li key={i} style={{ marginBottom: 2, fontSize: 8 }}>
                {strip(skill)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(d.education || []).filter((e) => e?.institution || e?.degree).length > 0 && (
        <section>
          <h2 style={sectionStyle()}>EDUCATION</h2>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
            {(d.education || []).map((edu, i) =>
              edu?.institution || edu?.degree ? (
                <li key={i} style={{ marginBottom: 8 }}>
                  <div style={styles.row}>
                    <span style={styles.bold}>{strip(edu.institution || "")}</span>
                    <span style={styles.date}>
                      {[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}
                    </span>
                  </div>
                  {[edu.degree, edu.field].filter(Boolean).length > 0 && (
                    <div style={styles.row}>
                      <span style={{ ...styles.regular, fontSize: 8 }}>
                        {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                      </span>
                      {edu.gpa != null && edu.gpa !== "" && (
                        <span style={styles.date}>CGPA: {strip(edu.gpa)}</span>
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
          <ul style={{ listStyle: "none", padding: 0, marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
            {(d.experience || []).map((exp, i) =>
              exp?.company || exp?.position ? (
                <li key={i} style={{ marginBottom: 8 }}>
                  <div style={styles.row}>
                    <span style={styles.bold}>{strip(exp.position || "")}</span>
                    <span style={styles.date}>
                      {[exp.startDate, exp.endDate].filter(Boolean).join(" - ")}
                    </span>
                  </div>
                  {(exp.company || d.location) && (
                    <div style={styles.row}>
                      <span style={styles.regular}>{strip(exp.company || "")}</span>
                      {d.location && (
                        <span style={styles.date}>{strip(String(d.location))}</span>
                      )}
                    </div>
                  )}
                  {(exp.bullets || []).filter(Boolean).length > 0 && (
                    <ul style={styles.bullets}>
                      {(exp.bullets || []).filter(Boolean).map((b, j) => (
                        <li key={j} style={styles.bulletItem}>{strip(b)}</li>
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
          <ul style={{ listStyle: "none", padding: 0, marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
            {(d.projects || []).map((p, i) =>
              p?.name ? (
                <li key={i} style={{ marginBottom: 8 }}>
                  <div style={styles.row}>
                    <span>
                      <span style={styles.bold}>{strip(p.name)}</span>
                      {p.technologies && (
                        <>
                          {" | "}
                          <span style={styles.regular}>{strip(p.technologies)}</span>
                        </>
                      )}
                      {p.link && (
                        <>
                          {" | "}
                          <a href={p.link} style={styles.link} rel="noopener noreferrer">
                            Live Demo
                          </a>
                        </>
                      )}
                    </span>
                  </div>
                  {(p.bullets || []).filter(Boolean).length > 0 && (
                    <ul style={styles.bullets}>
                      {(p.bullets || []).filter(Boolean).map((b, j) => (
                        <li key={j} style={styles.bulletItem}>{strip(b)}</li>
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
          <ul style={{ ...styles.bullets, listStyle: "disc", marginTop: 6 }}>
            {(d.certifications || []).map((c, i) =>
              c?.name ? (
                <li key={i} style={styles.bulletItem}>
                  <span style={styles.bold}>{strip(c.name)}</span>
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
          <ul style={{ ...styles.bullets, marginTop: 6 }}>
            {(d.achievements || []).filter(Boolean).map((a, i) => (
              <li key={i} style={styles.bulletItem}>{strip(String(a))}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
