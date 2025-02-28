import { getAllProducts } from '../../../src/application/use-cases/Product/getAllProducts';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    product: {
        findMany: jest.fn(),
    },
} as unknown as PrismaClient;

describe('getAllProducts Use Case', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a list of products', async () => {
        const mockProducts = [
            { id: 1, name: 'Notebook', price: 2999.99, stock: 10, createdAt: new Date() },
            { id: 2, name: 'Mouse', price: 49.90, stock: 50, createdAt: new Date() },
        ];
        (mockPrisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

        const result = await getAllProducts(mockPrisma);

        expect(result).toEqual(mockProducts);
        expect(mockPrisma.product.findMany).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if Prisma fails', async () => {
        (mockPrisma.product.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(getAllProducts(mockPrisma)).rejects.toThrow('Database error');
        expect(mockPrisma.product.findMany).toHaveBeenCalledTimes(1);
    });
});