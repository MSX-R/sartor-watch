import { api } from "../lib/api";
import { DailyHealthSummary } from "../types/health-summary.types";

export async function getTodaySummary(): Promise<DailyHealthSummary> {
  const { data } = await api.get<DailyHealthSummary>("/health/summary/today");

  return data;
}
