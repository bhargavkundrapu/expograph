import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import { useTheme } from "../../app/providers/ThemeProvider";
import { apiFetch, ApiError } from "../../services/api";
import { GenericPageSkeleton } from "../common/SkeletonLoaders";
import { Badge } from "../ui/badge";
import { FiAward, FiDownload, FiLock, FiCheckCircle, FiClock } from "react-icons/fi";

const ELIGIBLE_URL = "/api/v1/certifications/eligible";
const REQUEST_URL = "/api/v1/certifications/request";
const MY_CERTIFICATES_URL = "/api/v1/lms/certificates/mine";
const ENSURE_ISSUED_URL = "/api/v1/lms/certificates/ensure-issued";
const CERTIFICATE_LOGO_URL = "/certificate-logo.png";
const MCA_LOGO_URL = "https://res.cloudinary.com/da2wrgabu/image/upload/v1772184237/MCA_Logo_3_1_wdhccw.svg";

async function imageUrlToPngDataUrl(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Unable to fetch image");
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("svg")) {
    const svgText = await response.text();
    const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const objectUrl = URL.createObjectURL(svgBlob);
    try {
      const image = new Image();
      const loaded = new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });
      image.src = objectUrl;
      await loaded;
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, image.naturalWidth || 1200);
      canvas.height = Math.max(1, image.naturalHeight || 300);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No canvas context");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/png");
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  const imageBlob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(imageBlob);
  });
}

function createSignatureDataUrl() {
  const canvas = document.createElement("canvas");
  canvas.width = 760;
  canvas.height = 220;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.translate(40, 30);

  // Signature body tuned to match provided sample style.
  ctx.strokeStyle = "#1e3a8a";
  ctx.lineWidth = 6;
  ctx.beginPath();
  // "K"
  ctx.moveTo(42, 118);
  ctx.bezierCurveTo(72, 76, 100, 62, 120, 72);
  ctx.bezierCurveTo(104, 84, 92, 96, 82, 112);
  ctx.bezierCurveTo(92, 126, 106, 132, 124, 126);
  ctx.moveTo(114, 96);
  ctx.bezierCurveTo(140, 78, 164, 64, 186, 52);
  ctx.moveTo(116, 96);
  ctx.bezierCurveTo(144, 118, 170, 134, 206, 146);
  // "."
  ctx.moveTo(216, 116);
  ctx.bezierCurveTo(220, 112, 224, 112, 226, 116);
  // "Bhargav" connected
  ctx.moveTo(256, 126);
  ctx.bezierCurveTo(272, 84, 298, 76, 314, 102);
  ctx.bezierCurveTo(324, 122, 310, 140, 288, 136);
  ctx.moveTo(312, 104);
  ctx.bezierCurveTo(330, 78, 360, 82, 370, 106);
  ctx.bezierCurveTo(380, 132, 404, 136, 420, 112);
  ctx.bezierCurveTo(438, 88, 462, 90, 470, 114);
  ctx.bezierCurveTo(480, 138, 506, 138, 526, 112);
  ctx.bezierCurveTo(540, 94, 552, 100, 566, 118);
  ctx.bezierCurveTo(582, 142, 592, 168, 580, 182); // g loop down
  ctx.bezierCurveTo(566, 194, 548, 176, 560, 158);
  ctx.bezierCurveTo(578, 132, 618, 120, 654, 120); // a/v tail
  ctx.stroke();

  // Long underline flourish as in sample.
  ctx.strokeStyle = "#1e3a8a";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(82, 166);
  ctx.bezierCurveTo(210, 176, 396, 168, 676, 146);
  ctx.bezierCurveTo(690, 144, 706, 146, 716, 150);
  // Small front swoosh
  ctx.moveTo(74, 170);
  ctx.bezierCurveTo(102, 152, 132, 148, 166, 164);
  ctx.stroke();

  return canvas.toDataURL("image/png");
}

