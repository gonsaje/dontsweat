import { prisma } from "@/lib/prisma";

export async function createClient(params: {
  orgId: string;
  name: string;
  notes?: string;
  userId?: string;
}) {
  return prisma.client.create({ data: params });
}

export async function listClients(orgId: string) {
  return prisma.client.findMany({
    where: { orgId, archived: false },
    orderBy: { createdAt: "desc" },
  });
}
