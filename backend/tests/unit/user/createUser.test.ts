import { createUser, CreateUserInput } from '../../../src/application/use-cases/User/createUser';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
    user: {
        create: jest.fn(),
    },
} as unknown as PrismaClient;

describe('createUser Use Case', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a user and return it', async () => {
        const input: CreateUserInput = { name: 'João', email: 'joao@example.com' };
        const mockUser = { id: 1, ...input, createdAt: new Date() };
        (mockPrisma.user.create as jest.Mock).mockResolvedValue(mockUser);

        const result = await createUser(mockPrisma, input);

        expect(result).toEqual(mockUser);
        expect(mockPrisma.user.create).toHaveBeenCalledWith({
            data: { name: 'João', email: 'joao@example.com' },
        });
        expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if creation fails', async () => {
        const input: CreateUserInput = { name: 'João', email: 'joao@example.com' };
        (mockPrisma.user.create as jest.Mock).mockRejectedValue(new Error('Unique constraint failed'));

        await expect(createUser(mockPrisma, input)).rejects.toThrow('Unique constraint failed');
        expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
    });
});