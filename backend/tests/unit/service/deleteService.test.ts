import { deleteService } from '../../../src/application/use-cases/Service/deleteService';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    service: {
        delete: jest.fn(),
    },
} as unknown as PrismaClient;

describe('deleteService Use Case', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a service and return the deleted data', async () => {
        const serviceId = 1;
        const mockDeletedService = {
            id: 1,
            name: 'Consultoria',
            description: 'Serviço de consultoria',
            createdAt: new Date(),
        };
        (mockPrisma.service.delete as jest.Mock).mockResolvedValue(mockDeletedService);

        const result = await deleteService(mockPrisma, serviceId);

        expect(result).toEqual(mockDeletedService);
        expect(mockPrisma.service.delete).toHaveBeenCalledWith({ where: { id: serviceId } });
        expect(mockPrisma.service.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if deletion fails', async () => {
        const serviceId = 1;
        (mockPrisma.service.delete as jest.Mock).mockRejectedValue(new Error('Service not found'));

        await expect(deleteService(mockPrisma, serviceId)).rejects.toThrow('Service not found');
        expect(mockPrisma.service.delete).toHaveBeenCalledTimes(1);
    });
});