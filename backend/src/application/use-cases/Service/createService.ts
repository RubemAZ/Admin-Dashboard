import { PrismaClient } from '@prisma/client';

export interface CreateServiceInput {
    name: string;
    description?: string;
}

export const createService = async (prisma: PrismaClient, input: CreateServiceInput) => {
    return prisma.service.create({
        data: {
            name: input.name,
            description: input.description,
        },
    });
};