export function formatNumber(value: number | null, suffix = ""): string {
  if (value === null) {
    return "—";
  }

  return `${Math.round(value).toLocaleString("fr-FR")}${suffix}`;
}

export function formatMetricValue(type: string, value: number, unit: string | null): string {
  if (type === "sleep") {
    return formatSleep(value);
  }

  if (type === "body_fat") {
    return `${value.toFixed(1)} %`;
  }

  if (type === "distance") {
    return `${value.toFixed(2)} km`;
  }

  if (type === "weight" || type === "muscle_mass") {
    return `${value.toFixed(1)} kg`;
  }

  const suffix = unit ? ` ${unit}` : "";

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
