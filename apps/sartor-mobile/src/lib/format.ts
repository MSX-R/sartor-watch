export function formatNumber(value: number | null, suffix = ""): string {
  if (value === null) {
    return "—";
  }

  return `${Math.round(value).toLocaleString("fr-FR")}${suffix}`;
}

export function formatSleep(minutes: number | null): string {
  if (minutes === null) {
    return "—";
  }

  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);

  return `${h}h${m.toString().padStart(2, "0")}`;
}
