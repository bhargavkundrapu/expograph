import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:border-violet-200 hover:shadow-md">
      {service.image ? (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-white">
          <img
            src={service.image}
            alt={service.imageAlt || ""}
            width={1200}
            height={750}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{service.shortValue}</p>
        <ul className="mt-4 flex-1 space-y-2.5">
          {service.outcomes.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link
          to={`/solutions/${service.slug}`}
          className="mt-6 inline-flex items-center text-sm font-semibold text-violet-700 transition group-hover:gap-1.5"
        >
          Learn more
          <span className="ml-1 transition-transform group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
