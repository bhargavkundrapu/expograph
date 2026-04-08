'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { DeckSection } from '@/content/presentation/masterDeck';
import { TRACK_CARDS } from '@/content/presentation/masterDeck';
import { SCREENSHOTS, SCREENSHOT_ALT } from '@/content/presentation/screenshotMap';
import { BrowserFrame } from '@/components/presentation/browser-frame';
import { getAcademyUrl, getCoursesUrl, getLoginUrl } from '@/lib/presentation/site-url';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function SectionShell({
  id,
  children,
  className,
  moodClass,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  moodClass?: string;
}) {
  return (
    <section
      id={`section-${id}`}
      data-section-id={id}
      className={cn(
        'relative scroll-mt-4 px-4 sm:px-6',
        'min-h-[min(100dvh,960px)] py-20 md:min-h-min md:py-28',
        moodClass,
        className
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300/90">
      <Sparkles className="h-3.5 w-3.5 text-fuchsia-400/80" aria-hidden />
      {children}
    </p>
  );
}

export function PresentationSection({ section }: { section: DeckSection }) {
  const reduce = useReducedMotion();
  const listVariants = useMemo(
    () =>
      reduce
        ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
        : fadeUp,
    [reduce]
  );

  const shot = section.screenshotKey ? SCREENSHOTS[section.screenshotKey] : null;
  const shotAlt = section.screenshotKey ? SCREENSHOT_ALT[section.screenshotKey] : '';

  if (section.variant === 'cover') {
    return (
      <section
        id={`section-${section.id}`}
        data-section-id={section.id}
        className="relative flex min-h-[100dvh] scroll-mt-4 flex-col justify-center overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-radial-violet" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] bg-grid-fade bg-[length:48px_48px]"
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[100px]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-sm font-medium text-violet-200/90"
          >
            {section.eyebrow}
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {section.title}
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-white/65 md:text-xl"
          >
            {section.subtitle}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href={getCoursesUrl()}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-ink shadow-xl transition hover:bg-white/90"
            >
              View courses &amp; packs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={getLoginUrl()}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white/90 hover:bg-white/5"
            >
              Student login
            </Link>
          </motion.div>
          {shot && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-16 md:mt-20"
            >
              <BrowserFrame
                src={shot}
                alt={shotAlt}
                slotLabel="Replace with Academy hero or LMS capture"
                className="mx-auto max-w-5xl"
              />
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  if (section.variant === 'split' && section.id === 'problem') {
    return (
      <SectionShell id={section.id} moodClass="bg-[#06060a]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {section.title}
            </h2>
            <ul className="mt-8 space-y-4">
              {section.lines?.map((line, i) => (
                <motion.li
                  key={line}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={listVariants}
                  className="flex gap-3 text-base text-white/70 md:text-lg"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fuchsia-400/80" />
                  {line}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-slate-900 via-violet-950/40 to-black shadow-2xl">
            <div className="absolute inset-0 bg-[length:48px_48px] bg-grid-fade opacity-40" aria-hidden />
            <div className="absolute left-8 top-8 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-xs text-white/50 backdrop-blur">
              Passive
            </div>
            <div className="absolute bottom-8 right-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-medium text-emerald-200/90 backdrop-blur">
              Proof &amp; output
            </div>
            <p className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-white/35">
              Contrast: consumption vs. what you can show
            </p>
          </div>
        </div>
      </SectionShell>
    );
  }

  if (section.variant === 'statement' || section.variant === 'split') {
    const isSplitPromise = section.id === 'promise';
    return (
      <SectionShell
        id={section.id}
        moodClass={
          section.id === 'standout'
            ? 'bg-[#070712]'
            : section.id === 'why-now'
              ? 'bg-gradient-to-b from-[#08051a] to-[#05050a]'
              : 'bg-ink'
        }
        className={isSplitPromise ? '' : ''}
      >
        <div className={cn(isSplitPromise && 'grid gap-12 lg:grid-cols-2 lg:items-center')}>
          <div>
            {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mt-4 text-lg italic text-violet-200/70">&ldquo;{section.subtitle}&rdquo;</p>
            )}
            <ul className={cn('mt-8 space-y-4', isSplitPromise && 'lg:mt-10')}>
              {section.lines?.map((line, i) => (
                <motion.li
                  key={line}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={listVariants}
                  className="text-base text-white/70 md:text-lg"
                >
                  {line}
                </motion.li>
              ))}
            </ul>
          </div>
          {isSplitPromise && (
            <div className="relative">
              <div className="aspect-square max-w-md rounded-3xl border border-white/[0.09] bg-gradient-to-tr from-violet-600/20 via-transparent to-fuchsia-500/15 p-8 shadow-2xl lg:ml-auto">
                <div className="flex h-full flex-col justify-between">
                  <p className="text-sm font-medium text-white/50">Journey</p>
                  <div className="space-y-4">
                    {['Learn', 'Build', 'Prove'].map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="text-lg text-white/85">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionShell>
    );
  }

  if (section.variant === 'timeline' && section.id === 'what-is') {
    return (
      <SectionShell id={section.id} moodClass="bg-gradient-to-b from-[#050508] to-[#0a0a12]">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <h2 className="font-display max-w-3xl text-3xl font-bold text-white md:text-5xl">{section.title}</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {section.lines?.map((line, i) => (
            <motion.div
              key={line}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={listVariants}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6"
            >
              <span className="text-xs font-bold text-violet-400/90">0{i + 1}</span>
              <p className="mt-3 text-base text-white/75">{line}</p>
            </motion.div>
          ))}
        </div>
      </SectionShell>
    );
  }

  if (section.variant === 'grid-4') {
    return (
      <SectionShell id={section.id} moodClass="bg-[#04040a]">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <h2 className="max-w-3xl font-display text-3xl font-bold text-white md:text-5xl">{section.title}</h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {TRACK_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={listVariants}
              className={cn(
                'rounded-2xl border border-white/[0.08] bg-gradient-to-br p-6 md:p-8',
                card.accent
              )}
            >
              <h3 className="font-display text-xl font-bold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionShell>
    );
  }

  if (section.variant === 'screenshot') {
    return (
      <SectionShell id={section.id} moodClass="bg-[#05060f]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{section.title}</h2>
            <ul className="mt-8 space-y-3">
              {section.lines?.map((line, i) => (
                <motion.li
                  key={line}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={listVariants}
                  className="text-base text-white/70"
                >
                  {line}
                </motion.li>
              ))}
            </ul>
          </div>
          {shot && (
            <BrowserFrame
              src={shot}
              alt={shotAlt}
              slotLabel={`Screenshot: ${section.navLabel}`}
            />
          )}
        </div>
      </SectionShell>
    );
  }

  if (section.variant === 'triple') {
    return (
      <SectionShell id={section.id} moodClass="bg-[#060611]">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <h2 className="font-display max-w-3xl text-3xl font-bold text-white md:text-5xl">{section.title}</h2>
        {section.subtitle && (
          <p className="mt-4 max-w-2xl text-base text-emerald-200/80 md:text-lg">{section.subtitle}</p>
        )}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {section.lines?.map((line, i) => (
            <motion.div
              key={line}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={listVariants}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
            >
              <p className="text-sm leading-relaxed text-white/75">{line}</p>
            </motion.div>
          ))}
        </div>
        {shot && (
          <div className="mt-12">
            <BrowserFrame
              src={shot}
              alt={shotAlt}
              slotLabel="Jobs Search Hub — replace with capture"
              className="max-w-4xl"
            />
          </div>
        )}
      </SectionShell>
    );
  }

  if (section.variant === 'trust') {
    return (
      <SectionShell id={section.id} moodClass="bg-[#030308]">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <h2 className="font-display max-w-2xl text-3xl font-bold text-white md:text-5xl">{section.title}</h2>
        <p className="mt-4 max-w-2xl text-sm text-white/45">
          Wording follows how trust is presented on ExpoGraph Academy — verify legal claims independently for
          external decks.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {section.lines?.map((line, i) => (
            <motion.div
              key={line}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={listVariants}
              className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-6"
            >
              <p className="text-base text-white/80">{line}</p>
            </motion.div>
          ))}
        </div>
        {shot && (
          <div className="mt-12 max-w-4xl">
            <BrowserFrame src={shot} alt={shotAlt} slotLabel="Certificates — replace with product capture" />
          </div>
        )}
      </SectionShell>
    );
  }

  if (section.variant === 'pricing') {
    return (
      <SectionShell id={section.id} moodClass="bg-gradient-to-b from-violet-950/20 to-ink">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">{section.title}</h2>
            <ul className="mt-8 space-y-3">
              {section.lines?.map((line) => (
                <li key={line} className="text-base text-white/70">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-8 text-center">
              <p className="text-4xl font-bold text-emerald-300">₹99</p>
              <p className="mt-2 text-sm text-white/60">Per course · as shown on Academy</p>
            </div>
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-8 text-center">
              <p className="text-4xl font-bold text-amber-300">₹199</p>
              <p className="mt-2 text-sm text-white/60">All-access pack · check live pricing</p>
            </div>
          </div>
        </div>
        {shot && (
          <div className="mt-12">
            <BrowserFrame src={shot} alt={shotAlt} slotLabel="Pricing / courses UI — replace with capture" />
          </div>
        )}
      </SectionShell>
    );
  }

  if (section.variant === 'closing') {
    return (
      <section
        id={`section-${section.id}`}
        data-section-id={section.id}
        className="relative scroll-mt-4 px-4 py-24 sm:px-6 md:py-36"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-950/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl lg:text-6xl">{section.title}</h2>
          {section.subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/65 md:text-xl">{section.subtitle}</p>
          )}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={getAcademyUrl()}
              className="inline-flex min-h-[52px] min-w-[200px] items-center justify-center rounded-full bg-white px-10 text-base font-semibold text-ink shadow-xl transition hover:bg-white/90"
            >
              Start building with ExpoGraph
            </Link>
            <Link
              href={getCoursesUrl()}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 px-8 text-base font-medium text-white hover:bg-white/5"
            >
              See courses &amp; packs
            </Link>
          </div>
          {shot && (
            <div className="mt-16">
              <BrowserFrame
                src={shot}
                alt={shotAlt}
                className="mx-auto max-w-4xl opacity-90"
                slotLabel="Closing visual — optional hero collage"
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  return null;
}
