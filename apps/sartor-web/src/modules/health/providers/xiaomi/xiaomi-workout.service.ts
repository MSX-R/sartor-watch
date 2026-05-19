import { WorkoutService } from "../../core/services/workout.service";

import { XiaomiWorkoutClient } from "./xiaomi-workout.client";
import { XiaomiWorkoutMapper } from "./xiaomi-workout.mapper";

export class XiaomiWorkoutService {
  private client = new XiaomiWorkoutClient();

  private workoutService = new WorkoutService();

  async syncWorkout(): Promise<void> {
    const workouts = await this.client.getWorkouts();

    for (const workout of workouts) {
      const normalizedWorkout = XiaomiWorkoutMapper.toWorkoutRecord(workout);

      await this.workoutService.ingestWorkout(normalizedWorkout);
    }
  }
}
