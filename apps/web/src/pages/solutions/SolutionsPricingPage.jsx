import { Link } from "react-router-dom";
import SectionImage from "../../Components/solutions/SectionImage";
import SolutionsShell from "../../Components/solutions/SolutionsShell";
import { SOLUTIONS_AUX_BANNERS } from "../../content/solutions/sectionImages";
import { SOLUTIONS_BUNDLE_PRICING, SOLUTIONS_PRICING, SOLUTIONS_PRICING_NOTE } from "../../content/solutions/pricing";

function PricingCardImage({ src, alt, priority }) {
  if (!src) return null;
  return (
    <div className="relative aspect-[5/3] w-full overflow-hidden bg-slate-100">
      <img
        src={src}
        alt={alt ?? ""}
        width={1200}
        height={720}
        sizes="(max-width: 768px) 100vw, 50vw"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-80"
        aria-hidden
      />
    </div>
  );
}

export default function SolutionsPricingPage() {
  return (
    <SolutionsShell>
      <section className="border-b border-slate-200/90 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">Pricing</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Honest ranges, explained simply</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Numbers below are typical starting bands so you can plan — your final quote always reflects real scope after a
              short conversation. We never hide fees or rush you into a decision.
            </p>
          </div>
          <SectionImage
            src={SOLUTIONS_AUX_BANNERS.pricing}
            alt={SOLUTIONS_AUX_BANNERS.pricingAlt}
            aspectClass="aspect-[4/3]"
            className="shadow-md"
          />
        </div>
      </section>
      <section className="border-b border-slate-200/70 bg-gradient-to-b from-slate-50/90 to-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-6 sm:gap-7 md:grid-cols-2">
            {SOLUTIONS_PRICING.map((item, index) => (
              <article
                key={item.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.04] transition duration-300 hover:-translate-y-0.5 hover:border-violet-200/90 hover:shadow-lg hover:ring-violet-500/10"
              >
                <PricingCardImage src={item.image} alt={item.imageAlt} priority={index < 2} />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">{item.title}</h2>
                  <div className="mt-4 space-y-2">
                    <p className="rounded-xl border border-violet-100 bg-violet-50/80 px-3 py-2 text-sm text-slate-800">
                      <span className="font-semibold text-violet-900">Typical starting range</span>
                      <span className="mt-0.5 block font-medium text-slate-900">{item.setupRange}</span>
                    </p>
                    <p className="rounded-xl border border-slate-100 bg-slate-50/90 px-3 py-2 text-sm text-slate-700">
                      <span className="font-semibold text-slate-800">Support retainers</span>
                      <span className="mt-0.5 block">{item.supportRange}</span>
                    </p>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <Link
                      to={`/solutions/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
                    >
                      View service details
                      <span aria-hidden className="transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-slate-600">{SOLUTIONS_PRICING_NOTE}</p>
        </div>
      </section>
      <section className="border-t border-slate-200/80 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Bundle pricing direction</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Bundles group the most common first steps — we can adjust inclusions to match how your team works.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {SOLUTIONS_BUNDLE_PRICING.map((bundle) => (
              <article
                key={bundle.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.04] transition duration-300 hover:-translate-y-0.5 hover:border-violet-200/90 hover:shadow-lg hover:ring-violet-500/10"
              >
                <PricingCardImage src={bundle.image} alt={bundle.imageAlt} priority={false} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-slate-900">{bundle.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-violet-700">{bundle.range}</p>
                  <ul className="mt-4 flex-1 space-y-2.5 text-sm leading-relaxed text-slate-700">
                    {bundle.includes.map((line) => (
                      <li key={line} className="flex gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/solutions/book-a-meet"
              className="inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              Book a meet to discuss scope
            </Link>
          </div>
        </div>
      </section>
    </SolutionsShell>
  );
}
