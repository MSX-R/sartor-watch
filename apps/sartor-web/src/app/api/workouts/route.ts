import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { HealthProvider } from "@/modules/health/core/enums/health-provider.enum";
import { ProviderSyncService } from "@/modules/health/core/services/provider-sync.service";
import { WorkoutService } from "@/modules/health/core/services/workout.service";

export async function GET(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const limit = Number(request.nextUrl.searchParams.get("limit") ?? "30");
  const workouts = await new WorkoutService().listForUser(
    userIdOrResponse,
    Math.min(Math.max(limit, 1), 100),
  );

  return NextResponse.json({ success: true, workouts });
}

/** Sync workouts via provider pipeline (Xiaomi pour l'instant). */
export async function POST(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const result = await new ProviderSyncService().syncProvider(
    userIdOrResponse,
    HealthProvider.XIAOMI,
  );

  return NextResponse.json({ success: true, ...result });
}
