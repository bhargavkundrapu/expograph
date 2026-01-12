import Button from "../ui/Button";

export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  error,
  onRetry,
  onGoHome,
  type = "default",
  size = "md",
  className = "",
}) {
  return (
    <div>
      <div>
        <div>
        </div>
      </div>

      <h3>{title}</h3>
      <p>{message}</p>

      {error && (
        <div>
          <p>
            {typeof error === 'string' ? error : error?.message || JSON.stringify(error)}
          </p>
        </div>
      )}

      <div>
        {onRetry && (
          <Button variant="primary" size={size === 'lg' ? 'lg' : 'md'} onClick={onRetry}>
            Try Again
          </Button>
        )}
        {onGoHome && (
          <Button variant="outline" size={size === 'lg' ? 'lg' : 'md'} onClick={onGoHome}>
            Go Home
          </Button>
        )}
      </div>
    </div>
  );
}

export function NetworkError({ onRetry, className = "" }) {
  return <ErrorState type="network" title="Connection Lost" message="Unable to connect to the server. Please check your internet connection and try again." onRetry={onRetry} className={className} />;
}

export function NotFoundError({ onGoHome, className = "" }) {
  return <ErrorState type="notFound" title="Page Not Found" message="The page you're looking for doesn't exist or has been moved." onGoHome={onGoHome} className={className} />;
}

export function LoadError({ onRetry, error, className = "" }) {
  return <ErrorState type="default" title="Failed to Load" message="We couldn't load this content. Please try again." error={error} onRetry={onRetry} className={className} />;
}
