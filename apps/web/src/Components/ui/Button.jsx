import { forwardRef, useState } from "react";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon: Icon,
  iconRight: IconRight,
  iconPosition = "left",
  className = "",
  disabled = false,
  loading = false,
  fullWidth = false,
  rounded = false,
  glow = false,
  animate = false,
  ...props 
}, ref) => {
  const [ripple, setRipple] = useState({ x: 0, y: 0, show: false });

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    });
    setTimeout(() => setRipple(prev => ({ ...prev, show: false })), 600);
    
    if (props.onClick && !disabled && !loading) {
      props.onClick(e);
    }
  };

  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold relative overflow-hidden transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg hover:shadow-emerald-500/25 hover:from-emerald-600 hover:to-emerald-700 focus:ring-emerald-500 active:scale-[0.98]",
    secondary: "bg-white border-2 border-emerald-500 text-emerald-600 shadow-sm hover:shadow-md hover:bg-emerald-50 focus:ring-emerald-500 active:scale-[0.98]",
    outline: "bg-transparent border-2 border-gray-200 text-gray-700 shadow-sm hover:shadow-md hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/50 focus:ring-emerald-500 active:scale-[0.98]",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500 active:scale-[0.98]",
    gradient: "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110 focus:ring-emerald-500 active:scale-[0.98] animate-gradient bg-[length:200%_200%]",
    gradientPremium: "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-gray-900 shadow-lg hover:shadow-xl hover:shadow-amber-500/30 hover:brightness-110 focus:ring-amber-500 active:scale-[0.98]",
    accent: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700 focus:ring-blue-500 active:scale-[0.98]",
    destructive: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md hover:shadow-lg hover:shadow-red-500/25 hover:from-red-600 hover:to-rose-700 focus:ring-red-500 active:scale-[0.98]",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg hover:shadow-green-500/25 hover:from-green-600 hover:to-emerald-700 focus:ring-green-500 active:scale-[0.98]",
    warning: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:shadow-lg hover:shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 focus:ring-amber-500 active:scale-[0.98]",
    dark: "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md hover:shadow-lg hover:from-gray-900 hover:to-black focus:ring-gray-500 active:scale-[0.98]",
    glass: "bg-white/70 backdrop-blur-lg border border-white/50 text-gray-800 shadow-md hover:shadow-lg hover:bg-white/85 focus:ring-emerald-500 active:scale-[0.98]",
    link: "bg-transparent text-emerald-600 hover:text-emerald-700 hover:underline focus:ring-emerald-500 p-0",
  };
  
  const sizes = {
    xs: "px-2.5 py-1.5 text-xs min-h-[28px] rounded-md",
    sm: "px-3.5 py-2 text-sm min-h-[36px] rounded-lg",
    md: "px-5 py-2.5 text-base min-h-[44px] rounded-xl",
    lg: "px-6 py-3 text-lg min-h-[52px] rounded-xl",
    xl: "px-8 py-4 text-xl min-h-[60px] rounded-2xl",
  };
  
  const iconSizes = {
    xs: "w-3.5 h-3.5",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
  };

  const LoadingSpinner = () => (
    <svg className={`animate-spin ${iconSizes[size]}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
  
  const widthClass = fullWidth ? "w-full" : "";
  const roundedClass = rounded ? "!rounded-full" : "";
  const glowClass = glow ? "animate-glow" : "";
  const animateClass = animate ? "animate-scaleIn" : "";
  
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${roundedClass} ${glowClass} ${animateClass} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {ripple.show && (
        <span 
          className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      )}
      
      {loading && <LoadingSpinner />}
      
      {!loading && Icon && iconPosition === "left" && (
        <Icon className={`${iconSizes[size]} flex-shrink-0 transition-transform group-hover:scale-110`} />
      )}
      
      {children && (
        <span className="relative z-10 whitespace-nowrap">
          {loading ? "Loading..." : children}
        </span>
      )}
      
      {!loading && (IconRight || (Icon && iconPosition === "right")) && (
        <span className={`${iconSizes[size]} flex-shrink-0 transition-transform group-hover:translate-x-1`}>
          {IconRight ? <IconRight /> : <Icon />}
        </span>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
