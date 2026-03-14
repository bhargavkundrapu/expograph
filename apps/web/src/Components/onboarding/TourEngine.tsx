import { useState, useCallback, useEffect, useRef } from "react";
import { waitForElement, waitForAnyElement } from "../../utils/waitForElement";
import { apiFetch } from "../../services/api";

const JOYRIDE_STEP_TARGET_ATTR = "data-tour";

export type TourStep = {
  target: string;
  content: React.ReactNode;
  title?: string;
  placement?: "top" | "bottom" | "left" | "right" | "center";
  fallbackTargets?: string[];
};

type TourEngineProps = {
  tourKey: string;
  tourVersion: number;
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
  initialStepIndex?: number;
  token: string | null;
  onComplete?: () => void;
  onDismiss?: () => void;
};

const TOUR_LOCK_KEY = "expograph_tour_lock";
const TOUR_LOCK_TTL_MS = 2 * 60 * 1000;

function getTourLock(): string | null {
  try {
    const raw = localStorage.getItem(TOUR_LOCK_KEY);
    if (!raw) return null;
    const { expires } = JSON.parse(raw);
    if (Date.now() > expires) {
      localStorage.removeItem(TOUR_LOCK_KEY);
      return null;
    }
    return raw;
  } catch {
    return null;
  }
}

function setTourLock(): void {
  try {
    localStorage.setItem(
      TOUR_LOCK_KEY,
      JSON.stringify({ expires: Date.now() + TOUR_LOCK_TTL_MS })
    );
  } catch {}
}

function clearTourLock(): void {
  try {
    localStorage.removeItem(TOUR_LOCK_KEY);
  } catch {}
}

function toJoyrideTarget(selector: string): string {
  if (selector.startsWith("[") && selector.includes("data-tour")) return selector;
  if (selector.startsWith(".") || selector.startsWith("#")) return selector;
  return `[${JOYRIDE_STEP_TARGET_ATTR}="${selector}"]`;
}

