import { api } from "../lib/api";

import { HealthMetric } from "../types/health.types";

export async function getHealthMetrics(): Promise<HealthMetric[]> {
  const response = await api.get("/health/metrics");

  return response.data;
}
