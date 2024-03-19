import _ from "lodash";

import Organizations from "../models/Organizations";
import ApiOptimizer from "../api";

import errorHandling from "../middleware/errorHandler";

const organization = new ApiOptimizer(Organizations);
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

router.put("/:id", checkRole([ROLES.ADMIN]), async (ctx) => {
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
