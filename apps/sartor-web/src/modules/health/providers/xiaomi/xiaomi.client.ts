import { XiaomiActivityResponse } from "./xiaomi.types";

export class XiaomiClient {
  async getActivityData(): Promise<XiaomiActivityResponse> {
    return {
      steps: 12450,
    
      calories: 540,
    
      active_calories: 430,
    
      distance: 8.2,
    
      heart_rate: 72,
    
      resting_heart_rate: 58,
    
      vo2_max: 49,
    
      sleep_minutes: 410,
    
      weight: 78.4,
    
      body_fat: 14.2,
    
      muscle_mass: 61.5,
    
      water: 3200,
    
      protein: 180,
    
      carbs: 240,
    
      fat: 70,
    
      bmi: 23.5,
    
      timestamp: new Date().toISOString(),
    };
  }
}
