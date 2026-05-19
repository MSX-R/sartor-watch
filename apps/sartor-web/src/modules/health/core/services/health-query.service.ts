import { prisma } from "@/lib/prisma";

import { HealthMetricType } from "../enums/health-metric-type.enum";

export class HealthQueryService {
  async getLatestMetrics(userId: string) {
    return prisma.healthMetric.findMany({
      where: {
        userId,
      },

      orderBy: {
        recordedAt: "desc",
      },

      take: 20,
    });
  }

  async getMetricsByType(userId: string, type: HealthMetricType) {
    return prisma.healthMetric.findMany({
      where: {
        userId,

        type,
      },

      orderBy: {
        recordedAt: "desc",
      },
    });
  }

  async getLatestMetricByType(userId: string, type: HealthMetricType) {
    return prisma.healthMetric.findFirst({
      where: {
        userId,

        type,
      },

      orderBy: {
        recordedAt: "desc",
      },
    });
  }
}
