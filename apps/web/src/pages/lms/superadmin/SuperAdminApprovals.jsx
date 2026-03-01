import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiCalendar,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

const STATUS_BADGE = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const PAGE_SIZES = [10, 25, 50, 100];

export default function SuperAdminApprovals() {
  const { token } = useAuth();
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [approvingId, setApprovingId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ name: "", email: "", phone: "", college: "", dateFrom: "", dateTo: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const activeFilterCount = Object.values(filters).filter((v) => v.trim()).length + (searchQuery.trim() ? 1 : 0);
  const clearFilters = () => {
    setFilters({ name: "", email: "", phone: "", college: "", dateFrom: "", dateTo: "" });
    setSearchQuery("");
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!token) return;
    fetchApprovals();
  }, [token, statusFilter]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, filters, statusFilter, pageSize]);

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

  const filteredApprovals = useMemo(() => {
    let result = approvals;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (a) =>
          a.customer_name?.toLowerCase().includes(q) ||
          a.customer_email?.toLowerCase().includes(q) ||
          a.customer_phone?.includes(q) ||
          a.customer_college?.toLowerCase().includes(q)
      );
    }
    const fn = filters.name.trim().toLowerCase();
    if (fn) result = result.filter((a) => a.customer_name?.toLowerCase().includes(fn));
    const fe = filters.email.trim().toLowerCase();
    if (fe) result = result.filter((a) => a.customer_email?.toLowerCase().includes(fe));
    const fp = filters.phone.trim();
    if (fp) result = result.filter((a) => a.customer_phone?.includes(fp));
    const fc = filters.college.trim().toLowerCase();
    if (fc) result = result.filter((a) => a.customer_college?.toLowerCase().includes(fc));
    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom); from.setHours(0, 0, 0, 0);
      result = result.filter((a) => new Date(a.created_at) >= from);
    }
    if (filters.dateTo) {
      const to = new Date(filters.dateTo); to.setHours(23, 59, 59, 999);
      result = result.filter((a) => new Date(a.created_at) <= to);
    }
    return result;
  }, [approvals, searchQuery, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredApprovals.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedApprovals = filteredApprovals.slice((safePage - 1) * pageSize, safePage * pageSize);
  const startIdx = (safePage - 1) * pageSize + 1;
  const endIdx = Math.min(safePage * pageSize, filteredApprovals.length);

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

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, safePage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const INPUT_CLS = "w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all";
  const ICON_CLS = "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Payment Approvals</h1>
          <p className="mt-1 text-slate-600 text-sm">
            Approve paid purchases to create student accounts and enroll them.
          </p>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 mb-6">
          {["pending", "approved", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Quick search by name, email, phone, college..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters((p) => !p)}
              className={`flex items-center gap-2 px-5 py-3 rounded-md border font-medium transition-all whitespace-nowrap ${
                showFilters || activeFilterCount > 0
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FiFilter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
              {showFilters ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-900">Advanced Filters</h3>
                    {activeFilterCount > 0 && (
                      <button onClick={clearFilters} className="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1">
                        <FiX className="w-3 h-3" /> Clear all
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Name</label>
                      <div className="relative">
                        <FiUser className={ICON_CLS} />
                        <input type="text" placeholder="Filter by name" value={filters.name}
                          onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))} className={INPUT_CLS} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Email</label>
                      <div className="relative">
                        <FiMail className={ICON_CLS} />
                        <input type="text" placeholder="Filter by email" value={filters.email}
                          onChange={(e) => setFilters((f) => ({ ...f, email: e.target.value }))} className={INPUT_CLS} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Phone</label>
                      <div className="relative">
                        <FiPhone className={ICON_CLS} />
                        <input type="tel" placeholder="Filter by phone" value={filters.phone}
                          onChange={(e) => setFilters((f) => ({ ...f, phone: e.target.value }))} className={INPUT_CLS} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">College</label>
                      <div className="relative">
                        <FiBook className={ICON_CLS} />
                        <input type="text" placeholder="Filter by college" value={filters.college}
                          onChange={(e) => setFilters((f) => ({ ...f, college: e.target.value }))} className={INPUT_CLS} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">From Date</label>
                      <div className="relative">
                        <FiCalendar className={ICON_CLS} />
                        <input type="date" value={filters.dateFrom}
                          onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))} className={INPUT_CLS} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">To Date</label>
                      <div className="relative">
                        <FiCalendar className={ICON_CLS} />
                        <input type="date" value={filters.dateTo}
                          onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))} className={INPUT_CLS} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <FiLoader className="w-8 h-8 text-slate-300 animate-spin" />
          </div>
        ) : filteredApprovals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 p-12 text-center"
          >
            <FiClock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No approvals found</h3>
            <p className="text-slate-600">
              {activeFilterCount > 0 ? "Try different filters" : `No ${statusFilter} approvals`}
            </p>
          </motion.div>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedApprovals.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2 text-slate-900 font-medium">
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
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <FiMail className="w-4 h-4 shrink-0" />
                        {a.customer_email}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiPhone className="w-4 h-4 shrink-0" />
                        {a.customer_phone || "—"}
                      </span>
                      {a.customer_college && (
                        <span className="text-slate-400">{a.customer_college}</span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs">
                      {new Date(a.created_at).toLocaleString()}
                    </p>
                  </div>
                  {a.status === "pending" && (
                    <button
                      onClick={() => handleApprove(a.id)}
                      disabled={!!approvingId}
                      className="shrink-0 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 transition-all"
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

            {/* Pagination */}
            {filteredApprovals.length > PAGE_SIZES[0] && (
              <div className="mt-8 bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span>Showing <strong>{startIdx}–{endIdx}</strong> of <strong>{filteredApprovals.length}</strong></span>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Per page</span>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                      className="border border-slate-200 rounded-md px-2 py-1 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    >
                      {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(1)} disabled={safePage <= 1}
                    className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="First">
                    <FiChevronsLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={safePage <= 1}
                    className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Previous">
                    <FiChevronLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  {getPageNumbers().map((p) => (
                    <button key={p} onClick={() => setCurrentPage(p)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        p === safePage ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >{p}</button>
                  ))}
                  <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={safePage >= totalPages}
                    className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Next">
                    <FiChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                  <button onClick={() => setCurrentPage(totalPages)} disabled={safePage >= totalPages}
                    className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Last">
                    <FiChevronsRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
