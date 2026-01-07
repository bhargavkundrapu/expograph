import { forwardRef } from "react";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon: Icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  fullWidth = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold relative overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-green-600 text-white shadow-md hover:shadow-lg focus:ring-green-500 active:scale-[0.98] border border-green-700",
    secondary: "bg-transparent border-2 border-green-600 text-green-700 shadow-sm hover:bg-green-50 focus:ring-green-500 active:scale-[0.98]",
    outline: "bg-white border-2 border-green-500 text-green-700 shadow-sm hover:bg-green-50 focus:ring-green-500 active:scale-[0.98]",
    ghost: "bg-transparent text-green-700 hover:bg-green-50 focus:ring-green-500 active:scale-[0.98] border border-transparent",
    gradient: "bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white shadow-md hover:shadow-lg focus:ring-green-500 active:scale-[0.98] border border-green-800",
    destructive: "bg-red-500 text-white shadow-md hover:shadow-lg hover:bg-red-600 focus:ring-red-500 active:scale-[0.98] border border-red-600",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm min-h-[32px]",
    md: "px-5 py-2.5 text-base min-h-[40px]",
    lg: "px-6 py-3 text-lg min-h-[48px]",
    xl: "px-8 py-4 text-xl min-h-[56px]",
  };
  
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} rounded-lg ${widthClass} ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <Icon className={`${iconSizes[size]} flex-shrink-0`} />
      )}
      {children && (
        <span className="relative z-10 whitespace-nowrap">{children}</span>
      )}
      {Icon && iconPosition === "right" && (
        <Icon className={`${iconSizes[size]} flex-shrink-0`} />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
