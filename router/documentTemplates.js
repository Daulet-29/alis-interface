import _ from "lodash";
import Router from "@koa/router";
const router = new Router();

import DocumentTemplates from "../models/DocumentTemplates.js";
import ApiOptimizer from "../api/index.js";

import errorHandling from "../middlewares/errorHandler.js";

const documentTemplates = new ApiOptimizer(DocumentTemplates);
const modelName = "DocumentTemplates";

router.post("/documentTemplate/add", async (req, res) => {
  try {
    const { name } = req.body;
    const entity = { name };
    await documentTemplates.add({ entity, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get("/documentTemplate/", async (ctx) => {
  try {
    await documentTemplates.getAll(ctx);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.delete("/documentTemplate/:id", async (ctx) => {
  try {
    await documentTemplates.deleteById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.get("/documentTemplate/:id", async (ctx) => {
  try {
    await documentTemplates.getById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.put("/documentTemplate/:id", async (ctx) => {
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
