import { forwardRef, useState, useRef } from "react";

const Card = forwardRef(({ 
  children, 
  variant = "default",
  hover = true,
  tilt = false,
  glow = false,
  animate = false,
  delay = 0,
  className = "",
  style = {},
  onClick,
  ...props 
}, ref) => {
  const [tiltStyle, setTiltStyle] = useState({});
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!tilt) return;
    const card = cardRef.current || ref?.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    setTiltStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
  };

  const baseStyles = "rounded-2xl position-relative overflow-hidden transition-all duration-300 ease-out";
  
  const variants = {
    default: `bg-white border border-gray-100 shadow-soft p-4 sm:p-6 ${hover ? 'hover:shadow-medium hover:border-gray-200' : ''}`,
    elevated: `bg-white border border-gray-100 shadow-medium p-4 sm:p-6 ${hover ? 'hover:shadow-elevated hover:-translate-y-1' : ''}`,
    glass: `bg-white/70 backdrop-blur-xl border border-white/50 shadow-medium p-4 sm:p-6 ${hover ? 'hover:bg-white/80 hover:shadow-elevated' : ''}`,
    gradient: `bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-100/50 shadow-medium p-4 sm:p-6 ${hover ? 'hover:shadow-glow-primary hover:-translate-y-1' : ''}`,
    outlined: `bg-white border-2 border-emerald-500/30 shadow-sm p-4 sm:p-6 ${hover ? 'hover:border-emerald-500/60 hover:shadow-medium' : ''}`,
    premium: `bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-amber-500/30 shadow-xl text-white p-4 sm:p-6 ${hover ? 'hover:shadow-glow-gold hover:-translate-y-1' : ''}`,
    dark: `bg-gray-900 border border-gray-700 shadow-xl text-white p-4 sm:p-6 ${hover ? 'hover:shadow-2xl hover:-translate-y-1' : ''}`,
    interactive: `bg-white border border-gray-100 shadow-soft cursor-pointer p-4 sm:p-6 ${hover ? 'hover:shadow-elevated hover:-translate-y-2 hover:border-emerald-300' : ''}`,
  };

  const animateStyles = animate ? 'animate-fadeIn opacity-0' : '';
  const delayStyle = animate && delay ? { animationDelay: `${delay}s`, animationFillMode: 'forwards' } : {};

  return (
    <div 
      ref={ref || cardRef}
      className={`${baseStyles} ${variants[variant] || variants.default} ${animateStyles} ${className}`}
      style={{ boxSizing: 'border-box', ...(tilt ? tiltStyle : {}), ...delayStyle, ...style }}
      onClick={onClick}
      onMouseMove={tilt ? handleMouseMove : undefined}
      onMouseLeave={tilt ? handleMouseLeave : undefined}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;

export function CardHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "", gradient = false }) {
  const gradientClass = gradient ? 'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent' : 'text-gray-900';
  return <h3 className={`text-lg sm:text-xl font-bold mb-1 ${gradientClass} ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = "" }) {
  return <p className={`text-sm sm:text-base text-gray-600 leading-relaxed ${className}`}>{children}</p>;
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = "", border = true }) {
  return <div className={`mt-4 pt-4 ${border ? 'border-t border-gray-100' : ''} ${className}`}>{children}</div>;
}

export function StatsCard({ icon: Icon, value, label, trend, trendValue, className = "", iconColor = "primary" }) {
  const iconColors = { primary: "from-emerald-500 to-teal-600", accent: "from-blue-500 to-indigo-600", gold: "from-amber-400 to-yellow-500" };
  const trendColors = { up: "text-emerald-600 bg-emerald-50", down: "text-red-600 bg-red-50", neutral: "text-gray-600 bg-gray-50" };

  return (
    <Card variant="elevated" hover className={className}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${iconColors[iconColor]} shadow-lg`}>
          {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</span>
            {trend && <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trendColors[trend]}`}>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}</span>}
          </div>
          <span className="text-sm text-gray-500">{label}</span>
        </div>
      </div>
    </Card>
  );
}
