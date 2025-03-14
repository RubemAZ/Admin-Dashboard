import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

export const validate =
    (schema: z.ZodObject<any, any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const data = req.params.id ? { id: Number(req.params.id), ...req.body } : req.body
                schema.parse(data)// Valida os dados combinados
                if (req.params.id) req.body = data
                next()
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({
                        message: 'Erro de validação',
                        errors: error.errors.map((e) => ({
                            path: e.path.join('.'),
                            message: e.message,
                        })),
                    })
                }
                return res.status(422).json({ message: 'Erro interno do servidor' })
            }
        }