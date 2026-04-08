'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChapterProgress } from '@/components/presentation/chapter-progress';
import { PresentationSection } from '@/components/presentation/presentation-section';
import { MASTER_DECK } from '@/content/presentation/masterDeck';
import { ChevronUp } from 'lucide-react';

const SECTION_IDS: string[] = MASTER_DECK.map((s) => s.id);

export function PresentationPageClient() {
  const [activeId, setActiveId] = useState<string>(SECTION_IDS[0] ?? 'cover');
  const [progress, setProgress] = useState(0);

  const scrollToSection = useCallback((index: number) => {
    const id = SECTION_IDS[index];
    if (!id) return;
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(`section-${id}`)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const first = visible[0];
        if (first?.target) {
          const id = first.target.getAttribute('data-section-id');
          if (id) setActiveId(id);
        }
      },
      { threshold: [0.15, 0.35, 0.55], rootMargin: '-12% 0px -12% 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const idx = SECTION_IDS.indexOf(activeId);
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(Math.min(idx + 1, SECTION_IDS.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(Math.max(idx - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(SECTION_IDS.length - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId, scrollToSection]);

  return (
    <div className="min-h-screen bg-ink text-white selection:bg-violet-500/30">
      <ChapterProgress activeId={activeId} progress={progress} />

      <main className="relative">
        {MASTER_DECK.map((section) => (
          <PresentationSection key={section.id} section={section} />
        ))}
      </main>

      <div className="pointer-events-none fixed bottom-6 left-4 z-[58] hidden text-[11px] text-white/35 lg:block">
        <kbd className="rounded border border-white/15 bg-black/40 px-1.5 py-0.5">↑</kbd>{' '}
        <kbd className="rounded border border-white/15 bg-black/40 px-1.5 py-0.5">↓</kbd> sections ·{' '}
        <kbd className="rounded border border-white/15 bg-black/40 px-1.5 py-0.5">Home</kbd>{' '}
        <kbd className="rounded border border-white/15 bg-black/40 px-1.5 py-0.5">End</kbd>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-6 z-[56] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur transition hover:bg-white/10 lg:bottom-8"
        aria-label="Back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      <footer className="border-t border-white/[0.06] px-4 py-12 text-center text-xs text-white/40 sm:px-6">
        <p>ExpoGraph Academy · Product presentation · Content reflects the live product direction.</p>
      </footer>
    </div>
  );
}
