import Router from 'koa-router';

import AuthController from '../controllers/auth';

const router = new Router();

// Example authentication routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);

export default authRouter;
