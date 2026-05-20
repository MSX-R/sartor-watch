import { WorkoutService } from "../../core/services/workout.service";

import { XiaomiWorkoutClient } from "./xiaomi-workout.client";
import { XiaomiWorkoutMapper } from "./xiaomi-workout.mapper";

import { ProviderService } from "../../core/services/provider.service";

export class XiaomiWorkoutService {
  private client = new XiaomiWorkoutClient();

  private providerService = new ProviderService();
  private workoutService = new WorkoutService();

  async syncWorkout(userId: string): Promise<void> {
    const workouts = await this.client.getWorkouts();

    for (const workout of workouts) {
      const normalizedWorkout = XiaomiWorkoutMapper.toWorkoutRecord(workout);

      await this.providerService.connectProvider(
        userId,
        normalizedWorkout.source,
      );
      
      await this.workoutService.ingestWorkout(normalizedWorkout, userId);
    }
  }
}