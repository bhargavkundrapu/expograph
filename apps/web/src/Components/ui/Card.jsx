import { Children } from "react";

export default function Card({ 
  children, 
  variant = "default",
  hover = true,
  className = "",
  ...props 
}) {
  const baseStyles = "rounded-xl transition-all duration-300 position-relative overflow-hidden";
  
  const variants = {
    default: "bg-gray-900 border-2 border-gray-800 p-6",
    elevated: "bg-gray-900 border-2 border-gray-700 p-6 shadow-lg shadow-black/50",
    glass: "glass-effect p-6",
    gradient: "bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-gray-700 p-6",
    outlined: "bg-black border-2 border-white p-6",
  };
  
  const hoverStyles = hover 
    ? "card-hover cursor-pointer" 
    : "";
  
  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
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
    <h3 className={`text-xl font-bold text-white mb-2 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-sm text-gray-400 ${className}`}>
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
    <div className={`mt-4 pt-4 border-t border-gray-800 ${className}`}>
      {children}
    </div>
  );
}

