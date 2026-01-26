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

export async function getClientById(id: string) {
    return prisma.client.findUnique(
        {
            where: {id}
        }
    )
}

export async function updateClient(
    id: string, 
    data: { name?: string; notes?: string | null; archived?: boolean}
) {
    return prisma.client.update({
        where: {id},
        data,
    });
}