function Toast({ message, type, onDismiss }) {
  if (!message) return null;
  const isSuccess = type === "success";
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
        isSuccess ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
      }`}
    >
      {message}
      <button
        type="button"
        onClick={onDismiss}
        className="ml-2 opacity-80 hover:opacity-100"
        aria-label="Dismiss"
      >
        ×
      </button>
    </motion.div>
  );
}

function getStatusBadge(item, isDark) {
  const req = item.request_status;
  if (req === "approved" || req === "issued") {
    return <Badge className="bg-emerald-600 text-white border-0">Approved / Issued</Badge>;
  }
  if (req === "rejected") {
    return <Badge variant="destructive">Rejected</Badge>;
  }
  if (req === "pending") {
    return <Badge className="bg-amber-500 text-white border-0">Requested</Badge>;
  }
  if (item.progress_percent >= 100) {
    return <Badge className="bg-cyan-600 text-white border-0">Eligible</Badge>;
  }
  return (
    <Badge variant="secondary" className={isDark ? "bg-slate-600" : ""}>
      In Progress
    </Badge>
  );
}

function CourseCard({
  item,
  isDark,
  token,
  onRequestSuccess,
  requestInFlight,
  setRequestInFlight,
  certificateByCourseId,
  onDownload,
}) {
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);
  const loading = localLoading || requestInFlight === item.course_id;

  const handleRequest = async () => {
    if (loading || item.request_status === "pending" || item.progress_percent < 100) return;
    setRequestInFlight(item.course_id);
    setLocalLoading(true);
    try {
      const res = await apiFetch(REQUEST_URL, {
        method: "POST",
        token,
        body: { course_id: item.course_id },
      });
      if (res?.ok && res?.data) {
        onRequestSuccess(res.data);
      }
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Request failed";
      onRequestSuccess(null, msg);
    } finally {
      setLocalLoading(false);
      setRequestInFlight(null);
    }
  };

  const canRequest = item.progress_percent >= 100 && !item.request_status;
  const isPending = item.request_status === "pending";
  const isApproved = item.request_status === "approved" || item.request_status === "issued";
  const issuedCert = certificateByCourseId?.[item.course_id] ?? null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border-2 p-5 sm:p-6 ${
        isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className={`font-bold text-lg truncate ${isDark ? "text-white" : "text-slate-900"}`}>
            {item.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span>{getStatusBadge(item, isDark)}</span>
          </div>
        </div>
        <div className="flex-shrink-0 w-full sm:w-48">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, item.progress_percent)}%` }}
              />
            </div>
            <span className={`text-xs font-medium tabular-nums ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {item.progress_percent}%
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.progress_percent < 100 && (
          <button
            type="button"
            disabled
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-not-allowed ${
              isDark ? "bg-slate-700 text-slate-400" : "bg-slate-100 text-slate-500"
            }`}
          >
            <FiLock className="w-4 h-4" /> Complete Course to Unlock
          </button>
        )}
        {canRequest && (
          <button
            type="button"
            disabled={loading}
            onClick={handleRequest}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <FiClock className="w-4 h-4 animate-spin" /> Requesting…
              </>
            ) : (
              <>Request Certificate</>
            )}
          </button>
        )}
        {isPending && (
          <button type="button" disabled className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 text-slate-500 cursor-default dark:bg-slate-700 dark:text-slate-400">
            Requested
          </button>
        )}
        {isApproved && (
          <button
            type="button"
            onClick={() => onDownload(item, issuedCert)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
          >
            <FiDownload className="w-4 h-4" /> Download
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function StudentCertifications() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ message: null, type: "success" });
  const [requestInFlight, setRequestInFlight] = useState(null);
  const [certificateByCourseId, setCertificateByCourseId] = useState({});

  const fetchEligible = useCallback(async () => {
    if (!token) return;
    setError(null);
    try {
      const res = await apiFetch(ELIGIBLE_URL, { token });
      const data = res?.data;
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Failed to load");
      setList([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchMyCertificates = useCallback(async () => {
    if (!token) return {};
    const res = await apiFetch(MY_CERTIFICATES_URL, { token });
    const rows = Array.isArray(res?.data) ? res.data : [];
    const byCourse = {};
    rows.forEach((row) => {
      if (row?.course_id && !byCourse[row.course_id]) {
        byCourse[row.course_id] = row;
      }
    });
    setCertificateByCourseId(byCourse);
    return byCourse;
  }, [token]);

  useEffect(() => {
    fetchEligible();
  }, [fetchEligible]);

  useEffect(() => {
    fetchMyCertificates().catch(() => {
      // Do not block page render if certificate list fails.
    });
  }, [fetchMyCertificates]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast((t) => (t.message === message ? { ...t, message: null } : t)), 5000);
  };

  const onRequestSuccess = (data, errorMessage) => {
    if (errorMessage) {
      showToast(errorMessage === "Already requested" ? "Already requested" : errorMessage, "error");
    } else {
      showToast("Certificate requested. Admin will review shortly.", "success");
    }
    fetchEligible();
  };

  const sanitizeFileName = (value) =>
    String(value || "certificate")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);

  const formatIssuedDate = (value) => {
    if (!value) return new Date().toLocaleDateString();
    return new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  const downloadCertificatePdf = async (item, cert) => {
    if (!cert) {
      showToast("Certificate is approved but not issued yet. Please try again in a few seconds.", "error");
      return;
    }
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4", orientation: "landscape" });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 30;

      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      doc.setDrawColor(15, 23, 42);
      doc.setLineWidth(1.5);
      doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

      doc.setDrawColor(14, 165, 233);
      doc.setLineWidth(0.8);
      doc.rect(margin + 10, margin + 10, pageWidth - (margin + 10) * 2, pageHeight - (margin + 10) * 2);

      // Top-left brand logo (same as login page).
      try {
        const brandLogo = new Image();
        brandLogo.crossOrigin = "anonymous";
        const logoLoaded = new Promise((resolve, reject) => {
          brandLogo.onload = resolve;
          brandLogo.onerror = reject;
        });
        brandLogo.src = CERTIFICATE_LOGO_URL;
        await logoLoaded;
        // Increased height with extra top breathing space.
        doc.addImage(brandLogo, "PNG", margin + 16, margin + 14, 110, 70);
      } catch {
        // Keep PDF generation resilient if remote image load fails.
      }

      doc.setFont("helvetica", "bold");
      doc.setTextColor(2, 132, 199);
      doc.setFontSize(18);
      doc.text("EXPOGRAPH ACADEMY", pageWidth / 2, 80, { align: "center" });

      doc.setFont("times", "bold");
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(38);
      doc.text("Certificate of Completion", pageWidth / 2, 140, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setTextColor(71, 85, 105);
      doc.setFontSize(16);
      doc.text("This is proudly presented to", pageWidth / 2, 186, { align: "center" });

      const recipientName = cert.full_name || user?.full_name || user?.name || cert.email || user?.email || "Student";
      doc.setFont("times", "bolditalic");
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(34);
      doc.text(recipientName, pageWidth / 2, 236, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.setFontSize(16);
      doc.text("for successfully completing", pageWidth / 2, 275, { align: "center" });

      const courseTitle = cert.course_title || item.title || "Program";
      doc.setFont("helvetica", "bold");
      doc.setTextColor(3, 105, 161);
      doc.setFontSize(24);
      doc.text(courseTitle, pageWidth / 2, 312, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setTextColor(71, 85, 105);
      doc.setFontSize(13);
      const line1 = `Issued on: ${formatIssuedDate(cert.issued_at)}`;
      const line2 = `Certificate ID: ${cert.id}  |  Verification Code: ${cert.verify_code}`;
      doc.text(line1, pageWidth / 2, 348, { align: "center" });
      doc.text(line2, pageWidth / 2, 370, { align: "center" });

      const signY = pageHeight - 98;
      // Custom signature mark generated as drawn strokes (not plain text).
      const signatureDataUrl = createSignatureDataUrl();
      if (signatureDataUrl) {
        doc.addImage(signatureDataUrl, "PNG", pageWidth / 2 - 150, signY - 64, 300, 72);
      } else {
        doc.setFont("times", "italic");
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(26);
        doc.text("K Bhargav", pageWidth / 2, signY - 14, { align: "center" });
      }

      doc.setDrawColor(100, 116, 139);
      doc.line(pageWidth / 2 - 130, signY, pageWidth / 2 + 130, signY);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Director of Expograph", pageWidth / 2, signY + 18, { align: "center" });

      // MCA recognition mark at bottom-left.
      try {
        const mcaPngDataUrl = await imageUrlToPngDataUrl(MCA_LOGO_URL);
        // MCA mark placed bottom-right; increased size for clarity.
        doc.addImage(mcaPngDataUrl, "PNG", pageWidth - margin - 220, pageHeight - 98, 192, 46);
      } catch {
        // Ignore image fetch failures to avoid blocking certificate download.
      }

      const fileName = `${sanitizeFileName(recipientName)}-${sanitizeFileName(courseTitle)}-certificate.pdf`;
      doc.save(fileName);
      showToast("Certificate downloaded successfully.", "success");
    } catch (e) {
      showToast("Failed to generate certificate PDF.", "error");
    }
  };

  const handleDownload = async (item, cert) => {
    if (cert) {
      await downloadCertificatePdf(item, cert);
      return;
    }
    try {
      const latest = await fetchMyCertificates();
      const refreshedCert = latest[item.course_id] || null;
      if (refreshedCert) {
        await downloadCertificatePdf(item, refreshedCert);
        return;
      }
      const ensureRes = await apiFetch(ENSURE_ISSUED_URL, {
        method: "POST",
        token,
        body: { courseId: item.course_id },
      });
      const issuedCert = ensureRes?.data || null;
      if (issuedCert) {
        setCertificateByCourseId((prev) => ({ ...prev, [item.course_id]: issuedCert }));
      }
      await downloadCertificatePdf(item, issuedCert);
    } catch (e) {
      showToast("Certificate is approved but still syncing. Please retry in a few seconds.", "error");
    }
  };

  if (loading) {
    return <GenericPageSkeleton />;
  }

  return (
    <div className={`min-h-screen rounded-t-3xl overflow-hidden md:rounded-none p-4 sm:p-6 lg:p-8 transition-colors ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"}`}>
      <Toast
        message={toast.message}
        type={toast.type}
        onDismiss={() => setToast((t) => ({ ...t, message: null }))}
      />

      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className={`text-2xl sm:text-4xl font-bold mb-2 ${isDark ? "text-white" : "bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"}`}>
            Certifications
          </h1>
          <p className={`text-sm sm:text-base ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            <span>Complete courses to unlock certificates. Request when you hit 100% -admin approves, then you can download.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-2xl border-2 p-6 mb-8 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-cyan-200/50"}`}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10">
              <FiAward className="w-8 h-8 text-cyan-500" />
            </div>
            <div>
              <h2 className={`font-semibold text-lg mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                How it works
              </h2>
              <ol className={`text-sm space-y-1 list-decimal list-inside ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                <li>Complete a course to 100%.</li>
                <li>Click &quot;Request Certificate&quot;.</li>
                <li>Admin approves your request.</li>
                <li>Download your certificate (when available).</li>
              </ol>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-xl border-2 p-4 mb-6 flex items-center justify-between ${
              isDark ? "bg-red-900/20 border-red-700" : "bg-red-50 border-red-200"
            }`}
          >
            <p className="text-red-700 dark:text-red-300">{error}</p>
            <button
              type="button"
              onClick={() => { setError(null); fetchEligible(); }}
              className="text-sm font-medium text-red-700 dark:text-red-300 underline"
            >
              Retry
            </button>
          </motion.div>
        )}

        {!error && list.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-2xl p-12 border-2 text-center ${isDark ? "bg-slate-800 border-slate-700" : "bg-white/80 border-cyan-200/50"}`}
          >
            <FiAward className={`w-20 h-20 mx-auto mb-4 ${isDark ? "text-slate-600" : "text-slate-300"}`} />
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-slate-700"}`}>
              No enrolled courses yet
            </h3>
            <p className={`mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Enroll in courses to see them here and unlock certificates when you complete them.
            </p>
            <button
              type="button"
              onClick={() => navigate("/lms/student/courses")}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              Browse Courses
            </button>
          </motion.div>
        )}

        {!error && list.length > 0 && (
          <div className="space-y-4">
            {list.map((item) => (
              <CourseCard
                key={item.course_id}
                item={item}
                isDark={isDark}
                token={token}
                onRequestSuccess={onRequestSuccess}
                requestInFlight={requestInFlight}
                setRequestInFlight={setRequestInFlight}
                certificateByCourseId={certificateByCourseId}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
