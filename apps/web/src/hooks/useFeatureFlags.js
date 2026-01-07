import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "../app/providers/AuthProvider";
import { apiFetch } from "../services/api";
import { unwrapArray } from "../services/apiShape";

/**
 * Hook to fetch and check feature flags
 * Returns a map of flag keys to their enabled status
 * 
 * Automatically refetches flags:
 * - On mount
 * - Every 30 seconds (polling)
 * - When 'feature-flags-updated' event is fired (cross-tab/window sync)
 */
export function useFeatureFlags() {
  const { token } = useAuth();
  const [flags, setFlags] = useState({});
  const [loading, setLoading] = useState(true);
  const alive = useRef(true);
  const pollingInterval = useRef(null);

  const loadFlags = useCallback(async (signal) => {
    try {
      // Try public endpoint first (works for all users, no auth required)
      // Fallback to admin endpoint if public doesn't work (for admins)
      const json = await apiFetch("/api/v1/public/feature-flags", { signal }).catch((err) => {
        console.warn("Public feature flags endpoint failed, trying admin endpoint:", err);
        // Fallback to admin endpoint if public doesn't work (requires token)
        if (token) {
          return apiFetch("/api/v1/admin/feature-flags", { token, signal }).catch((adminErr) => {
            console.warn("Admin feature flags endpoint also failed:", adminErr);
            return { ok: true, data: [] };
          });
        }
        return { ok: true, data: [] };
      });
      const list = unwrapArray(json);
      console.log("📋 Loaded feature flags:", list);
      const flagsMap = {};
      list.forEach(flag => {
        flagsMap[flag.key] = flag.enabled;
        console.log(`  ✓ ${flag.key}: ${flag.enabled ? 'ENABLED' : 'DISABLED'}`);
      });
      if (alive.current && !signal?.aborted) {
        setFlags(flagsMap);
        console.log("✅ Feature flags state updated:", flagsMap);
        // Store timestamp in localStorage for cross-tab sync
        localStorage.setItem('feature-flags-last-updated', Date.now().toString());
      }
    } catch (e) {
      if (signal?.aborted) return;
      console.warn("Failed to load feature flags:", e);
      // Default to empty object if flags can't be loaded
      if (alive.current) setFlags({});
    } finally {
      if (!signal?.aborted && alive.current) {
        setLoading(false);
      }
    }
  }, [token]);

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();

    // Initial load
    loadFlags(ac.signal);

    // Set up polling: refetch every 30 seconds
    pollingInterval.current = setInterval(() => {
      if (alive.current) {
        const pollAc = new AbortController();
        loadFlags(pollAc.signal);
      }
    }, 30000); // 30 seconds

    // Listen for custom event (fired when flags are updated in SuperAdmin)
    const handleFlagUpdate = () => {
      console.log("🔄 Feature flags update event received, refetching...");
      if (alive.current) {
        const eventAc = new AbortController();
        loadFlags(eventAc.signal);
      }
    };
    window.addEventListener('feature-flags-updated', handleFlagUpdate);

    // Listen for storage events (cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === 'feature-flags-last-updated') {
        console.log("🔄 Feature flags updated in another tab, refetching...");
        if (alive.current) {
          const storageAc = new AbortController();
          loadFlags(storageAc.signal);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      alive.current = false;
      // Don't abort immediately - let ongoing requests complete
      // The signal will be checked in loadFlags to prevent state updates
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
      window.removeEventListener('feature-flags-updated', handleFlagUpdate);
      window.removeEventListener('storage', handleStorageChange);
      // Abort after a short delay to allow cleanup
      setTimeout(() => {
        if (!alive.current) {
          ac.abort();
        }
      }, 100);
    };
  }, [loadFlags]);

  /**
   * Check if a feature flag is enabled
   * @param {string} key - Feature flag key
   * @returns {boolean|undefined} - True if enabled, false if disabled, undefined if not found
   * 
   * IMPORTANT: Returns undefined if flag doesn't exist (not true/false)
   * This allows checkFeatureFlag to distinguish between "not set" and "explicitly disabled"
   */
  function isEnabled(key) {
    // If still loading, return undefined (let checkFeatureFlag handle it)
    if (loading) return undefined;
    // If flags object is empty (failed to load), return undefined
    if (Object.keys(flags).length === 0) return undefined;
    // Return the actual flag value, or undefined if not found
    return flags[key] !== undefined ? flags[key] : undefined;
  }

  /**
   * Manually refetch feature flags
   * Useful for forcing a refresh after SuperAdmin updates flags
   */
  const refetch = useCallback(() => {
    if (alive.current) {
      const ac = new AbortController();
      setLoading(true);
      loadFlags(ac.signal);
    }
  }, [loadFlags]);

  return { flags, loading, isEnabled, refetch };
}
