const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    Country: String,
    isDeleted: { default: false, type: Boolean },
  },
  { timestamps: true }
);

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
