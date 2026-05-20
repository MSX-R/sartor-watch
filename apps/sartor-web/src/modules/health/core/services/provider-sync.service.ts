import { prisma } from "@/lib/prisma";

import { HealthProvider } from "../enums/health-provider.enum";
import { HealthMetricService } from "./health-metric.service";
import { HealthRecordNormalizer } from "./health-record-normalizer.service";
import { WorkoutService } from "./workout.service";
import { ProviderFactory } from "../factories/provider.factory";

export class ProviderSyncService {
  private healthMetricService = new HealthMetricService();

  private workoutService = new WorkoutService();

  async syncProvider(userId: string, provider: HealthProvider): Promise<{ metricsUpserted: number }> {
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
        return this.syncXiaomi(userId, connectedProvider);

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
  ): Promise<{ metricsUpserted: number }> {
    const provider = ProviderFactory.create(HealthProvider.XIAOMI);

    const connection = {
      accessToken: connectedProvider.accessToken ?? "",
      refreshToken: connectedProvider.refreshToken ?? "",
      expiresAt: connectedProvider.expiresAt ?? new Date(),
    };

    const activity = await provider.getActivityData(connection);
    const metrics = HealthRecordNormalizer.toMetrics(activity, userId);
    const metricsUpserted = await this.healthMetricService.upsertMetrics(metrics);

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

    return { metricsUpserted };
  }
}
