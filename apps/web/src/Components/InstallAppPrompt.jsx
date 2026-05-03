import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FiX, FiSmartphone, FiDownload } from "react-icons/fi";

const STORAGE_KEY_REFRESH_COUNT = "expograph-install-refresh-count";
const SHOW_EVERY_N_REFRESHES = 4;
const MD_BREAKPOINT = 768;

function getAndIncrementRefreshCount() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REFRESH_COUNT);
    const count = raw ? Math.max(0, parseInt(raw, 10)) : 0;
    const next = count + 1;
    localStorage.setItem(STORAGE_KEY_REFRESH_COUNT, String(next));
    return next;
  } catch {
    return 1;
  }
}

function shouldShowThisTime() {
  const count = getAndIncrementRefreshCount();
  return count % SHOW_EVERY_N_REFRESHES === 0;
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true ||
    document.referrer.includes("android-app://")
  );
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < MD_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

function useShouldShowPrompt() {
  const isMobile = useIsMobile();
  const [show, setShow] = useState(false);
  const countedRef = useRef(false);

  useEffect(() => {
    const apply = (next) => {
      queueMicrotask(() => setShow(next));
    };
    // Never show after installation (standalone) - not even once
    if (isStandalone()) {
      apply(false);
      return;
    }
    if (!isMobile) {
      apply(false);
      return;
    }
    // Count each page load only once; show every 4th refresh
    if (!countedRef.current) {
      countedRef.current = true;
      if (!shouldShowThisTime()) {
        apply(false);
        return;
      }
    }
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, [isMobile]);

  return show;
}

const CHROME_STEPS = [
  { step: 1, text: "Tap the three dots (⋮) at the top right of your browser" },
  { step: 2, text: 'Select "Add to Home screen" or "Install app"' },
  { step: 3, text: "Tap Install-ExpoGraph will appear on your home screen" },
];

const SAFARI_STEPS = [
  { step: 1, text: "Tap the Share button (square with arrow) at the bottom" },
  { step: 2, text: 'Scroll and tap "Add to Home Screen"' },
  { step: 3, text: "Tap Add-ExpoGraph will appear on your home screen" },
];

function isLikelySafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /iPhone|iPad|iPod/.test(ua) || (ua.includes("Safari") && !ua.includes("Chrome"));
}

export function InstallAppPrompt() {
  const shouldShow = useShouldShowPrompt();
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const visible = shouldShow && !dismissed;

  const handleDismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  const handleGotIt = useCallback(() => {
    setExpanded(true);
  }, []);

  if (!visible || !shouldShow) return null;

  const steps = isLikelySafari() ? SAFARI_STEPS : CHROME_STEPS;
  const browserName = isLikelySafari() ? "Safari" : "Chrome";

  const content = (
    <AnimatePresence>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] flex items-end justify-center md:hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-black/30"
          onClick={handleDismiss}
          aria-hidden="true"
        />
        <div className="relative pointer-events-none w-full flex justify-center px-3 pb-6 pt-2 safe-area-pb">
          <div className="pointer-events-auto w-full max-w-lg">
          <Motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative rounded-2xl shadow-xl overflow-hidden border border-slate-200 bg-white"
          >
            <div className="relative p-5">
              <button
                type="button"
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 pr-10">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200">
                  <FiSmartphone className="w-7 h-7 text-slate-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Install ExpoGraph
                  </h3>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                    Add to your home screen for quick access and a full-screen experience-like a native app.
                  </p>
                </div>
              </div>

              {!expanded ? (
                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleGotIt}
                    className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <FiDownload className="w-4 h-4" />
                    How to install
                  </button>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="w-full py-3 px-4 rounded-xl font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 transition-colors"
                  >
                    Not now
                  </button>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    In {browserName}
                  </p>
                  <ol className="space-y-3">
                    {steps.map(({ step, text }) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center">
                          {step}
                        </span>
                        <span className="text-sm text-slate-700 leading-snug pt-0.5">
                          {text}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="w-full py-3 px-4 rounded-xl font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors mt-2"
                  >
                    Got it
                  </button>
                </div>
              )}
            </div>
          </Motion.div>
          </div>
        </div>
      </Motion.div>
    </AnimatePresence>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
}
