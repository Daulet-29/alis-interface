const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    category: { type: String },
    subtype: { type: String },
    mappingData: {},
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
