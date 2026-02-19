export default function Review({ data, templateId, templates }) {
  const d = data || {};
  const template = (templates || []).find((t) => t.id === templateId) || { name: templateId };

  const skillsList = (d.skills || []).map((s) => (typeof s === "string" ? s : s?.name)).filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-slate-900 text-center mb-1">{d.fullName || "Your Name"}</h2>
      <p className="text-slate-600 text-center text-sm mb-4">
        {[d.email, d.phone].filter(Boolean).join(" · ")}
      </p>
      {([d.linkedinUrl, d.githubUrl, d.portfolioUrl].some(Boolean)) && (
        <p className="text-center text-sm text-indigo-600 mb-6">
          {d.linkedinUrl && <a href={d.linkedinUrl} target="_blank" rel="noopener noreferrer" className="mr-3">LinkedIn</a>}
          {d.githubUrl && <a href={d.githubUrl} target="_blank" rel="noopener noreferrer" className="mr-3">GitHub</a>}
          {d.portfolioUrl && <a href={d.portfolioUrl} target="_blank" rel="noopener noreferrer">Portfolio</a>}
        </p>
      )}

      {d.summary && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">Summary</h3>
          <p className="text-slate-700 text-sm">{d.summary}</p>
        </section>
      )}

      {skillsList.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">Skills</h3>
          <p className="text-slate-700 text-sm">{skillsList.join(", ")}</p>
        </section>
      )}

      {(d.education || []).length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">Education</h3>
          <ul className="space-y-2">
            {(d.education || []).map((edu, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span className="font-medium text-slate-800">{edu.institution}, {[edu.degree, edu.field].filter(Boolean).join(" in ")}</span>
                <span className="text-slate-500">{[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(d.experience || []).length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">Experience</h3>
          <ul className="space-y-4">
            {(d.experience || []).map((exp, i) => (
              <li key={i}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-800">{exp.position} at {exp.company}</span>
                  <span className="text-slate-500">{[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}</span>
                </div>
                {(exp.bullets || []).filter(Boolean).length > 0 && (
                  <ul className="list-disc list-inside text-slate-600 text-sm mt-1 ml-2">
                    {(exp.bullets || []).filter(Boolean).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(d.projects || []).length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">Projects</h3>
          <ul className="space-y-3">
            {(d.projects || []).map((p, i) => (
              <li key={i}>
                <span className="font-medium text-slate-800">{p.name}</span>
                {p.technologies && <span className="text-slate-500 text-sm"> ({p.technologies})</span>}
                {p.description && <p className="text-slate-600 text-sm mt-0.5">{p.description}</p>}
                {(p.bullets || []).filter(Boolean).length > 0 && (
                  <ul className="list-disc list-inside text-slate-600 text-sm mt-1 ml-2">
                    {(p.bullets || []).filter(Boolean).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(d.certifications || []).length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">Certifications</h3>
          <ul className="text-sm text-slate-700">
            {(d.certifications || []).map((c, i) => (
              <li key={i}>{c.name}{c.issuer ? ` (${c.issuer})` : ""}{c.date ? ` – ${c.date}` : ""}</li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-slate-400 text-xs text-center mt-6">Template: {template.name} · This is an overview; the PDF may differ slightly.</p>
    </div>
  );
}
