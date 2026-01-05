import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { 
  FaFlag, 
  FaToggleOn,
  FaToggleOff,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import Button from "../../../Components/ui/Button";

export default function SuperAdminFeatureFlags() {
  const { token } = useAuth();
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [updating, setUpdating] = useState({});
  const alive = useRef(true);

  async function loadFlags(signal) {
    setErr("");
    setLoading(true);
    try {
      const json = await apiFetch("/api/v1/admin/feature-flags", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setFlags(list);
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load feature flags");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  async function toggleFlag(key, currentValue) {
    setUpdating(prev => ({ ...prev, [key]: true }));
    try {
      const newValue = !currentValue;
      await apiFetch(`/api/v1/admin/feature-flags/${key}`, {
        method: "PATCH",
        token,
        body: { enabled: newValue },
      });
      const ac = new AbortController();
      loadFlags(ac.signal);
    } catch (e) {
      alert(e?.message || "Failed to update feature flag");
    } finally {
      setUpdating(prev => ({ ...prev, [key]: false }));
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    loadFlags(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token]);

  if (loading) {
    return (
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Feature Flags" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadFlags(ac.signal);
        }} 
      />
    );
  }

  const enabledCount = flags.filter(f => f.enabled).length;
  const disabledCount = flags.length - enabledCount;

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-500/30">
              <FaFlag className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Feature Flags</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Manage platform features and experiments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="layout-grid-3 gap-lg" style={{ width: '100%' }}>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-400/30">
              <FaFlag className="text-purple-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{flags.length}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>Total Flags</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-400/30">
              <FaCheckCircle className="text-emerald-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{enabledCount}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>Enabled</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-gray-400/20 to-gray-500/20 border border-gray-400/30">
              <FaTimesCircle className="text-gray-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{disabledCount}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>Disabled</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Flags List */}
      {flags.length === 0 ? (
        <EmptyState
          title="No Feature Flags"
          message="No feature flags are currently configured."
        />
      ) : (
        <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
          {flags.map((flag, idx) => (
            <Card
              key={flag.key}
              variant="elevated"
              className="animate-fadeIn"
              style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
            >
              <div className="layout-flex items-center justify-between gap-md">
                <div style={{ flex: 1 }}>
                  <div className="layout-flex items-center gap-md mb-2">
                    <div className={`p-2 rounded-lg ${
                      flag.enabled 
                        ? 'bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-400/30' 
                        : 'bg-gradient-to-br from-gray-400/20 to-gray-500/20 border border-gray-400/30'
                    }`}>
                      <FaFlag className={flag.enabled ? 'text-emerald-400' : 'text-gray-400'} />
                    </div>
                    <div>
                      <CardTitle className="text-lg" style={{ margin: 0 }}>{flag.key}</CardTitle>
                      {flag.description && (
                        <CardDescription className="text-sm mt-1">{flag.description}</CardDescription>
                      )}
                    </div>
                  </div>
                </div>
                <div className="layout-flex items-center gap-md">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    flag.enabled 
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' 
                      : 'bg-gray-800 border border-gray-700 text-gray-400'
                  }`}>
                    {flag.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <button
                    onClick={() => toggleFlag(flag.key, flag.enabled)}
                    disabled={updating[flag.key]}
                    className={`p-3 rounded-lg transition-all ${
                      flag.enabled
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                        : 'bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700'
                    } ${updating[flag.key] ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {flag.enabled ? (
                      <FaToggleOn className="text-2xl" />
                    ) : (
                      <FaToggleOff className="text-2xl" />
                    )}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Info Card */}
      <Card variant="elevated" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-start gap-md">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-400/30">
            <FaFlag className="text-purple-400 text-xl" />
          </div>
          <div>
            <CardTitle className="text-xl mb-2">About Feature Flags</CardTitle>
            <CardDescription className="text-gray-400 leading-relaxed">
              Feature flags allow you to enable or disable features across the platform without deploying new code. 
              Use them for A/B testing, gradual rollouts, or quickly disabling features if issues arise.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}

