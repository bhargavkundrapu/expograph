import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../app/providers/AuthProvider";
import { apiFetch, ApiError } from "../../services/api";
import { GenericPageSkeleton } from "../common/SkeletonLoaders";
import { FiCheckCircle, FiXCircle, FiAward, FiUser, FiPhone, FiMail, FiBook, FiCalendar } from "react-icons/fi";

const REQUESTS_URL = "/api/v1/admin/certifications/requests";

function Toast({ message, type, onDismiss }) {
  if (!message) return null;
  const isSuccess = type === "success";
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 ${
        isSuccess ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
      }`}
    >
      {message}
      <button type="button" onClick={onDismiss} className="ml-2 opacity-80 hover:opacity-100" aria-label="Dismiss">
        {"\u00D7"}
      </button>
    </motion.div>
  );
}

function RejectModal({ open, onClose, onConfirm, loading, row }) {
  const [reason, setReason] = useState("");
  useEffect(() => {
    if (!open) setReason("");
  }, [open]);

  if (!open) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Reject certificate request</h3>
          {row && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {row.student_name}
              {" \u2013 "}
              {row.course_title}
            </p>
          )}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Reason (optional)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Progress not verified"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-3 text-sm min-h-[80px]"
            rows={3}
          />
          <div className="flex gap-2 mt-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => onConfirm(reason)}
              className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
            >
              {loading ? "Rejecting\u2026" : "Reject"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function AdminCertifications() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [toast, setToast] = useState({ message: null, type: "success" });
  const [actionId, setActionId] = useState(null);
  const [rejectModal, setRejectModal] = useState({ open: false, row: null });
  const [rejectLoading, setRejectLoading] = useState(false);

  const fetchRequests = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await apiFetch(`${REQUESTS_URL}?status=${statusFilter}`, { token });
      const data = res?.data;
      setRequests(Array.isArray(data) ? data : []);
    } catch (e) {
      setToast({ message: e instanceof ApiError ? e.message : "Failed to load requests", type: "error" });
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast((t) => (t.message === message ? { ...t, message: null } : t)), 5000);
  };

  const handleApprove = async (id) => {
    setActionId(id);
    try {
      const res = await apiFetch(`${REQUESTS_URL}/${id}/approve`, { method: "POST", token });
      if (res?.ok) {
        showToast("Request approved");
        fetchRequests();
      }
    } catch (e) {
      showToast(e instanceof ApiError ? e.message : "Approve failed", "error");
    } finally {
      setActionId(null);
    }
  };

  const handleRejectConfirm = async (reason) => {
    const id = rejectModal.row?.id;
    if (!id) return;
    setRejectLoading(true);
    try {
      await apiFetch(`${REQUESTS_URL}/${id}/reject`, { method: "POST", token, body: { reason: reason || undefined } });
      showToast("Request rejected");
      setRejectModal({ open: false, row: null });
      fetchRequests();
    } catch (e) {
      showToast(e instanceof ApiError ? e.message : "Reject failed", "error");
    } finally {
      setRejectLoading(false);
    }
  };

  if (loading) return <GenericPageSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
      <Toast
        message={toast.message}
        type={toast.type}
        onDismiss={() => setToast((t) => ({ ...t, message: null }))}
      />

      <RejectModal
        open={rejectModal.open}
        onClose={() => setRejectModal({ open: false, row: null })}
        onConfirm={handleRejectConfirm}
        loading={rejectLoading}
        row={rejectModal.row}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Certificate requests
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Review and approve or reject student certificate requests.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {["pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize ${
                statusFilter === status
                  ? "bg-cyan-600 text-white"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {requests.length === 0 ? (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400">
              <FiAward className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No {statusFilter} requests.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                    <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Requested
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    {statusFilter === "pending" && (
                      <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {requests.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30"
                    >
                      <td className="px-4 py-3">
                        <span className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                          <FiUser className="w-4 h-4 text-slate-400" />
                          {row.student_name || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <FiMail className="w-4 h-4 text-slate-400 shrink-0" />
                        {row.student_email || "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300 hidden sm:table-cell flex items-center gap-2">
                        <FiPhone className="w-4 h-4 text-slate-400 shrink-0" />
                        {row.student_phone || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <FiBook className="w-4 h-4 text-slate-400 shrink-0" />
                          {row.course_title || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <FiCalendar className="w-4 h-4 text-slate-400 shrink-0" />
                        {row.requested_at
                          ? new Date(row.requested_at).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            row.status === "approved" || row.status === "issued"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                              : row.status === "rejected"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      {statusFilter === "pending" && (
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              disabled={actionId === row.id}
                              onClick={() => handleApprove(row.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
                            >
                              {actionId === row.id ? (
                                "\u2026"
                              ) : (
                                <>
                                  <FiCheckCircle className="w-4 h-4" /> Approve
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => setRejectModal({ open: true, row })}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-red-300 text-red-700 dark:border-red-600 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <FiXCircle className="w-4 h-4" /> Reject
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
