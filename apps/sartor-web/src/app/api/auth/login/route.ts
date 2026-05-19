import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/auth/hash";
import { generateToken } from "@/lib/auth/jwt";

export async function POST() {
  const user = await prisma.user.findFirst({
    where: {
      email: "test@sartor.app",
    },
  });

  if (!user?.password) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      },
    );
  }

  const isValidPassword = await comparePassword("admin123", user.password);

  if (!isValidPassword) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      },
    );
  }

  const token = await generateToken(user.id);

  return NextResponse.json({
    success: true,

    token,

    user,
  });
}
