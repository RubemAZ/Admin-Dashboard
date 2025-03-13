import { Router } from 'express'
import { BaseController } from './controllers/BaseController'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = Router()

const userController = new BaseController(prisma, 'user')
const productController = new BaseController(prisma, 'product')
const serviceController = new BaseController(prisma, 'service')

router.get('/users', (req, res) => userController.getAll(req, res))
router.post('/users', (req, res) => userController.create(req, res))
router.put('/users/:id', (req, res) => userController.update(req, res))
router.delete('/users/:id', (req, res) => userController.delete(req, res))

router.get('/products', (req, res) => productController.getAll(req, res))
router.post('/products', (req, res) => productController.create(req, res))
router.put('/products/:id', (req, res) => productController.update(req, res))
router.delete('/products/:id', (req, res) => productController.delete(req, res))

router.get('/services', (req, res) => serviceController.getAll(req, res))
router.post('/services', (req, res) => serviceController.create(req, res))
router.put('/services/:id', (req, res) => serviceController.update(req, res))
router.delete('/services/:id', (req, res) => serviceController.delete(req, res))

export default router