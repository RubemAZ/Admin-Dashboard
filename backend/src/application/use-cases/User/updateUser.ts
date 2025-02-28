import { PrismaClient } from '@prisma/client';

export interface UpdateUserInput {
    id: number;
    name?: string;
    email?: string;
}

export const updateUser = async (prisma: PrismaClient, input: UpdateUserInput) => {
    return prisma.user.update({
        where: { id: input.id },
        data: {
            name: input.name,
            email: input.email,
        },
    });
};