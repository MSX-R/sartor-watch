/** Noms affichés des sources (après normalisation côté API). */
export const PROVIDER_LABELS: Record<string, string> = {
  health_connect: "Health Connect",
  apple: "Apple Health",
  google_fit: "Google Fit",
  garmin: "Garmin",
  fitbit: "Fitbit",
  strava: "Strava",
  suunto: "Suunto",
  xiaomi: "Xiaomi",
  myfitnesspal: "MyFitnessPal",
  yazio: "Yazio",
};

export function getProviderLabel(source: string): string {
  return PROVIDER_LABELS[source] ?? source;
}
