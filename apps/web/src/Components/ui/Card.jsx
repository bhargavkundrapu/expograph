import { Children } from "react";

export default function Card({ 
  children, 
  variant = "default",
  hover = false,
  className = "",
  ...props 
}) {
  const baseStyles = "rounded-xl position-relative overflow-hidden";
  
  const variants = {
    default: "bg-white border-2 border-green-200 p-4 sm:p-6 shadow-soft",
    elevated: "bg-white border-2 border-green-300 p-4 sm:p-6 shadow-medium",
    glass: "bg-white/80 backdrop-blur-sm border-2 border-green-200 p-4 sm:p-6 shadow-soft",
    gradient: "bg-gradient-to-br from-green-50 to-white border-2 border-green-300 p-4 sm:p-6 shadow-medium",
    outlined: "bg-white border-2 border-green-600 p-4 sm:p-6 shadow-soft",
  };
  
  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ boxSizing: 'border-box' }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-lg sm:text-xl font-bold text-green-700 mb-2 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-sm sm:text-base text-gray-600 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "" }) {
  return (
    <div className={`mt-4 pt-4 border-t border-green-200 ${className}`}>
      {children}
    </div>
  );
}

