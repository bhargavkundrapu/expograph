import { Link } from "react-router-dom";
import SolutionsShell from "../../Components/solutions/SolutionsShell";
import { SOLUTIONS_BUNDLE_PRICING, SOLUTIONS_PRICING, SOLUTIONS_PRICING_NOTE } from "../../content/solutions/pricing";

const shell = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default function SolutionsPricingPage() {
  return (
    <SolutionsShell>
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-50/80 via-white to-white" aria-hidden />
        <div className={`relative ${shell} py-16 sm:py-20`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">Pricing</p>
          <h1 className="sol-display mt-3 max-w-3xl text-3xl leading-tight text-slate-900 sm:text-4xl md:text-5xl">Starting ranges, not guesswork</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Use the table to plan. Your firm quote follows a short scope pass - integrations, depth, and timeline all matter.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200/70 bg-slate-50 py-14 sm:py-16">
        <div className={shell}>
          <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-lg ring-1 ring-slate-900/[0.04]">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-violet-50/80 text-[11px] font-semibold uppercase tracking-wide text-violet-900">
                  <th className="px-4 py-3.5 sm:px-6">Service</th>
                  <th className="px-4 py-3.5 sm:px-6">Typical setup</th>
                  <th className="px-4 py-3.5 sm:px-6">Support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {SOLUTIONS_PRICING.map((row) => (
                  <tr key={row.slug} className="transition hover:bg-violet-50/40">
                    <td className="px-4 py-4 font-medium text-slate-900 sm:px-6">
                      <Link to={`/solutions/${row.slug}`} className="text-violet-700 hover:underline">
                        {row.title}
                      </Link>
                    </td>
                    <td className="px-4 py-4 sm:px-6">{row.setupRange}</td>
                    <td className="px-4 py-4 text-slate-600 sm:px-6">{row.supportRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-600">{SOLUTIONS_PRICING_NOTE}</p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className={shell}>
          <h2 className="sol-display text-2xl text-slate-900 sm:text-3xl">Common first bundles</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Starting points teams often combine - we adjust inclusions to match how you work.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {SOLUTIONS_BUNDLE_PRICING.map((bundle) => (
              <article
                key={bundle.slug}
                className="flex flex-col rounded-2xl border border-violet-200/70 bg-gradient-to-b from-violet-50/50 to-white p-6 shadow-lg ring-1 ring-violet-100"
              >
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{bundle.title}</h3>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-violet-700">{bundle.range}</p>
                <ul className="mt-5 flex-1 space-y-2.5 text-sm leading-relaxed text-slate-600">
                  {bundle.includes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/solutions/book-a-meet"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-violet-700"
            >
              Book a meet
            </Link>
            <Link
              to="/solutions/faq"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
            >
              Read FAQs
            </Link>
          </div>
        </div>
      </section>
    </SolutionsShell>
  );
}
