const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    bin_iin: { type: String },
    name: { type: String },
    actual_address: { type: String },
    jur_address: { type: String },
    director: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    phone: { type: String },
    email: { type: String },
    bank_information: { type: String },
    account_no: { type: String },
    swift_code: { type: String },
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);
// module.exports = Organization;
export default Organization;
