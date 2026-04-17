import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BookMeetForm from "../../Components/solutions/BookMeetForm";
import FaqAccordion from "../../Components/solutions/FaqAccordion";
import ProcessTimeline from "../../Components/solutions/ProcessTimeline";
import SectionImage from "../../Components/solutions/SectionImage";
import ServiceCard from "../../Components/solutions/ServiceCard";
import SolutionsShell from "../../Components/solutions/SolutionsShell";
import { SITE_CONTACT } from "../../config/siteContact";
import { SOLUTIONS_BUNDLES } from "../../content/solutions/bundles";
import { SOLUTIONS_FAQ_GROUPS } from "../../content/solutions/faqs";
import { SOLUTIONS_INDUSTRIES } from "../../content/solutions/industries";
import {
  SOLUTIONS_HERO_KICKER,
  SOLUTIONS_HERO_LEAD,
  SOLUTIONS_HERO_NOTE,
  SOLUTIONS_HERO_TITLE,
  SOLUTIONS_OUTCOMES,
  SOLUTIONS_PAIN_POINTS,
  SOLUTIONS_SECTION_INTROS,
  SOLUTIONS_TRUST_STRIP,
  SOLUTIONS_WHY_EXPOGRAPH,
} from "../../content/solutions/overview";
import { SOLUTIONS_PRICING, SOLUTIONS_PRICING_NOTE } from "../../content/solutions/pricing";
import { SOLUTIONS_PROCESS_STEPS } from "../../content/solutions/process";
import { SOLUTIONS_HOME_IMAGES } from "../../content/solutions/sectionImages";
import { SOLUTIONS_SERVICES } from "../../content/solutions/services";

function SectionHeading({ eyebrow, title, intro, align = "center" }) {
  const wrap =
    align === "center"
      ? "mx-auto max-w-3xl text-center"
      : "max-w-3xl";
  return (
    <div className={`mb-10 sm:mb-12 ${wrap}`}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 sm:text-sm">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">{title}</h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{intro}</p> : null}
    </div>
  );
}

