import { PrismaClient } from '@prisma/client';

export const getAllProducts = async (prisma: PrismaClient) => {
    return prisma.product.findMany();
};