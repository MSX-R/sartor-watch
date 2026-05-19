import { XiaomiWorkoutResponse } from "./xiaomi-workout.types";

export class XiaomiWorkoutClient {
  async getWorkouts(): Promise<XiaomiWorkoutResponse[]> {
    return [
      {
        sport_type: "traditional_strength_training",

        title: "Push Session",

        description: "Chest / Shoulders / Triceps",

        duration_minutes: 75,

        calories: 640,

        distance_km: 0,

        steps: 3200,

        avg_heart_rate: 128,

        max_heart_rate: 168,

        started_at: new Date().toISOString(),

        ended_at: new Date().toISOString(),

        exercises: [
          {
            name: "Bench Press",

            sets: [
              {
                reps: 10,

                weight: 80,

                rest_seconds: 90,

                rir: 2,

                rpe: 8,

                completed: true,
              },

              {
                reps: 8,

                weight: 85,

                rest_seconds: 120,

                rir: 1,

                rpe: 9,

                completed: true,
              },
            ],
          },

          {
            name: "Incline Dumbbell Press",

            sets: [
              {
                reps: 12,

                weight: 32,

                rest_seconds: 90,

                completed: true,
              },

              {
                reps: 10,

                weight: 34,

                rest_seconds: 90,

                completed: true,
              },
            ],
          },

          {
            name: "Machine Chest Press",

            sets: [
              {
                reps: 15,

                weight: 70,

                rest_seconds: 60,

                completed: true,
              },

              {
                reps: 12,

                weight: 75,

                rest_seconds: 60,

                completed: true,
              },
            ],
          },

          {
            name: "Lateral Raises",

            sets: [
              {
                reps: 20,

                weight: 10,

                rest_seconds: 45,

                completed: true,
              },

              {
                reps: 18,

                weight: 10,

                rest_seconds: 45,

                completed: true,
              },

              {
                reps: 15,

                weight: 12,

                rest_seconds: 60,

                completed: true,
              },
            ],
          },

          {
            name: "Triceps Pushdown",

            sets: [
              {
                reps: 15,

                weight: 35,

                rest_seconds: 60,

                completed: true,
              },

              {
                reps: 12,

                weight: 40,

                rest_seconds: 60,

                completed: true,
              },

              {
                reps: 10,

                weight: 45,

                rest_seconds: 75,

                completed: true,
              },
            ],
          },
        ],
      },

      {
        sport_type: "running",

        title: "Morning Run",

        description: "Zone 2 cardio",

        duration_minutes: 42,

        calories: 380,

        distance_km: 7.4,

        steps: 8200,

        avg_heart_rate: 142,

        max_heart_rate: 168,

        started_at: new Date().toISOString(),

        ended_at: new Date().toISOString(),

        exercises: [],
      },
    ];
  }
}
