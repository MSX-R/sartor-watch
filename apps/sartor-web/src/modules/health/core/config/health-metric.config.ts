import { HealthMetricType } from "../enums/health-metric-type.enum";
import { HealthMetricUnit } from "../enums/health-metric-unit.enum";

export const HEALTH_METRIC_CONFIG = {
  [HealthMetricType.STEPS]: {
    unit: HealthMetricUnit.COUNT,
  },

  [HealthMetricType.CALORIES]: {
    unit: HealthMetricUnit.KCAL,
  },

  [HealthMetricType.ACTIVE_CALORIES]: {
    unit: HealthMetricUnit.KCAL,
  },

  [HealthMetricType.HEART_RATE]: {
    unit: HealthMetricUnit.BPM,
  },

  [HealthMetricType.RESTING_HEART_RATE]: {
    unit: HealthMetricUnit.BPM,
  },

  [HealthMetricType.SLEEP]: {
    unit: HealthMetricUnit.MINUTES,
  },

  [HealthMetricType.WEIGHT]: {
    unit: HealthMetricUnit.KG,
  },

  [HealthMetricType.MUSCLE_MASS]: {
    unit: HealthMetricUnit.KG,
  },

  [HealthMetricType.BODY_FAT]: {
    unit: HealthMetricUnit.PERCENT,
  },

  [HealthMetricType.DISTANCE]: {
    unit: HealthMetricUnit.KM,
  },

  [HealthMetricType.VO2_MAX]: {
    unit: HealthMetricUnit.SCORE,
  },

  [HealthMetricType.WATER]: {
    unit: HealthMetricUnit.ML,
  },

  [HealthMetricType.PROTEIN]: {
    unit: HealthMetricUnit.GRAMS,
  },

  [HealthMetricType.CARBS]: {
    unit: HealthMetricUnit.GRAMS,
  },

  [HealthMetricType.FAT]: {
    unit: HealthMetricUnit.GRAMS,
  },

  [HealthMetricType.BMI]: {
    unit: HealthMetricUnit.SCORE,
  },
} as const;
