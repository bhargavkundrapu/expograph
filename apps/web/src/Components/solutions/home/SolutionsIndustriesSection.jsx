import { motion } from "framer-motion";
import { SOLUTIONS_INDUSTRIES } from "../../../content/solutions/industries";
import { SOLUTIONS_SECTION_INTROS } from "../../../content/solutions/overview";
import { SOLUTIONS_HOME_SHELL } from "./solutionsHomeConstants";
import { solutionsSectionFade as fade } from "./solutionsHomeMotion";

function initialLetter(title) {
  const c = title.trim()[0];
  return c && /[A-Za-z0-9]/.test(c) ? c.toUpperCase() : "•";
}

export default function SolutionsIndustriesSection() {
  const { title, body } = SOLUTIONS_SECTION_INTROS.industries;

  return (
    <section className="border-b border-slate-200/70 bg-white py-16 sm:py-20" aria-labelledby="industries-heading">
      <div className={SOLUTIONS_HOME_SHELL}>
        <motion.div {...fade} className="max-w-3xl">
          <h2 id="industries-heading" className="sol-display text-2xl text-slate-900 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{body}</p>
        </motion.div>

        <ul className="mt-12 divide-y divide-slate-200/90 rounded-2xl border border-slate-200/90 bg-slate-50/50 shadow-md ring-1 ring-slate-900/[0.03]">
          {SOLUTIONS_INDUSTRIES.map((item) => (
            <motion.li key={item.title} {...fade} className="flex gap-4 px-4 py-4 sm:px-6 sm:py-5">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-800"
                aria-hidden
              >
                {initialLetter(item.title)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base">{item.summary}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
