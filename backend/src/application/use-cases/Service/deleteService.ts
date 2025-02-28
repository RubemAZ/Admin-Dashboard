import { PrismaClient } from '@prisma/client';

export const deleteService = async (prisma: PrismaClient, id: number) => {
    return prisma.service.delete({
        where: { id },
    });
};