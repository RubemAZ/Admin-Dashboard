import { deleteUser } from '../../../src/application/use-cases/User/deleteUser';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    user: {
        delete: jest.fn(),
    },
} as unknown as PrismaClient;

describe('deleteUser Use Case', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a user and return the deleted data', async () => {
        const userId = 1;
        const mockDeletedUser = { id: 1, name: 'João', email: 'joao@example.com', createdAt: new Date() };
        (mockPrisma.user.delete as jest.Mock).mockResolvedValue(mockDeletedUser);

        const result = await deleteUser(mockPrisma, userId);

        expect(result).toEqual(mockDeletedUser);
        expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: userId } });
        expect(mockPrisma.user.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if deletion fails', async () => {
        const userId = 1;
        (mockPrisma.user.delete as jest.Mock).mockRejectedValue(new Error('User not found'));

        await expect(deleteUser(mockPrisma, userId)).rejects.toThrow('User not found');
        expect(mockPrisma.user.delete).toHaveBeenCalledTimes(1);
    });
});