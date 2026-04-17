import { cn } from '@/lib/utils';
import { LightboxZoomHint, usePresentationLightbox } from './PresentationLightbox';

type BrowserFrameProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  /** Shown on top of placeholder to label what to swap in */
  slotLabel?: string;
};

export function BrowserFrame({ src, alt, caption, className, slotLabel }: BrowserFrameProps) {
  const lightbox = usePresentationLightbox();

  return (
    <figure className={cn('relative', className)}>
      <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-[0_24px_80px_-30px_rgba(59,130,246,0.25)] ring-1 ring-slate-100">
        <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="mx-auto flex max-w-md flex-1 items-center justify-center rounded-lg bg-slate-100 px-3 py-1 text-[11px] text-slate-500">
            expograph.in
          </div>
        </div>
        <div className="relative overflow-hidden rounded-b-lg bg-slate-50">
          {lightbox ? (
            <button
              type="button"
              onClick={() => lightbox.openLightbox(src, alt)}
              className="group relative block w-full cursor-zoom-in text-left outline-none transition focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
              aria-label={`View full size: ${alt}`}
            >
              <img src={src} alt="" className="h-auto w-full object-cover object-top" loading="lazy" aria-hidden />
              <LightboxZoomHint />
            </button>
          ) : (
            <img src={src} alt={alt} className="h-auto w-full object-cover object-top" loading="lazy" />
          )}
          {slotLabel && (
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 px-4 py-2 text-center text-xs font-medium text-slate-700 backdrop-blur-sm">
              {slotLabel}
            </div>
          )}
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-center text-xs text-slate-500">{caption}</figcaption>}
    </figure>
  );
}

