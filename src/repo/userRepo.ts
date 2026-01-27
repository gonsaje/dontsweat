import { prisma } from "@/lib/prisma";

export async function createUser(params: {
  email: string;
  firstName?: string;
  lastName?: string;
}) {
  return prisma.user.create({ data: params });
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: {id}
    });
}

export async function updateUser(
    id: string, 
    data: {email?: string, firstName?: string, lastName?: string}
) {
    return prisma.user.update({
        where: {id},
        data
    });
}

export async function deleteUser(id: string) {
    return prisma.user.delete({
        where: {id}
    });
}