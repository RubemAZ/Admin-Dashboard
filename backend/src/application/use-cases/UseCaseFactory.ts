import { PrismaClient } from '@prisma/client'
import { BaseUseCase } from './BaseUseCase'

export class UseCaseFactory {
    static create<T>(prisma: PrismaClient, entity: string): BaseUseCase<T> {
        return new BaseUseCase<T>(prisma, entity)
    }
}