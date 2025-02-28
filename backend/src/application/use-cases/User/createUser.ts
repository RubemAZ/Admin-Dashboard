import { PrismaClient } from '@prisma/client';

export interface CreateUserInput {
    name: string;
    email: string;
}

export const createUser = async (prisma: PrismaClient, input: CreateUserInput) => {
    return prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
        },
    });
};