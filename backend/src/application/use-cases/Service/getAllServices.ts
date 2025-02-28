import { PrismaClient } from '@prisma/client';

export const getAllServices = async (prisma: PrismaClient) => {
    return prisma.service.findMany();
};