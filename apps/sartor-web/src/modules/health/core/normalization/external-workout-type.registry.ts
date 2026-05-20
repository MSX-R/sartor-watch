import { WorkoutType } from "../enums/workout-type.enum";

export function normalizeWorkoutAliasKey(raw: string): string {
  return raw
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s.\-/]+/g, "_")
    .toLowerCase();
}

const ALIAS_TO_WORKOUT: Record<string, WorkoutType> = {
  running: WorkoutType.RUNNING,
  run: WorkoutType.RUNNING,
  walking: WorkoutType.WALKING,
  walk: WorkoutType.WALKING,
  hiking: WorkoutType.HIKING,
  cycling: WorkoutType.CYCLING,
  bike: WorkoutType.CYCLING,
  biking: WorkoutType.CYCLING,
  swimming: WorkoutType.SWIMMING,
  swim: WorkoutType.SWIMMING,
  strength: WorkoutType.STRENGTH,
  strength_training: WorkoutType.STRENGTH,
  workout: WorkoutType.OTHER,
  other: WorkoutType.OTHER,
  exercise_session: WorkoutType.OTHER,
  // Strava
  ride: WorkoutType.CYCLING,
  virtualride: WorkoutType.CYCLING,
  // Garmin / HC exercise types (numériques → other si inconnu)
};

export function resolveCanonicalWorkoutType(externalType: string): WorkoutType {
  const key = normalizeWorkoutAliasKey(externalType);

  return ALIAS_TO_WORKOUT[key] ?? WorkoutType.OTHER;
}
