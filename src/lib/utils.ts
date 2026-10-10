/**
 * Converts English numbers or numeric strings into Bengali digits.
 * Example: 1850 -> "১,৮৫০"
 */
export function toBengaliNumeral(num: number | string): string {
  if (num === null || num === undefined) return "";

  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  // Format numbers with commas first (e.g. 1850 -> 1,850)
  const formatted = typeof num === "number" ? num.toLocaleString("en-US") : num;

  return formatted.replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
}

/**
 * Returns formatted Bangla price string.
 * Example: 148 -> "১৪৮ টাকা"
 */
export function formatBanglaPrice(price: number): string {
  return `${toBengaliNumeral(price)} টাকা`;
}

/**
 * Returns formatted change percentage badge text.
 * Example: 2.1 -> "▲ ২.১%" | -2.9 -> "▼ ২.৯%"
 */
export function formatChangeBadge(change: number) {
  const isUp = change > 0;
  const isDown = change < 0;
  const absValue = toBengaliNumeral(Math.abs(change).toFixed(1));

  if (isUp) {
    return { symbol: "▲", text: `▲ ${absValue}%`, className: "badge badge-success text-white" };
  } else if (isDown) {
    return { symbol: "▼", text: `▼ ${absValue}%`, className: "badge badge-error text-white" };
  }
  return { symbol: "—", text: `— ${absValue}%`, className: "badge badge-ghost" };
}