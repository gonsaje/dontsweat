import { prisma } from "@/lib/prisma";

export async function createOrg(name: string) {
  return prisma.organization.create({ data: { name } });
}

export async function getOrg(id: string) {
  return prisma.organization.findUnique({ where: { id } });
}
