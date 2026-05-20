import { prisma } from "@/lib/prisma";

import { HealthMetricType } from "../enums/health-metric-type.enum";
import { DailyHealthSummary } from "../types/health-summary.types";

function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export class HealthSummaryService {
  async getTodaySummary(userId: string): Promise<DailyHealthSummary> {
    const dayStart = startOfUtcDay(new Date());
    const dayEnd = new Date(dayStart);
    dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);

    const metrics = await prisma.healthMetric.findMany({
      where: {
        userId,
        recordedAt: { gte: dayStart, lt: dayEnd },
      },
      orderBy: { recordedAt: "desc" },
      select: { type: true, value: true },
    });

    const latest = new Map<string, number>();

    for (const metric of metrics) {
      if (!latest.has(metric.type)) {
        latest.set(metric.type, metric.value);
      }
    }

    const pick = (type: HealthMetricType) => latest.get(type) ?? null;

    return {
      date: dayStart.toISOString(),
      steps: pick(HealthMetricType.STEPS),
      activeCalories: pick(HealthMetricType.ACTIVE_CALORIES),
      calories: pick(HealthMetricType.CALORIES),
      sleepMinutes: pick(HealthMetricType.SLEEP),
      restingHeartRate: pick(HealthMetricType.RESTING_HEART_RATE),
      heartRate: pick(HealthMetricType.HEART_RATE),
      weight: pick(HealthMetricType.WEIGHT),
      bodyFat: pick(HealthMetricType.BODY_FAT),
    };
  }
}
