import { Link } from "react-router-dom";
import FaqAccordion from "../../Components/solutions/FaqAccordion";
import SolutionsShell from "../../Components/solutions/SolutionsShell";
import { SOLUTIONS_FAQ_GROUPS } from "../../content/solutions/faqs";

const shell = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default function SolutionsFaqPage() {
  return (
    <SolutionsShell>
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-50/80 via-white to-white" aria-hidden />
        <div className={`relative ${shell} py-16 sm:py-20`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">FAQ</p>
          <h1 className="sol-display mt-3 max-w-3xl text-3xl leading-tight text-slate-900 sm:text-4xl md:text-5xl">Straight answers</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            If something is not covered, ask on a short call — we would rather clarify than sell past your needs.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <FaqAccordion groups={SOLUTIONS_FAQ_GROUPS} />
        <div className="mt-14 rounded-2xl border border-violet-200/80 bg-violet-50/50 p-8 text-center ring-1 ring-violet-100">
          <p className="text-sm font-medium text-slate-800">Still deciding?</p>
          <Link to="/solutions/book-a-meet" className="mt-3 inline-flex text-sm font-semibold text-violet-700 transition hover:text-violet-900">
            Book a meet — no obligation
          </Link>
        </div>
      </section>
    </SolutionsShell>
  );
}
