import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import { getTourForRoute } from "./tours/tourRegistry";
import { apiFetch } from "../../services/api";
import TourEngine from "./TourEngine";
import { WelcomeTourPrompt } from "./WelcomeTourPrompt";

const TOUR_LOCK_KEY = "expograph_tour_lock";
const TOUR_LOCK_TTL_MS = 2 * 60 * 1000;

function getTourLock(): boolean {
  try {
    const raw = localStorage.getItem(TOUR_LOCK_KEY);
    if (!raw) return false;
    const { expires } = JSON.parse(raw);
    if (Date.now() > expires) {
      localStorage.removeItem(TOUR_LOCK_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

type OnboardingState = {
  status: string;
  last_step: number;
  tour_version?: number;
};

export default function RouteTourManager() {
  const location = useLocation();
  const { token, user } = useAuth();
  const [state, setState] = useState<OnboardingState | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const [tourConfig, setTourConfig] = useState<{
    tourKey: string;
    tourVersion: number;
    steps: import("./TourEngine").TourStep[];
    title: string;
  } | null>(null);
  const userRole = user?.role || (user as { role?: string })?.role || "Student";
  const pathname = location.pathname;

  // Stable reference: only change when pathname or userRole changes (getTourForRoute returns new object every call)
  const tourForRoute = useMemo(
    () => getTourForRoute(pathname, {}, userRole),
    [pathname, userRole]
  );

  const tourKey = tourForRoute?.tourKey ?? null;
  const tourVersion = tourForRoute?.tourVersion ?? 0;

  const fetchState = useCallback(async () => {
    if (!token || !tourKey) return;
    try {
      const res = await apiFetch(
        `/api/v1/onboarding/state?tour_key=${encodeURIComponent(tourKey)}&tour_version=${tourVersion}`,
        { token }
      );
      if (res?.ok && res.data) setState(res.data);
      else setState(null);
    } catch {
      setState(null);
    }
  }, [token, tourKey, tourVersion]);

  // Fetch onboarding state when route or token changes
  useEffect(() => {
    if (!tourForRoute || !token) {
      setTourConfig(null);
      setShowPrompt(false);
      setState(null);
      return;
    }
    fetchState();
  }, [pathname, tourKey, token, fetchState]);

  // Decide whether to show the welcome prompt. Deps must be fixed length (primitives only) so React never sees a different array size.
  const stateStatus = state?.status ?? null;
  const stateTourVersion = state?.tour_version ?? null;
  useEffect(() => {
    if (!tourForRoute || !token) return;
    if (state === null) return; // still loading

    const status = state.status;
    const isFirstVisit =
      status === "not_started" ||
      (status === "completed" && (state.tour_version || 1) < tourForRoute.tourVersion);

    if (isFirstVisit && !getTourLock()) {
      setTourConfig({
        tourKey: tourForRoute.tourKey,
        tourVersion: tourForRoute.tourVersion,
        steps: tourForRoute.steps,
        title: tourForRoute.tourKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      });
      setShowPrompt(true);
      setRunTour(false);
    } else {
      setShowPrompt(false);
    }
  }, [tourKey, tourVersion, stateStatus, stateTourVersion, token]);

  const handleStartTour = useCallback(() => {
    if (!tourConfig || !token) return;
    setShowPrompt(false);
    apiFetch("/api/v1/onboarding/start", {
      method: "POST",
      token,
      body: { tour_key: tourConfig.tourKey, tour_version: tourConfig.tourVersion },
    }).catch(() => {});
    setRunTour(true);
  }, [tourConfig, token]);

  const handleSkip = useCallback(() => {
    if (!tourConfig || !token) return;
    setShowPrompt(false);
    apiFetch("/api/v1/onboarding/dismiss", {
      method: "POST",
      token,
      body: { tour_key: tourConfig.tourKey, tour_version: tourConfig.tourVersion },
    }).catch(() => {});
    fetchState();
  }, [tourConfig, token, fetchState]);

  const handleRemindLater = useCallback(() => {
    setShowPrompt(false);
  }, []);

  const handleTourClose = useCallback(() => {
    setRunTour(false);
    setTourConfig((prev) => (prev ? { ...prev } : null));
    fetchState();
  }, [fetchState]);

  if (!tourForRoute) return null;

  const initialStep = state?.last_step ?? 0;

  return (
    <>
      {showPrompt && tourConfig && (
        <WelcomeTourPrompt
          tourTitle={tourConfig.title}
          isWhatsNew={state?.status === "completed" && (state?.tour_version || 1) < tourConfig.tourVersion}
          onStart={handleStartTour}
          onSkip={handleSkip}
          onRemindLater={handleRemindLater}
        />
      )}
      {runTour && tourConfig && (
        <TourEngine
          tourKey={tourConfig.tourKey}
          tourVersion={tourConfig.tourVersion}
          steps={tourConfig.steps}
          isOpen={runTour}
          onClose={handleTourClose}
          initialStepIndex={initialStep}
          token={token}
          onComplete={handleTourClose}
          onDismiss={handleTourClose}
        />
      )}
    </>
  );
}
