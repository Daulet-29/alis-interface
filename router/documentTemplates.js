import _ from "lodash";

import DocumentTemplates from "../models/DocumentTemplates.js";
import ApiOptimizer from "../api/index.js";

import errorHandling from "../middlewares/errorHandler.js";

const documentTemplates = new ApiOptimizer(DocumentTemplates);
const modelName = "DocumentTemplates";

router.get("/", async (ctx) => {
  try {
    await documentTemplates.getAll(ctx);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.delete("/:id", async (ctx) => {
  try {
    await documentTemplates.deleteById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.get("/:id", async (ctx) => {
  try {
    await documentTemplates.getById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.put("/:id", async (ctx) => {
  try {
    const entityId = _.get(ctx, "params.id");
    const { name, type, date, google_drive_link } = ctx.request.body;
    const fieldsToUpdate = { name, type, date, google_drive_link };

    await documentTemplates.update({ entityId, fieldsToUpdate, ctx });
  } catch (err) {
    errorHandling(err, ctx);
  }
});

export default router;
