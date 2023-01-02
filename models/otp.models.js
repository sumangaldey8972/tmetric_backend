const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    email: { type: String },
    otp: { type: Number },
  },
  {
    timestamps: true,
  }
);

const optModel = new mongoose.model("otp", otpSchema);

module.exports = optModel;
