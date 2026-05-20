import { api } from "../lib/api";

export type DailyMetricPoint = {
  date: string;
  value: number | null;
};

export async function getMetricHistory(
  type: string,
  days = 7,
): Promise<DailyMetricPoint[]> {
  const { data } = await api.get("/health/history", { params: { type, days } });

  return data.history ?? [];
}
