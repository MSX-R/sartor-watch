import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { ProviderCatalogService } from "@/modules/health/core/services/provider-catalog.service";

export async function GET(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const providers = await new ProviderCatalogService().listForUser(userIdOrResponse);

  return NextResponse.json({
    success: true,
    providers,
    normalization: {
      description:
        "Toutes les sources sont converties vers le même format Sartor (types + unités) avant affichage.",
    },
  });
}
