import { Router } from 'express';
import { UserController } from './controllers/userController';

const router = Router();

router.get('/users', UserController.getUsers);

export default router;