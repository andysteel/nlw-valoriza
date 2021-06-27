import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import CreateTagController from './controllers/CreateTagController';
import CreateUserController from './controllers/CreateUserController';
import { ListTagController } from './controllers/ListTagController';
import { ListUserController } from './controllers/ListUserController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { encryptPassword } from './middlewares/encryptPassword';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticate';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listTagController = new ListTagController();
const listUserController = new ListUserController();

router.post('/users', encryptPassword, createUserController.handle);

router.get('/users', ensureAuthenticated, listUserController.handle);

router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);

router.get('/tags', ensureAuthenticated, listTagController.handle);

router.post('/login', authenticateUserController.handle);

router.post('/compliments', ensureAuthenticated,  createComplimentController.handle);

router.get('/compliments/received', ensureAuthenticated,  listUserReceiveComplimentsController.handle);

router.get('/compliments/sended', ensureAuthenticated,  listUserSendComplimentsController.handle);

export { router };
