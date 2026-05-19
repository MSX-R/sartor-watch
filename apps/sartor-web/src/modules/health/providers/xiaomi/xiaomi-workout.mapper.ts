import { HealthProvider } from "../../core/enums/health-provider.enum";
import { WorkoutType } from "../../core/enums/workout-type.enum";
import { WorkoutRecord } from "../../core/types/workout.types";

import { XiaomiWorkoutResponse } from "./xiaomi-workout.types";

export class XiaomiWorkoutMapper {
  static toWorkoutRecord(data: XiaomiWorkoutResponse): WorkoutRecord {
    return {
      type: this.mapWorkoutType(data.sport_type),

      title: data.title,

      description: data.description,

      source: HealthProvider.XIAOMI,

      startedAt: new Date(data.started_at),

      endedAt: new Date(data.ended_at),

      duration: data.duration_minutes,

      calories: data.calories,

      distance: data.distance_km,

      steps: data.steps,

      elevation: data.elevation,

      averageHeartRate: data.avg_heart_rate,

      maxHeartRate: data.max_heart_rate,

      cadence: data.cadence,

      exercises: data.exercises?.map((exercise) => ({
        name: exercise.name,

        duration: exercise.duration_minutes,

        calories: exercise.calories,

        notes: exercise.notes,

        sets: exercise.sets?.map((set) => ({
          reps: set.reps,

          weight: set.weight,

          duration: set.duration_seconds,

          rest: set.rest_seconds,

          rir: set.rir,

          rpe: set.rpe,

          completed: set.completed,
        })),
      })),
    };
  }

  private static mapWorkoutType(sportType: string): WorkoutType {
    switch (sportType) {
      case "outdoor_run":
        return WorkoutType.RUNNING;

      case "walking":
        return WorkoutType.WALKING;

      case "traditional_strength_training":
        return WorkoutType.STRENGTH;

      default:
        return WorkoutType.OTHER;
    }
  }
}
