import _ from "lodash";

import DocumentEdo from "../models/DocumentEdo.js";
import ApiOptimizer from "../api/index.js";

import errorHandling from "../middlewares/errorHandler.js";

const documentEdo = new ApiOptimizer(DocumentEdo);
const modelName = "DocumentEdo";

router.get("/", async (ctx) => {
  try {
    await documentEdo.getAll(ctx);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.delete("/:id", async (ctx) => {
  try {
    await documentEdo.deleteById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.get("/:id", async (ctx) => {
  try {
    await documentEdo.getById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.put("/:id", async (ctx) => {
  try {
    const entityId = _.get(ctx, "params.id");
    const { category, subtype, documents } = ctx.request.body;
    const fieldsToUpdate = { category, subtype, documents };

    await documentEdo.update({ entityId, fieldsToUpdate, ctx });
  } catch (err) {
    errorHandling(err, ctx);
  }
});

export default router;
