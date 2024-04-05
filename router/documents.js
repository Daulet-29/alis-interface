import _ from "lodash";

import Document from "../models/Documents.js";
import ApiOptimizer from "../api/index.js";

import errorHandling from "../middlewares/errorHandler.js";
import Router from "@koa/router";
const router = new Router();

const document = new ApiOptimizer(Document);
const modelName = "Documents";

router.post("/documents/add", async (req, res) => {
  try {
    const { category } = req.body;
    const entity = { category };
    await document.add({ entity, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get("/documents/", async (ctx) => {
  try {
    await document.getAll(ctx);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.delete("/documents/:id", async (ctx) => {
  try {
    await document.deleteById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.get("/documents/:id", async (ctx) => {
  try {
    await document.getById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.put("/documents/:id", async (ctx) => {
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
