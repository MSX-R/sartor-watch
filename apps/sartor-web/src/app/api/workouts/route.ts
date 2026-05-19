import { NextResponse } from "next/server";

import { XiaomiWorkoutService } from "@/modules/health/providers/xiaomi/xiaomi-workout.service";

export async function POST() {
  const workoutService = new XiaomiWorkoutService();

  await workoutService.syncWorkout();

  return NextResponse.json({
    success: true,
  });
}
