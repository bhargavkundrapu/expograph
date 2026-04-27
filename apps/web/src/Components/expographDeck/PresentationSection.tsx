import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { DeckSection } from '@/content/presentation/masterDeck';
import { TRACK_CARDS } from '@/content/presentation/masterDeck';
import { DECK_ILLUSTRATIONS, type DeckIllustration } from '@/content/presentation/presentationIllustrations';
import { SCREENSHOTS, SCREENSHOT_ALT } from '@/content/presentation/screenshotMap';
import { BrowserFrame } from './BrowserFrame';
import { LightboxZoomHint, usePresentationLightbox } from './PresentationLightbox';

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
    <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">
      <Sparkles className="h-3.5 w-3.5 text-violet-500" aria-hidden />
      {children}
    </p>
  );
}

function ReplaceImageGrid({ keys }: { keys?: (keyof typeof SCREENSHOTS)[] }) {
  if (!keys?.length) return null;
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {keys.map((key, i) => (
        <BrowserFrame
          key={`${String(key)}-${i}`}
          src={SCREENSHOTS[key]}
          alt={SCREENSHOT_ALT[key]}
          className="h-full"
        />
      ))}
    </div>
  );
}

const PROMISE_JOURNEY_STEPS: { label: string; illustration: DeckIllustration }[] = [
  { label: 'Learn', illustration: DECK_ILLUSTRATIONS.journeyLearn },
  { label: 'Build', illustration: DECK_ILLUSTRATIONS.journeyBuild },
  { label: 'Prove', illustration: DECK_ILLUSTRATIONS.journeyProve },
];

function DeckShotThumb({
  illustration,
  className,
  imgClassName,
}: {
  illustration: DeckIllustration;
  className?: string;
  imgClassName?: string;
}) {
  const lightbox = usePresentationLightbox();
  const { src, alt } = illustration;
  const img = (
    <img
      src={src}
      alt={lightbox ? '' : alt}
      className={cn('h-full w-full object-cover object-top', imgClassName)}
      loading="lazy"
      {...(lightbox ? { 'aria-hidden': true as const } : {})}
    />
  );

  return (
    <div className={cn('relative bg-slate-100', className)}>
      {lightbox ? (
        <button
          type="button"
          onClick={() => lightbox.openLightbox(src, alt)}
          className="group relative block h-full w-full cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          aria-label={`View full size: ${alt}`}
        >
          {img}
          <LightboxZoomHint className="right-2 top-2" />
        </button>
      ) : (
        img
      )}
    </div>
  );
}

