export interface HealthRecord {
  provider: string;

  steps?: number;

  calories?: number;

  distance?: number;

  heartRate?: number;

  sleepDuration?: number;

  weight?: number;

  bodyFat?: number;

  recordedAt: Date;
}

export interface HealthMetricInput {
  type: string;

  value: number;

  unit?: string;

  source?: string;

  deviceId?: string;

  recordedAt: Date;
}
