import { updateUser, UpdateUserInput } from '../../../src/application/use-cases/User/updateUser';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    user: {
        update: jest.fn(),
    },
} as unknown as PrismaClient;

describe('updateUser Use Case', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update a user and return the updated data', async () => {
        const input: UpdateUserInput = { id: 1, name: 'João Atualizado', email: 'joao.updated@example.com' };
        const mockUpdatedUser = { id: 1, name: 'João Atualizado', email: 'joao.updated@example.com', createdAt: new Date() };
        (mockPrisma.user.update as jest.Mock).mockResolvedValue(mockUpdatedUser);

        const result = await updateUser(mockPrisma, input);

        expect(result).toEqual(mockUpdatedUser);
        expect(mockPrisma.user.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { name: 'João Atualizado', email: 'joao.updated@example.com' },
        });
        expect(mockPrisma.user.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if update fails', async () => {
        const input: UpdateUserInput = { id: 1, name: 'João Atualizado' };
        (mockPrisma.user.update as jest.Mock).mockRejectedValue(new Error('User not found'));

        await expect(updateUser(mockPrisma, input)).rejects.toThrow('User not found');
        expect(mockPrisma.user.update).toHaveBeenCalledTimes(1);
    });
});