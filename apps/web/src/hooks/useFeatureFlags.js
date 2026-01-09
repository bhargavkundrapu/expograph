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
// Global flag to track if we've logged the initial load (prevents duplicate logs)
let hasLoggedInitialLoad = false;

export function useFeatureFlags() {
  const { token } = useAuth();
  const [flags, setFlags] = useState({});
  const [loading, setLoading] = useState(true);
  const alive = useRef(true);
  const pollingInterval = useRef(null);
  const lastLoadTime = useRef(0);

  const loadFlags = useCallback(async (signal, force = false) => {
    // Prevent rapid successive loads (debounce) - allow at most one load per 2 seconds
    const now = Date.now();
    if (!force && now - lastLoadTime.current < 2000) {
      return;
    }
    lastLoadTime.current = now;

    try {
      // Try public endpoint first (works for all users, no auth required)
      // Fallback to admin endpoint if public doesn't work (for admins)
      const json = await apiFetch("/api/v1/public/feature-flags", { signal }).catch((err) => {
        // Only log warnings in dev mode
        if (import.meta.env.DEV) {
          console.warn("Public feature flags endpoint failed, trying admin endpoint:", err);
        }
        // Fallback to admin endpoint if public doesn't work (requires token)
        if (token) {
          return apiFetch("/api/v1/admin/feature-flags", { token, signal }).catch((adminErr) => {
            if (import.meta.env.DEV) {
              console.warn("Admin feature flags endpoint also failed:", adminErr);
            }
            return { ok: true, data: [] };
          });
        }
        return { ok: true, data: [] };
      });
      const list = unwrapArray(json);
      const flagsMap = {};
      list.forEach(flag => {
        flagsMap[flag.key] = flag.enabled;
      });
      if (alive.current && !signal?.aborted) {
        setFlags(prevFlags => {
          // Only log if flags actually changed and it's the first load or a significant change
          const flagsChanged = JSON.stringify(flagsMap) !== JSON.stringify(prevFlags);
          if (flagsChanged && import.meta.env.DEV) {
            // Only log initial load once, or if flags actually changed significantly
            if (!hasLoggedInitialLoad || Object.keys(prevFlags).length === 0) {
              console.log("✅ Feature flags loaded:", Object.keys(flagsMap).length, "flags");
              hasLoggedInitialLoad = true;
            }
          }
          return flagsMap;
        });
        // Store timestamp in localStorage for cross-tab sync
        localStorage.setItem('feature-flags-last-updated', Date.now().toString());
      }
    } catch (e) {
      if (signal?.aborted) return;
      if (import.meta.env.DEV) {
        console.warn("Failed to load feature flags:", e);
      }
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

    // Set up polling: refetch every 60 seconds (reduced frequency)
    pollingInterval.current = setInterval(() => {
      if (alive.current) {
        const pollAc = new AbortController();
        loadFlags(pollAc.signal);
      }
    }, 60000); // 60 seconds

    // Listen for custom event (fired when flags are updated in SuperAdmin)
    const handleFlagUpdate = () => {
      if (import.meta.env.DEV) {
        console.log("🔄 Feature flags update event received, refetching...");
      }
      if (alive.current) {
        const eventAc = new AbortController();
        loadFlags(eventAc.signal, true); // Force reload on manual update
      }
    };
    window.addEventListener('feature-flags-updated', handleFlagUpdate);

    // Listen for storage events (cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === 'feature-flags-last-updated') {
        if (import.meta.env.DEV) {
          console.log("🔄 Feature flags updated in another tab, refetching...");
        }
        if (alive.current) {
          const storageAc = new AbortController();
          loadFlags(storageAc.signal, true); // Force reload on cross-tab update
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
      loadFlags(ac.signal, true); // Force reload on manual refetch
    }
  }, [loadFlags]);

  return { flags, loading, isEnabled, refetch };
}
