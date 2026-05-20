import { HealthProvider } from "../enums/health-provider.enum";

/** Plus haut dans la liste = prioritaire pour le résumé du jour. */
export const SOURCE_PRIORITY: HealthProvider[] = [
  HealthProvider.HEALTH_CONNECT,
  HealthProvider.GARMIN,
  HealthProvider.FITBIT,
  HealthProvider.APPLE,
  HealthProvider.GOOGLE_FIT,
  HealthProvider.SUUNTO,
  HealthProvider.STRAVA,
  HealthProvider.XIAOMI,
  HealthProvider.MYFITNESSPAL,
  HealthProvider.YAZIO,
];

export function sourcePriorityIndex(source: string): number {
  const index = SOURCE_PRIORITY.indexOf(source as HealthProvider);

  return index === -1 ? SOURCE_PRIORITY.length : index;
}
