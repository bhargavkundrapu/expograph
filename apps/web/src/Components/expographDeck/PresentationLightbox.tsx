import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

type LightboxState = { src: string; alt: string };

type PresentationLightboxContextValue = {
  openLightbox: (src: string, alt: string) => void;
};

const PresentationLightboxContext = createContext<PresentationLightboxContextValue | null>(null);

export function usePresentationLightbox(): PresentationLightboxContextValue | null {
  return useContext(PresentationLightboxContext);
}

const DECK_NAV_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End']);

export function PresentationLightboxProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<LightboxState | null>(null);
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const openLightbox = useCallback((src: string, alt: string) => {
    setOpen({ src, alt });
  }, []);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        close();
        return;
      }
      if (DECK_NAV_KEYS.has(e.key)) {
        e.stopPropagation();
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  const portal =
    open &&
    typeof document !== 'undefined' &&
    createPortal(
      <div
        className="fixed inset-0 z-[10050] animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="absolute inset-0 bg-slate-950/88 backdrop-blur-md"
          aria-label="Close full image view"
          onClick={close}
        />
        <div className="relative z-10 flex h-[100dvh] min-h-0 flex-col pointer-events-none">
          <header className="pointer-events-auto flex shrink-0 items-center gap-3 border-b border-white/10 bg-slate-950/95 px-3 py-3 sm:px-4">
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
            <p id={titleId} className="min-w-0 flex-1 truncate text-sm text-white/90">
              {open.alt}
            </p>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </header>

          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-4 sm:p-6">
            <img
              src={open.src}
              alt={open.alt}
              className="pointer-events-auto max-h-[min(88dvh,1200px)] max-w-full rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
              loading="eager"
              decoding="async"
            />
          </div>

          <p className="pointer-events-none shrink-0 px-4 pb-3 text-center text-[11px] text-white/45">
            Click the dimmed area or press Esc to close
          </p>
        </div>
      </div>,
      document.body
    );

  return (
    <PresentationLightboxContext.Provider value={{ openLightbox }}>
      {children}
      {portal}
    </PresentationLightboxContext.Provider>
  );
}

export function LightboxZoomHint({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-slate-900/70 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white/90 opacity-0 shadow-sm ring-1 ring-white/10 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100',
        className
      )}
      aria-hidden
    >
      <ZoomIn className="h-3 w-3" />
      Enlarge
    </span>
  );
}
