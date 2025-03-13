import { PrismaClient } from '@prisma/client';
import { BaseUseCase } from '../../src/application/use-cases/BaseUseCase';

const mockPrisma = {
    user: {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn(),
    },
} as unknown as PrismaClient;

describe('BaseUseCase', () => {
    let useCase: BaseUseCase<any>;

    beforeEach(() => {
        jest.clearAllMocks();
        useCase = new BaseUseCase(mockPrisma, 'user'); // Usando 'user' como entidade
    });

    describe('create', () => {
        it('should create an entity and return it', async () => {
            const input = { name: 'João', email: 'joao@example.com' }; // Campos de 'user'
            const mockResult = { id: 1, ...input };
            (mockPrisma.user.create as jest.Mock).mockResolvedValue(mockResult);

            const result = await useCase.create(input);

            expect(result).toEqual(mockResult);
            expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: input });
            expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
        });

        it('should throw an error if creation fails', async () => {
            const input = { name: 'João', email: 'joao@example.com' };
            (mockPrisma.user.create as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(useCase.create(input)).rejects.toThrow('Database error');
        });
    });

    describe('update', () => {
        it('should update an entity and return it', async () => {
            const input = { id: 1, name: 'João Atualizado', email: 'joao.updated@example.com' };
            const mockResult = { id: 1, name: 'João Atualizado', email: 'joao.updated@example.com' };
            (mockPrisma.user.update as jest.Mock).mockResolvedValue(mockResult);

            const result = await useCase.update(input);

            expect(result).toEqual(mockResult);
            expect(mockPrisma.user.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { name: 'João Atualizado', email: 'joao.updated@example.com' },
            });
        });
    });

    describe('delete', () => {
        it('should delete an entity and return it', async () => {
            const mockResult = { id: 1, name: 'João', email: 'joao@example.com' };
            (mockPrisma.user.delete as jest.Mock).mockResolvedValue(mockResult);

            const result = await useCase.delete(1);

            expect(result).toEqual(mockResult);
            expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });

    describe('getAll', () => {
        it('should return all entities', async () => {
            const mockResult = [{ id: 1, name: 'João', email: 'joao@example.com' }];
            (mockPrisma.user.findMany as jest.Mock).mockResolvedValue(mockResult);

            const result = await useCase.getAll();

            expect(result).toEqual(mockResult);
            expect(mockPrisma.user.findMany).toHaveBeenCalledTimes(1);
        });
    });
});