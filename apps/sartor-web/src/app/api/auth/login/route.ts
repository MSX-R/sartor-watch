import { NextRequest, NextResponse } from "next/server";

import { comparePassword } from "@/lib/auth/hash";
import { generateToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/modules/health/core/schemas/health-metric.schema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user?.password) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const isValidPassword = await comparePassword(
    parsed.data.password,
    user.password,
  );

  if (!isValidPassword) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const token = await generateToken(user.id);

  return NextResponse.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
}
