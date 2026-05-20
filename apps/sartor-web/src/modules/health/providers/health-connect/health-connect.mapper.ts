import { HealthProvider } from "../../core/enums/health-provider.enum";
import { UnifiedMetricNormalizer } from "../../core/normalization/unified-metric-normalizer.service";
import { IngestMetricItem } from "../../core/schemas/health-metric.schema";

/** Entrée brute envoyée par le mobile (Health Connect → API). */
export type HealthConnectMetricInput = {
  type: string;
  value: number;
  unit?: string;
  recordedAt: string | Date;
  deviceId?: string;
};

export class HealthConnectMapper {
  static toIngestMetrics(rows: HealthConnectMetricInput[]): IngestMetricItem[] {
    const { metrics } = new UnifiedMetricNormalizer().normalize(
      HealthProvider.HEALTH_CONNECT,
      rows,
    );

    return metrics;
  }
}
