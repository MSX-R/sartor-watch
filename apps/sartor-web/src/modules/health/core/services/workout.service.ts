import { prisma } from "@/lib/prisma";

import { WorkoutRecord } from "../types/workout.types";

export class WorkoutService {
  async ingestWorkout(
    workout: WorkoutRecord,

    userId?: string,
  ): Promise<void> {
    await prisma.workout.create({
      data: {
        type: workout.type,

        source: workout.source,
        userId,

        title: workout.title,

        description: workout.description,

        deviceId: workout.deviceId,

        startedAt: workout.startedAt,

        endedAt: workout.endedAt,

        duration: workout.duration,

        calories: workout.calories,

        activeCalories: workout.activeCalories,

        distance: workout.distance,

        steps: workout.steps,

        elevation: workout.elevation,

        averageSpeed: workout.averageSpeed,

        maxSpeed: workout.maxSpeed,

        averagePace: workout.averagePace,

        averageHeartRate: workout.averageHeartRate,

        maxHeartRate: workout.maxHeartRate,

        cadence: workout.cadence,

        power: workout.power,

        vo2Max: workout.vo2Max,

        trainingLoad: workout.trainingLoad,

        recoveryTime: workout.recoveryTime,

        perceivedEffort: workout.perceivedEffort,

        notes: workout.notes,

        exercises: {
          create:
            workout.exercises?.map((exercise) => ({
              name: exercise.name,

              duration: exercise.duration,

              distance: exercise.distance,

              calories: exercise.calories,

              notes: exercise.notes,

              sets: {
                create:
                  exercise.sets?.map((set) => ({
                    reps: set.reps,

                    weight: set.weight,

                    duration: set.duration,

                    distance: set.distance,

                    rest: set.rest,

                    rir: set.rir,

                    rpe: set.rpe,

                    completed: set.completed,
                  })) ?? [],
              },
            })) ?? [],
        },
      },
    });
  }
}
