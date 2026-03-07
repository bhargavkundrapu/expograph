/**
 * Format a date for display with date + time, in a way that works on both
 * localhost and production. Some environments (older Safari/Edge, dev builds)
 * throw "Invalid option: timeStyle" when using dateStyle/timeStyle with
 * toLocaleString; this helper tries the modern API first and falls back
 * to widely supported options.
 * @param {string|Date|number} value - ISO date string, Date, or timestamp
 * @param {string} [locale] - Optional locale (default: undefined = user's locale)
 * @returns {string} Formatted date/time or empty string if invalid
 */
export function formatDateTime(value, locale = undefined) {
  if (value == null) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  try {
    return date.toLocaleString(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    // Fallback for environments that don't support dateStyle/timeStyle (e.g. some localhost/dev)
    try {
      return date.toLocaleString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return date.toLocaleString(locale) || String(value);
    }
  }
}
