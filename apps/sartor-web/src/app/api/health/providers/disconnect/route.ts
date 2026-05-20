import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { providerActionSchema } from "@/modules/health/core/schemas/health-metric.schema";
import { ProviderConnectionService } from "@/modules/health/core/services/provider-connection.service";

export async function POST(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const body = await request.json();
  const parsed = providerActionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  await new ProviderConnectionService().disconnect(userIdOrResponse, parsed.data.provider);

  return NextResponse.json({ success: true, provider: parsed.data.provider, connected: false });
}
