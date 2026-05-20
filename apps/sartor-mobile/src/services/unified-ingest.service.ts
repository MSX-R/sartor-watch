import { api } from "../lib/api";

export type UnifiedRawMetric = {
  type: string;
  value: number;
  unit?: string;
  recordedAt: string;
  deviceId?: string;
};

export async function ingestUnifiedMetrics(
  source: string,
  metrics: UnifiedRawMetric[],
): Promise<{ upserted: number; skipped?: number }> {
  const { data } = await api.post("/health/ingest/unified", { source, metrics });

  return {
    upserted: data.upserted ?? 0,
    skipped: data.skipped,
  };
}
