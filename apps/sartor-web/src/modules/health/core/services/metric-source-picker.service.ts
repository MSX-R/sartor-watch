import { sourcePriorityIndex } from "../config/source-priority.config";

type MetricRow = {
  type: string;
  value: number;
  source: string;
  recordedAt: Date;
};

/**
 * Choisit la meilleure valeur par type quand plusieurs sources ont des données le même jour.
 */
export class MetricSourcePickerService {
  pickLatestByType(metrics: MetricRow[]): Map<string, number> {
    const best = new Map<string, MetricRow>();

    for (const metric of metrics) {
      const current = best.get(metric.type);

      if (!current) {
        best.set(metric.type, metric);
        continue;
      }

      const betterSource =
        sourcePriorityIndex(metric.source) < sourcePriorityIndex(current.source);

      const sameSourceNewer =
        metric.source === current.source && metric.recordedAt > current.recordedAt;

      if (betterSource || sameSourceNewer) {
        best.set(metric.type, metric);
      }
    }

    return new Map([...best.entries()].map(([type, row]) => [type, row.value]));
  }
}
