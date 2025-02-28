import { PrismaClient } from '@prisma/client';

export const getAllUsers = async (prisma: PrismaClient) => {
    return prisma.user.findMany();
};