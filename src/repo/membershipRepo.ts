import { prisma } from "@/lib/prisma";
import { OrgRole } from "@prisma/client";

export async function addMembership(params: {
  orgId: string;
  userId: string;
  role: OrgRole;
}) {
  return prisma.membership.create({ data: params });
}
