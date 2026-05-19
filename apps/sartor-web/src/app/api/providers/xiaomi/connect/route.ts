import { NextResponse } from "next/server";

import { XiaomiProvider } from "@/modules/health/providers/xiaomi/xiaomi.provider";

export async function GET() {
  const provider = new XiaomiProvider();

  const url = await provider.connect();

  return NextResponse.json({
    url,
  });
}
