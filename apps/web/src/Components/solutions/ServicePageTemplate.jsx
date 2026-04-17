import { Link } from "react-router-dom";
import { SERVICE_PAGE_SECTION_IMAGES } from "../../content/solutions/sectionImages";
import { SOLUTIONS_SERVICES } from "../../content/solutions/services";
import { SOLUTIONS_PROCESS_STEPS } from "../../content/solutions/process";
import ProcessTimeline from "./ProcessTimeline";
import SectionImage from "./SectionImage";

export default function ServicePageTemplate({ service }) {
  const related = SOLUTIONS_SERVICES.filter((item) => service.relatedSlugs.includes(item.slug));
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200/90 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20 [&>*]:min-w-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 sm:text-sm">ExpoGraph Solutions</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.35rem]">
              {service.heroDescription}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">{service.problem}</p>
            <div className="mt-8">
              <Link
                to="/solutions/book-a-meet"
                className="inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
              >
                Book a meet — we are listening
              </Link>
            </div>
          </div>
          {service.image ? (
            <SectionImage
              src={service.image}
              alt={service.imageAlt || `${service.title} — service overview`}
              aspectClass="aspect-[4/3] sm:aspect-[5/4]"
              className="shadow-md"
            />
          ) : null}
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">What is included</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Who this fits best</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              {service.bestFor.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 [&>*]:min-w-0">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Typical use cases</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Real situations where this service tends to shine — we can adapt any of them to your context.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.useCases.map((item) => (
                  <article key={item} className="rounded-2xl border border-slate-200/90 bg-white p-5 text-sm leading-relaxed text-slate-700 shadow-sm">
                    {item}
                  </article>
                ))}
              </div>
            </div>
            <SectionImage
              src={SERVICE_PAGE_SECTION_IMAGES.useCases}
              alt={SERVICE_PAGE_SECTION_IMAGES.useCasesAlt}
              aspectClass="aspect-[4/3]"
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">How delivery works</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            The same thoughtful process we use across ExpoGraph Solutions — so you always know what is happening.
          </p>
          <div className="mt-8 space-y-8">
            <div className="lg:hidden">
              <SectionImage
                src={SERVICE_PAGE_SECTION_IMAGES.delivery}
                alt={SERVICE_PAGE_SECTION_IMAGES.deliveryAlt}
                aspectClass="aspect-[16/10]"
              />
            </div>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10 [&>*]:min-w-0">
              <div className="lg:col-span-8">
                <ProcessTimeline steps={SOLUTIONS_PROCESS_STEPS} />
              </div>
              <div className="hidden min-w-0 lg:col-span-4 lg:block">
                <div className="lg:sticky lg:top-28">
                  <SectionImage
                    src={SERVICE_PAGE_SECTION_IMAGES.delivery}
                    alt={SERVICE_PAGE_SECTION_IMAGES.deliveryAlt}
                    aspectClass="aspect-[4/5]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 [&>*]:min-w-0">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Pricing starting point</h2>
              <p className="mt-3 max-w-2xl rounded-2xl border border-violet-100 bg-white p-5 text-sm leading-relaxed text-slate-800 shadow-sm sm:text-base">
                {service.pricingStart}. Final numbers always follow a short scope conversation — we never surprise you.
              </p>
            </div>
            <SectionImage src={SERVICE_PAGE_SECTION_IMAGES.pricing} alt={SERVICE_PAGE_SECTION_IMAGES.pricingAlt} aspectClass="aspect-[4/3]" />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 [&>*]:min-w-0">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Questions people ask</h2>
              <div className="mt-6 space-y-4">
                {service.faq.map((item) => (
                  <article key={item.q} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 sm:text-base">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{item.a}</p>
                  </article>
                ))}
              </div>
            </div>
            <SectionImage
              src={SERVICE_PAGE_SECTION_IMAGES.faq}
              alt={SERVICE_PAGE_SECTION_IMAGES.faqAlt}
              aspectClass="aspect-[4/3]"
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">You might also like</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">Explore related services — many teams combine two or three over time.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/solutions/${item.slug}`}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-violet-800 shadow-sm transition hover:border-violet-300 hover:bg-violet-50"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-14 text-center sm:px-6 sm:py-16">
        <p className="text-sm font-medium text-violet-600">Ready when you are</p>
        <h2 className="mx-auto mt-2 max-w-xl text-2xl font-bold text-slate-900 sm:text-3xl">Let us talk through your next step</h2>
        <Link
          to="/solutions/book-a-meet"
          className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700"
        >
          Book a meet
        </Link>
      </section>
    </div>
  );
}
