import { cn } from '@/lib/utils';
import { MASTER_DECK } from '@/content/presentation/masterDeck';

type ChapterProgressProps = {
  activeId: string;
  progress: number;
};

export function ChapterProgress({ activeId, progress }: ChapterProgressProps) {
  return (
    <>
      <div
        className="fixed left-0 top-0 z-[70] h-[3px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-emerald-400 transition-[width] duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        role="progressbar"
        aria-label="Presentation scroll progress"
      />

      <nav className="fixed right-4 top-1/2 z-[55] hidden -translate-y-1/2 flex-col gap-2 lg:flex" aria-label="Section index">
        {MASTER_DECK.map((s) => (
          <a
            key={s.id}
            href={`#section-${s.id}`}
            title={`${s.navLabel} — ${s.actLabel}`}
            className={cn(
              'group relative flex h-8 w-8 items-center justify-center rounded-full border transition',
              activeId === s.id
                ? 'border-violet-300 bg-violet-100 shadow-[0_0_20px_rgba(139,92,246,0.22)]'
                : 'border-slate-300 bg-white hover:border-violet-300'
            )}
          >
            <span
              className={cn(
                'h-2 w-2 rounded-full transition',
                activeId === s.id ? 'bg-violet-600' : 'bg-slate-400 group-hover:bg-violet-500'
              )}
            />
          </a>
        ))}
      </nav>
    </>
  );
}

