import { prisma } from "@/lib/prisma";

import { HealthMetricType } from "../enums/health-metric-type.enum";

interface CreateMetricInput {
  type: HealthMetricType;

  value: number;

  unit?: string;

  source?: string;

  recordedAt: Date;
}

export class HealthMetricService {
  async createMetrics(metrics: CreateMetricInput[]): Promise<void> {
    await prisma.healthMetric.createMany({
      data: metrics,
    });
  }
}
