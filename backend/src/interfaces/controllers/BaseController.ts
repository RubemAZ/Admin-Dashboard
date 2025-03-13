import { Request, Response } from 'express'
import { BaseUseCase } from '../../application/use-cases/BaseUseCase'
import { PrismaClient } from '@prisma/client'

export class BaseController<T> {
    private useCase: BaseUseCase<T>

    constructor(prisma: PrismaClient, entity: string) {
        this.useCase = new BaseUseCase<T>(prisma, entity)
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const items = await this.useCase.getAll()
            res.json(items)
        } catch (error) {
            res.status(400).json({ message: `Erro ao buscar ${this.useCase.entity}s` })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const item = await this.useCase.create(req.body)
            res.status(201).json(item)
        } catch (error) {
            res.status(400).json({ message: `Erro ao criar ${this.useCase.entity}` })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const item = await this.useCase.update({
                id: Number(req.params.id),
                ...req.body,
            })
            res.json(item)
        } catch (error) {
            res.status(400).json({ message: `Erro ao atualizar ${this.useCase.entity}` })
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const item = await this.useCase.delete(Number(req.params.id))
            res.json(item)
        } catch (error) {
            res.status(400).json({ message: `Erro ao deleter ${this.useCase.entity}` })
        }
    }
}