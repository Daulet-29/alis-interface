import Koa from "koa";import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import _ from "lodash";
import Users from "../models/Users";
// import ApiOptimizer from '../api';
// import checkRole from '../middleware/checkRole';
import errorHandling from "../middleware/errorHandler";
// import { ROLES } from "../enums";

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

app.use(bodyParser());

const user = new ApiOptimizer(Users);
const modelName = "User";

router.get("/users", checkRole([ROLES.ADMIN]), async (ctx) => {
   try {
      await user.getAll(ctx);
   } catch (err) {
      errorHandling(err, ctx);
   }
});

router.delete("/users/:id", async (ctx) => {
   try {
      await user.deleteById(ctx, modelName);
   } catch (err) {
      errorHandling(err, ctx);
   }
});

router.get("/users/:id", async (ctx) => {
   try {
      await user.getById(ctx, modelName);
   } catch (err) {
      errorHandling(err, ctx);
   }
});

router.put("/users/:id", checkRole([ROLES.ADMIN]), async (ctx) => {
   try {
      const entityId = _.get(ctx, "params.id");
      const { role } = ctx.request.body;
      const fieldsToUpdate = { role };

      await user.update({ entityId, fieldsToUpdate, ctx });
   } catch (err) {
      errorHandling(err, ctx);
   }
});

// Additional Koa app setup if needed

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
