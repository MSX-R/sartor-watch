import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { HealthQueryService } from "@/modules/health/core/services/health-query.service";

export async function GET() {
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

  const healthQueryService = new HealthQueryService();

  const metrics = await healthQueryService.getLatestMetrics(user.id);

  return NextResponse.json(metrics);
}
