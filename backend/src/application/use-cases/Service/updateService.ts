import { PrismaClient } from '@prisma/client';

export interface UpdateServiceInput {
    id: number;
    name?: string;
    description?: string;
}

export const updateService = async (prisma: PrismaClient, input: UpdateServiceInput) => {
    return prisma.service.update({
        where: { id: input.id },
        data: {
            name: input.name,
            description: input.description,
        },
    });
};