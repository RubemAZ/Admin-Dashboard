import { PrismaClient } from '@prisma/client';

export const deleteProduct = async (prisma: PrismaClient, id: number) => {
    return prisma.product.delete({
        where: { id },
    });
};