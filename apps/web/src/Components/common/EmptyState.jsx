import Button from "../ui/Button";

export default function EmptyState({
  icon = "default",
  title = "No data found",
  message = "There's nothing here yet.",
  actionLabel,
  onAction,
  actionIcon,
  variant = "default",
  size = "md",
  className = "",
}) {
  return (
    <div>
      <div>
        <div>
        </div>
      </div>

      <h3>{title}</h3>
      <p>{message}</p>

      {actionLabel && onAction && (
        <Button variant="primary" size={size === 'lg' ? 'lg' : 'md'} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function NoResults({ onClear, className = "" }) {
  return (
    <EmptyState icon="search" title="No results found" message="Try adjusting your search or filter to find what you're looking for." actionLabel={onClear ? "Clear Filters" : undefined} onAction={onClear} variant="accent" className={className} />
  );
}

export function NoData({ title = "No data yet", message, onAction, actionLabel, className = "" }) {
  return (
    <EmptyState icon="default" title={title} message={message || "Data will appear here once it's available."} actionLabel={actionLabel} onAction={onAction} variant="default" className={className} />
  );
}
