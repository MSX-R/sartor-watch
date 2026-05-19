import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { XiaomiProvider } from "@/modules/health/providers/xiaomi/xiaomi.provider";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      {
        success: false,

        error: "Missing authorization code",
      },
      {
        status: 400,
      },
    );
  }

  const provider = new XiaomiProvider();

  const connection = await provider.exchangeCodeForToken(code);

  const user = await prisma.user.findFirst();

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

  await prisma.connectedProvider.upsert({
    where: {
      userId_provider: {
        userId: user.id,

        provider: "xiaomi",
      },
    },

    update: {
      accessToken: connection.accessToken,

      refreshToken: connection.refreshToken,

      expiresAt: connection.expiresAt,

      lastSyncAt: new Date(),
    },

    create: {
      userId: user.id,

      provider: "xiaomi",

      accessToken: connection.accessToken,

      refreshToken: connection.refreshToken,

      expiresAt: connection.expiresAt,

      lastSyncAt: new Date(),
    },
  });

  return NextResponse.json({
    success: true,

    connection,
  });
}
