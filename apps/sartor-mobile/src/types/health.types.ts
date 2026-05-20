export type HealthMetric = {
  id: string;

  type: string;

  value: number;

  unit: string | null;

  source: string;

  recordedAt: string;
};
