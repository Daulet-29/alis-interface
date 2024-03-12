const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstName: { type: String },
  lastName: { type: String },
  parentName: { type: String },
  iin: { type: String },
  phone: { type: String },
  address: { type: String },
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  position: { type: String },
  salary_gross: { type: Number },
  salary_net: { type: Number },
  employment_agreement_number: { type: String },
  date_agreement_number: { type: Date },
  agreement_term: { type: Date },
  department: { type: String },
  receipt_date: { type: Date },
  dismissal_date: { type: Date },
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
