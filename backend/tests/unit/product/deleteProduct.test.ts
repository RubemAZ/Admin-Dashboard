import { deleteProduct } from '../../../src/application/use-cases/Product/deleteProduct';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    product: {
        delete: jest.fn(),
    },
} as unknown as PrismaClient;

describe('deleteProduct Use Case', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a product and return the deleted data', async () => {
        const productId = 1;
        const mockDeletedProduct = {
            id: 1,
            name: 'Notebook',
            price: 2999.99,
            stock: 10,
            createdAt: new Date(),
        };
        (mockPrisma.product.delete as jest.Mock).mockResolvedValue(mockDeletedProduct);

        const result = await deleteProduct(mockPrisma, productId);

        expect(result).toEqual(mockDeletedProduct);
        expect(mockPrisma.product.delete).toHaveBeenCalledWith({ where: { id: productId } });
        expect(mockPrisma.product.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if deletion fails', async () => {
        const productId = 1;
        (mockPrisma.product.delete as jest.Mock).mockRejectedValue(new Error('Product not found'));

        await expect(deleteProduct(mockPrisma, productId)).rejects.toThrow('Product not found');
        expect(mockPrisma.product.delete).toHaveBeenCalledTimes(1);
    });
});