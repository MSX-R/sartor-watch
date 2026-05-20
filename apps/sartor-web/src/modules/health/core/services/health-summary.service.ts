import { prisma } from "@/lib/prisma";
import { getParisDayBounds } from "@/lib/timezone/paris-day";

import { HealthMetricType } from "../enums/health-metric-type.enum";
import { DailyHealthSummary } from "../types/health-summary.types";
import { MetricSourcePickerService } from "./metric-source-picker.service";

const SUMMARY_TYPES = [
  HealthMetricType.STEPS,
  HealthMetricType.ACTIVE_CALORIES,
  HealthMetricType.CALORIES,
  HealthMetricType.SLEEP,
  HealthMetricType.RESTING_HEART_RATE,
  HealthMetricType.HEART_RATE,
  HealthMetricType.WEIGHT,
  HealthMetricType.BODY_FAT,
] as const;

export class HealthSummaryService {
  private picker = new MetricSourcePickerService();

  async getTodaySummary(userId: string): Promise<DailyHealthSummary> {
    const { start, end } = getParisDayBounds();

    const todayMetrics = await prisma.healthMetric.findMany({
      where: {
        userId,
        recordedAt: { gte: start, lte: end },
      },
      orderBy: { recordedAt: "desc" },
      select: { type: true, value: true, source: true, recordedAt: true },
    });

    let latest = this.picker.pickLatestByType(todayMetrics);

    const needsFallback = SUMMARY_TYPES.some((type) => latest.get(type) === undefined);

    if (needsFallback) {
      await this.fillFromLatest(userId, latest);
    }

    const pick = (type: HealthMetricType) => latest.get(type) ?? null;

    return {
      date: start.toISOString(),
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

  private async fillFromLatest(userId: string, target: Map<string, number>): Promise<void> {
    await Promise.all(
      SUMMARY_TYPES.map(async (type) => {
        if (target.has(type)) {
          return;
        }

        const rows = await prisma.healthMetric.findMany({
          where: { userId, type },
          orderBy: { recordedAt: "desc" },
          take: 20,
          select: { type: true, value: true, source: true, recordedAt: true },
        });

        const picked = this.picker.pickLatestByType(rows).get(type);

        if (picked !== undefined) {
          target.set(type, picked);
        }
      }),
    );
  }
}
