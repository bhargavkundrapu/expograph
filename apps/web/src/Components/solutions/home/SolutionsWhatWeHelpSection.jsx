import { motion } from "framer-motion";
import { SOLUTIONS_WHAT_WE_HELP, SOLUTIONS_SECTION_INTROS } from "../../../content/solutions/overview";
import { SOLUTIONS_HOME_SHELL } from "./solutionsHomeConstants";
import { solutionsSectionFade as fade } from "./solutionsHomeMotion";

export default function SolutionsWhatWeHelpSection() {
  const { title, body } = SOLUTIONS_SECTION_INTROS.whatWeHelp;

  return (
    <section className="border-b border-slate-200/70 bg-white py-16 sm:py-20" aria-labelledby="what-we-help-heading">
      <div className={SOLUTIONS_HOME_SHELL}>
        <motion.div {...fade} className="max-w-3xl">
          <h2 id="what-we-help-heading" className="sol-display text-2xl text-slate-900 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{body}</p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {SOLUTIONS_WHAT_WE_HELP.map((item, i) => (
            <motion.article
              key={item.title}
              {...fade}
              className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/90 p-6 shadow-md ring-1 ring-slate-900/[0.03] sm:p-7"
            >
              <span className="absolute right-4 top-4 text-4xl font-bold tabular-nums text-violet-200/90 sm:text-5xl" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative pr-16 text-base font-semibold leading-snug text-slate-900 sm:text-lg">{item.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
