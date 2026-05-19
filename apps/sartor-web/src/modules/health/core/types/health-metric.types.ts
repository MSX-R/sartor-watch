import { HealthProvider } from "../enums/health-provider.enum";

export interface HealthRecord {
  provider: HealthProvider;
  steps?: number;

  calories?: number;

  distance?: number;

  heartRate?: number;

  sleepDuration?: number;

  weight?: number;

  bodyFat?: number;

  recordedAt: Date;

  activeCalories?: number;

  restingHeartRate?: number;

  vo2Max?: number;

  water?: number;

  protein?: number;

  carbs?: number;

  fat?: number;

  bmi?: number;

  muscleMass?: number;
}

export interface HealthMetricInput {
  type: string;

  value: number;

  unit?: string;

  source?: string;

  deviceId?: string;

  recordedAt: Date;
}
