import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { 
  FaCog, 
  FaBuilding, 
  FaSave,
  FaCheckCircle,
  FaInfoCircle
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import Button from "../../../Components/ui/Button";

export default function TenantAdminSettings() {
  const { token, tenant } = useAuth();
  const { isEnabled, loading: flagsLoading } = useFeatureFlags();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [settings, setSettings] = useState({
    name: "",
    slug: "",
    domain: "",
    logoUrl: "",
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    supportEmail: "",
    supportPhone: "",
  });
  const alive = useRef(true);

  // Check if settings feature is enabled
  const settingsEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.TENANT_ADMIN_SETTINGS);

  // Only show disabled message if flags have loaded AND feature is explicitly disabled
  if (!flagsLoading && !settingsEnabled) {
    return (
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Card variant="elevated" className="p-8">
          <CardTitle className="text-2xl mb-4">Feature Disabled</CardTitle>
          <CardDescription>Tenant settings feature is currently disabled by the administrator.</CardDescription>
        </Card>
      </div>
    );
  }

  async function loadSettings(signal) {
    try {
      // For now, use tenant data from auth context
      // In future, this could fetch from a dedicated settings endpoint
      if (tenant) {
        setSettings({
          name: tenant.name || "",
          slug: tenant.slug || "",
          domain: tenant.domain || "",
          logoUrl: tenant.logo_url || "",
          primaryColor: tenant.primary_color || "#3b82f6",
          secondaryColor: tenant.secondary_color || "#8b5cf6",
          supportEmail: tenant.support_email || "",
          supportPhone: tenant.support_phone || "",
        });
      }
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load settings:", e);
      if (alive.current) setErr(e?.message || "Failed to load settings");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  async function saveSettings() {
    setSaving(true);
    setErr("");
    setSuccess("");
    try {
      // TODO: Implement actual API endpoint for updating tenant settings
      // await apiFetch("/api/v1/admin/tenant/settings", {
      //   method: "PATCH",
      //   token,
      //   body: settings,
      // });
      
      // For now, just show success message
      setSuccess("Settings saved successfully! (Note: API endpoint not yet implemented)");
      setTimeout(() => setSuccess(""), 3000);
    } catch (e) {
      setErr(e?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    setLoading(true);
    loadSettings(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [tenant]);

  if (loading) {
    return (
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/30">
              <FaCog className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Tenant Settings</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Manage your tenant configuration and branding</p>
            </div>
          </div>
        </div>
      </div>

      {err && (
        <Card variant="elevated" className="p-4 bg-red-500/10 border-red-500/30">
          <div className="text-red-300">{err}</div>
        </Card>
      )}

      {success && (
        <Card variant="elevated" className="p-4 bg-emerald-500/10 border-emerald-500/30">
          <div className="layout-flex items-center gap-2 text-emerald-300">
            <FaCheckCircle />
            <span>{success}</span>
          </div>
        </Card>
      )}

      {/* Settings Form */}
      <Card variant="elevated" className="p-8" style={{ width: '100%', boxSizing: 'border-box' }}>
        <CardTitle className="text-2xl mb-6">General Settings</CardTitle>
        
        <div className="layout-grid-2 gap-md mb-6">
          <div>
            <label className="text-sm font-semibold text-white mb-2 block">Tenant Name *</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-white mb-2 block">Slug</label>
            <input
              type="text"
              value={settings.slug}
              onChange={(e) => setSettings({ ...settings, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
              className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="tenant-slug"
            />
            <div className="text-xs text-gray-400 mt-1">Used in URLs (e.g., {settings.slug || 'tenant-slug'}.expograph.in)</div>
          </div>

          <div>
            <label className="text-sm font-semibold text-white mb-2 block">Domain</label>
            <input
              type="text"
              value={settings.domain}
              onChange={(e) => setSettings({ ...settings, domain: e.target.value })}
              className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="example.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-white mb-2 block">Logo URL</label>
            <input
              type="url"
              value={settings.logoUrl}
              onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
              className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>

        <CardTitle className="text-2xl mb-6 mt-8">Branding</CardTitle>
        
        <div className="layout-grid-2 gap-md mb-6">
          <div>
            <label className="text-sm font-semibold text-white mb-2 block">Primary Color</label>
            <div className="layout-flex items-center gap-2">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="w-16 h-10 rounded border-2 border-gray-700 cursor-pointer"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="flex-1 border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-white mb-2 block">Secondary Color</label>
            <div className="layout-flex items-center gap-2">
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                className="w-16 h-10 rounded border-2 border-gray-700 cursor-pointer"
              />
              <input
                type="text"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                className="flex-1 border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
                placeholder="#8b5cf6"
              />
            </div>
          </div>
        </div>

        <CardTitle className="text-2xl mb-6 mt-8">Support Information</CardTitle>
        
        <div className="layout-grid-2 gap-md mb-6">
          <div>
            <label className="text-sm font-semibold text-white mb-2 block">Support Email</label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="support@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-white mb-2 block">Support Phone</label>
            <input
              type="tel"
              value={settings.supportPhone}
              onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
              className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="layout-flex items-center gap-2 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-6">
          <FaInfoCircle className="text-blue-400" />
          <div className="text-sm text-blue-300">
            Changes to tenant settings may take a few minutes to propagate across the platform.
          </div>
        </div>

        <div className="layout-flex gap-md">
          <Button
            variant="gradient"
            size="lg"
            icon={FaSave}
            onClick={saveSettings}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

