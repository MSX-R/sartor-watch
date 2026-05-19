import { WorkoutType } from "../enums/workout-type.enum";
import { HealthProvider } from "../enums/health-provider.enum";

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

export interface WorkoutExerciseRecord {
  name: string;

  duration?: number;

  distance?: number;

  calories?: number;

  notes?: string;

  sets?: WorkoutSetRecord[];
}

export interface WorkoutRecord {
  type: WorkoutType;

  source: HealthProvider;

  title?: string;

  description?: string;

  deviceId?: string;

  startedAt: Date;

  endedAt: Date;

  duration: number;

  calories?: number;

  activeCalories?: number;

  distance?: number;

  steps?: number;

  elevation?: number;

  averageSpeed?: number;

  maxSpeed?: number;

  averagePace?: number;

  averageHeartRate?: number;

  maxHeartRate?: number;

  cadence?: number;

  power?: number;

  vo2Max?: number;

  trainingLoad?: number;

  recoveryTime?: number;

  perceivedEffort?: number;

  notes?: string;

  exercises?: WorkoutExerciseRecord[];
}
