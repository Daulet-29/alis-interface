import _ from "lodash";

import Document from "../models/Documents";
import ApiOptimizer from "../api";

import errorHandling from "../middleware/errorHandler";

const document = new ApiOptimizer(Document);
const modelName = "Documents";

router.get("/", async (ctx) => {
  try {
    await document.getAll(ctx);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.delete("/:id", async (ctx) => {
  try {
    await document.deleteById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.get("/:id", async (ctx) => {
  try {
    await document.getById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.put("/:id", checkRole([ROLES.ADMIN]), async (ctx) => {
  try {
    const entityId = _.get(ctx, "params.id");
    const { category, subtype, mappingData } = ctx.request.body;
    const fieldsToUpdate = { category, subtype, mappingData };

    await document.update({ entityId, fieldsToUpdate, ctx });
  } catch (err) {
    errorHandling(err, ctx);
  }
});

export default router;
