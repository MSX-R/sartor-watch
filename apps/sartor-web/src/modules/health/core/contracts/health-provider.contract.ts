import { HealthRecord } from "../types/health-metric.types";
import { WorkoutRecord } from "../types/workout.types";
import { ProviderConnection } from "../types/provider.types";

export interface HealthProviderContract {
  connect(): Promise<string>;

  exchangeCodeForToken(code: string): Promise<ProviderConnection>;

  getActivityData(connection: ProviderConnection): Promise<HealthRecord>;

  getWorkouts(connection: ProviderConnection): Promise<WorkoutRecord[]>;
}
