import { HealthProvider } from "../enums/health-provider.enum";
import { WorkoutType } from "../enums/workout-type.enum";
import { WorkoutRecord } from "../types/workout.types";

import { resolveCanonicalWorkoutType } from "./external-workout-type.registry";

export type RawExternalWorkout = {
  type: string;
  title?: string;
  startedAt: Date | string;
  endedAt: Date | string;
  durationSeconds?: number;
  calories?: number;
  distanceMeters?: number;
  averageHeartRate?: number;
  deviceId?: string;
};

export class UnifiedWorkoutNormalizer {
  normalize(source: HealthProvider, rows: RawExternalWorkout[]): WorkoutRecord[] {
    const workouts: WorkoutRecord[] = [];

    for (const row of rows) {
      const startedAt = row.startedAt instanceof Date ? row.startedAt : new Date(row.startedAt);
      const endedAt = row.endedAt instanceof Date ? row.endedAt : new Date(row.endedAt);

      const duration =
        row.durationSeconds ??
        Math.max(0, Math.round((endedAt.getTime() - startedAt.getTime()) / 1000));

      if (!Number.isFinite(duration) || duration <= 0) {
        continue;
      }

      workouts.push({
        type: resolveCanonicalWorkoutType(row.type),
        source,
        title: row.title,
        startedAt,
        endedAt,
        duration,
        calories: row.calories,
        distance: row.distanceMeters ? row.distanceMeters / 1000 : undefined,
        averageHeartRate: row.averageHeartRate,
        deviceId: row.deviceId,
      });
    }

    return workouts;
  }
}
