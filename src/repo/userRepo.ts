import { prisma } from "@/lib/prisma";

export async function createUser(params: {
  email: string;
  firstName?: string;
  lastName?: string;
}) {
  return prisma.user.create({ data: params });
}
