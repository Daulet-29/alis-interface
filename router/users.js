import _ from "lodash";

import Users from "../models/Users.js";

import ApiOptimizer from "../api/index.js";

// import checkRole from '../middleware/checkRole';
import errorHandling from "../middlewares/errorHandler.js";
// import { ROLES } from "../enums";

const user = new ApiOptimizer(Users);
const modelName = "User";

router.get("/users", async (ctx) => {
  try {
    await user.getAll(ctx);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

app.post("/", async (req, res) => {
  try {
    const { organization } = req.body;
    let query = {};

    if (organization) {
      query.organization = organization;
    }

    const users = await UsersModel.find(query).populate("organization");
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ message: "Internal server error" });
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
    const entityId = _.get(ctx, "params.id");
    const { role } = ctx.request.body;
    const fieldsToUpdate = { role };

    await user.update({ entityId, fieldsToUpdate, ctx });
  } catch (err) {
    errorHandling(err, ctx);
  }
});

export default router;
