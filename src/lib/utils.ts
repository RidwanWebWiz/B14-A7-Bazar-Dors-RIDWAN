// Convert English numbers to Bengali numerals
export function convertToBengaliNumber(num: number | string): string {
  const bengaliDigits: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
    ".": ".",
    "-": "-",
  };

  return num
    .toString()
    .split("")
    .map((char) => bengaliDigits[char] || char)
    .join("");
}

export function formatBanglaPrice(price: number): string {
  return convertToBengaliNumber(price);
}

// Format the percentage badge (e.g., ▲ ৯.০% or ▼ ২.৯%)
export function formatChangeBadge(change: number) {
  const isUp = change > 0;
  const isDown = change < 0;
  const absVal = Math.abs(change).toFixed(1);
  const bengaliVal = convertToBengaliNumber(absVal);

  if (isUp) {
    return {
      text: `▲ ${bengaliVal}%`,
      className: "bg-red-50 text-red-600",
    };
  } else if (isDown) {
    return {
      text: `▼ ${bengaliVal}%`,
      className: "bg-emerald-50 text-emerald-600",
    };
  } else {
    return {
      text: `— ০.০%`,
      className: "bg-slate-100 text-slate-600",
    };
  }
}