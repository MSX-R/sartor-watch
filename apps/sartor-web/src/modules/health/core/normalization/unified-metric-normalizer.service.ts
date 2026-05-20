import { HealthProvider } from "../enums/health-provider.enum";
import { IngestMetricItem } from "../schemas/health-metric.schema";

import { resolveCanonicalMetricType } from "./external-metric-type.registry";
import { convertToCanonicalValue } from "./metric-value.converter";

export type RawExternalMetric = {
  type: string;
  value: number;
  unit?: string;
  recordedAt: Date | string;
  deviceId?: string;
};

export type NormalizeMetricsResult = {
  metrics: IngestMetricItem[];
  skipped: number;
  unknownTypes: string[];
};

export class UnifiedMetricNormalizer {
  /**
   * Point d'entrée unique : tout format vendeur → métriques Sartor homogènes.
   */
  normalize(source: HealthProvider, rows: RawExternalMetric[]): NormalizeMetricsResult {
    const metrics: IngestMetricItem[] = [];
    const unknownTypes = new Set<string>();
    let skipped = 0;

    for (const row of rows) {
      const canonicalType = resolveCanonicalMetricType(row.type);

      if (!canonicalType) {
        unknownTypes.add(row.type);
        skipped += 1;
        continue;
      }

      if (!Number.isFinite(row.value)) {
        skipped += 1;
        continue;
      }

      const value = convertToCanonicalValue(canonicalType, row.value, row.unit);

      if (!Number.isFinite(value)) {
        skipped += 1;
        continue;
      }

      metrics.push({
        type: canonicalType,
        value,
        source,
        recordedAt: row.recordedAt instanceof Date ? row.recordedAt : new Date(row.recordedAt),
        deviceId: row.deviceId,
      });
    }

    return {
      metrics,
      skipped,
      unknownTypes: [...unknownTypes],
    };
  }
}
