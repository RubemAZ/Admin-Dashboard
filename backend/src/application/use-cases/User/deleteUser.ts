import { PrismaClient } from '@prisma/client';

export const deleteUser = async (prisma: PrismaClient, id: number) => {
    return prisma.user.delete({
        where: { id },
    });
};