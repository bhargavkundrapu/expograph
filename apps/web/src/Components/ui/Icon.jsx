// Icon wrapper component for consistent styling
export default function Icon({ 
  component: Component, 
  size = 20, 
  className = "",
  ...props 
}) {
  return (
    <Component 
      className={`transition-all duration-300 ${className}`}
      size={size}
      {...props}
    />
  );
}

