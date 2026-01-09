import { FaInbox, FaSearch, FaFileAlt, FaUsers, FaBook, FaRocket } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Button from "../ui/Button";

const iconMap = {
  default: FaInbox,
  search: FaSearch,
  file: FaFileAlt,
  users: FaUsers,
  courses: FaBook,
  rocket: FaRocket,
};

export default function EmptyState({
  icon = "default",
  title = "No data found",
  message = "There's nothing here yet.",
  actionLabel,
  onAction,
  actionIcon,
  variant = "default",
  size = "md",
  className = "",
}) {
  const Icon = typeof icon === 'string' ? iconMap[icon] || iconMap.default : icon;

  const sizes = {
    sm: { container: "py-8 px-4", iconBox: "w-16 h-16", icon: "w-6 h-6", title: "text-lg", message: "text-sm" },
    md: { container: "py-12 px-6", iconBox: "w-20 h-20", icon: "w-8 h-8", title: "text-xl", message: "text-base" },
    lg: { container: "py-16 px-8", iconBox: "w-24 h-24", icon: "w-10 h-10", title: "text-2xl", message: "text-lg" },
  };

  const variants = {
    default: { iconBg: "from-gray-100 to-gray-50", iconColor: "text-gray-400", ring: "border-gray-200" },
    primary: { iconBg: "from-emerald-100 to-teal-50", iconColor: "text-emerald-500", ring: "border-emerald-200" },
    accent: { iconBg: "from-blue-100 to-indigo-50", iconColor: "text-blue-500", ring: "border-blue-200" },
    gold: { iconBg: "from-amber-100 to-yellow-50", iconColor: "text-amber-500", ring: "border-amber-200" },
  };

  const s = sizes[size];
  const v = variants[variant];

  return (
    <div className={`flex flex-col items-center justify-center text-center ${s.container} animate-fadeIn ${className}`}>
      <div className="relative mb-6">
        <div className={`absolute inset-0 rounded-full border-2 ${v.ring} animate-ping opacity-20`} style={{ animationDuration: '3s' }} />
        <div className={`absolute -inset-3 rounded-full border ${v.ring} opacity-30`} />
        <div className={`relative ${s.iconBox} rounded-2xl bg-gradient-to-br ${v.iconBg} border ${v.ring} flex items-center justify-center shadow-soft animate-float`}>
          <Icon className={`${s.icon} ${v.iconColor}`} />
        </div>
        <HiSparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-400 animate-pulse" />
      </div>

      <h3 className={`${s.title} font-bold text-gray-900 mb-2`}>{title}</h3>
      <p className={`${s.message} text-gray-500 max-w-sm mb-6`}>{message}</p>

      {actionLabel && onAction && (
        <Button variant="primary" size={size === 'lg' ? 'lg' : 'md'} onClick={onAction} icon={actionIcon || FaRocket} className="animate-scaleIn">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function NoResults({ onClear, className = "" }) {
  return (
    <EmptyState icon="search" title="No results found" message="Try adjusting your search or filter to find what you're looking for." actionLabel={onClear ? "Clear Filters" : undefined} onAction={onClear} variant="accent" className={className} />
  );
}

export function NoData({ title = "No data yet", message, onAction, actionLabel, className = "" }) {
  return (
    <EmptyState icon="default" title={title} message={message || "Data will appear here once it's available."} actionLabel={actionLabel} onAction={onAction} variant="default" className={className} />
  );
}
