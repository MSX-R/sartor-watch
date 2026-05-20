import { HealthMetricType } from "../enums/health-metric-type.enum";
import { HealthRecord } from "../types/health-metric.types";

export interface NormalizedMetricInput {
  type: HealthMetricType;
  value: number;
  source: string;
  recordedAt: Date;
  userId: string;
  deviceId?: string;
}

export class HealthRecordNormalizer {
  static toMetrics(record: HealthRecord, userId: string): NormalizedMetricInput[] {
    const metrics: NormalizedMetricInput[] = [];
    const source = record.provider;

    const push = (type: HealthMetricType, value?: number | null) => {
      if (value === undefined || value === null || Number.isNaN(value)) {
        return;
      }

      metrics.push({
        type,
        value,
        source,
        recordedAt: record.recordedAt,
        userId,
      });
    };

    push(HealthMetricType.STEPS, record.steps);
    push(HealthMetricType.CALORIES, record.calories);
    push(HealthMetricType.ACTIVE_CALORIES, record.activeCalories);
    push(HealthMetricType.HEART_RATE, record.heartRate);
    push(HealthMetricType.RESTING_HEART_RATE, record.restingHeartRate);
    push(HealthMetricType.SLEEP, record.sleepDuration);
    push(HealthMetricType.WEIGHT, record.weight);
    push(HealthMetricType.BODY_FAT, record.bodyFat);
    push(HealthMetricType.MUSCLE_MASS, record.muscleMass);
    push(HealthMetricType.DISTANCE, record.distance);
    push(HealthMetricType.VO2_MAX, record.vo2Max);
    push(HealthMetricType.WATER, record.water);
    push(HealthMetricType.PROTEIN, record.protein);
    push(HealthMetricType.CARBS, record.carbs);
    push(HealthMetricType.FAT, record.fat);
    push(HealthMetricType.BMI, record.bmi);

    return metrics;
  }
}
