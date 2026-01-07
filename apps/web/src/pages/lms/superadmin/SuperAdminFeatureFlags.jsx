import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { 
  FaFlag, 
  FaToggleOn,
  FaToggleOff,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import Button from "../../../Components/ui/Button";
import { getAllFeatureFlags } from "../../../utils/featureFlags";

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
      await loadFlags(ac.signal);
      
      // Fire custom event to notify all components (including other tabs/windows)
      // This will trigger a refetch in all useFeatureFlags hooks
      window.dispatchEvent(new CustomEvent('feature-flags-updated'));
      
      // Also update localStorage for cross-tab sync
      localStorage.setItem('feature-flags-last-updated', Date.now().toString());
      
      console.log(`✅ Feature flag '${key}' ${newValue ? 'enabled' : 'disabled'}. Notifying all components...`);
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

  // Get all predefined feature flags
  const allFeatureFlags = getAllFeatureFlags();
  const existingFlagKeys = new Set(flags.map(f => f.key));
  
  // Find flags that are defined but not yet created
  const missingFlags = allFeatureFlags.filter(f => !existingFlagKeys.has(f.key));
  
  // Group flags by category
  const flagsByCategory = {};
  allFeatureFlags.forEach(flag => {
    if (!flagsByCategory[flag.category]) {
      flagsByCategory[flag.category] = [];
    }
    const existingFlag = flags.find(f => f.key === flag.key);
    flagsByCategory[flag.category].push({
      ...flag,
      enabled: existingFlag?.enabled ?? false,
      exists: !!existingFlag,
    });
  });
  
  // Also include any custom flags that aren't in the predefined list
  const customFlags = flags.filter(f => !allFeatureFlags.find(af => af.key === f.key));
  
  const enabledCount = flags.filter(f => f.enabled).length;
  const disabledCount = flags.filter(f => !f.enabled).length;
  const totalPredefined = allFeatureFlags.length;
  const createdCount = flags.length;

  async function createFlag(key, enabled = true) {
    setUpdating(prev => ({ ...prev, [key]: true }));
    try {
      await apiFetch(`/api/v1/admin/feature-flags/${key}`, {
        method: "PATCH",
        token,
        body: { enabled },
      });
      const ac = new AbortController();
      await loadFlags(ac.signal);
      
      // Fire custom event to notify all components
      window.dispatchEvent(new CustomEvent('feature-flags-updated'));
      localStorage.setItem('feature-flags-last-updated', Date.now().toString());
    } catch (e) {
      alert(e?.message || "Failed to create feature flag");
    } finally {
      setUpdating(prev => ({ ...prev, [key]: false }));
    }
  }

  async function createAllMissingFlags() {
    if (missingFlags.length === 0) {
      alert("All feature flags are already created!");
      return;
    }
    
    const confirmed = window.confirm(
      `Create ${missingFlags.length} missing feature flags? They will be enabled by default.`
    );
    if (!confirmed) return;
    
    try {
      for (const flag of missingFlags) {
        await createFlag(flag.key, true);
      }
      alert(`✅ Successfully created ${missingFlags.length} feature flags!`);
      const ac = new AbortController();
      await loadFlags(ac.signal);
      
      // Fire custom event to notify all components
      window.dispatchEvent(new CustomEvent('feature-flags-updated'));
      localStorage.setItem('feature-flags-last-updated', Date.now().toString());
    } catch (e) {
      alert(e?.message || "Failed to create some feature flags");
    }
  }

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
      <div className="layout-grid-4 gap-lg" style={{ width: '100%' }}>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-400/30">
              <FaFlag className="text-purple-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{totalPredefined}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>Predefined</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border border-blue-400/30">
              <FaFlag className="text-blue-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{createdCount}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>Created</div>
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

      {/* Create Missing Flags */}
      {missingFlags.length > 0 && (
        <Card variant="elevated" className="p-6 border-blue-500/30" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div className="layout-flex items-center justify-between gap-md">
            <div style={{ flex: 1 }}>
              <CardTitle className="text-xl mb-2">Quick Setup</CardTitle>
              <CardDescription className="text-gray-400">
                {missingFlags.length} feature flag{missingFlags.length !== 1 ? 's' : ''} not yet created. 
                Create them all at once to start managing all platform features.
              </CardDescription>
            </div>
            <Button
              variant="gradient"
              size="md"
              icon={FaPlus}
              onClick={createAllMissingFlags}
              disabled={updating._creatingAll}
            >
              Create All ({missingFlags.length})
            </Button>
          </div>
        </Card>
      )}

      {/* Flags List by Category */}
      {Object.keys(flagsByCategory).length === 0 && customFlags.length === 0 ? (
        <EmptyState
          title="No Feature Flags"
          message="No feature flags are currently configured."
        />
      ) : (
        <div className="layout-flex-col gap-xl" style={{ width: '100%' }}>
          {/* Predefined Flags by Category */}
          {Object.entries(flagsByCategory).map(([category, categoryFlags]) => (
            <div key={category} className="layout-flex-col gap-md">
              <div className="layout-flex items-center gap-md mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border border-blue-400/30">
                  <FaFlag className="text-blue-400" />
                </div>
                <h3 className="section-title text-2xl" style={{ margin: 0 }}>{category}</h3>
                <span className="text-sm text-gray-400">
                  ({categoryFlags.filter(f => f.enabled && f.exists).length}/{categoryFlags.filter(f => f.exists).length} enabled, {categoryFlags.filter(f => !f.exists).length} not created)
                </span>
              </div>
              
              <div className="layout-flex-col gap-md">
                {categoryFlags.map((flag, idx) => {
                  if (!flag.exists) {
                    // Show as "not created" with create button
                    return (
                      <Card
                        key={flag.key}
                        variant="elevated"
                        className="animate-fadeIn opacity-75"
                        style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
                      >
                        <div className="layout-flex items-center justify-between gap-md">
                          <div style={{ flex: 1 }}>
                            <div className="layout-flex items-center gap-md mb-2">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-gray-400/20 to-gray-500/20 border border-gray-400/30">
                                <FaFlag className="text-gray-400" />
                              </div>
                              <div>
                                <CardTitle className="text-lg" style={{ margin: 0 }}>{flag.key}</CardTitle>
                                <CardDescription className="text-sm mt-1">{flag.description}</CardDescription>
                              </div>
                            </div>
                          </div>
                          <div className="layout-flex items-center gap-md">
                            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-800 border border-gray-700 text-gray-400">
                              Not Created
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={FaPlus}
                              onClick={() => createFlag(flag.key, true)}
                              disabled={updating[flag.key]}
                            >
                              Create
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  }
                  
                  // Show existing flag with toggle
                  return (
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
                              <CardDescription className="text-sm mt-1">{flag.description}</CardDescription>
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
                  );
                })}
              </div>
            </div>
          ))}
          
          {/* Custom Flags (not in predefined list) */}
          {customFlags.length > 0 && (
            <div className="layout-flex-col gap-md mt-6">
              <div className="layout-flex items-center gap-md mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/30">
                  <FaFlag className="text-amber-400" />
                </div>
                <h3 className="section-title text-2xl" style={{ margin: 0 }}>Custom Feature Flags</h3>
                <span className="text-sm text-gray-400">
                  ({customFlags.length} flag{customFlags.length !== 1 ? 's' : ''})
                </span>
              </div>
              
              <div className="layout-flex-col gap-md">
                {customFlags.map((flag, idx) => (
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
            </div>
          )}
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

