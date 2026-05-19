import { HealthRecord } from "../../core/types/health-metric.types";
import { HealthProvider } from "../../core/enums/health-provider.enum";

import { XiaomiActivityResponse } from "./xiaomi.types";

export class XiaomiMapper {
  static toHealthRecord(data: XiaomiActivityResponse): HealthRecord {
    return {
      provider: HealthProvider.XIAOMI,

      steps: data.steps,

      calories: data.calories,

      distance: data.distance,

      heartRate: data.heart_rate,

      sleepDuration: data.sleep_minutes,

      recordedAt: new Date(data.timestamp),
    };
  }
}
