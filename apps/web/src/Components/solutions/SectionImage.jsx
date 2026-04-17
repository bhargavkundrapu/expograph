import { cn } from "../../lib/utils";

/**
 * Decorative section imagery — responsive, lazy-loaded, with readable alt text.
 * Uses intrinsic ratio + explicit dimensions so layout is stable in CSS grid/flex.
 */
export default function SectionImage({
  src,
  alt,
  className,
  aspectClass = "aspect-[4/3] sm:aspect-[16/10]",
  priority = false,
}) {
  if (!src) return null;
  return (
    <figure
      className={cn(
        "w-full min-w-0 self-start overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm",
        className,
      )}
    >
      <div className={cn("relative w-full overflow-hidden bg-white", aspectClass)}>
        <img
          src={src}
          alt={alt ?? ""}
          width={1600}
          height={1067}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </figure>
  );
}
