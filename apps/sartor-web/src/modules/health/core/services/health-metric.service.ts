import { prisma } from "@/lib/prisma";

import { HEALTH_METRIC_CONFIG } from "../config/health-metric.config";
import { HealthMetricType } from "../enums/health-metric-type.enum";
import { NormalizedMetricInput } from "./health-record-normalizer.service";

interface CreateMetricInput {
  type: HealthMetricType;
  value: number;
  source: string;
  recordedAt: Date;
  userId: string;
  deviceId?: string;
}

export class HealthMetricService {
  async upsertMetrics(metrics: NormalizedMetricInput[] | CreateMetricInput[]): Promise<number> {
    let count = 0;

    for (const metric of metrics) {
      const unit = HEALTH_METRIC_CONFIG[metric.type].unit;

      await prisma.healthMetric.upsert({
        where: {
          health_metric_dedup: {
            userId: metric.userId,
            type: metric.type,
            source: metric.source,
            recordedAt: metric.recordedAt,
          },
        },
        create: {
          type: metric.type,
          value: metric.value,
          unit,
          source: metric.source,
          recordedAt: metric.recordedAt,
          userId: metric.userId,
          deviceId: metric.deviceId,
        },
        update: {
          value: metric.value,
          unit,
          deviceId: metric.deviceId,
        },
      });

      count += 1;
    }

    return count;
  }

  /** @deprecated Préférer upsertMetrics — conservé pour compatibilité temporaire */
  async createMetrics(metrics: CreateMetricInput[]): Promise<void> {
    await this.upsertMetrics(metrics);
  }
}
