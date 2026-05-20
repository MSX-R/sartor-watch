import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  const metrics = await prisma.healthMetric.findMany({
    orderBy: {
      recordedAt: "desc",
    },

    take: 20,
  });

  return NextResponse.json(metrics);
}
