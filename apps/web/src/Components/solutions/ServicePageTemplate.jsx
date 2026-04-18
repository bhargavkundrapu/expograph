import { Link } from "react-router-dom";
import { SOLUTIONS_SERVICES } from "../../content/solutions/services";
import { SOLUTIONS_PROCESS_STEPS } from "../../content/solutions/process";
import ProcessTimeline from "./ProcessTimeline";
import SectionImage from "./SectionImage";

const shell = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";
const sectionTitle = "sol-display text-2xl text-slate-900 sm:text-3xl";
const body = "text-base leading-relaxed text-slate-600 sm:text-lg";
const list = "mt-4 space-y-3 text-sm text-slate-700 sm:text-base";

export default function ServicePageTemplate({ service }) {
  const related = SOLUTIONS_SERVICES.filter((item) => service.relatedSlugs.includes(item.slug));

  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-50/90 via-white to-white" aria-hidden />
        <div className={`relative ${shell} grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14`}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">{service.category}</p>
            <h1 className="sol-display mt-3 text-3xl leading-[1.12] text-slate-900 sm:text-4xl md:text-5xl">{service.title}</h1>
            <p className={`mt-5 ${body}`}>{service.heroDescription}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/solutions/book-a-meet"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-violet-700"
              >
                Book a meet
              </Link>
              <Link
                to="/solutions/pricing"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                See pricing bands
              </Link>
            </div>
          </div>
          {service.image ? (
            <SectionImage
              src={service.image}
              alt={service.imageAlt || service.title}
              aspectClass="aspect-[4/3]"
              className="shadow-xl"
            />
          ) : null}
        </div>
      </section>

      <div className={`${shell} space-y-0`}>
        {/* The problem */}
        <section className="border-b border-slate-200/70 py-16 sm:py-20">
          <h2 className={sectionTitle}>The problem</h2>
          <p className={`mt-5 max-w-3xl ${body}`}>{service.problem}</p>
        </section>

        {/* What we deliver */}
        <section className="border-b border-slate-200/70 py-16 sm:py-20">
          <h2 className={sectionTitle}>What we deliver</h2>
          <p className={`mt-3 max-w-2xl ${body}`}>Concrete deliverables your team can adopt — not a vague “transformation.”</p>
          <ul className={`${list} mt-8 max-w-3xl`}>
            {service.includes.map((item) => (
              <li key={item} className="flex gap-3 border-l-2 border-violet-400/40 pl-4">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Who it is for */}
        <section className="border-b border-slate-200/70 py-16 sm:py-20">
          <h2 className={sectionTitle}>Who it is for</h2>
          <ul className={`${list} mt-6 max-w-2xl`}>
            {service.bestFor.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Use cases */}
        <section className="border-b border-slate-200/70 py-16 sm:py-20">
          <h2 className={sectionTitle}>Typical use cases</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {service.useCases.map((item) => (
              <article
                key={item}
                className="rounded-2xl border border-violet-200/70 bg-white p-5 text-sm leading-snug text-slate-700 shadow-md ring-1 ring-violet-100 sm:text-base"
              >
                {item}
              </article>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="border-b border-slate-200/70 py-16 sm:py-20">
          <h2 className={sectionTitle}>How we work with you</h2>
          <p className={`mt-3 max-w-2xl ${body}`}>Same five-step rhythm on every engagement.</p>
          <div className="mt-10">
            <ProcessTimeline steps={SOLUTIONS_PROCESS_STEPS} lean />
          </div>
        </section>

        {/* Pricing */}
        <section className="border-b border-slate-200/70 py-16 sm:py-20">
          <h2 className={sectionTitle}>Pricing starting point</h2>
          <p className="mt-6 max-w-2xl rounded-2xl border border-violet-200/80 bg-white p-6 text-base leading-relaxed text-slate-800 shadow-lg ring-1 ring-violet-100 sm:text-lg">
            <span className="font-semibold text-slate-900">Band: </span>
            {service.pricingStart}
            <span className="mt-3 block text-slate-600">Final quote follows a short scope conversation — always before you commit.</span>
          </p>
        </section>

        {/* FAQ */}
        <section className="border-b border-slate-200/70 py-16 sm:py-20">
          <h2 className={sectionTitle}>FAQ</h2>
          <div className="mt-8 space-y-4">
            {service.faq.map((item) => (
              <article key={item.q} className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md ring-1 ring-slate-900/[0.04]">
                <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length ? (
          <section className="py-14 sm:py-16">
            <h2 className={sectionTitle}>Related services</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/solutions/${item.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-violet-800 transition hover:border-violet-300 hover:bg-violet-50"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-br from-violet-950 via-slate-900 to-slate-950 px-4 pb-28 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-20">
        <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.35),transparent_55%)]" aria-hidden />
        <div className="relative">
          <h2 className="sol-display mx-auto max-w-lg text-2xl text-white sm:text-3xl">Next step</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
            Book a short call. We will confirm fit and suggest a sensible starting scope.
          </p>
          <Link
            to="/solutions/book-a-meet"
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-xl transition hover:bg-slate-100"
          >
            Book a meet
          </Link>
        </div>
      </section>
    </div>
  );
}
