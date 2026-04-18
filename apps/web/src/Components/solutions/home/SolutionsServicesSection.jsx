import { motion } from "framer-motion";
import { SOLUTIONS_SECTION_INTROS } from "../../../content/solutions/overview";
import ServiceCard from "../ServiceCard";
import { SOLUTIONS_HOME_SHELL } from "./solutionsHomeConstants";
import { solutionsSectionFade as fade } from "./solutionsHomeMotion";

const legend = [
  { label: "Growth", hint: "Leads, WhatsApp, CRM motion", color: "bg-emerald-500" },
  { label: "Automation", hint: "AI + repeat work off your plate", color: "bg-violet-500" },
  { label: "Software", hint: "Dashboards, portals, MVPs", color: "bg-slate-700" },
];

export default function SolutionsServicesSection({ servicesByCategory }) {
  const { title, body } = SOLUTIONS_SECTION_INTROS.services;

  return (
    <section id="services" className="scroll-mt-28 border-b border-slate-200/70 bg-slate-50 py-16 sm:py-20" aria-labelledby="services-heading">
      <div className={SOLUTIONS_HOME_SHELL}>
        <motion.div {...fade}>
          <h2 id="services-heading" className="sol-display text-2xl text-slate-900 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{body}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-slate-200/80 py-4">
            {legend.map((row) => (
              <div key={row.label} className="flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
                <span className={`h-2 w-2 shrink-0 rounded-full ${row.color}`} aria-hidden />
                <span className="font-semibold text-slate-800">{row.label}</span>
                <span className="hidden text-slate-500 sm:inline">— {row.hint}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 space-y-14">
          {servicesByCategory.map(({ category, items }) =>
            items.length ? (
              <div key={category}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">{category} systems</h3>
                <p className="mt-1 text-sm text-slate-500">Each card links to a dedicated page with scope, examples, and starting prices.</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((s) => (
                    <ServiceCard key={s.slug} service={s} />
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
