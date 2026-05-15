// ─── Price Formatting ────────────────────────────────────────────────────────

const formatterCache: Record<string, Intl.NumberFormat> = {};

/**
 * Format a numeric price value with proper currency symbols.
 * Uses Intl.NumberFormat with caching for performance.
 */
export function formatPrice(value: number, currency: string = "USD"): string {
  if (!formatterCache[currency]) {
    formatterCache[currency] = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return formatterCache[currency].format(value);
}

/**
 * Truncate an HTML string to plain text of max length.
 * Used for meta descriptions from Fourthwall product HTML.
 */
export function htmlToPlainText(html: string, maxLength: number = 160): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}
