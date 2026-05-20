import { HealthProvider } from "../../core/enums/health-provider.enum";
import {
  RawExternalMetric,
  UnifiedMetricNormalizer,
} from "../../core/normalization/unified-metric-normalizer.service";
import { IngestMetricItem } from "../../core/schemas/health-metric.schema";

export class AppleHealthMapper {
  static toIngestMetrics(rows: RawExternalMetric[]): IngestMetricItem[] {
    return new UnifiedMetricNormalizer().normalize(HealthProvider.APPLE, rows).metrics;
  }
}
