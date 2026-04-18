import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  const category = service.category || "Service";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg ring-1 ring-slate-900/[0.04] transition duration-300 hover:-translate-y-0.5 hover:border-violet-200/90 hover:shadow-xl hover:ring-violet-500/10">
      {service.image ? (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
          <img
            src={service.image}
            alt={service.imageAlt || ""}
            width={1200}
            height={750}
            sizes="(max-width: 768px) 100vw, 360px"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700">{category}</p>
        <h3 className="sol-display mt-2 text-lg text-slate-900 sm:text-xl">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{service.shortValue}</p>
        <ul className="mt-4 flex-1 space-y-2">
          {service.outcomes.slice(0, 2).map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-slate-700 sm:text-base">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link
          to={`/solutions/${service.slug}`}
          className="mt-6 inline-flex items-center text-sm font-semibold text-violet-700 transition group-hover:text-violet-900"
        >
          View service
          <span className="ml-1 transition-transform group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
