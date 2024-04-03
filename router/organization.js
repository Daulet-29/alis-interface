import _ from "lodash";

import Organization from "../models/Organizations.js";
// const Organization = require("../models/Organizations.js");

import ApiOptimizer from "../api/index.js";
import Router from "@koa/router";
const router = new Router();

import errorHandling from "../middlewares/errorHandler.js";

const organization = new ApiOptimizer(Organization);
const modelName = "Organization";

router.get("/", async (ctx) => {
  try {
    await organization.getAll(ctx);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.delete("/:id", async (ctx) => {
  try {
    await organization.deleteById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.get("/:id", async (ctx) => {
  try {
    await organization.getById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.put("/:id", async (ctx) => {
  try {
    const entityId = _.get(ctx, "params.id");
    const {
      bin_iin,
      name,
      actual_address,
      jur_address,
      director,
      phone,
      email,
      bank_information,
      account_no,
      swift_code,
    } = ctx.request.body;
    const fieldsToUpdate = {
      bin_iin,
      name,
      actual_address,
      jur_address,
      director,
      phone,
      email,
      bank_information,
      account_no,
      swift_code,
    };

    await organization.update({ entityId, fieldsToUpdate, ctx });
  } catch (err) {
    errorHandling(err, ctx);
  }
});

export default router;
