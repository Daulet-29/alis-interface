import Router from 'koa-router';

import { basePreffix } from '../config/index.js';
import errorHandler from '../middlewares/errorHandler.js';
import authRouter from '../controllers/authentication.js';
// import caseRouter from './case.js';
// import todoRouter from './todo.js';

const router = new Router({
  prefix: basePreffix,
});

router.use(errorHandler);
router.use('/auth');
// router.use('/cases', caseRouter.routes(), caseRouter.allowedMethods());
// router.use('/todos', todoRouter.routes(), todoRouter.allowedMethods());
// route for the Health check from Cloudflare Monitor
router.get('/health-check', (ctx) => {
  ctx.status = 200;
  ctx.body = {};
  return ctx;
});

export default router;