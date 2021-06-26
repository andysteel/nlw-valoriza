import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import CreateTagController from './controllers/CreateTagController';
import CreateUserController from './controllers/CreateUserController';
import { encryptPassword } from './middlewares/encryptPassword';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateUserController();

router.post('/users', encryptPassword, createUserController.handle);

router.post('/tags', ensureAdmin, createTagController.handle);

router.post('/login', authenticateUserController.handle);

router.post('/compliments', createComplimentController.handle);

export { router };
