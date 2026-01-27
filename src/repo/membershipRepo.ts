import { prisma } from "@/lib/prisma";
import { OrgRole } from "@prisma/client";

export async function addMembership(params: {
  orgId: string;
  userId: string;
  role: OrgRole;
}) {
  return prisma.membership.create({ data: params });
}

export async function getMembershipById(id: string) {
  return prisma.membership.findUnique({
      where: {id},
  });
}

export async function getMembershipsByUserId({userId}: {userId: string}) {
  return prisma.membership.findMany({
    where: {
      userId
    }
  });
}


export async function getMembershipsByOrgId({orgId}: {orgId: string}) {
  return prisma.membership.findMany({
    where: {
      orgId
    }
  });
}

export async function getMembershipsByUserOrg({userId, orgId}: {userId: string, orgId: string}) {
  return prisma.membership.findMany({
    where: {
      userId: userId,
      orgId: orgId
    }
  });
}

export async function updateMembershipById(id: string, data: {role?: OrgRole}) {
  return prisma.membership.update({
    where: { id },
    data
  });
}

export async function deleteMembership(id: string) {
  return prisma.membership.delete({
    where: {id}
  });
}