import { getAllUsers } from '../../../src/application/use-cases/User/getAllUsers';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    user: {
        findMany: jest.fn(),
    },
} as unknown as PrismaClient;

describe('getAllUsers Use Case', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a list of users', async () => {
        const mockUsers = [
            { id: 1, name: 'João', email: 'joao@example.com', createdAt: new Date() },
            { id: 2, name: 'Maria', email: 'maria@example.com', createdAt: new Date() },
        ];
        (mockPrisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

        const result = await getAllUsers(mockPrisma);

        expect(result).toEqual(mockUsers);
        expect(mockPrisma.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if Prisma fails', async () => {
        (mockPrisma.user.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(getAllUsers(mockPrisma)).rejects.toThrow('Database error');
        expect(mockPrisma.user.findMany).toHaveBeenCalledTimes(1);
    });
});