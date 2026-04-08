'use client';

import { cn } from '@/lib/utils';
import { MASTER_DECK } from '@/content/presentation/masterDeck';

type ChapterProgressProps = {
  activeId: string;
  progress: number;
};

export function ChapterProgress({ activeId, progress }: ChapterProgressProps) {
  return (
    <>
      {/* Top progress line */}
      <div
        className="fixed left-0 top-0 z-[70] h-[3px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-emerald-400 transition-[width] duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Presentation scroll progress"
      />

      {/* Desktop chapter dots */}
      <nav
        className="fixed right-4 top-1/2 z-[55] hidden -translate-y-1/2 flex-col gap-2 lg:flex"
        aria-label="Section index"
      >
        {MASTER_DECK.map((s) => (
          <a
            key={s.id}
            href={`#section-${s.id}`}
            title={`${s.navLabel} — ${s.actLabel}`}
            className={cn(
              'group relative flex h-8 w-8 items-center justify-center rounded-full border transition',
              activeId === s.id
                ? 'border-violet-400 bg-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.35)]'
                : 'border-white/10 bg-black/40 hover:border-white/25'
            )}
          >
            <span
              className={cn(
                'h-2 w-2 rounded-full transition',
                activeId === s.id ? 'bg-white' : 'bg-white/30 group-hover:bg-white/60'
              )}
            />
          </a>
        ))}
      </nav>
    </>
  );
}
