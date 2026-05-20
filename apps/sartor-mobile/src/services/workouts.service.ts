import { api } from "../lib/api";

export type WorkoutListItem = {
  id: string;
  type: string;
  source: string;
  title: string | null;
  startedAt: string;
  endedAt: string;
  duration: number;
  calories: number | null;
  distance: number | null;
  averageHeartRate: number | null;
};

export async function getWorkouts(limit = 30): Promise<WorkoutListItem[]> {
  const { data } = await api.get("/workouts", { params: { limit } });

  return data.workouts ?? [];
}
