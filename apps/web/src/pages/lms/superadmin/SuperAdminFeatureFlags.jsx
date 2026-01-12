import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
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
      
      window.dispatchEvent(new CustomEvent('feature-flags-updated'));
      localStorage.setItem('feature-flags-last-updated', Date.now().toString());
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
      <div>
        <Skeleton />
        <Skeleton />
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

  const allFeatureFlags = getAllFeatureFlags();
  const existingFlagKeys = new Set(flags.map(f => f.key));
  
  const missingFlags = allFeatureFlags.filter(f => !existingFlagKeys.has(f.key));
  
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
      
      window.dispatchEvent(new CustomEvent('feature-flags-updated'));
      localStorage.setItem('feature-flags-last-updated', Date.now().toString());
    } catch (e) {
      alert(e?.message || "Failed to create some feature flags");
    }
  }

  return (
    <div>
      <div>
        <div>
        </div>
        <div>
          <h1>Feature Flags</h1>
          <p>Manage platform features and experiments</p>
        </div>
      </div>

      <div>
        <Card variant="elevated">
          <div>
            <div>
              <div>{totalPredefined}</div>
              <div>Predefined</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated">
          <div>
            <div>
              <div>{createdCount}</div>
              <div>Created</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated">
          <div>
            <div>
              <div>{enabledCount}</div>
              <div>Enabled</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated">
          <div>
            <div>
              <div>{disabledCount}</div>
              <div>Disabled</div>
            </div>
          </div>
        </Card>
      </div>

      {missingFlags.length > 0 && (
        <Card variant="elevated">
          <div>
            <div>
              <CardTitle>Quick Setup</CardTitle>
              <CardDescription>
                {missingFlags.length} feature flag{missingFlags.length !== 1 ? 's' : ''} not yet created. 
                Create them all at once to start managing all platform features.
              </CardDescription>
            </div>
            <Button
              variant="gradient"
              size="md"
              onClick={createAllMissingFlags}
              disabled={updating._creatingAll}
            >
              Create All ({missingFlags.length})
            </Button>
          </div>
        </Card>
      )}

      {Object.keys(flagsByCategory).length === 0 && customFlags.length === 0 ? (
        <EmptyState
          title="No Feature Flags"
          message="No feature flags are currently configured."
        />
      ) : (
        <div>
          {Object.entries(flagsByCategory).map(([category, categoryFlags]) => (
            <div key={category}>
              <div>
                <div>
                </div>
                <h3>{category}</h3>
                <span>
                  ({categoryFlags.filter(f => f.enabled && f.exists).length}/{categoryFlags.filter(f => f.exists).length} enabled, {categoryFlags.filter(f => !f.exists).length} not created)
                </span>
              </div>
              
              <div>
                {categoryFlags.map((flag, idx) => {
                  if (!flag.exists) {
                    return (
                      <Card
                        key={flag.key}
                        variant="elevated"
                      >
                        <div>
                          <div>
                            <div>
                            </div>
                            <div>
                              <CardTitle>{flag.key}</CardTitle>
                              <CardDescription>{flag.description}</CardDescription>
                            </div>
                          </div>
                          <div>
                            <span>
                              Not Created
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
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
                  
                  return (
                    <Card
                      key={flag.key}
                      variant="elevated"
                    >
                      <div>
                        <div>
                          <div>
                            <div>
                            </div>
                            <div>
                              <CardTitle>{flag.key}</CardTitle>
                              <CardDescription>{flag.description}</CardDescription>
                            </div>
                          </div>
                        </div>
                        <div>
                          <span>
                            {flag.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                          <button
                            onClick={() => toggleFlag(flag.key, flag.enabled)}
                            disabled={updating[flag.key]}
                          >
                            {flag.enabled ? 'ON' : 'OFF'}
                          </button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
          
          {customFlags.length > 0 && (
            <div>
              <div>
                <div>
                </div>
                <h3>Custom Feature Flags</h3>
                <span>
                  ({customFlags.length} flag{customFlags.length !== 1 ? 's' : ''})
                </span>
              </div>
              
              <div>
                {customFlags.map((flag, idx) => (
                  <Card
                    key={flag.key}
                    variant="elevated"
                  >
                    <div>
                      <div>
                        <div>
                          <div>
                          </div>
                          <div>
                            <CardTitle>{flag.key}</CardTitle>
                            {flag.description && (
                              <CardDescription>{flag.description}</CardDescription>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <span>
                          {flag.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <button
                          onClick={() => toggleFlag(flag.key, flag.enabled)}
                          disabled={updating[flag.key]}
                        >
                          {flag.enabled ? 'ON' : 'OFF'}
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

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <div>
            <CardTitle>About Feature Flags</CardTitle>
            <CardDescription>
              Feature flags allow you to enable or disable features across the platform without deploying new code. 
              Use them for A/B testing, gradual rollouts, or quickly disabling features if issues arise.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}
