import { HealthMetricType } from "../../core/enums/health-metric-type.enum";
import { HealthMetricService } from "../../core/services/health-metric.service";

import { XiaomiClient } from "./xiaomi.client";
import { XiaomiMapper } from "./xiaomi.mapper";
import { ProviderService } from "../../core/services/provider.service";

export class XiaomiService {
  private client = new XiaomiClient();

  private healthMetricService = new HealthMetricService();

  private providerService = new ProviderService();

  async syncActivity(userId: string): Promise<void> {
    const rawData = await this.client.getActivityData();

    const normalizedData = XiaomiMapper.toHealthRecord(rawData);

    await this.providerService.connectProvider(userId, normalizedData.provider);

    await this.healthMetricService.createMetrics([
      {
        type: HealthMetricType.STEPS,

        value: normalizedData.steps ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,

        userId,
      },

      {
        type: HealthMetricType.CALORIES,

        value: normalizedData.calories ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.HEART_RATE,

        value: normalizedData.heartRate ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.SLEEP,

        value: normalizedData.sleepDuration ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.WEIGHT,

        value: normalizedData.weight ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.BODY_FAT,

        value: normalizedData.bodyFat ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },
      {
        type: HealthMetricType.ACTIVE_CALORIES,

        value: normalizedData.activeCalories ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.RESTING_HEART_RATE,

        value: normalizedData.restingHeartRate ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.VO2_MAX,

        value: normalizedData.vo2Max ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.WATER,

        value: normalizedData.water ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.PROTEIN,

        value: normalizedData.protein ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.CARBS,

        value: normalizedData.carbs ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.FAT,

        value: normalizedData.fat ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.BMI,

        value: normalizedData.bmi ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },

      {
        type: HealthMetricType.MUSCLE_MASS,

        value: normalizedData.muscleMass ?? 0,

        source: normalizedData.provider,

        recordedAt: normalizedData.recordedAt,
        userId,
      },
    ]);
  }
}
