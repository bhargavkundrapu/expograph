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

  return (
    <div 
      ref={ref || cardRef}
      onClick={onClick}
      onMouseMove={tilt ? handleMouseMove : undefined}
      onMouseLeave={tilt ? handleMouseLeave : undefined}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;

export function CardHeader({ children, className = "" }) {
  return <div>{children}</div>;
}

export function CardTitle({ children, className = "", gradient = false }) {
  return <h3>{children}</h3>;
}

export function CardDescription({ children, className = "" }) {
  return <p>{children}</p>;
}

export function CardContent({ children, className = "" }) {
  return <div>{children}</div>;
}

export function CardFooter({ children, className = "", border = true }) {
  return <div>{children}</div>;
}

export function StatsCard({ icon: Icon, value, label, trend, trendValue, className = "", iconColor = "primary" }) {
  return (
    <Card variant="elevated" hover className={className}>
      <div>
        <div>
          {Icon && <Icon />}
        </div>
        <div>
          <div>
            <span>{value}</span>
            {trend && <span>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}</span>}
          </div>
          <span>{label}</span>
        </div>
      </div>
    </Card>
  );
}
