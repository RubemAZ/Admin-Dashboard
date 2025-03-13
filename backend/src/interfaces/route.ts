import { Router } from 'express'
import { BaseController } from './controllers/BaseController'
import { PrismaClient } from '@prisma/client'
import { validate } from './middlewares/validate'
import {
    userSchema,
    productSchema,
    serviceSchema,
    updateUserSchema,
    updateProductSchema,
    updateServiceSchema,
} from '../application/validations/schemas'

const prisma = new PrismaClient()
const router = Router()

const userController = new BaseController(prisma, 'user')
const productController = new BaseController(prisma, 'product')
const serviceController = new BaseController(prisma, 'service')

// Rotas para User
router.get('/users', (req, res) => userController.getAll(req, res))
router.post('/users', validate(userSchema), (req, res) => userController.create(req, res))
router.put('/users/:id', validate(updateUserSchema), (req, res) => userController.update(req, res))
router.delete('/users/:id', (req, res) => userController.delete(req, res))

// Rotas para Product
router.get('/products', (req, res) => productController.getAll(req, res))
router.post('/products', validate(productSchema), (req, res) => productController.create(req, res))
router.put('/products/:id', validate(updateProductSchema), (req, res) => productController.update(req, res))
router.delete('/products/:id', (req, res) => productController.delete(req, res))

// Rotas para Service
router.get('/services', (req, res) => serviceController.getAll(req, res))
router.post('/services', validate(serviceSchema), (req, res) => serviceController.create(req, res))
router.put('/services/:id', validate(updateServiceSchema), (req, res) => serviceController.update(req, res))
router.delete('/services/:id', (req, res) => serviceController.delete(req, res))

export default router