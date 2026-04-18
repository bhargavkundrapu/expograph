import { motion } from "framer-motion";
import { SOLUTIONS_TRUST_STRIP_SHORT } from "../../../content/solutions/overview";
import { SOLUTIONS_HOME_SHELL } from "./solutionsHomeConstants";
import { solutionsSectionFade as fade } from "./solutionsHomeMotion";

export default function SolutionsTrustStripSection() {
  const parts = SOLUTIONS_TRUST_STRIP_SHORT.split(" · ").map((s) => s.trim()).filter(Boolean);

  return (
    <section className="border-b border-slate-200/70 bg-slate-50 py-10 sm:py-12" aria-label="What to expect">
      <div className={SOLUTIONS_HOME_SHELL}>
        <motion.div {...fade} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 sm:max-w-[10rem] sm:shrink-0">At a glance</p>
          <ul className="flex flex-wrap gap-2 sm:justify-end">
            {parts.map((label) => (
              <li
                key={label}
                className="rounded-full border border-slate-200/90 bg-white px-3 py-1.5 text-center text-xs font-medium leading-snug text-slate-700 shadow-sm sm:text-sm"
              >
                {label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