export function PresentationSection({ section }: { section: DeckSection }) {
  const reduce = useReducedMotion();
  const listVariants = useMemo(
    () => (reduce ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } : fadeUp),
    [reduce]
  );

  const shot = section.screenshotKey ? SCREENSHOTS[section.screenshotKey as keyof typeof SCREENSHOTS] : null;
  const shotAlt = section.screenshotKey ? SCREENSHOT_ALT[section.screenshotKey as keyof typeof SCREENSHOT_ALT] : '';

  if (section.variant === 'cover') {
    return (
      <section
        id={`section-${section.id}`}
        data-section-id={section.id}
        className="relative flex min-h-[100dvh] scroll-mt-4 flex-col justify-center overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-100 via-white to-white" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] bg-grid-fade bg-[length:48px_48px]"
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-violet-200/60 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-sm font-medium text-violet-700"
          >
            {section.eyebrow}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {section.title}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-slate-600 md:text-xl"
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
              to="/courses"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-violet-700"
            >
              View courses &amp; packs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
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
              <BrowserFrame src={shot} alt={shotAlt} className="mx-auto max-w-5xl" />
            </motion.div>
          )}
          <ReplaceImageGrid keys={section.galleryKeys as (keyof typeof SCREENSHOTS)[] | undefined} />
        </div>
      </section>
    );
  }

  if (section.variant === 'split' && section.id === 'problem') {
    return (
      <SectionShell id={section.id} moodClass="bg-slate-50">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
              {section.title}
            </h2>
            <ul className="mt-8 space-y-4">
              {section.lines?.map((line, i) => (
                <li key={line} className="flex gap-3 text-base text-slate-700 md:text-lg">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500"
                    aria-hidden
                  />
                  <motion.span
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={listVariants}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-center text-sm font-semibold text-slate-700">
              Contrast: consumption vs. what you can show
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Consumption
                </p>
                <DeckShotThumb
                  illustration={DECK_ILLUSTRATIONS.problemConsumption}
                  className="aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 shadow-lg"
                />
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Catalogs and passive progress without tangible proof.
                </p>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  What you can show
                </p>
                <DeckShotThumb
                  illustration={DECK_ILLUSTRATIONS.problemProof}
                  className="aspect-[4/3] overflow-hidden rounded-2xl border border-emerald-200/80 shadow-lg ring-1 ring-emerald-100"
                />
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Real Client Lab output you can point to in interviews and portfolios.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ReplaceImageGrid keys={section.galleryKeys as (keyof typeof SCREENSHOTS)[] | undefined} />
      </SectionShell>
    );
  }

  if (section.variant === 'statement' || section.variant === 'split') {
    const isSplitPromise = section.id === 'promise';
    const isSplitWhyNow = section.id === 'why-now';
    const isStatementSplit = isSplitPromise || isSplitWhyNow;
    return (
      <SectionShell
        id={section.id}
        moodClass={
          section.id === 'standout'
            ? 'bg-white'
            : section.id === 'why-now'
              ? 'bg-gradient-to-b from-violet-50 to-white'
              : 'bg-white'
        }
      >
        <div className={cn(isStatementSplit && 'grid gap-12 lg:grid-cols-2 lg:items-center')}>
          <div>
            {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
            <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mt-4 text-lg italic text-violet-700/80">&ldquo;{section.subtitle}&rdquo;</p>
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
                  className="text-base text-slate-700 md:text-lg"
                >
                  {line}
                </motion.li>
              ))}
            </ul>
          </div>
          {isSplitWhyNow && (
            <div className="relative lg:ml-auto lg:max-w-xl">
              <DeckShotThumb
                illustration={DECK_ILLUSTRATIONS.whyNowAiEra}
                className="aspect-[4/3] overflow-hidden rounded-2xl border border-violet-200/80 bg-white shadow-xl ring-1 ring-violet-100"
              />
            </div>
          )}
          {isSplitPromise && (
            <div className="relative lg:ml-auto lg:max-w-md">
              <div className="rounded-3xl border border-violet-200 bg-white p-6 shadow-xl">
                <p className="text-sm font-medium text-slate-500">Journey</p>
                <div className="mt-5 space-y-5">
                  {PROMISE_JOURNEY_STEPS.map((step, i) => (
                    <div key={step.label} className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                      <DeckShotThumb
                        illustration={step.illustration}
                        className="aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-slate-200 shadow-md sm:aspect-auto sm:h-[5.5rem] sm:w-[7.5rem]"
                      />
                      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-violet-100 bg-violet-50/40 px-4 py-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="text-lg font-semibold text-slate-800">{step.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <ReplaceImageGrid keys={section.galleryKeys as (keyof typeof SCREENSHOTS)[] | undefined} />
      </SectionShell>
    );
  }

  if (section.variant === 'timeline' && section.id === 'what-is') {
    return (
      <SectionShell id={section.id} moodClass="bg-gradient-to-b from-slate-50 to-white">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <h2 className="font-display max-w-3xl text-3xl font-bold text-slate-900 md:text-5xl">{section.title}</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {section.lines?.map((line, i) => (
            <motion.div
              key={line}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={listVariants}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm"
            >
              {line}
            </motion.div>
          ))}
        </div>
        <ReplaceImageGrid keys={section.galleryKeys as (keyof typeof SCREENSHOTS)[] | undefined} />
      </SectionShell>
    );
  }

  if (section.variant === 'grid-4' && section.id === 'tracks') {
    return (
      <SectionShell id={section.id} moodClass="bg-white">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display max-w-2xl text-3xl font-bold text-slate-900 md:text-5xl">{section.title}</h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              Tracks are designed to reduce confusion and increase output - with AI-native workflows built in.
            </p>
          </div>
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700">
            Explore courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TRACK_CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={listVariants}
              className={cn(
                'overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br',
                c.accent,
                'from-0% to-100%'
              )}
            >
              <DeckShotThumb
                illustration={DECK_ILLUSTRATIONS[c.illustrationId]}
                className="aspect-[16/10] w-full overflow-hidden border-b border-white/30"
              />
              <div className="p-6 pt-5">
                <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <ReplaceImageGrid keys={section.galleryKeys as (keyof typeof SCREENSHOTS)[] | undefined} />
      </SectionShell>
    );
  }

  if (section.variant === 'screenshot' && shot) {
    return (
      <SectionShell id={section.id} moodClass="bg-slate-50">
        {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 md:text-5xl">{section.title}</h2>
            {section.subtitle && <p className="mt-4 text-slate-600">{section.subtitle}</p>}
            <ul className="mt-8 space-y-4">
              {section.lines?.map((line, i) => (
                <li key={line} className="flex gap-3 text-slate-700">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500"
                    aria-hidden
                  />
                  <motion.span
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={listVariants}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </li>
              ))}
            </ul>
          </div>
          <BrowserFrame src={shot} alt={shotAlt} className="lg:ml-auto" />
        </div>
        <ReplaceImageGrid keys={section.galleryKeys as (keyof typeof SCREENSHOTS)[] | undefined} />
      </SectionShell>
    );
  }

  if (section.variant === 'triple') {
    return (
      <SectionShell id={section.id} moodClass="bg-white">
        {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
        <h2 className="font-display text-3xl font-bold text-slate-900 md:text-5xl">{section.title}</h2>
        {section.subtitle && <p className="mt-4 max-w-3xl text-slate-600">{section.subtitle}</p>}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {section.lines?.map((line, i) => (
            <motion.div
              key={line}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={listVariants}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm"
            >
              {line}
            </motion.div>
          ))}
        </div>
        {shot && (
          <div className="mt-12">
            <BrowserFrame src={shot} alt={shotAlt} />
          </div>
        )}
        <ReplaceImageGrid keys={section.galleryKeys as (keyof typeof SCREENSHOTS)[] | undefined} />
      </SectionShell>
    );
  }

  if (section.variant === 'trust') {
    return (
      <SectionShell id={section.id} moodClass="bg-slate-50">
        {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
        <h2 className="font-display text-3xl font-bold text-slate-900 md:text-5xl">{section.title}</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {section.lines?.map((line, i) => (
            <motion.div
              key={line}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={listVariants}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm"
            >
              {line}
            </motion.div>
          ))}
        </div>
        <ReplaceImageGrid keys={section.galleryKeys as (keyof typeof SCREENSHOTS)[] | undefined} />
      </SectionShell>
    );
  }

  if (section.variant === 'pricing') {
    return (
      <SectionShell id={section.id} moodClass="bg-gradient-to-b from-violet-50 to-white">
        {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
        <h2 className="font-display text-3xl font-bold text-slate-900 md:text-5xl">{section.title}</h2>
        <div className="mt-10 max-w-3xl space-y-3 text-slate-700">
          {section.lines?.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            to="/courses#pricing"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-violet-700"
          >
            See pricing <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/courses"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Browse courses
          </Link>
        </div>
        <ReplaceImageGrid keys={section.galleryKeys as (keyof typeof SCREENSHOTS)[] | undefined} />
      </SectionShell>
    );
  }

  if (section.variant === 'closing') {
    return (
      <SectionShell id={section.id} moodClass="bg-white">
        {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
        <h2 className="font-display text-3xl font-bold text-slate-900 md:text-5xl">{section.title}</h2>
        {section.subtitle && <p className="mt-4 max-w-3xl text-slate-600">{section.subtitle}</p>}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/courses"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-violet-700"
          >
            Start with courses <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Contact
          </Link>
        </div>
        {shot && (
          <div className="mt-14">
            <BrowserFrame src={shot} alt={shotAlt} />
          </div>
        )}
        <ReplaceImageGrid keys={section.galleryKeys as (keyof typeof SCREENSHOTS)[] | undefined} />
      </SectionShell>
    );
  }

  return (
    <SectionShell id={section.id} moodClass="bg-white">
      {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-bold text-slate-900 md:text-5xl">{section.title}</h2>
      {section.subtitle && <p className="mt-4 max-w-3xl text-slate-600">{section.subtitle}</p>}
      <div className="mt-10 space-y-3 text-slate-700">
        {section.lines?.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
    </SectionShell>
  );
}

