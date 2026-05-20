/** Types canoniques partagés web / mobile (sans dépendance Prisma). */

export const HEALTH_METRIC_TYPES = [
  "steps",
  "calories",
  "active_calories",
  "heart_rate",
  "resting_heart_rate",
  "sleep",
  "weight",
  "body_fat",
  "distance",
  "vo2_max",
  "water",
  "protein",
  "carbs",
  "fat",
  "bmi",
  "muscle_mass",
] as const;

export type HealthMetricTypeId = (typeof HEALTH_METRIC_TYPES)[number];

export const HEALTH_PROVIDERS = [
  "xiaomi",
  "garmin",
  "apple",
  "fitbit",
  "strava",
  "google_fit",
  "health_connect",
  "suunto",
  "myfitnesspal",
  "yazio",
] as const;

export type HealthProviderId = (typeof HEALTH_PROVIDERS)[number];

/** Priorité d’affichage si plusieurs sources ont la même métrique le même jour. */
export const SOURCE_PRIORITY: HealthProviderId[] = [
  "health_connect",
  "garmin",
  "fitbit",
  "apple",
  "google_fit",
  "suunto",
  "strava",
  "xiaomi",
  "myfitnesspal",
  "yazio",
];
