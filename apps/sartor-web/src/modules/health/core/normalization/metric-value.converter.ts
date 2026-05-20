import { HealthMetricType } from "../enums/health-metric-type.enum";

function normalizeUnit(unit?: string): string | undefined {
  return unit?.trim().toLowerCase().replace(/\s+/g, "");
}

/**
 * Convertit une valeur fournie par une source externe vers l'unité canonique Sartor
 * (voir health-metric.config.ts).
 */
export function convertToCanonicalValue(
  type: HealthMetricType,
  value: number,
  unit?: string,
): number {
  const u = normalizeUnit(unit);

  switch (type) {
    case HealthMetricType.SLEEP: {
      if (u === "s" || u === "sec" || u === "seconds" || u === "millisecond" || u === "ms") {
        return value / 60;
      }

      if (u === "h" || u === "hr" || u === "hour" || u === "hours") {
        return value * 60;
      }

      return value;
    }

    case HealthMetricType.DISTANCE: {
      if (u === "m" || u === "meter" || u === "meters" || u === "metre" || u === "metres") {
        return value / 1000;
      }

      if (u === "mi" || u === "mile" || u === "miles") {
        return value * 1.60934;
      }

      return value;
    }

    case HealthMetricType.WEIGHT:
    case HealthMetricType.MUSCLE_MASS: {
      if (u === "lb" || u === "lbs" || u === "pound" || u === "pounds") {
        return value * 0.453592;
      }

      if (u === "g" || u === "gram" || u === "grams") {
        return value / 1000;
      }

      return value;
    }

    case HealthMetricType.BODY_FAT: {
      if (value > 0 && value <= 1 && (u === "ratio" || u === "fraction" || !u)) {
        return value * 100;
      }

      return value;
    }

    case HealthMetricType.WATER: {
      if (u === "l" || u === "liter" || u === "liters" || u === "litre") {
        return value * 1000;
      }

      return value;
    }

    case HealthMetricType.STEPS:
      return Math.round(value);

    default:
      return value;
  }
}
