import { createService, CreateServiceInput } from '../../../src/application/use-cases/Service/createService';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    service: { create: jest.fn() },
} as unknown as PrismaClient;

describe('createService Use Case', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should create a service and return it', async () => {
        const input: CreateServiceInput = { name: 'Consultoria', description: 'Serviço de consultoria' };
        const mockService = { id: 1, ...input, createdAt: new Date() };
        (mockPrisma.service.create as jest.Mock).mockResolvedValue(mockService);

        const result = await createService(mockPrisma, input);

        expect(result).toEqual(mockService);
        expect(mockPrisma.service.create).toHaveBeenCalledWith({ data: input });
        expect(mockPrisma.service.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if creation fails', async () => {
        const input: CreateServiceInput = { name: 'Consultoria' };
        (mockPrisma.service.create as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(createService(mockPrisma, input)).rejects.toThrow('Database error');
        expect(mockPrisma.service.create).toHaveBeenCalledTimes(1);
    });
});