import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const orgs = await prisma.organization.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orgs });
}
