export default function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-white opacity-20 ${className}`} />
  );
}