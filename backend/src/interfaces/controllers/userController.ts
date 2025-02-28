import { Request, Response } from 'express';
import { getAllUsers } from '../../application/use-cases/User/getAllUsers';

export class UserController {
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuários' });
        }
    }
}