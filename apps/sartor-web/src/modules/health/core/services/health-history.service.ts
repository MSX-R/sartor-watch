import { subDays } from "date-fns";

import { prisma } from "@/lib/prisma";
import { getParisDayBounds } from "@/lib/timezone/paris-day";

import { HealthMetricType } from "../enums/health-metric-type.enum";
import { MetricSourcePickerService } from "./metric-source-picker.service";

export type DailyMetricPoint = {
  date: string;
  value: number | null;
};

export class HealthHistoryService {
  private picker = new MetricSourcePickerService();

  async getDailyHistory(
    userId: string,
    type: HealthMetricType,
    days = 7,
  ): Promise<DailyMetricPoint[]> {
    const points: DailyMetricPoint[] = [];

    for (let offset = days - 1; offset >= 0; offset -= 1) {
      const reference = subDays(new Date(), offset);
      const { start, end } = getParisDayBounds(reference);

      const metrics = await prisma.healthMetric.findMany({
        where: {
          userId,
          type,
          recordedAt: { gte: start, lte: end },
        },
        select: { type: true, value: true, source: true, recordedAt: true },
      });

      const value = this.picker.pickLatestByType(metrics).get(type) ?? null;

      points.push({
        date: start.toISOString().slice(0, 10),
        value,
      });
    }

    return points;
  }
}
