import { useState } from "react";
import { FiDownload } from "react-icons/fi";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function DownloadPanel({ templateId, data, token, onError }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
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
        if (res.status === 503 || res.status === 504) {
          msg = (msg && msg.includes("docker")) ? msg : "PDF service is not running. Use Docker: from apps/api run 'docker compose up -d resume-pdf'. Without Docker: install MiKTeX (Windows) or TeX Live, then run 'npm start' in services/resume-pdf. See docs/RESUME_BUILDER.md.";
        } else if (res.status === 502 && (!msg || msg === "Download failed" || msg.includes("Resume service error"))) {
          msg = "PDF service may be down or failed to build the PDF. Start it (Docker or npm start in services/resume-pdf). See docs/RESUME_BUILDER.md.";
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
      const msg = err.message || "Network error";
      setError(msg);
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
      {error && (
        <p className="mt-4 text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
}
