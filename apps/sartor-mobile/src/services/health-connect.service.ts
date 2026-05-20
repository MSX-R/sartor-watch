import {
  connectHealthConnectPermissions,
  getHealthConnectAvailability,
  openHealthConnectSettings,
  syncHealthConnectToday,
} from "./health-connect";
import { ingestUnifiedMetrics, UnifiedRawMetric } from "./unified-ingest.service";

export type HealthConnectRawMetric = UnifiedRawMetric;

export {
  connectHealthConnectPermissions,
  getHealthConnectAvailability,
  openHealthConnectSettings,
};

export async function readHealthConnectMetrics(): Promise<HealthConnectRawMetric[]> {
  const { metrics, availability } = await syncHealthConnectToday();

  if (availability !== "available") {
    return [];
  }

  return metrics;
}

export async function ingestHealthConnectMetrics(
  metrics: HealthConnectRawMetric[],
): Promise<number> {
  if (metrics.length === 0) {
    return 0;
  }

  const result = await ingestUnifiedMetrics("health_connect", metrics);

  return result.upserted;
}
