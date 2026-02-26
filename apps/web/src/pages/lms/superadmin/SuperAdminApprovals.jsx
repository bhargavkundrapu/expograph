import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import {
  FiCheckCircle,
  FiClock,
  FiMail,
  FiPhone,
  FiUser,
  FiBook,
  FiPackage,
  FiLoader,
} from "react-icons/fi";

const STATUS_BADGE = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

export default function SuperAdminApprovals() {
  const { token } = useAuth();
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetchApprovals();
  }, [token, statusFilter]);

  const fetchApprovals = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/v1/admin/approvals?status=${statusFilter}`);
      setApprovals(res?.data ?? []);
    } catch {
      setApprovals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setApprovingId(id);
    try {
      await apiFetch(`/api/v1/admin/approvals/${id}/approve`, { method: "POST" });
      await fetchApprovals();
    } catch (e) {
      console.error("Approve failed:", e);
      alert(e?.message || "Failed to approve");
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Payment Approvals</h1>
        <p className="mt-1 text-slate-400 text-sm">
          Approve paid purchases to create student accounts and enroll them.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        {["pending", "approved", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              statusFilter === s
                ? "bg-blue-600 text-white"
                : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <FiLoader className="w-8 h-8 text-slate-400 animate-spin" />
        </div>
      ) : approvals.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-700 bg-slate-800/30 p-12 text-center"
        >
          <FiClock className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400">No {statusFilter} approvals</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {approvals.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <FiUser className="w-4 h-4 text-slate-400 shrink-0" />
                    {a.customer_name}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_BADGE[a.status] ?? STATUS_BADGE.pending}`}>
                    {a.status}
                  </span>
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    {a.item_type === "pack" ? <FiPackage className="w-3 h-3" /> : <FiBook className="w-3 h-3" />}
                    {a.item_title || `${a.item_type} ${a.item_id?.slice(0, 8)}`}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <FiMail className="w-4 h-4 shrink-0" />
                    {a.customer_email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiPhone className="w-4 h-4 shrink-0" />
                    {a.customer_phone}
                  </span>
                  {a.customer_college && (
                    <span className="text-slate-500">{a.customer_college}</span>
                  )}
                </div>
                <p className="text-slate-500 text-xs">
                  {new Date(a.created_at).toLocaleString()}
                </p>
              </div>
              {a.status === "pending" && (
                <button
                  onClick={() => handleApprove(a.id)}
                  disabled={!!approvingId}
                  className="shrink-0 px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {approvingId === a.id ? (
                    <FiLoader className="w-4 h-4 animate-spin" />
                  ) : (
                    <FiCheckCircle className="w-4 h-4" />
                  )}
                  Approve
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
