import Router from "@koa/router";
const router = new Router();
import Users from "../models/Users.js"; // Ensure this path is correct
import ApiOptimizer from "../api/index.js"; // Ensure this path is correct
import errorHandling from "../middlewares/errorHandler.js";

const user = new ApiOptimizer(Users);
const modelName = "User";

router.get("/users", async (ctx) => {
  try {
    await user.getAll(ctx);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.post("/users", async (ctx) => {
  try {
    const { organization } = ctx.request.body;
    let query = {};

    if (organization) {
      query.organization = organization;
    }

    const users = await Users.find(query).populate("organization");
    ctx.status = 200;
    ctx.body = users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    ctx.status = 500;
    ctx.body = { message: "Internal server error" };
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

router.put("/users/:id", async (ctx) => {
  try {
    const entityId = ctx.params.id;
    const { role } = ctx.request.body;
    const fieldsToUpdate = { role };

    await user.update({ entityId, fieldsToUpdate, ctx });
  } catch (err) {
    errorHandling(err, ctx);
  }
});

export default router;
