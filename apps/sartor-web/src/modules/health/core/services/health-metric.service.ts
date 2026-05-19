import { prisma } from "@/lib/prisma";

import { HEALTH_METRIC_CONFIG } from "../config/health-metric.config";
import { HealthMetricType } from "../enums/health-metric-type.enum";

interface CreateMetricInput {
  type: HealthMetricType;

  value: number;

  source?: string;

  recordedAt: Date;
}

export class HealthMetricService {
  async createMetrics(metrics: CreateMetricInput[]): Promise<void> {
    await prisma.healthMetric.createMany({
      data: metrics.map((metric) => ({
        type: metric.type,

        value: metric.value,

        unit: HEALTH_METRIC_CONFIG[metric.type].unit,

        source: metric.source,

        recordedAt: metric.recordedAt,
      })),
    });
  }
}
