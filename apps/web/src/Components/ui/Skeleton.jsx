export default function Skeleton({ 
  className = "", 
  variant = "default",
  animation = "shimmer",
  rounded = "lg"
}) {
  const baseStyles = "bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:200%_100%]";
  
  const animations = {
    shimmer: "animate-shimmer",
    pulse: "animate-pulse",
    none: "",
  };

  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  const variants = {
    default: "",
    card: "h-48 sm:h-56",
    avatar: "w-12 h-12 rounded-full",
    avatarLg: "w-16 h-16 rounded-full",
    title: "h-8 w-3/4",
    text: "h-4 w-full",
    textShort: "h-4 w-2/3",
    button: "h-12 w-32",
    image: "h-48 w-full",
    icon: "w-10 h-10 rounded-xl",
  };

  return (
    <div 
      className={`
        ${baseStyles} 
        ${animations[animation]} 
        ${roundedStyles[rounded]}
        ${variants[variant]}
        ${className}
      `}
    />
  );
}

export function SkeletonCard({ className = "" }) {
  return (
    <div className={`p-6 rounded-2xl border border-gray-100 bg-white space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        <Skeleton variant="icon" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="title" className="!w-1/2" />
          <Skeleton variant="textShort" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="textShort" />
      </div>
    </div>
  );
}

export function SkeletonPage({ className = "" }) {
  return (
    <div className={`space-y-8 animate-fadeIn ${className}`}>
      <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton variant="icon" className="!w-14 !h-14" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-48" rounded="xl" />
            <Skeleton className="h-5 w-32" rounded="lg" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
