import { useState } from "react";
import { FiDownload, FiPrinter } from "react-icons/fi";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

/** Build print-ready HTML from resume data (fallback when PDF service is down) */
function buildPrintHtml(d) {
  const skillsList = (d?.skills || []).map((s) => (typeof s === "string" ? s : s?.name)).filter(Boolean);
  const esc = (t) => (t ?? "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Resume - ${esc(d?.fullName || "Resume")}</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; max-width: 700px; margin: 24px auto; padding: 0 20px; color: #1e293b; line-height: 1.5; }
  h1 { font-size: 1.75rem; margin-bottom: 4px; }
  .contact { color: #64748b; font-size: 0.9rem; margin-bottom: 16px; }
  section { margin-bottom: 20px; }
  .section-title { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 8px; }
  ul { margin: 4px 0; padding-left: 20px; }
  .job { margin-bottom: 12px; }
  .job-header { display: flex; justify-content: space-between; font-weight: 500; }
  .job-dates { color: #64748b; font-size: 0.9rem; }
  @media print { body { margin: 0; padding: 16px; } }
</style></head><body>
  <h1>${esc(d?.fullName || "Your Name")}</h1>
  <p class="contact">${[d?.email, d?.phone].filter(Boolean).map(esc).join(" · ") || ""}</p>
  ${(d?.linkedinUrl || d?.githubUrl || d?.portfolioUrl) ? `<p>${[d?.linkedinUrl && `<a href="${esc(d.linkedinUrl)}">LinkedIn</a>`, d?.githubUrl && `<a href="${esc(d.githubUrl)}">GitHub</a>`, d?.portfolioUrl && `<a href="${esc(d.portfolioUrl)}">Portfolio</a>`].filter(Boolean).join(" · ")}</p>` : ""}
  ${d?.summary ? `<section><div class="section-title">Summary</div><p>${esc(d.summary)}</p></section>` : ""}
  ${skillsList.length ? `<section><div class="section-title">Skills</div><p>${skillsList.map(esc).join(", ")}</p></section>` : ""}
  ${((d?.education || []).length > 0) ? `<section><div class="section-title">Education</div><ul>${(d.education || []).map((edu) => `<li><strong>${esc(edu.institution)}</strong>, ${[edu.degree, edu.field].filter(Boolean).join(" in ")} — ${[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</li>`).join("")}</ul></section>` : ""}
  ${((d?.experience || []).length > 0) ? `<section><div class="section-title">Experience</div>${(d.experience || []).map((exp) => `<div class="job"><div class="job-header"><span>${esc(exp.position)} at ${esc(exp.company)}</span><span class="job-dates">${[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}</span></div>${(exp.bullets || []).filter(Boolean).length ? `<ul>${(exp.bullets || []).filter(Boolean).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}</div>`).join("")}</section>` : ""}
  ${((d?.projects || []).length > 0) ? `<section><div class="section-title">Projects</div>${(d.projects || []).map((p) => `<div class="job"><strong>${esc(p.name)}</strong>${p.technologies ? ` (${esc(p.technologies)})` : ""}${p.description ? `<p>${esc(p.description)}</p>` : ""}${(p.bullets || []).filter(Boolean).length ? `<ul>${(p.bullets || []).filter(Boolean).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}</div>`).join("")}</section>` : ""}
  ${((d?.certifications || []).length > 0) ? `<section><div class="section-title">Certifications</div><ul>${(d.certifications || []).map((c) => `<li>${esc(c.name)}${c.issuer ? ` (${esc(c.issuer)})` : ""}${c.date ? ` – ${esc(c.date)}` : ""}</li>`).join("")}</ul></section>` : ""}
  <p style="margin-top:24px;font-size:12px;color:#94a3b8">Print this page and choose "Save as PDF" in the print dialog.</p>
</body></html>`;
}

export default function DownloadPanel({ templateId, data, token, onError }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serviceDown, setServiceDown] = useState(false);

  const handlePrintToPdf = () => {
    const html = buildPrintHtml(data || {});
    const w = window.open("", "_blank");
    if (!w) {
      setError("Please allow popups to use Print to PDF.");
      return;
    }
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => {
      w.print();
      w.onafterprint = () => w.close();
    }, 300);
  };

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    setServiceDown(false);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/resume/pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ templateId, data }),
      });

      if (!res.ok) {
        const text = await res.text();
        let msg = "Download failed";
        try {
          const j = JSON.parse(text);
          msg = j.error?.message ?? j.error ?? msg;
        } catch (_) {}
        const isServiceDown = res.status === 502 || res.status === 503 || res.status === 504;
        if (isServiceDown) {
          setServiceDown(true);
          msg = "PDF service is unavailable. Use Print to PDF below—it works without the server.";
        } else if (res.status === 429) {
          msg = "Too many requests. Please try again in a few minutes.";
        }
        setError(msg);
        onError?.(msg);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      const msg = err.message || "Network error. The PDF service may be down.";
      setError(msg);
      setServiceDown(true);
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FiDownload className="w-5 h-5" />
        {loading ? "Generating PDF…" : "Download PDF"}
      </button>

      {serviceDown && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-amber-800 text-sm mb-3">
            The PDF service is not running. Use the button below to print and save as PDF:
          </p>
          <button
            type="button"
            onClick={handlePrintToPdf}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition-colors"
          >
            <FiPrinter className="w-5 h-5" />
            Print to PDF
          </button>
          <p className="text-slate-600 text-xs mt-2">
            In the print dialog, choose &quot;Save as PDF&quot; as the destination.
          </p>
        </div>
      )}

      {error && !serviceDown && (
        <p className="mt-4 text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
}
