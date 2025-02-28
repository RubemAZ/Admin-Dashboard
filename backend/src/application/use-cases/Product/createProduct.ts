import { PrismaClient } from '@prisma/client';

export interface CreateProductInput {
    name: string;
    price: number;
    stock: number;
}

export const createProduct = async (prisma: PrismaClient, input: CreateProductInput) => {
    return prisma.product.create({
        data: {
            name: input.name,
            price: input.price,
            stock: input.stock,
        },
    });
};