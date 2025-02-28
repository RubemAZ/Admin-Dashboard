import { updateService, UpdateServiceInput } from '../../../src/application/use-cases/Service/updateService';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    service: {
        update: jest.fn(),
    },
} as unknown as PrismaClient;

describe('updateService Use Case', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update a service and return the updated data', async () => {
        const input: UpdateServiceInput = {
            id: 1,
            name: 'Consultoria Atualizada',
            description: 'Nova descrição',
        };
        const mockUpdatedService = {
            id: 1,
            name: 'Consultoria Atualizada',
            description: 'Nova descrição',
            createdAt: new Date(),
        };
        (mockPrisma.service.update as jest.Mock).mockResolvedValue(mockUpdatedService);

        const result = await updateService(mockPrisma, input);

        expect(result).toEqual(mockUpdatedService);
        expect(mockPrisma.service.update).toHaveBeenCalledWith({
            where: { id: input.id },
            data: { name: input.name, description: input.description },
        });
        expect(mockPrisma.service.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if update fails', async () => {
        const input: UpdateServiceInput = { id: 1, name: 'Consultoria Atualizada' };
        (mockPrisma.service.update as jest.Mock).mockRejectedValue(new Error('Service not found'));

        await expect(updateService(mockPrisma, input)).rejects.toThrow('Service not found');
        expect(mockPrisma.service.update).toHaveBeenCalledTimes(1);
    });
});