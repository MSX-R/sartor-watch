import { api } from "../lib/api";

export async function syncXiaomiProvider(): Promise<number> {
  const { data } = await api.post("/health/sync", { provider: "xiaomi" });

  return data.metricsUpserted ?? 0;
}
