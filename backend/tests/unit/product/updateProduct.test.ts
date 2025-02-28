import { updateProduct, UpdateProductInput } from '../../../src/application/use-cases/Product/updateProduct';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    product: {
        update: jest.fn(),
    },
} as unknown as PrismaClient;

describe('updateProduct Use Case', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update a product and return the updated data', async () => {
        const input: UpdateProductInput = {
            id: 1,
            name: 'Notebook Atualizado',
            price: 3499.99,
            stock: 15,
        };
        const mockUpdatedProduct = {
            id: 1,
            name: 'Notebook Atualizado',
            price: 3499.99,
            stock: 15,
            createdAt: new Date(),
        };
        (mockPrisma.product.update as jest.Mock).mockResolvedValue(mockUpdatedProduct);

        const result = await updateProduct(mockPrisma, input);

        expect(result).toEqual(mockUpdatedProduct);
        expect(mockPrisma.product.update).toHaveBeenCalledWith({
            where: { id: input.id },
            data: { name: input.name, price: input.price, stock: input.stock },
        });
        expect(mockPrisma.product.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if update fails', async () => {
        const input: UpdateProductInput = { id: 1, price: 3499.99 };
        (mockPrisma.product.update as jest.Mock).mockRejectedValue(new Error('Product not found'));

        await expect(updateProduct(mockPrisma, input)).rejects.toThrow('Product not found');
        expect(mockPrisma.product.update).toHaveBeenCalledTimes(1);
    });
});