import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "./jwt";

export async function getUserIdFromRequest(
  request: NextRequest,
): Promise<string | null> {
  const header = request.headers.get("authorization");

  if (!header?.startsWith("Bearer ")) {
    return null;
  }

  try {
    const payload = await verifyToken(header.slice(7));

    return typeof payload.userId === "string" ? payload.userId : null;
  } catch {
    return null;
  }
}

export async function requireUserId(
  request: NextRequest,
): Promise<string | NextResponse> {
  const userId = await getUserIdFromRequest(request);

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  return userId;
}
