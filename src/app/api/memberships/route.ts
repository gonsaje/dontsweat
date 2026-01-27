import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const membership = await prisma.membership.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ membership });
}
