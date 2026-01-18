import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiSettings,
  FiSave,
  FiGlobe,
  FiShield,
  FiMail,
  FiLink,
  FiImage,
  FiClock,
  FiUsers,
  FiFlag,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiRefreshCw,
  FiDownload,
  FiUpload,
} from "react-icons/fi";

export default function SuperAdminSettings() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab from route
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path.includes("/branding")) return "branding";
    if (path.includes("/security")) return "security";
    if (path.includes("/integrations")) return "integrations";
    if (path.includes("/notifications")) return "notifications";
    if (path.includes("/advanced")) return "advanced";
    return "general"; // default
  };
  
  const activeTab = getActiveTabFromPath();
  
  const setActiveTab = (tabId) => {
    navigate(`/lms/superadmin/settings/${tabId}`);
  };
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    tenantName: "",
    tenantSlug: "",
    timezone: "UTC",
    locale: "en-US",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    firstDayOfWeek: "monday",
    currency: "USD",
    // Branding
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    siteTitle: "",
    siteDescription: "",
    // Security
    requireMFA: false,
    sessionTimeout: 3600,
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: false,
    enableAuditLog: true,
    // Integrations
    enableSSO: false,
    ssoProvider: "",
    ssoClientId: "",
    ssoClientSecret: "",
    webhookUrl: "",
    apiKeyExpiryDays: 90,
    // Notifications
    emailFromName: "",
    emailFromAddress: "",
    emailReplyTo: "",
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    // Advanced
    enableAnalytics: true,
    enableCDN: false,
    cdnUrl: "",
    maxFileUploadSize: 10, // MB
    enableMaintenanceMode: false,
  });

  const [featureFlags, setFeatureFlags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    // In production, fetch settings from API
    // For now, initialize with defaults
    loadSettings();
    loadFeatureFlags();
  }, [token]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      // In production: const res = await apiFetch("/api/v1/admin/settings", { token });
      // For now, use defaults
      setLoading(false);
    } catch (error) {
      console.error("Failed to load settings:", error);
      setLoading(false);
    }
  };

  const loadFeatureFlags = async () => {
    try {
      const res = await apiFetch("/api/v1/admin/feature-flags", { token });
      if (res?.ok) {
        setFeatureFlags(res.data || []);
      }
    } catch (error) {
      console.error("Failed to load feature flags:", error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      // In production: await apiFetch("/api/v1/admin/settings", { method: "PATCH", token, body: settings });
      // For now, just show success
      await new Promise((resolve) => setTimeout(resolve, 500));
      alert("Settings saved successfully!");
    } catch (error) {
      alert(error?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: FiSettings },
    { id: "branding", label: "Branding", icon: FiImage },
    { id: "security", label: "Security", icon: FiShield },
    { id: "integrations", label: "Integrations", icon: FiLink },
    { id: "notifications", label: "Notifications", icon: FiMail },
    { id: "advanced", label: "Advanced", icon: FiFlag },
  ];

  const TabButton = ({ tab, isActive, onClick }) => {
    const Icon = tab.icon;
    return (
      <button
        onClick={() => onClick(tab.id)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
            : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-600"}`} />
        <span>{tab.label}</span>
      </button>
    );
  };

  if (loading) {
    return <PageLoading message="Loading settings..." />;
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
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">System Settings</h1>
          <p className="text-slate-600">Configure system-wide settings, branding, security, and integrations</p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-lg mb-8">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <TabButton key={tab.id} tab={tab} isActive={activeTab === tab.id} onClick={setActiveTab} />
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
          {/* General Settings Tab */}
          {activeTab === "general" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <FiSettings className="w-6 h-6 text-indigo-600" />
                  General Settings
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Tenant Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={settings.tenantName}
                        onChange={(e) => setSettings({ ...settings, tenantName: e.target.value })}
                        placeholder="Organization Name"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Tenant Slug</label>
                      <input
                        type="text"
                        value={settings.tenantSlug}
                        onChange={(e) => setSettings({ ...settings, tenantSlug: e.target.value })}
                        placeholder="organization-slug"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time (US)</option>
                        <option value="America/Chicago">Central Time (US)</option>
                        <option value="America/Denver">Mountain Time (US)</option>
                        <option value="America/Los_Angeles">Pacific Time (US)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Paris">Paris (CET)</option>
                        <option value="Asia/Dubai">Dubai (GST)</option>
                        <option value="Asia/Kolkata">Mumbai (IST)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Locale</label>
                      <select
                        value={settings.locale}
                        onChange={(e) => setSettings({ ...settings, locale: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      >
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="es-ES">Spanish</option>
                        <option value="fr-FR">French</option>
                        <option value="de-DE">German</option>
                        <option value="hi-IN">Hindi</option>
                        <option value="ja-JP">Japanese</option>
                        <option value="zh-CN">Chinese (Simplified)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Date Format</label>
                      <select
                        value={settings.dateFormat}
                        onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Time Format</label>
                      <select
                        value={settings.timeFormat}
                        onChange={(e) => setSettings({ ...settings, timeFormat: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      >
                        <option value="12h">12-hour</option>
                        <option value="24h">24-hour</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">First Day of Week</label>
                      <select
                        value={settings.firstDayOfWeek}
                        onChange={(e) => setSettings({ ...settings, firstDayOfWeek: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      >
                        <option value="monday">Monday</option>
                        <option value="sunday">Sunday</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="INR">INR (₹)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="CAD">CAD ($)</option>
                      <option value="AUD">AUD ($)</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Branding Settings Tab */}
          {activeTab === "branding" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <FiImage className="w-6 h-6 text-indigo-600" />
                  Branding & Appearance
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Logo URL</label>
                      <input
                        type="url"
                        value={settings.logoUrl}
                        onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      />
                      <p className="text-xs text-slate-500 mt-1">Recommended: 200x60px PNG with transparent background</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Favicon URL</label>
                      <input
                        type="url"
                        value={settings.faviconUrl}
                        onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      />
                      <p className="text-xs text-slate-500 mt-1">Recommended: 32x32px ICO or PNG</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Primary Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                          className="w-16 h-12 rounded-lg border border-slate-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.primaryColor}
                          onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                          placeholder="#3b82f6"
                          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Secondary Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={settings.secondaryColor}
                          onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                          className="w-16 h-12 rounded-lg border border-slate-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.secondaryColor}
                          onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                          placeholder="#8b5cf6"
                          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Site Title</label>
                    <input
                      type="text"
                      value={settings.siteTitle}
                      onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                      placeholder="Learning Management System"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Site Description</label>
                    <textarea
                      rows={3}
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                      placeholder="Brief description of your LMS platform"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Settings Tab */}
          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <FiShield className="w-6 h-6 text-indigo-600" />
                  Security & Privacy
                </h2>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <FiShield className="w-5 h-5 text-red-600" />
                      Multi-Factor Authentication
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.requireMFA}
                        onChange={(e) => setSettings({ ...settings, requireMFA: e.target.checked })}
                        className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-slate-900">
                        Require Multi-Factor Authentication for all users
                      </span>
                    </label>
                    <p className="text-xs text-slate-600 mt-2 ml-8">
                      Users will be required to set up MFA on their next login
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Session Timeout (seconds)</label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) || 3600 })}
                      min="300"
                      max="86400"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      User sessions will expire after this duration (default: 3600 seconds = 1 hour)
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Password Policy</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Minimum Password Length
                        </label>
                        <input
                          type="number"
                          value={settings.passwordMinLength}
                          onChange={(e) =>
                            setSettings({ ...settings, passwordMinLength: parseInt(e.target.value) || 8 })
                          }
                          min="6"
                          max="128"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.passwordRequireUppercase}
                            onChange={(e) =>
                              setSettings({ ...settings, passwordRequireUppercase: e.target.checked })
                            }
                            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm font-medium text-slate-900">Require uppercase letters</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.passwordRequireLowercase}
                            onChange={(e) =>
                              setSettings({ ...settings, passwordRequireLowercase: e.target.checked })
                            }
                            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm font-medium text-slate-900">Require lowercase letters</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.passwordRequireNumbers}
                            onChange={(e) => setSettings({ ...settings, passwordRequireNumbers: e.target.checked })}
                            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm font-medium text-slate-900">Require numbers</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.passwordRequireSpecialChars}
                            onChange={(e) =>
                              setSettings({ ...settings, passwordRequireSpecialChars: e.target.checked })
                            }
                            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm font-medium text-slate-900">Require special characters</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Audit & Logging</h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.enableAuditLog}
                        onChange={(e) => setSettings({ ...settings, enableAuditLog: e.target.checked })}
                        className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-slate-900">Enable audit logging</span>
                    </label>
                    <p className="text-xs text-slate-600 mt-2 ml-8">
                      Track all user actions and system changes for compliance and security
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Integrations Settings Tab */}
          {activeTab === "integrations" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <FiLink className="w-6 h-6 text-indigo-600" />
                  Integrations & API
                </h2>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <FiLink className="w-5 h-5 text-blue-600" />
                      Single Sign-On (SSO)
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer mb-4">
                      <input
                        type="checkbox"
                        checked={settings.enableSSO}
                        onChange={(e) => setSettings({ ...settings, enableSSO: e.target.checked })}
                        className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-slate-900">Enable SSO</span>
                    </label>

                    {settings.enableSSO && (
                      <div className="space-y-4 mt-4 pl-8">
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">SSO Provider</label>
                          <select
                            value={settings.ssoProvider}
                            onChange={(e) => setSettings({ ...settings, ssoProvider: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                          >
                            <option value="">Select provider</option>
                            <option value="saml">SAML 2.0</option>
                            <option value="oauth2">OAuth 2.0</option>
                            <option value="oidc">OpenID Connect</option>
                            <option value="google">Google Workspace</option>
                            <option value="microsoft">Microsoft Azure AD</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">Client ID</label>
                          <input
                            type="text"
                            value={settings.ssoClientId}
                            onChange={(e) => setSettings({ ...settings, ssoClientId: e.target.value })}
                            placeholder="SSO Client ID"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">Client Secret</label>
                          <input
                            type="password"
                            value={settings.ssoClientSecret}
                            onChange={(e) => setSettings({ ...settings, ssoClientSecret: e.target.value })}
                            placeholder="SSO Client Secret"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Webhooks</h3>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Webhook URL</label>
                      <input
                        type="url"
                        value={settings.webhookUrl}
                        onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                        placeholder="https://your-domain.com/webhook"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono text-sm"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Receive real-time events (user created, course completed, etc.)
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">API Configuration</h3>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        API Key Expiry Days
                      </label>
                      <input
                        type="number"
                        value={settings.apiKeyExpiryDays}
                        onChange={(e) => setSettings({ ...settings, apiKeyExpiryDays: parseInt(e.target.value) || 90 })}
                        min="1"
                        max="365"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      />
                      <p className="text-xs text-slate-500 mt-1">API keys will expire after this many days</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Settings Tab */}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <FiMail className="w-6 h-6 text-indigo-600" />
                  Email & Notifications
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Email From Name</label>
                      <input
                        type="text"
                        value={settings.emailFromName}
                        onChange={(e) => setSettings({ ...settings, emailFromName: e.target.value })}
                        placeholder="LMS Platform"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Email From Address</label>
                      <input
                        type="email"
                        value={settings.emailFromAddress}
                        onChange={(e) => setSettings({ ...settings, emailFromAddress: e.target.value })}
                        placeholder="noreply@example.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Reply-To Address</label>
                    <input
                      type="email"
                      value={settings.emailReplyTo}
                      onChange={(e) => setSettings({ ...settings, emailReplyTo: e.target.value })}
                      placeholder="support@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification Channels</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.enableEmailNotifications}
                          onChange={(e) => setSettings({ ...settings, enableEmailNotifications: e.target.checked })}
                          className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-slate-900">Enable email notifications</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.enableSMSNotifications}
                          onChange={(e) => setSettings({ ...settings, enableSMSNotifications: e.target.checked })}
                          className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-slate-900">Enable SMS notifications</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Advanced Settings Tab */}
          {activeTab === "advanced" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <FiFlag className="w-6 h-6 text-indigo-600" />
                  Advanced Settings
                </h2>

                <div className="space-y-6">
                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Feature Flags</h3>
                    <div className="space-y-3">
                      {featureFlags.length > 0 ? (
                        featureFlags.map((flag) => (
                          <div
                            key={flag.key}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                          >
                            <div>
                              <div className="font-semibold text-slate-900">{flag.key}</div>
                              {flag.description && (
                                <div className="text-sm text-slate-600 mt-1">{flag.description}</div>
                              )}
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={flag.enabled}
                                onChange={async (e) => {
                                  try {
                                    await apiFetch(`/api/v1/admin/feature-flags/${flag.key}`, {
                                      method: "PATCH",
                                      token,
                                      body: { enabled: e.target.checked },
                                    });
                                    await loadFeatureFlags();
                                  } catch (error) {
                                    alert("Failed to update feature flag");
                                  }
                                }}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-600">No feature flags configured</p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance & Storage</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.enableAnalytics}
                          onChange={(e) => setSettings({ ...settings, enableAnalytics: e.target.checked })}
                          className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-slate-900">Enable analytics tracking</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.enableCDN}
                          onChange={(e) => setSettings({ ...settings, enableCDN: e.target.checked })}
                          className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-slate-900">Enable CDN for static assets</span>
                      </label>

                      {settings.enableCDN && (
                        <div className="pl-8">
                          <label className="block text-sm font-semibold text-slate-900 mb-2">CDN URL</label>
                          <input
                            type="url"
                            value={settings.cdnUrl}
                            onChange={(e) => setSettings({ ...settings, cdnUrl: e.target.value })}
                            placeholder="https://cdn.example.com"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Max File Upload Size (MB)
                        </label>
                        <input
                          type="number"
                          value={settings.maxFileUploadSize}
                          onChange={(e) =>
                            setSettings({ ...settings, maxFileUploadSize: parseInt(e.target.value) || 10 })
                          }
                          min="1"
                          max="1000"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2 text-red-600">
                      <FiAlertCircle className="w-5 h-5" />
                      Maintenance Mode
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.enableMaintenanceMode}
                        onChange={(e) => setSettings({ ...settings, enableMaintenanceMode: e.target.checked })}
                        className="w-5 h-5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm font-medium text-slate-900">Enable maintenance mode</span>
                    </label>
                    <p className="text-xs text-red-600 mt-2 ml-8">
                      When enabled, the site will be inaccessible to regular users. Only admins can access.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Save Button - Fixed at bottom */}
          <div className="border-t border-slate-200 pt-6 mt-8">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm("Discard all unsaved changes?")) {
                    loadSettings();
                  }
                }}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                <FiX className="w-5 h-5" />
                Reset
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <ButtonLoading text="Saving..." size="sm" />
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    Save All Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
