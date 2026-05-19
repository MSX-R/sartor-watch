import { prisma } from "@/lib/prisma";

import { HealthProvider } from "../enums/health-provider.enum";

import { HealthMetricType } from "../enums/health-metric-type.enum";

import { HealthMetricService } from "./health-metric.service";

import { WorkoutService } from "./workout.service";

import { ProviderFactory } from "../factories/provider.factory";

export class ProviderSyncService {
  private healthMetricService = new HealthMetricService();

  private workoutService = new WorkoutService();

  async syncProvider(userId: string, provider: HealthProvider): Promise<void> {
    const connectedProvider = await prisma.connectedProvider.findFirst({
      where: {
        userId,

        provider,
      },
    });

    if (!connectedProvider) {
      throw new Error("Provider not connected");
    }

    switch (provider) {
      case HealthProvider.XIAOMI:
        await this.syncXiaomi(userId, connectedProvider);

        break;

      default:
        throw new Error("Provider not supported");
    }
  }

  private async syncXiaomi(
    userId: string,

    connectedProvider: {
      accessToken: string | null;

      refreshToken: string | null;

      expiresAt: Date | null;
    },
  ): Promise<void> {
    const provider = ProviderFactory.create(HealthProvider.XIAOMI);

    const connection = {
      accessToken: connectedProvider.accessToken ?? "",

      refreshToken: connectedProvider.refreshToken ?? "",

      expiresAt: connectedProvider.expiresAt ?? new Date(),
    };

    const activity = await provider.getActivityData(connection);

    await this.healthMetricService.createMetrics([
      {
        type: HealthMetricType.STEPS,

        value: activity.steps ?? 0,

        source: activity.provider,

        recordedAt: activity.recordedAt,

        userId,
      },

      {
        type: HealthMetricType.CALORIES,

        value: activity.calories ?? 0,

        source: activity.provider,

        recordedAt: activity.recordedAt,

        userId,
      },

      {
        type: HealthMetricType.HEART_RATE,

        value: activity.heartRate ?? 0,

        source: activity.provider,

        recordedAt: activity.recordedAt,

        userId,
      },
    ]);

    const workouts = await provider.getWorkouts(connection);

    for (const workout of workouts) {
      await this.workoutService.ingestWorkout(workout, userId);
    }

    await prisma.connectedProvider.update({
      where: {
        userId_provider: {
          userId,

          provider: HealthProvider.XIAOMI,
        },
      },

      data: {
        lastSyncAt: new Date(),
      },
    });
  }
}
