import { HealthProviderContract } from "../../core/contracts/health-provider.contract";

import { HealthProvider } from "../../core/enums/health-provider.enum";

import { HealthRecord } from "../../core/types/health-metric.types";

import { ProviderConnection } from "../../core/types/provider.types";

import { WorkoutRecord } from "../../core/types/workout.types";

export class XiaomiProvider implements HealthProviderContract {
  async connect(): Promise<string> {
    return "https://account.xiaomi.com";
  }

  async exchangeCodeForToken(code: string): Promise<ProviderConnection> {
    code;

    return {
      accessToken: "mock_access_token",

      refreshToken: "mock_refresh_token",

      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    };
  }

  async getActivityData(): Promise<HealthRecord> {
    return {
      provider: HealthProvider.XIAOMI,

      steps: 12000,

      calories: 540,

      activeCalories: 430,

      heartRate: 72,

      restingHeartRate: 58,

      vo2Max: 49,

      sleepDuration: 410,

      weight: 78.4,

      bodyFat: 14.2,

      muscleMass: 61.5,

      water: 3200,

      protein: 180,

      carbs: 240,

      fat: 70,

      bmi: 23.5,

      recordedAt: new Date(),
    };
  }

  async getWorkouts(): Promise<WorkoutRecord[]> {
    return [];
  }
}
