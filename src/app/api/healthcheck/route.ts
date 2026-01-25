import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tableCounts = {
    users: await prisma.user.count(),
    orgs: await prisma.organization.count(),
    clients: await prisma.client.count(),
    templates: await prisma.sessionTemplate.count(),
    sessions: await prisma.sessionInstance.count(),
  };

  return NextResponse.json({ ok: true, tableCounts });
}
