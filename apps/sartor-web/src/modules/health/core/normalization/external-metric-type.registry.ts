import { HealthMetricType } from "../enums/health-metric-type.enum";

/** Clé normalisée : minuscules, underscores (ex. `HKQuantityTypeIdentifierStepCount` → `hkquantitytypeidentifierstepcount`). */
export function normalizeMetricAliasKey(raw: string): string {
  return raw
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s.\-/]+/g, "_")
    .toLowerCase();
}

/**
 * Alias externes → type canonique Sartor.
 * Health Connect, Apple HealthKit, Garmin, Fitbit, Strava, Google Fit, Suunto, Xiaomi, etc.
 */
const ALIAS_TO_CANONICAL: Record<string, HealthMetricType> = {
  // — Canoniques (déjà au format Sartor)
  steps: HealthMetricType.STEPS,
  calories: HealthMetricType.CALORIES,
  active_calories: HealthMetricType.ACTIVE_CALORIES,
  heart_rate: HealthMetricType.HEART_RATE,
  resting_heart_rate: HealthMetricType.RESTING_HEART_RATE,
  sleep: HealthMetricType.SLEEP,
  weight: HealthMetricType.WEIGHT,
  body_fat: HealthMetricType.BODY_FAT,
  distance: HealthMetricType.DISTANCE,
  vo2_max: HealthMetricType.VO2_MAX,
  water: HealthMetricType.WATER,
  protein: HealthMetricType.PROTEIN,
  carbs: HealthMetricType.CARBS,
  fat: HealthMetricType.FAT,
  bmi: HealthMetricType.BMI,
  muscle_mass: HealthMetricType.MUSCLE_MASS,

  // Health Connect
  step_count: HealthMetricType.STEPS,
  active_calories_burned: HealthMetricType.ACTIVE_CALORIES,
  total_calories_burned: HealthMetricType.CALORIES,
  sleep_session: HealthMetricType.SLEEP,

  // Apple HealthKit
  hkquantitytypeidentifierstepcount: HealthMetricType.STEPS,
  hkquantitytypeidentifieractiveenergyburned: HealthMetricType.ACTIVE_CALORIES,
  hkquantitytypeidentifierbasalenergyburned: HealthMetricType.CALORIES,
  hkquantitytypeidentifierheartrate: HealthMetricType.HEART_RATE,
  hkquantitytypeidentifierrestingheartrate: HealthMetricType.RESTING_HEART_RATE,
  hkquantitytypeidentifierdistancewalkingrunning: HealthMetricType.DISTANCE,
  hkquantitytypeidentifierbodymass: HealthMetricType.WEIGHT,
  hkquantitytypeidentifierbodyfatpercentage: HealthMetricType.BODY_FAT,
  hkquantitytypeidentifiervo2max: HealthMetricType.VO2_MAX,
  hkquantitytypeidentifierflightsclimbed: HealthMetricType.STEPS,
  hkcategorytypeidentifiersleepanalysis: HealthMetricType.SLEEP,

  // Google Fit
  com_google_step_count_delta: HealthMetricType.STEPS,
  com_google_calories_expended: HealthMetricType.CALORIES,
  com_google_active_calories_burned: HealthMetricType.ACTIVE_CALORIES,
  com_google_heart_rate_bpm: HealthMetricType.HEART_RATE,
  com_google_distance_delta: HealthMetricType.DISTANCE,
  com_google_weight: HealthMetricType.WEIGHT,

  // Garmin
  garmin_steps: HealthMetricType.STEPS,
  garmin_total_steps: HealthMetricType.STEPS,
  garmin_active_calories: HealthMetricType.ACTIVE_CALORIES,
  garmin_calories: HealthMetricType.CALORIES,
  garmin_heart_rate: HealthMetricType.HEART_RATE,
  garmin_resting_heart_rate: HealthMetricType.RESTING_HEART_RATE,
  garmin_distance: HealthMetricType.DISTANCE,
  garmin_sleep_time: HealthMetricType.SLEEP,

  // Fitbit
  fitbit_steps: HealthMetricType.STEPS,
  fitbit_calories: HealthMetricType.CALORIES,
  fitbit_activity_calories: HealthMetricType.ACTIVE_CALORIES,
  fitbit_heart_rate: HealthMetricType.HEART_RATE,
  fitbit_resting_heart_rate: HealthMetricType.RESTING_HEART_RATE,
  fitbit_distance: HealthMetricType.DISTANCE,
  fitbit_sleep_minutes: HealthMetricType.SLEEP,
  fitbit_weight: HealthMetricType.WEIGHT,
  fitbit_fat: HealthMetricType.BODY_FAT,

  // Strava (agrégats journaliers souvent exposés via HC / import)
  strava_distance: HealthMetricType.DISTANCE,
  strava_calories: HealthMetricType.CALORIES,
  strava_average_heartrate: HealthMetricType.HEART_RATE,

  // Suunto
  suunto_steps: HealthMetricType.STEPS,
  suunto_energy: HealthMetricType.CALORIES,
  suunto_hr: HealthMetricType.HEART_RATE,
  suunto_sleep_duration: HealthMetricType.SLEEP,
  suunto_distance: HealthMetricType.DISTANCE,

  // Xiaomi / Mi Fitness
  xiaomi_steps: HealthMetricType.STEPS,
  mi_steps: HealthMetricType.STEPS,
  xiaomi_calories: HealthMetricType.CALORIES,
  xiaomi_heart_rate: HealthMetricType.HEART_RATE,
  xiaomi_sleep: HealthMetricType.SLEEP,

  // Nutrition (Yazio / MyFitnessPal)
  yazio_water: HealthMetricType.WATER,
  yazio_protein: HealthMetricType.PROTEIN,
  mfp_calories: HealthMetricType.CALORIES,
  mfp_protein: HealthMetricType.PROTEIN,
  mfp_carbs: HealthMetricType.CARBS,
  mfp_fat: HealthMetricType.FAT,
};

export function resolveCanonicalMetricType(externalType: string): HealthMetricType | undefined {
  const key = normalizeMetricAliasKey(externalType);

  return ALIAS_TO_CANONICAL[key];
}
