const mongoose = require("mongoose");

const documentTemplateSchema = new mongoose.Schema(
  {
    name: { type: String },
    type: { type: String, default: "default docs" },
    date: { type: String },
    google_drive_link: { type: String },
  },
  { timestamps: true }
);

const DocumentTemplate = mongoose.model(
  "DocumentTemplate",
  documentTemplateSchema
);
module.exports = DocumentTemplate;
