import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SOLUTIONS_PRICING } from "../../../content/solutions/pricing";
import { SOLUTIONS_SECTION_INTROS } from "../../../content/solutions/overview";
import { SOLUTIONS_HOME_SHELL } from "./solutionsHomeConstants";
import { solutionsSectionFade as fade } from "./solutionsHomeMotion";

export default function SolutionsPricingPreviewSection() {
  const { title, body } = SOLUTIONS_SECTION_INTROS.pricing;
  const preview = SOLUTIONS_PRICING.slice(0, 3);

  return (
    <section className="border-b border-slate-200/70 bg-slate-50 py-16 sm:py-20" aria-labelledby="pricing-preview-heading">
      <div className={SOLUTIONS_HOME_SHELL}>
        <motion.div {...fade} className="max-w-3xl">
          <h2 id="pricing-preview-heading" className="sol-display text-2xl text-slate-900 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{body}</p>
        </motion.div>

        <div className="mt-10 space-y-3 sm:hidden">
          {preview.map((band) => (
            <motion.article
              key={band.title}
              {...fade}
              className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-md ring-1 ring-slate-900/[0.04]"
            >
              <h3 className="text-sm font-semibold text-slate-900">{band.title}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-violet-700">{band.setupRange}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{band.summary}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((band) => (
            <motion.article
              key={band.title}
              {...fade}
              className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-lg ring-1 ring-slate-900/[0.04]"
            >
              <h3 className="text-base font-semibold text-slate-900">{band.title}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-violet-700">{band.setupRange}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">{band.summary}</p>
            </motion.article>
          ))}
        </div>

        <motion.div {...fade} className="mt-10 text-center">
          <Link
            to="/solutions/pricing"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-800 shadow-md transition hover:bg-slate-50"
          >
            Full pricing table
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
