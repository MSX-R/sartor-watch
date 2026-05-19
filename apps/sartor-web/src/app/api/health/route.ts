import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { XiaomiService } from "@/modules/health/providers/xiaomi/xiaomi.service";
import { XiaomiWorkoutService } from "@/modules/health/providers/xiaomi/xiaomi-workout.service";

export async function POST() {
  const user = await prisma.user.findFirst({
    where: {
      email: "test@sartor.app",
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 404,
      },
    );
  }

  const xiaomiService = new XiaomiService();

  const xiaomiWorkoutService = new XiaomiWorkoutService();

  await xiaomiService.syncActivity(user.id);

  await xiaomiWorkoutService.syncWorkout(user.id);

  return NextResponse.json({
    success: true,
  });
}
