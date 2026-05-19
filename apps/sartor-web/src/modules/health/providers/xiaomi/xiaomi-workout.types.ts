export interface XiaomiWorkoutResponse {
  sport_type: string;

  title?: string;

  description?: string;

  duration_minutes: number;

  calories: number;

  distance_km: number;

  steps?: number;

  avg_heart_rate: number;

  max_heart_rate?: number;

  cadence?: number;

  elevation?: number;

  started_at: string;

  ended_at: string;

  exercises?: XiaomiWorkoutExercise[];
}

export interface XiaomiWorkoutExercise {
  name: string;

  duration_minutes?: number;

  calories?: number;

  notes?: string;

  sets?: XiaomiWorkoutSet[];
}

export interface XiaomiWorkoutSet {
  reps?: number;

  weight?: number;

  duration_seconds?: number;

  rest_seconds?: number;

  rir?: number;

  rpe?: number;

  completed?: boolean;
}
