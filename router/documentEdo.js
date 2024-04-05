import _ from "lodash";

import DocumentEdo from "../models/DocumentEdo.js";
import ApiOptimizer from "../api/index.js";

import errorHandling from "../middlewares/errorHandler.js";
import Router from "@koa/router";
const router = new Router();

const documentEdo = new ApiOptimizer(DocumentEdo);
const modelName = "DocumentEdo";

router.post("/documentEdo/add", async (req, res) => {
  try {
    const { category } = req.body;
    const entity = { category };
    await documentEdo.add({ entity, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get("/documentEdo/", async (ctx) => {
  try {
    await documentEdo.getAll(ctx);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.delete("/documentEdo/:id", async (ctx) => {
  try {
    await documentEdo.deleteById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.get("/documentEdo/:id", async (ctx) => {
  try {
    await documentEdo.getById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.put("/documentEdo/:id", async (ctx) => {
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
