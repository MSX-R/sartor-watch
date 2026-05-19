import { NextResponse } from "next/server";

import { XiaomiService } from "@/modules/health/providers/xiaomi";

export async function POST() {
  const service = new XiaomiService();

  await service.syncActivity();

  return NextResponse.json({
    success: true,
  });
}
