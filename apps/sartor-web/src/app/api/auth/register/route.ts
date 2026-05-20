import { NextRequest, NextResponse } from "next/server";

import { hashPassword } from "@/lib/auth/hash";
import { generateToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/modules/health/core/schemas/health-metric.schema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (existing) {
    return NextResponse.json(
      { success: false, error: "Email already registered" },
      { status: 409 },
    );
  }

  const hashedPassword = await hashPassword(parsed.data.password);

  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      password: hashedPassword,
    },
  });

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
