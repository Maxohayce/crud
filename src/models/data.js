const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      required: true,
      unique: true
    },
    country: {
      type: String,
      required: true
    },
    isDeleted: { default: false, type: Boolean },
  },
  { timestamps: true }
);

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
