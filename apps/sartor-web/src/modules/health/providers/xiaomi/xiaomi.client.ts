import { XiaomiActivityResponse } from "./xiaomi.types";

export class XiaomiClient {
  async getActivityData(): Promise<XiaomiActivityResponse> {
    return {
      steps: 12450,

      calories: 540,

      distance: 8.2,

      heart_rate: 72,

      sleep_minutes: 410,

      timestamp: new Date().toISOString(),
    };
  }
}
