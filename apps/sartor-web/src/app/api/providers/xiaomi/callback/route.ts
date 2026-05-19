import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { XiaomiProvider } from "@/modules/health/providers/xiaomi";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      {
        success: false,

        error: "Missing code",
      },
      {
        status: 400,
      },
    );
  }

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

  const provider = new XiaomiProvider();

  const connection = await provider.exchangeCodeForToken(code);

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
  });
}
