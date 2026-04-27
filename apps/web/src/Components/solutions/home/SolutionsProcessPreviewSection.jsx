import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProcessTimeline from "../ProcessTimeline";
import { SOLUTIONS_PROCESS_STEPS } from "../../../content/solutions/process";
import { SOLUTIONS_SECTION_INTROS } from "../../../content/solutions/overview";
import { SOLUTIONS_HOME_SHELL } from "./solutionsHomeConstants";
import { solutionsSectionFade as fade } from "./solutionsHomeMotion";

export default function SolutionsProcessPreviewSection() {
  const { title, body } = SOLUTIONS_SECTION_INTROS.process;

  return (
    <section className="border-b border-slate-200/70 bg-white py-16 sm:py-20" aria-labelledby="process-heading">
      <div className={SOLUTIONS_HOME_SHELL}>
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,1.2fr)] lg:items-start">
          <motion.div {...fade} className="max-w-xl lg:sticky lg:top-28">
            <h2 id="process-heading" className="sol-display text-2xl text-slate-900 sm:text-3xl md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{body}</p>
            <p className="mt-6 rounded-xl border border-violet-100 bg-violet-50/60 p-4 text-sm leading-relaxed text-violet-950">
              Same five steps for a landing page or a full internal tool - only the depth changes.
            </p>
            <Link
              to="/solutions/process"
              className="mt-8 inline-flex text-sm font-semibold text-violet-700 transition hover:text-violet-900"
            >
              Open full process page →
            </Link>
          </motion.div>
          <motion.div {...fade}>
            <ProcessTimeline steps={SOLUTIONS_PROCESS_STEPS} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