export default function SolutionsPage() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/solutions" && location.hash === "#services") {
      const t = setTimeout(() => {
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [location.pathname, location.hash]);

  return (
    <SolutionsShell>
      {/* 1 — Hero */}
      <section className="relative border-b border-slate-200/90 bg-white [background-image:radial-gradient(ellipse_85%_55%_at_50%_-8%,rgba(124,58,237,0.07),transparent_58%)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-14 sm:gap-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-0 lg:px-8 lg:py-24">
          <div className="flex min-w-0 flex-col lg:max-w-xl lg:pt-0.5">
            <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-violet-600 sm:text-left sm:text-xs md:text-sm">
              {SOLUTIONS_HERO_KICKER}
            </p>
            <h1 className="mt-4 text-balance text-center text-3xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-left sm:text-4xl sm:leading-[1.12] lg:mt-5 lg:text-[2.625rem] lg:leading-[1.1]">
              {SOLUTIONS_HERO_TITLE}
            </h1>
            <p className="mt-5 text-center text-base leading-relaxed text-slate-600 sm:text-left sm:text-lg lg:mt-6">
              {SOLUTIONS_HERO_LEAD}
            </p>
            <p className="mt-5 rounded-xl border border-violet-100/90 bg-white px-4 py-3.5 text-center text-sm leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-100/80 sm:text-left sm:leading-relaxed lg:mt-6">
              {SOLUTIONS_HERO_NOTE}
            </p>
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start lg:mt-10">
              <Link
                to="/solutions/book-a-meet"
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:flex-none sm:px-5"
              >
                Book a meet
              </Link>
              <a
                href="#services"
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-violet-200 hover:bg-violet-50/50 sm:flex-none sm:px-5"
              >
                Explore services
              </a>
              <Link
                to="/solutions/pricing"
                className="inline-flex min-h-[44px] items-center justify-center py-2 text-center text-sm font-semibold text-violet-700 underline-offset-4 hover:text-violet-800 hover:underline sm:min-h-0 sm:justify-start sm:px-3 sm:py-0"
              >
                See pricing direction
              </Link>
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-5 lg:gap-6">
            <SectionImage
              src={SOLUTIONS_HOME_IMAGES.heroSide}
              alt={SOLUTIONS_HOME_IMAGES.heroSideAlt}
              aspectClass="aspect-[16/11] sm:aspect-[16/10] lg:aspect-[5/4]"
              className="shadow-md ring-1 ring-slate-100/90"
              priority
            />
            <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-4">
              <article className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">Lead journey</p>
                <p className="mt-2 text-sm font-semibold leading-snug text-slate-900">Ad → Website → WhatsApp → CRM</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  So the next person who finds you online gets a smooth path from curiosity to conversation.
                </p>
              </article>
              <article className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Support journey</p>
                <p className="mt-2 text-sm font-semibold leading-snug text-slate-900">FAQ assistant → caring handoff</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  Your team stays in control while routine questions get friendly, accurate first responses.
                </p>
              </article>
              <article className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:col-span-2 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Operations</p>
                <p className="mt-2 text-sm font-semibold leading-snug text-slate-900">Intake → routing → approvals → dashboards</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  Less chasing status in chats — more clarity on what is waiting, what is done, and what needs you.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Trust strip */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS_TRUST_STRIP.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-snug text-slate-700"
              >
                <span className="mt-0.5 text-violet-500" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-8 max-w-5xl">
            <SectionImage
              src={SOLUTIONS_HOME_IMAGES.trustBanner}
              alt={SOLUTIONS_HOME_IMAGES.trustBannerAlt}
              aspectClass="aspect-[21/9] sm:aspect-[2.4/1]"
            />
          </div>
        </div>
      </section>

      {/* 3 — What we solve */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 [&>*]:min-w-0">
            <div>
              <SectionHeading
                align="left"
                eyebrow="You are not alone in this"
                title="Challenges we help untangle"
                intro={SOLUTIONS_SECTION_INTROS.problems}
              />
              <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2">
                {SOLUTIONS_PAIN_POINTS.map((item) => (
                  <article
                    key={item}
                    className="rounded-2xl border border-slate-200/80 bg-white p-5 text-sm leading-relaxed text-slate-700 shadow-sm"
                  >
                    {item}
                  </article>
                ))}
              </div>
            </div>
            <SectionImage
              src={SOLUTIONS_HOME_IMAGES.problems}
              alt={SOLUTIONS_HOME_IMAGES.problemsAlt}
              aspectClass="aspect-[4/3]"
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </section>

      {/* 4 — Seven services */}
      <section id="services" className="scroll-mt-24 border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="What we offer" title="Seven ways we can stand beside your team" intro={SOLUTIONS_SECTION_INTROS.services} />
          <div className="mx-auto mb-10 max-w-4xl sm:mb-12">
            <SectionImage
              src={SOLUTIONS_HOME_IMAGES.servicesIntro}
              alt={SOLUTIONS_HOME_IMAGES.servicesIntroAlt}
              aspectClass="aspect-[16/9]"
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SOLUTIONS_SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Who it is for */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 [&>*]:min-w-0">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Who we love working with"
                title="Industries and teams"
                intro={SOLUTIONS_SECTION_INTROS.industries}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {SOLUTIONS_INDUSTRIES.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                  </article>
                ))}
              </div>
            </div>
            <SectionImage
              src={SOLUTIONS_HOME_IMAGES.industries}
              alt={SOLUTIONS_HOME_IMAGES.industriesAlt}
              aspectClass="aspect-[4/3]"
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </section>

      {/* 6 — Outcomes */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 [&>*]:min-w-0">
            <div>
              <SectionHeading align="left" eyebrow="Outcomes" title="What good can feel like" intro={SOLUTIONS_SECTION_INTROS.outcomes} />
              <div className="grid gap-3 sm:grid-cols-2">
                {SOLUTIONS_OUTCOMES.map((item) => (
                  <article
                    key={item}
                    className="rounded-2xl border border-violet-100 bg-white p-5 text-sm font-medium leading-snug text-slate-800 shadow-sm"
                  >
                    {item}
                  </article>
                ))}
              </div>
            </div>
            <SectionImage
              src={SOLUTIONS_HOME_IMAGES.outcomes}
              alt={SOLUTIONS_HOME_IMAGES.outcomesAlt}
              aspectClass="aspect-[4/3]"
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </section>

      {/* 7 — Bundles */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="Starter paths" title="Bundles when you want a clear package" intro={SOLUTIONS_SECTION_INTROS.bundles} />
          <div className="mx-auto mb-10 max-w-4xl sm:mb-12">
            <SectionImage src={SOLUTIONS_HOME_IMAGES.bundles} alt={SOLUTIONS_HOME_IMAGES.bundlesAlt} aspectClass="aspect-[16/9]" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {SOLUTIONS_BUNDLES.map((bundle) => (
              <article key={bundle.title} className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">{bundle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{bundle.description}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500">Includes</p>
                <ul className="mt-2 flex-1 space-y-2 text-sm leading-relaxed text-slate-700">
                  {bundle.includes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-violet-500" aria-hidden>
                        •
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-500">Best fit: {bundle.bestFor}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Process */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="How we work" title="A calm, five-step rhythm" intro={SOLUTIONS_SECTION_INTROS.process} />
          <div className="mt-10 space-y-10">
            <div className="lg:hidden">
              <SectionImage
                src={SOLUTIONS_HOME_IMAGES.process}
                alt={SOLUTIONS_HOME_IMAGES.processAlt}
                aspectClass="aspect-[16/10]"
              />
            </div>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="min-w-0 lg:col-span-8">
                <ProcessTimeline steps={SOLUTIONS_PROCESS_STEPS} />
              </div>
              <div className="hidden min-w-0 lg:col-span-4 lg:block">
                <div className="lg:sticky lg:top-28">
                  <SectionImage
                    src={SOLUTIONS_HOME_IMAGES.process}
                    alt={SOLUTIONS_HOME_IMAGES.processAlt}
                    aspectClass="aspect-[4/5]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 — Pricing preview */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 [&>*]:min-w-0">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Pricing"
                title="Starting ranges — so you can plan with confidence"
                intro={SOLUTIONS_SECTION_INTROS.pricing}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {SOLUTIONS_PRICING.map((item) => (
                  <article key={item.slug} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm text-slate-700">
                      <span className="font-medium text-slate-900">Typical range:</span> {item.setupRange}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">Support direction: {item.supportRange}</p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-500">{item.summary}</p>
                  </article>
                ))}
              </div>
              <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-slate-600">{SOLUTIONS_PRICING_NOTE}</p>
            </div>
            <SectionImage
              src={SOLUTIONS_HOME_IMAGES.pricing}
              alt={SOLUTIONS_HOME_IMAGES.pricingAlt}
              aspectClass="aspect-[4/3]"
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </section>

      {/* 10 — Why ExpoGraph Solutions */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 [&>*]:min-w-0">
            <div>
              <SectionHeading align="left" eyebrow="Why us" title="The same heart as ExpoGraph Academy" intro={SOLUTIONS_SECTION_INTROS.whyUs} />
              <div className="grid gap-4 sm:grid-cols-2">
                {SOLUTIONS_WHY_EXPOGRAPH.map((item) => (
                  <article key={item} className="rounded-2xl border border-slate-200/80 bg-white p-5 text-sm leading-relaxed text-slate-700">
                    {item}
                  </article>
                ))}
              </div>
            </div>
            <SectionImage
              src={SOLUTIONS_HOME_IMAGES.whyUs}
              alt={SOLUTIONS_HOME_IMAGES.whyUsAlt}
              aspectClass="aspect-[4/3]"
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </section>

      {/* 11 — FAQ preview */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 [&>*]:min-w-0">
            <div className="mx-auto w-full max-w-3xl lg:mx-0">
              <SectionHeading align="left" eyebrow="FAQ" title="Questions, answered kindly" intro={SOLUTIONS_SECTION_INTROS.faq} />
              <FaqAccordion groups={[SOLUTIONS_FAQ_GROUPS[0], SOLUTIONS_FAQ_GROUPS[1]]} />
              <div className="mt-8 lg:text-left">
                <Link to="/solutions/faq" className="text-sm font-semibold text-violet-700 underline-offset-4 hover:underline">
                  View all questions
                </Link>
              </div>
            </div>
            <SectionImage
              src={SOLUTIONS_HOME_IMAGES.faq}
              alt={SOLUTIONS_HOME_IMAGES.faqAlt}
              aspectClass="aspect-[4/3]"
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </section>

      {/* 12 — Book a meet */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 [&>*]:min-w-0">
            <div>
              <SectionHeading align="left" eyebrow="Reach out" title="We would love to hear from you" intro={SOLUTIONS_SECTION_INTROS.book} />
              <div className="mt-6">
                <SectionImage src={SOLUTIONS_HOME_IMAGES.book} alt={SOLUTIONS_HOME_IMAGES.bookAlt} aspectClass="aspect-[16/10]" />
              </div>
              <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Prefer to talk directly?</p>
                <p>
                  <span className="text-slate-500">Phone:</span> {SITE_CONTACT.phoneDisplay}
                </p>
                <p>
                  <span className="text-slate-500">Email:</span>{" "}
                  <a className="font-medium text-violet-700 hover:underline" href={`mailto:${SITE_CONTACT.email}`}>
                    {SITE_CONTACT.email}
                  </a>
                </p>
                <p>
                  <span className="text-slate-500">Location:</span> {SITE_CONTACT.addressLine}
                </p>
                <p className="pt-2 text-xs leading-relaxed text-slate-500">
                  We typically reply within {SITE_CONTACT.responseTime}. Your details are only used to respond to your request.
                </p>
              </div>
            </div>
            <BookMeetForm />
          </div>
        </div>
      </section>

      {/* 13 — Final CTA */}
      <section className="border-t border-slate-200 bg-white px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-10 max-w-4xl sm:mb-12">
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md ring-1 ring-slate-100">
            <div className="relative aspect-[21/9] w-full sm:aspect-[2.5/1]">
              <img
                src={SOLUTIONS_HOME_IMAGES.finalCta}
                alt={SOLUTIONS_HOME_IMAGES.finalCtaAlt}
                width={1600}
                height={686}
                sizes="(max-width: 640px) 100vw, 896px"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </figure>
        </div>
        <h2 className="mx-auto max-w-3xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Let us build the systems your business actually needs
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{SOLUTIONS_SECTION_INTROS.finalCta}</p>
        <Link
          to="/solutions/book-a-meet"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
        >
          Book a meet
        </Link>
      </section>
    </SolutionsShell>
  );
}
