import { getParisDayBounds } from "../../lib/paris-day";
import type { UnifiedRawMetric } from "../unified-ingest.service";
import { loadHealthConnectModule } from "./platform";

function timeRange(start: Date, end: Date) {
  return {
    operator: "between" as const,
    startTime: start.toISOString(),
    endTime: end.toISOString(),
  };
}

function pushMetric(
  target: UnifiedRawMetric[],
  type: string,
  value: number,
  recordedAt: Date,
  unit?: string,
  deviceId?: string,
): void {
  if (!Number.isFinite(value) || value <= 0) {
    return;
  }

  target.push({
    type,
    value,
    unit,
    recordedAt: recordedAt.toISOString(),
    deviceId,
  });
}

function sleepMsToMinutes(ms: number): number {
  return Math.round(ms / 60_000);
}

export async function readTodayHealthConnectMetrics(): Promise<UnifiedRawMetric[]> {
  const hc = await loadHealthConnectModule();

  if (!hc) {
    return [];
  }

  const { start, end } = getParisDayBounds();
  const range = timeRange(start, end);
  const recordedAt = end;
  const metrics: UnifiedRawMetric[] = [];

  const [steps, activeCal, totalCal, distance, heartRate, restingHr, sleep, weight, bodyFat, vo2] =
    await Promise.all([
      hc.aggregateRecord({ recordType: "Steps", timeRangeFilter: range }).catch(() => null),
      hc
        .aggregateRecord({ recordType: "ActiveCaloriesBurned", timeRangeFilter: range })
        .catch(() => null),
      hc
        .aggregateRecord({ recordType: "TotalCaloriesBurned", timeRangeFilter: range })
        .catch(() => null),
      hc.aggregateRecord({ recordType: "Distance", timeRangeFilter: range }).catch(() => null),
      hc.aggregateRecord({ recordType: "HeartRate", timeRangeFilter: range }).catch(() => null),
      hc
        .aggregateRecord({ recordType: "RestingHeartRate", timeRangeFilter: range })
        .catch(() => null),
      hc.aggregateRecord({ recordType: "SleepSession", timeRangeFilter: range }).catch(() => null),
      hc.readRecords("Weight", { timeRangeFilter: range, ascendingOrder: false, pageSize: 1 }).catch(
        () => null,
      ),
      hc.readRecords("BodyFat", { timeRangeFilter: range, ascendingOrder: false, pageSize: 1 }).catch(
        () => null,
      ),
      hc.readRecords("Vo2Max", { timeRangeFilter: range, ascendingOrder: false, pageSize: 1 }).catch(
        () => null,
      ),
    ]);

  if (steps && "COUNT_TOTAL" in steps && steps.COUNT_TOTAL > 0) {
    pushMetric(metrics, "Steps", steps.COUNT_TOTAL, recordedAt);
  }

  if (activeCal && "ACTIVE_CALORIES_TOTAL" in activeCal) {
    pushMetric(
      metrics,
      "ActiveCaloriesBurned",
      activeCal.ACTIVE_CALORIES_TOTAL.inKilocalories,
      recordedAt,
      "kilocalories",
    );
  }

  if (totalCal && "ENERGY_TOTAL" in totalCal) {
    pushMetric(
      metrics,
      "TotalCaloriesBurned",
      totalCal.ENERGY_TOTAL.inKilocalories,
      recordedAt,
      "kilocalories",
    );
  }

  if (distance && "DISTANCE" in distance && distance.DISTANCE.inMeters > 0) {
    pushMetric(metrics, "Distance", distance.DISTANCE.inMeters, recordedAt, "meters");
  }

  if (heartRate && "BPM_AVG" in heartRate && heartRate.BPM_AVG > 0) {
    pushMetric(metrics, "HeartRate", heartRate.BPM_AVG, recordedAt);
  }

  if (restingHr && "BPM_AVG" in restingHr && restingHr.BPM_AVG > 0) {
    pushMetric(metrics, "RestingHeartRate", restingHr.BPM_AVG, recordedAt);
  }

  if (sleep && "SLEEP_DURATION_TOTAL" in sleep && sleep.SLEEP_DURATION_TOTAL > 0) {
    pushMetric(
      metrics,
      "SleepSession",
      sleepMsToMinutes(sleep.SLEEP_DURATION_TOTAL),
      recordedAt,
      "minutes",
    );
  }

  const latestWeight = weight?.records?.[0];

  if (latestWeight && "weight" in latestWeight) {
    const mass = latestWeight.weight as { inKilograms?: number; value?: number; unit?: string };
    const kg = mass.inKilograms ?? mass.value ?? 0;

    pushMetric(
      metrics,
      "Weight",
      kg,
      new Date(latestWeight.time ?? recordedAt),
      "kilograms",
    );
  }

  const latestFat = bodyFat?.records?.[0];

  if (latestFat && "percentage" in latestFat) {
    pushMetric(
      metrics,
      "BodyFat",
      latestFat.percentage,
      new Date(latestFat.time ?? recordedAt),
      "percent",
    );
  }

  const latestVo2 = vo2?.records?.[0];

  if (latestVo2 && "vo2MillilitersPerMinuteKilogram" in latestVo2) {
    pushMetric(
      metrics,
      "Vo2Max",
      latestVo2.vo2MillilitersPerMinuteKilogram,
      new Date(latestVo2.time ?? recordedAt),
    );
  }

  return metrics;
}
