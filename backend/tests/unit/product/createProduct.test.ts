import { createProduct, CreateProductInput } from '../../../src/application/use-cases/Product/createProduct';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    product: { create: jest.fn() },
} as unknown as PrismaClient;

describe('createProduct Use Case', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should create a product and return it', async () => {
        const input: CreateProductInput = { name: 'Notebook', price: 2999.99, stock: 10 };
        const mockProduct = { id: 1, ...input, createdAt: new Date() };
        (mockPrisma.product.create as jest.Mock).mockResolvedValue(mockProduct);

        const result = await createProduct(mockPrisma, input);

        expect(result).toEqual(mockProduct);
        expect(mockPrisma.product.create).toHaveBeenCalledWith({ data: input });
        expect(mockPrisma.product.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if creation fails', async () => {
        const input: CreateProductInput = { name: 'Notebook', price: 2999.99, stock: 10 };
        (mockPrisma.product.create as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(createProduct(mockPrisma, input)).rejects.toThrow('Database error');
        expect(mockPrisma.product.create).toHaveBeenCalledTimes(1);
    });
});