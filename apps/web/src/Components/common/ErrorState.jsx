import { FaExclamationTriangle, FaRedo, FaHome, FaBug, FaWifi } from "react-icons/fa";
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
  const types = {
    default: { icon: FaExclamationTriangle, iconBg: "from-red-100 to-rose-50", iconColor: "text-red-500", border: "border-red-200" },
    network: { icon: FaWifi, iconBg: "from-amber-100 to-yellow-50", iconColor: "text-amber-500", border: "border-amber-200" },
    notFound: { icon: FaBug, iconBg: "from-purple-100 to-indigo-50", iconColor: "text-purple-500", border: "border-purple-200" },
    permission: { icon: FaExclamationTriangle, iconBg: "from-orange-100 to-amber-50", iconColor: "text-orange-500", border: "border-orange-200" },
  };

  const sizes = {
    sm: { container: "py-8 px-4", iconBox: "w-16 h-16", icon: "w-6 h-6", title: "text-lg", message: "text-sm" },
    md: { container: "py-12 px-6", iconBox: "w-20 h-20", icon: "w-8 h-8", title: "text-xl", message: "text-base" },
    lg: { container: "py-16 px-8", iconBox: "w-24 h-24", icon: "w-10 h-10", title: "text-2xl", message: "text-lg" },
  };

  const t = types[type] || types.default;
  const s = sizes[size];
  const Icon = t.icon;

  return (
    <div className={`flex flex-col items-center justify-center text-center ${s.container} animate-fadeIn ${className}`}>
      <div className="relative mb-6">
        <div className={`${s.iconBox} rounded-2xl bg-gradient-to-br ${t.iconBg} border ${t.border} flex items-center justify-center shadow-soft animate-bounce`} style={{ animationDuration: '2s' }}>
          <Icon className={`${s.icon} ${t.iconColor}`} />
        </div>
      </div>

      <h3 className={`${s.title} font-bold text-gray-900 mb-2`}>{title}</h3>
      <p className={`${s.message} text-gray-500 max-w-md mb-2`}>{message}</p>

      {error && (
        <div className="mt-4 mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200 max-w-md w-full">
          <p className="text-xs font-mono text-gray-500 break-all">
            {typeof error === 'string' ? error : error?.message || JSON.stringify(error)}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        {onRetry && (
          <Button variant="primary" size={size === 'lg' ? 'lg' : 'md'} onClick={onRetry} icon={FaRedo}>
            Try Again
          </Button>
        )}
        {onGoHome && (
          <Button variant="outline" size={size === 'lg' ? 'lg' : 'md'} onClick={onGoHome} icon={FaHome}>
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
