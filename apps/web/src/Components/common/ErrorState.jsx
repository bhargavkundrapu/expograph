export default function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="rounded-2xl border border-red-900/60 bg-red-950/30 p-5">
      <div className="text-lg font-semibold text-red-200">{title}</div>
      {message ? <div className="mt-1 text-sm text-red-200/80">{message}</div> : null}
      {onRetry ? (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
          type="button"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}