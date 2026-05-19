import { HealthMetricType } from "../../core/enums/health-metric-type.enum";
import { HealthMetricService } from "../../core/services/health-metric.service";

import { XiaomiClient } from "./xiaomi.client";
import { XiaomiMapper } from "./xiaomi.mapper";

export class XiaomiService {
  private client = new XiaomiClient();

  private healthMetricService = new HealthMetricService();

  async syncActivity(): Promise<void> {
    const rawData = await this.client.getActivityData();

    const normalizedData = XiaomiMapper.toHealthRecord(rawData);

    await this.healthMetricService.createMetrics([
      {
        type: HealthMetricType.STEPS,

        value: normalizedData.steps ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.CALORIES,

        value: normalizedData.calories ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.HEART_RATE,

        value: normalizedData.heartRate ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.SLEEP,

        value: normalizedData.sleepDuration ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.WEIGHT,

        value: normalizedData.weight ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.BODY_FAT,

        value: normalizedData.bodyFat ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },
      {
        type: HealthMetricType.ACTIVE_CALORIES,

        value: normalizedData.activeCalories ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.RESTING_HEART_RATE,

        value: normalizedData.restingHeartRate ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.VO2_MAX,

        value: normalizedData.vo2Max ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.WATER,

        value: normalizedData.water ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.PROTEIN,

        value: normalizedData.protein ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.CARBS,

        value: normalizedData.carbs ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.FAT,

        value: normalizedData.fat ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.BMI,

        value: normalizedData.bmi ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.MUSCLE_MASS,

        value: normalizedData.muscleMass ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
      },
    ]);
  }
}
