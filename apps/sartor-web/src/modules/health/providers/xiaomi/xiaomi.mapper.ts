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
    
      weight: data.weight,
    
      bodyFat: data.body_fat,
    
      recordedAt: new Date(data.timestamp),

      activeCalories: data.active_calories,

restingHeartRate: data.resting_heart_rate,

vo2Max: data.vo2_max,

water: data.water,

protein: data.protein,

carbs: data.carbs,

fat: data.fat,

bmi: data.bmi,

muscleMass: data.muscle_mass,
    };
  }
}
