import { NextResponse } from "next/server";

import { XiaomiProvider } from "@/modules/health/providers/xiaomi";

export async function GET() {
  const provider = new XiaomiProvider();

  const url = await provider.connect();

  return NextResponse.json({
    success: true,

    url,
  });
}
