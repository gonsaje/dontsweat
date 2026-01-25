import { prisma } from "@/lib/prisma";
import { OrgRole } from "@prisma/client";

export async function bootstrap(params: {
  orgName: string;
  email: string;
  firstName?: string;
  lastName?: string;
}) {
  return prisma.$transaction(async (tx) => {
    const org = await tx.organization.create({ data: { name: params.orgName } });

    const user = await tx.user.create({
      data: {
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
      },
    });

    await tx.membership.create({
      data: { orgId: org.id, userId: user.id, role: OrgRole.OWNER },
    });

    return { org, user };
  });
}
