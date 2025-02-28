import { PrismaClient } from '@prisma/client';

export interface UpdateProductInput {
    id: number;
    name?: string;
    price?: number;
    stock?: number;
}

export const updateProduct = async (prisma: PrismaClient, input: UpdateProductInput) => {
    return prisma.product.update({
        where: { id: input.id },
        data: {
            name: input.name,
            price: input.price,
            stock: input.stock,
        },
    });
};