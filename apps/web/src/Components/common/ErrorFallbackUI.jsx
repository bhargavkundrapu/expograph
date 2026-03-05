/**
 * Shared full-page error UI for route errors and global error boundary.
 * Friendly copy, no stack traces or dev jargon. Retry + Go home actions.
 * Uses <a href="/"> so it works both inside and outside Router (e.g. root error boundary).
 */

const defaultTitle = "Something went wrong";
const defaultMessage = "We hit a small bump. Try again — it usually works.";

export default function ErrorFallbackUI({
  title = defaultTitle,
  message = defaultMessage,
  onRetry,
  onGoHome,
  className = "",
}) {
  return (
    <div
      className={
        "min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 " +
        className
      }
      role="alert"
      aria-live="polite"
    >
      <div className="max-w-md w-full">
        <div className="mb-6 flex justify-center">
          <div
            className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center"
            aria-hidden
          >
            <svg
              className="w-8 h-8 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-xl font-semibold text-slate-900 mb-2">{title}</h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <span>Try again</span>
            </button>
          )}
          {(onGoHome !== false || !onRetry) && (
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-colors"
            >
              Go to home
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
