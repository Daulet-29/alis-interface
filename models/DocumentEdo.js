const mongoose = require("mongoose");

const documentEdoSchema = new mongoose.Schema(
  {
    category: { type: String },
    subtype: { type: String },
    documents: {},
  },
  { timestamps: true }
);

const DocumentEdo = mongoose.model("DocumentEdo", documentEdoSchema);
module.exports = DocumentEdo;
