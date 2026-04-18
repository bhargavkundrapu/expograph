import { motion } from "framer-motion";
import { SOLUTIONS_WHY_EXPOGRAPH, SOLUTIONS_SECTION_INTROS } from "../../../content/solutions/overview";
import { SOLUTIONS_HOME_SHELL } from "./solutionsHomeConstants";
import { solutionsSectionFade as fade } from "./solutionsHomeMotion";

function CheckIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function SolutionsWhySection() {
  const { title, body } = SOLUTIONS_SECTION_INTROS.whyUs;

  return (
    <section className="border-b border-slate-200/70 bg-gradient-to-b from-violet-50 to-white py-16 sm:py-20" aria-labelledby="why-heading">
      <div className={SOLUTIONS_HOME_SHELL}>
        <motion.div {...fade} className="max-w-3xl">
          <h2 id="why-heading" className="sol-display text-2xl text-slate-900 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{body}</p>
        </motion.div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {SOLUTIONS_WHY_EXPOGRAPH.map((item) => (
            <motion.li
              key={item}
              {...fade}
              className="flex gap-4 rounded-2xl border border-violet-200/80 bg-white p-5 shadow-md ring-1 ring-violet-100 sm:p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600">
                <CheckIcon />
              </span>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{item}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
