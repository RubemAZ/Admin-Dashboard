import { getAllServices } from '../../../src/application/use-cases/Service/getAllServices';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    service: {
        findMany: jest.fn(),
    },
} as unknown as PrismaClient;

describe('getAllServices Use Case', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a list of services', async () => {
        const mockServices = [
            { id: 1, name: 'Consultoria', description: 'Serviço de consultoria', createdAt: new Date() },
            { id: 2, name: 'Manutenção', description: null, createdAt: new Date() },
        ];
        (mockPrisma.service.findMany as jest.Mock).mockResolvedValue(mockServices);

        const result = await getAllServices(mockPrisma);

        expect(result).toEqual(mockServices);
        expect(mockPrisma.service.findMany).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if Prisma fails', async () => {
        (mockPrisma.service.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(getAllServices(mockPrisma)).rejects.toThrow('Database error');
        expect(mockPrisma.service.findMany).toHaveBeenCalledTimes(1);
    });
});