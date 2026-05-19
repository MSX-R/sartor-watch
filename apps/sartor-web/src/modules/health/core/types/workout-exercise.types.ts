export interface WorkoutExerciseRecord {
  name: string;

  duration?: number;

  distance?: number;

  calories?: number;

  notes?: string;

  sets?: WorkoutSetRecord[];
}

export interface WorkoutSetRecord {
  reps?: number;

  weight?: number;

  duration?: number;

  distance?: number;

  rest?: number;

  rir?: number;

  rpe?: number;

  completed?: boolean;
}
