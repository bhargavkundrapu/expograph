import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading, InlineSpinner } from "../../../Components/common/LoadingStates";
import {
  FiFlag,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiX,
  FiSave,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiSettings,
  FiToggleLeft,
  FiToggleRight,
  FiClock,
} from "react-icons/fi";

export default function SuperAdminFeatureFlags() {
  const { token } = useAuth();
  const [flags, setFlags] = useState([]);
  const [filteredFlags, setFilteredFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [editForm, setEditForm] = useState({ key: "", enabled: false, config: {} });
  const [configInput, setConfigInput] = useState("{}");
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetchFlags();
  }, [token]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFlags(flags);
    } else {
      const filtered = flags.filter((flag) =>
        flag.key?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFlags(filtered);
    }
  }, [searchQuery, flags]);

  const fetchFlags = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/admin/feature-flags", { token });
      if (res?.ok) {
        const flagData = res.data || [];
        setFlags(flagData);
      }
    } catch (error) {
      console.error("Failed to fetch feature flags:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFlag = async (flagKey, currentEnabled) => {
    try {
      const res = await apiFetch(`/api/v1/admin/feature-flags/${flagKey}`, {
        method: "PATCH",
        token,
        body: { enabled: !currentEnabled },
      });
      if (res?.ok) {
        await fetchFlags();
      }
    } catch (error) {
      alert(error?.message || "Failed to toggle feature flag");
    }
  };

  const handleSaveFlag = async () => {
    try {
      setSaving(true);
      let config = {};
      try {
        config = JSON.parse(configInput);
      } catch (e) {
        alert("Invalid JSON in config field");
        return;
      }

      const res = await apiFetch(`/api/v1/admin/feature-flags/${editForm.key}`, {
        method: "PATCH",
        token,
        body: { enabled: editForm.enabled, config },
      });
      if (res?.ok) {
        await fetchFlags();
        setSelectedFlag(null);
        setShowAddForm(false);
        setEditForm({ key: "", enabled: false, config: {} });
        setConfigInput("{}");
      }
    } catch (error) {
      alert(error?.message || "Failed to save feature flag");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (flag) => {
    setSelectedFlag(flag);
    setEditForm({ key: flag.key, enabled: flag.enabled, config: flag.config || {} });
    setConfigInput(JSON.stringify(flag.config || {}, null, 2));
    setShowAddForm(true);
  };

  const stats = {
    total: flags.length,
    enabled: flags.filter((f) => f.enabled).length,
    disabled: flags.filter((f) => !f.enabled).length,
  };

  if (loading) {
    return <PageLoading message="Loading feature flags..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Feature Flags</h1>
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setSelectedFlag(null);
                setEditForm({ key: "", enabled: false, config: {} });
                setConfigInput("{}");
              }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              {showAddForm ? <FiX className="w-5 h-5" /> : <FiPlus className="w-5 h-5" />}
              {showAddForm ? "Cancel" : "Add Flag"}
            </button>
          </div>
          <p className="text-slate-600">Manage feature flags to control system capabilities</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Flags", value: stats.total, color: "from-blue-500 to-blue-600" },
            { label: "Enabled", value: stats.enabled, color: "from-green-500 to-green-600" },
            { label: "Disabled", value: stats.disabled, color: "from-red-500 to-red-600" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
            >
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-md p-6 border border-slate-200 shadow-lg mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search feature flags by key..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-md p-8 border border-slate-200 shadow-lg mb-6"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FiFlag className="w-6 h-6 text-indigo-600" />
              {selectedFlag ? "Edit Feature Flag" : "Add New Feature Flag"}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Flag Key <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.key}
                  onChange={(e) => setEditForm({ ...editForm, key: e.target.value })}
                  placeholder="e.g., enable_client_lab"
                  disabled={!!selectedFlag}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 disabled:bg-slate-100 disabled:cursor-not-allowed font-mono"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Use lowercase with underscores (snake_case)
                </p>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.enabled}
                    onChange={(e) => setEditForm({ ...editForm, enabled: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-semibold text-slate-900">Enable this feature flag</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Configuration (JSON)</label>
                <textarea
                  rows={6}
                  value={configInput}
                  onChange={(e) => setConfigInput(e.target.value)}
                  placeholder='{"option1": "value1", "option2": true}'
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">Optional JSON configuration for this feature flag</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedFlag(null);
                    setEditForm({ key: "", enabled: false, config: {} });
                    setConfigInput("{}");
                  }}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFlag}
                  disabled={saving || !editForm.key.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {saving ? (
                    <ButtonLoading text="Saving..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-4 h-4" />
                      Save Flag
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Flags List */}
        <div className="bg-white rounded-md border border-slate-200 shadow-lg overflow-hidden">
          {filteredFlags.length === 0 ? (
            <div className="p-12 text-center">
              <FiFlag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 mb-2">No feature flags found</p>
              <p className="text-sm text-slate-500">Add your first feature flag to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredFlags.map((flag) => (
                <motion.div
                  key={flag.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 font-mono">{flag.key}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            flag.enabled
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {flag.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                      {flag.config && Object.keys(flag.config).length > 0 && (
                        <div className="text-sm text-slate-600 mb-2">
                          <span className="font-medium">Config:</span>{" "}
                          <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                            {JSON.stringify(flag.config)}
                          </code>
                        </div>
                      )}
                      {flag.updated_at && (
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          Updated {new Date(flag.updated_at).toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <button
                        onClick={() => handleToggleFlag(flag.key, flag.enabled)}
                        className={`p-2 rounded-lg transition-colors ${
                          flag.enabled
                            ? "text-green-600 hover:bg-green-50"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                        title={flag.enabled ? "Disable" : "Enable"}
                      >
                        {flag.enabled ? (
                          <FiToggleRight className="w-6 h-6" />
                        ) : (
                          <FiToggleLeft className="w-6 h-6" />
                        )}
                      </button>
                      <button
                        onClick={() => openEdit(flag)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
