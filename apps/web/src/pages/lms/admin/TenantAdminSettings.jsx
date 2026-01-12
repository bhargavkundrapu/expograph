import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
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

  const settingsEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.TENANT_ADMIN_SETTINGS);

  if (!flagsLoading && !settingsEnabled) {
    return (
      <div>
        <Card variant="elevated">
          <CardTitle>Feature Disabled</CardTitle>
          <CardDescription>Tenant settings feature is currently disabled by the administrator.</CardDescription>
        </Card>
      </div>
    );
  }

  async function loadSettings(signal) {
    try {
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
      <div>
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>Tenant Settings</h1>
              <p>Manage your tenant configuration and branding</p>
            </div>
          </div>
        </div>
      </div>

      {err && (
        <Card variant="elevated">
          <div>{err}</div>
        </Card>
      )}

      {success && (
        <Card variant="elevated">
          <div>
            <span>{success}</span>
          </div>
        </Card>
      )}

      <Card variant="elevated">
        <CardTitle>General Settings</CardTitle>
        
        <div>
          <div>
            <label>Tenant Name *</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Slug</label>
            <input
              type="text"
              value={settings.slug}
              onChange={(e) => setSettings({ ...settings, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
              placeholder="tenant-slug"
            />
            <div>Used in URLs (e.g., {settings.slug || 'tenant-slug'}.expograph.in)</div>
          </div>

          <div>
            <label>Domain</label>
            <input
              type="text"
              value={settings.domain}
              onChange={(e) => setSettings({ ...settings, domain: e.target.value })}
              placeholder="example.com"
            />
          </div>

          <div>
            <label>Logo URL</label>
            <input
              type="url"
              value={settings.logoUrl}
              onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>

        <CardTitle>Branding</CardTitle>
        
        <div>
          <div>
            <label>Primary Color</label>
            <div>
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <div>
            <label>Secondary Color</label>
            <div>
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
              />
              <input
                type="text"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                placeholder="#8b5cf6"
              />
            </div>
          </div>
        </div>

        <CardTitle>Support Information</CardTitle>
        
        <div>
          <div>
            <label>Support Email</label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              placeholder="support@example.com"
            />
          </div>

          <div>
            <label>Support Phone</label>
            <input
              type="tel"
              value={settings.supportPhone}
              onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <div>
            Changes to tenant settings may take a few minutes to propagate across the platform.
          </div>
        </div>

        <div>
          <Button
            variant="gradient"
            size="lg"
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
