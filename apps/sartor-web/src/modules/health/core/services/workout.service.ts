import { prisma } from "@/lib/prisma";

import { WorkoutRecord } from "../types/workout.types";

export class WorkoutService {
  async listForUser(userId: string, limit = 30) {
    return prisma.workout.findMany({
      where: { userId },
      orderBy: { startedAt: "desc" },
      take: limit,
      select: {
        id: true,
        type: true,
        source: true,
        title: true,
        startedAt: true,
        endedAt: true,
        duration: true,
        calories: true,
        distance: true,
        averageHeartRate: true,
      },
    });
  }

  async ingestWorkout(workout: WorkoutRecord, userId: string): Promise<void> {
    const existing = await prisma.workout.findFirst({
      where: {
        userId,
        source: workout.source,
        startedAt: workout.startedAt,
      },
      select: { id: true },
    });

    const scalar = {
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
    };

    if (existing) {
      await prisma.workout.update({
        where: { id: existing.id },
        data: scalar,
      });

      return;
    }

    await prisma.workout.create({
      data: {
        ...scalar,
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
