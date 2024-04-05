import _ from "lodash";

import Clients from "../models/Clients.js";
import ApiOptimizer from "../api/index.js";

import errorHandling from "../middlewares/errorHandler.js";
import Router from "@koa/router";
const router = new Router();

const client = new ApiOptimizer(Clients);
const modelName = "Clients";

router.post("/clients/add", async (req, res) => {
  try {
    const { firstName } = req.body;
    const entity = { firstName };
    await client.add({ entity, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get("/clients/", async (ctx) => {
  try {
    await client.getAll(ctx);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.delete("/clients/:id", async (ctx) => {
  try {
    await client.deleteById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.get("/clients/:id", async (ctx) => {
  try {
    await client.getById(ctx, modelName);
  } catch (err) {
    errorHandling(err, ctx);
  }
});

router.put("/clients/:id", async (ctx) => {
  try {
    const entityId = _.get(ctx, "params.id");
    const {
      firstName,
      lastName,
      parentName,
      iin,
      phone,
      address,
      organization_id,
      position,
      salary_gross,
      salary_net,
      employment_agreement_number,
      date_agreement_number,
      agreement_term,
      department,
      receipt_date,
      dismissal_date,
    } = ctx.request.body;
    const fieldsToUpdate = {
      firstName,
      lastName,
      parentName,
      iin,
      phone,
      address,
      organization_id,
      position,
      salary_gross,
      salary_net,
      employment_agreement_number,
      date_agreement_number,
      agreement_term,
      department,
      receipt_date,
      dismissal_date,
    };

    await client.update({ entityId, fieldsToUpdate, ctx });
  } catch (err) {
    errorHandling(err, ctx);
  }
});

export default router;
