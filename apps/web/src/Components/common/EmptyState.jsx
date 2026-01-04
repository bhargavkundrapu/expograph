import { Link } from "react-router-dom";

export default function EmptyState({ title = "Nothing here yet", message, ctaText, ctaTo }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
      <div className="text-lg font-semibold">{title}</div>
      {message ? <div className="mt-1 text-sm text-slate-300">{message}</div> : null}
      {ctaText && ctaTo ? (
        <Link
          to={ctaTo}
          className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
        >
          {ctaText}
        </Link>
      ) : null}
    </div>
  );
}