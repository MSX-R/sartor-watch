import { HealthMetricType } from "../../core/enums/health-metric-type.enum";
import { HealthMetricService } from "../../core/services/health-metric.service";

import { XiaomiClient } from "./xiaomi.client";
import { XiaomiMapper } from "./xiaomi.mapper";

export class XiaomiService {
  private client = new XiaomiClient();

  private metricService = new HealthMetricService();

  async syncActivity(): Promise<void> {
    const rawData = await this.client.getActivityData();

    const normalizedData = XiaomiMapper.toHealthRecord(rawData);

    await this.metricService.createMetrics([
      {
        type: HealthMetricType.STEPS,
        value: normalizedData.steps ?? 0,
        unit: "count",
        source: normalizedData.provider,
        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.CALORIES,
        value: normalizedData.calories ?? 0,
        unit: "kcal",
        source: normalizedData.provider,
        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.HEART_RATE,
        value: normalizedData.heartRate ?? 0,
        unit: "bpm",
        source: normalizedData.provider,
        recordedAt: normalizedData.recordedAt,
      },

      {
        type: HealthMetricType.SLEEP,
        value: normalizedData.sleepDuration ?? 0,
        unit: "minutes",
        source: normalizedData.provider,
        recordedAt: normalizedData.recordedAt,
      },
    ]);
  }
}
