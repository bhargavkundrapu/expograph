import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SOLUTIONS_FAQ_PREVIEW } from "../../../content/solutions/faqs";
import { SOLUTIONS_SECTION_INTROS } from "../../../content/solutions/overview";
import { SOLUTIONS_HOME_SHELL } from "./solutionsHomeConstants";
import { solutionsSectionFade as fade } from "./solutionsHomeMotion";

export default function SolutionsFaqPreviewSection() {
  const { title, body } = SOLUTIONS_SECTION_INTROS.faqPreview;

  return (
    <section className="border-b border-slate-200/70 bg-white py-16 sm:py-20" aria-labelledby="faq-preview-heading">
      <div className={SOLUTIONS_HOME_SHELL}>
        <motion.div {...fade} className="max-w-3xl">
          <h2 id="faq-preview-heading" className="sol-display text-2xl text-slate-900 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{body}</p>
        </motion.div>

        <dl className="mt-12 space-y-4">
          {SOLUTIONS_FAQ_PREVIEW.map((item) => (
            <motion.div
              key={item.q}
              {...fade}
              className="rounded-2xl border border-slate-200/90 bg-slate-50/90 shadow-md ring-1 ring-slate-900/[0.03]"
            >
              <dt className="border-b border-slate-200/80 px-5 py-3 text-sm font-semibold text-slate-900 sm:px-6 sm:text-base">{item.q}</dt>
              <dd className="px-5 py-4 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-base">{item.a}</dd>
            </motion.div>
          ))}
        </dl>

        <motion.div {...fade} className="mt-10 text-center">
          <Link to="/solutions/faq" className="text-sm font-semibold text-violet-700 transition hover:text-violet-900">
            All questions on one page →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
