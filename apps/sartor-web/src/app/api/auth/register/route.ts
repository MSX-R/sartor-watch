import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/hash";

export async function POST() {
  const hashedPassword = await hashPassword("admin123");

  const user = await prisma.user.create({
    data: {
      email: "test@sartor.app",

      name: "Romain",

      role: "ADMIN",

      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
