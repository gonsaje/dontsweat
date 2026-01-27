import { prisma } from "@/lib/prisma";

export async function createOrg(name: string) {
  return prisma.organization.create({ data: { name } });
}

export async function getOrgById(id: string) {
  return prisma.organization.findUnique({ where: { id } });
}

export async function updateOrg(
    id: string,
    data: { name?: string }
) {
    return prisma.organization.update({
        where: { id },
        data, 
    });
}

export async function deleteOrg(id: string) {
    return prisma.organization.delete({
        where: {id}
    });
}
