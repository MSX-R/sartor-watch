export type DailyHealthSummary = {
  date: string;
  steps: number | null;
  activeCalories: number | null;
  calories: number | null;
  sleepMinutes: number | null;
  restingHeartRate: number | null;
  heartRate: number | null;
  weight: number | null;
  bodyFat: number | null;
};
