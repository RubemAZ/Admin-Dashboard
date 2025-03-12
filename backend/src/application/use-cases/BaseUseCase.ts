import { PrismaClient } from '@prisma/client'

export interface EntityInput {
    id?: number
    [key: string]: any
}

export class BaseUseCase<T> {
    protected prisma: PrismaClient
    entity: string

    constructor(prisma: PrismaClient, entity: string) {
        this.prisma = prisma
        this.entity = entity
    }

    async create(data: EntityInput): Promise<T> {
        return (this.prisma[this.entity as keyof PrismaClient] as any).create({
            data,
        })
    }

    async update(input: EntityInput): Promise<T> {
        const { id, ...data } = input;
        return (this.prisma[this.entity as keyof PrismaClient] as any).update({
            where: { id },
            data,
        })
    }

    async delete(id: number): Promise<T> {
        return (this.prisma[this.entity as keyof PrismaClient] as any).delete({
            where: { id },
        })
    }

    async getAll(): Promise<T[]> {
        return (this.prisma[this.entity as keyof PrismaClient] as any).findMany()
    }
}