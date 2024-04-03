import _ from "lodash";
import mongoose from "mongoose";
import express from "express";

import errorHandling from "../middlewares/errorHandler.js";
// const { isEmptyObject } = require('../utils');
// const { ERRORS } = require("../enums");

// const { INVALID_ID_ERROR, ENTITY_NOT_FOUND, UPDATE_ERROR, EMPTY_ID_ERROR } =
//   ERRORS;

class Entity {
  constructor(entityModel) {
    this.entityModel = entityModel;
    this.router = express.Router();
  }

  async add(ctx) {
    try {
      const { entity } = ctx.request.body;
      const newEntity = new this.entityModel(entity);
      const createdEntity = await newEntity.save();
      ctx.status = 200;
      ctx.body = createdEntity;
    } catch (err) {
      errorHandler(err, ctx);
    }
  }

  async getById(ctx) {
    try {
      const entityId = _.get(ctx.params, "id");
      if (!entityId) throw new Error(EMPTY_ID_ERROR);
      if (!mongoose.Types.ObjectId.isValid(entityId))
        throw new Error(INVALID_ID_ERROR);

      const requestedEntity = await this.entityModel
        .findOne({ _id: entityId })
        .exec();

      if (!requestedEntity) throw new Error(ENTITY_NOT_FOUND);

      ctx.status = 200;
      ctx.body = { data: requestedEntity };
    } catch (err) {
      errorHandler(err, ctx);
    }
  }

  async getAll(ctx) {
    try {
      const pageSizeInt = parseInt(
        _.get(ctx.request.body, "filter.pageSize", "25")
      );
      const pageNumberInt = parseInt(
        _.get(ctx.request.body, "filter.pageNumber", "1")
      );

      const data = await this.entityModel
        .find()
        .sort({
          createdAt: -1,
        })
        .skip(pageSizeInt * (pageNumberInt - 1))
        .limit(pageSizeInt);

      ctx.status = 200;
      ctx.body = { data };
    } catch (err) {
      errorHandler(err, ctx);
    }
  }

  async updateById(ctx) {
    try {
      const entityId = _.get(ctx.params, "id");
      const fieldsToUpdate = ctx.request.body.fieldsToUpdate;

      if (!entityId) throw new Error(EMPTY_ID_ERROR);
      if (!mongoose.Types.ObjectId.isValid(entityId))
        throw new Error(INVALID_ID_ERROR);
      if (isEmptyObject(fieldsToUpdate) || _.isUndefined(fieldsToUpdate))
        throw new Error(UPDATE_ERROR);

      const entity = await this.entityModel.findByIdAndUpdate(entityId, {
        $set: fieldsToUpdate,
      });
      ctx.status = 200;
      ctx.body = { data: entity };
    } catch (err) {
      errorHandler(err, ctx);
    }
  }

  async deleteById(ctx) {
    try {
      const entityId = _.get(ctx.params, "id");
      if (!entityId) throw new Error(INVALID_ID_ERROR);
      if (!mongoose.Types.ObjectId.isValid(entityId))
        throw new Error(INVALID_ID_ERROR);

      const requestedEntity = await this.entityModel
        .findOne({ _id: entityId })
        .exec();
      if (!requestedEntity) throw new Error(ENTITY_NOT_FOUND);

      const result = await this.entityModel.deleteOne({ _id: entityId }).exec();
      ctx.status = 200;
      ctx.body = result;
    } catch (err) {
      errorHandler(err, ctx);
    }
  }

  routes() {
    this.router.post("/add", this.add.bind(this));
    this.router.get("/getById/:id", this.getById.bind(this));
    this.router.post("/getAll", this.getAll.bind(this));
    this.router.put("/updateById/:id", this.updateById.bind(this));
    this.router.delete("/deleteById/:id", this.deleteById.bind(this));

    return this.router.routes();
  }
}

export default Entity;
