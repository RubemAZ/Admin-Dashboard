import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
})

export const productSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    price: z.number().positive('Preço deve ser positivo'),
    stock: z.number().int().nonnegative('Estoque deve ser um número inteiro não negativo'),
})

export const serviceSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string().optional(),
})

export const updateUserSchema = userSchema.extend({ id: z.number() })
export const updateProductSchema = productSchema.extend({ id: z.number() })
export const updateServiceSchema = serviceSchema.extend({ id: z.number() })