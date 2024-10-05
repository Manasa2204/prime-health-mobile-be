const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
  },
  doctorsAdded: [
    {
      type: mongoose.ObjectId,
      ref: "DoctorAttributes",
    },
  ],
  userType: {
    type: String,
    default: "SALES",
  },
  code: String,
  expiresIn: Number,
});

const Sales = mongoose.model("Sales", salesSchema);
module.exports = Sales;
