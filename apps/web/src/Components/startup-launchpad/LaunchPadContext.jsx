import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { computeReadinessResult, STAGE_SLUGS, STAGES } from "./launchpadConfig";

const STORAGE_KEY = "expograph-launchpad-v1";

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function defaultState() {
  return {
    started: false,
    readinessAnswers: {},
    readinessResult: null,
    completedSlugs: [],
    /** @type {string | null} */
    activeSlug: "idea",
    startupName: "",
    startupType: "",
    founderType: "solo",
    teamSize: "solo",
    legalStatus: "Not formalized",
    market: "",
    businessModel: "",
    revenueStatus: "None yet",
    registrationStatus: "Not started",
    templatesUsed: [],
    lastGuidePrompt: "",
    validationNotes: "",
    mvpPlanNotes: "",
    /** @type {Record<string, string>} */
    stageNotes: {},
  };
}

export const LaunchPadContext = createContext(null);

export function LaunchPadProvider({ children }) {
  const [state, setState] = useState(() => {
    const persisted = typeof window !== "undefined" ? loadPersisted() : null;
    if (!persisted) return defaultState();
    return {
      ...defaultState(),
      ...persisted,
      stageNotes: persisted.stageNotes && typeof persisted.stageNotes === "object" ? persisted.stageNotes : {},
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const completedSet = useMemo(() => new Set(state.completedSlugs), [state.completedSlugs]);

  const progressPercent = useMemo(() => {
    if (!state.started && state.completedSlugs.length === 0) return 0;
    return Math.round((state.completedSlugs.length / STAGE_SLUGS.length) * 100);
  }, [state.started, state.completedSlugs.length]);

  const getStageState = useCallback(
    (slug) => {
      const idx = STAGE_SLUGS.indexOf(slug);
      if (idx < 0) return "locked";
      if (completedSet.has(slug)) return "completed";
      const prev = idx === 0 ? null : STAGE_SLUGS[idx - 1];
      if (idx > 0 && prev && !completedSet.has(prev)) return "locked";
      if (state.activeSlug === slug) return "active";
      return "available";
    },
    [completedSet, state.activeSlug]
  );

  const setReadinessAnswers = useCallback((answers) => {
    const result = computeReadinessResult(answers);
    setState((s) => ({
      ...s,
      readinessAnswers: { ...answers },
      readinessResult: result,
      started: true,
      activeSlug: STAGE_SLUGS[Math.min(result.stageIndexHint ?? 0, STAGE_SLUGS.length - 1)],
    }));
  }, []);

  const completeStage = useCallback((slug) => {
    setState((s) => {
      const next = new Set(s.completedSlugs);
      next.add(slug);
      const idx = STAGE_SLUGS.indexOf(slug);
      const nextSlug = idx >= 0 && idx < STAGE_SLUGS.length - 1 ? STAGE_SLUGS[idx + 1] : slug;
      return {
        ...s,
        started: true,
        completedSlugs: [...next],
        activeSlug: nextSlug,
      };
    });
  }, []);

  const setActiveSlug = useCallback((slug) => {
    if (STAGE_SLUGS.includes(slug)) setState((s) => ({ ...s, started: true, activeSlug: slug }));
  }, []);

  const updateProfile = useCallback((patch) => {
    setState((s) => ({ ...s, ...patch, started: true }));
  }, []);

  const saveStageNotes = useCallback((slug, notes) => {
    setState((s) => ({
      ...s,
      started: true,
      stageNotes: { ...s.stageNotes, [slug]: notes },
    }));
  }, []);

  const resetAll = useCallback(() => {
    setState(defaultState());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const currentStageMeta = useMemo(() => {
    const slug = state.activeSlug && STAGES[state.activeSlug] ? state.activeSlug : "idea";
    return STAGES[slug];
  }, [state.activeSlug]);

  const value = useMemo(
    () => ({
      ...state,
      progressPercent,
      getStageState,
      setReadinessAnswers,
      completeStage,
      setActiveSlug,
      updateProfile,
      saveStageNotes,
      resetAll,
      currentStageMeta,
      stagesOrder: STAGE_SLUGS,
    }),
    [
      state,
      progressPercent,
      getStageState,
      setReadinessAnswers,
      completeStage,
      setActiveSlug,
      updateProfile,
      saveStageNotes,
      resetAll,
      currentStageMeta,
    ]
  );

  return <LaunchPadContext.Provider value={value}>{children}</LaunchPadContext.Provider>;
}

export function useLaunchPad() {
  const ctx = useContext(LaunchPadContext);
  if (!ctx) throw new Error("useLaunchPad must be used within LaunchPadProvider");
  return ctx;
}

/** Safe when used outside provider (e.g. HMR); prefer useLaunchPad inside LaunchPad. */
export function useLaunchPadOptional() {
  return useContext(LaunchPadContext);
}
