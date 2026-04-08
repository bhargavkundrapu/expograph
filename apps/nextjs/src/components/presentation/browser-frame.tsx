'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type BrowserFrameProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  /** Shown on top of placeholder to label what to swap in */
  slotLabel?: string;
};

export function BrowserFrame({ src, alt, caption, className, slotLabel }: BrowserFrameProps) {
  return (
    <figure className={cn('relative', className)}>
      <div
        className="rounded-xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-2 shadow-[0_24px_80px_-20px_rgba(124,58,237,0.35)] ring-1 ring-white/[0.06]"
        aria-hidden={false}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.08] px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="mx-auto flex max-w-md flex-1 items-center justify-center rounded-lg bg-black/40 px-3 py-1 text-[11px] text-white/40">
            expograph.app
          </div>
        </div>
        <div className="relative overflow-hidden rounded-b-lg bg-black">
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={900}
            className="h-auto w-full object-cover object-top"
            unoptimized={src.endsWith('.svg')}
            priority={false}
          />
          {slotLabel && (
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-lg bg-black/65 px-4 py-2 text-center text-xs font-medium text-white/80 backdrop-blur-sm">
              {slotLabel}
            </div>
          )}
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-center text-xs text-white/45">{caption}</figcaption>}
    </figure>
  );
}
