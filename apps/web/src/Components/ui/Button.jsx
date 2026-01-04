import { forwardRef } from "react";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon: Icon,
  iconPosition = "left",
  className = "",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 hover:shadow-lg hover:shadow-white/20 active:scale-95",
    secondary: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/20 active:scale-95",
    outline: "bg-black border-2 border-gray-600 text-white hover:border-white hover:bg-gray-900 active:scale-95",
    ghost: "bg-transparent text-white hover:bg-white/10 active:scale-95",
    gradient: "bg-gradient-to-r from-white via-gray-200 to-white text-black hover:from-gray-200 hover:via-white hover:to-gray-200 hover:shadow-xl hover:shadow-white/30 active:scale-95",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };
  
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
  };
  
  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <Icon className={`${iconSizes[size]} transition-transform group-hover:scale-110`} />
      )}
      <span className="relative z-10">{children}</span>
      {Icon && iconPosition === "right" && (
        <Icon className={`${iconSizes[size]} transition-transform group-hover:scale-110`} />
      )}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
    </button>
  );
});

Button.displayName = "Button";

export default Button;