export function TourEngine({
  tourKey,
  tourVersion,
  steps,
  isOpen,
  onClose,
  initialStepIndex = 0,
  token,
  onComplete,
  onDismiss,
}: TourEngineProps) {
  const [JoyrideComponent, setJoyrideComponent] = useState<typeof import("react-joyride") | null>(null);
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(initialStepIndex);
  const [resolvedSteps, setResolvedSteps] = useState<Array<{ target: string; content: React.ReactNode; title?: string; placement?: string; originalIndex: number }>>([]);
  const resolvingRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Lazy load react-joyride
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    import("react-joyride").then((mod) => {
      if (!cancelled && mountedRef.current) setJoyrideComponent(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const persistProgress = useCallback(
    async (lastStep: number) => {
      if (!token || !tourKey) return;
      try {
        await apiFetch("/api/v1/onboarding/progress", {
          method: "POST",
          token,
          body: { tour_key: tourKey, tour_version: tourVersion, last_step: lastStep },
        });
      } catch (e) {
        if (import.meta.env?.DEV) console.debug("Tour progress persist failed", e);
      }
    },
    [token, tourKey, tourVersion]
  );

  const persistComplete = useCallback(async () => {
    if (!token || !tourKey) return;
    try {
      await apiFetch("/api/v1/onboarding/complete", {
        method: "POST",
        token,
        body: { tour_key: tourKey, tour_version: tourVersion },
      });
    } catch (e) {
      if (import.meta.env?.DEV) console.debug("Tour complete persist failed", e);
    }
  }, [token, tourKey, tourVersion]);

  const persistDismiss = useCallback(async () => {
    if (!token || !tourKey) return;
    try {
      await apiFetch("/api/v1/onboarding/dismiss", {
        method: "POST",
        token,
        body: { tour_key: tourKey, tour_version: tourVersion },
      });
    } catch (e) {
      if (import.meta.env?.DEV) console.debug("Tour dismiss persist failed", e);
    }
  }, [token, tourKey, tourVersion]);

  // Resolve steps: wait for target (or fallbacks), skip if not found. Defer one frame so DOM is ready after React commit.
  useEffect(() => {
    if (!isOpen || steps.length === 0 || resolvingRef.current) return;

    const resolveStep = async (idx: number): Promise<{ target: string; content: React.ReactNode; title?: string; placement?: string; originalIndex: number } | null> => {
      const step = steps[idx];
      if (!step) return null;
      const selectors = [step.target, ...(step.fallbackTargets || [])].map((s) =>
        s.startsWith("[") || s.startsWith(".") || s.startsWith("#") ? s : `[data-tour="${s}"]`
      );
      const found = await waitForAnyElement(selectors, 4000, 150);
      if (!found || !mountedRef.current) {
        if (import.meta.env?.DEV) console.debug("[TourEngine] Step target not found, skipping", step.target);
        return null;
      }
      return {
        target: found,
        content: step.content,
        title: step.title,
        placement: step.placement as "top" | "bottom" | "left" | "right" | "center",
        originalIndex: idx,
      };
    };

    let cancelled = false;
    resolvingRef.current = true;
    const startIdx = stepIndex;

    const runResolution = () => {
      (async () => {
        try {
          const resolved: Array<{ target: string; content: React.ReactNode; title?: string; placement?: string; originalIndex: number }> = [];
          for (let i = startIdx; i < steps.length && !cancelled && mountedRef.current; i++) {
            const r = await resolveStep(i);
            if (r) resolved.push(r);
          }
          if (cancelled || !mountedRef.current) return;
          if (resolved.length > 0) {
            setResolvedSteps(resolved);
            setStepIndex(0);
            setRun(true);
          } else {
            // No targets found: show one fallback step on body so the user sees something instead of nothing
            setResolvedSteps([
              {
                target: "body",
                content: "Tour targets aren’t available on this view. You can replay tours anytime from the menu: Support → Guided Tours.",
                title: "Guided tour",
                placement: "center",
                originalIndex: 0,
              },
            ]);
            setStepIndex(0);
            setRun(true);
          }
        } finally {
          resolvingRef.current = false;
        }
      })();
    };

    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      runResolution();
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [isOpen, tourKey, steps, stepIndex]);

  const handleJoyrideCallback = useCallback(
    (data: { action: string; index: number; status?: string; type: string }) => {
      const { action, index, status, type } = data;
      if (status === "finished" || status === "skipped") {
        setRun(false);
        setResolvedSteps([]);
        clearTourLock();
        if (status === "finished") {
          persistComplete();
          onComplete?.();
        } else {
          persistDismiss();
          onDismiss?.();
        }
        onClose();
        return;
      }
      if (type === "step:after" && action === "next") {
        const nextResolvedIndex = index + 1;
        const nextOriginalIndex = resolvedSteps[nextResolvedIndex]?.originalIndex ?? steps.length;
        persistProgress(nextOriginalIndex);
        if (nextResolvedIndex >= resolvedSteps.length) {
          setRun(false);
          persistComplete();
          onComplete?.();
          clearTourLock();
          onClose();
        } else {
          setStepIndex(nextResolvedIndex);
        }
      }
      if (type === "step:after" && action === "prev") {
        setStepIndex(Math.max(0, index - 1));
      }
    },
    [resolvedSteps, steps.length, onClose, persistProgress, persistComplete, persistDismiss, onComplete, onDismiss]
  );

  const handleClose = useCallback(() => {
    setRun(false);
    setResolvedSteps([]);
    clearTourLock();
    persistDismiss();
    onDismiss?.();
    onClose();
  }, [onClose, persistDismiss, onDismiss]);

  useEffect(() => {
    if (isOpen && !getTourLock()) setTourLock();
  }, [isOpen]);

  if (!JoyrideComponent || !isOpen) return null;

  const joyrideSteps = resolvedSteps.map((s) => ({
    target: s.target,
    content: s.content,
    title: s.title,
    placement: (s.placement as "top" | "bottom" | "left" | "right" | "center") || "bottom",
    disableBeacon: true,
  }));

  if (joyrideSteps.length === 0) return null;

  return (
    <JoyrideComponent
      steps={joyrideSteps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      scrollToFirstStep
      spotlightClicks={false}
      disableOverlayClose={false}
      floaterProps={{ disableAnimation: false }}
      styles={{
        options: { primaryColor: "#6366f1", zIndex: 10000 },
        tooltip: { borderRadius: 12 },
        tooltipContainer: { textAlign: "left" },
      }}
      locale={{ back: "Back", close: "Close", last: "Done", next: "Next", skip: "Skip" }}
    />
  );
}

export default TourEngine;
