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

function CourseCard({ item, isDark, token, onRequestSuccess, requestInFlight, setRequestInFlight }) {
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
            onClick={() => {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white"
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
  const { token } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ message: null, type: "success" });
  const [requestInFlight, setRequestInFlight] = useState(null);

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

  useEffect(() => {
    fetchEligible();
  }, [fetchEligible]);

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
            <span>Complete courses to unlock certificates. Request when you hit 100% — admin approves, then you can download.</span>
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
