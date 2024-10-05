const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  fromTime: { type: Date, required: true },

  toTime: { type: Date, required: true },
  fee: { type: String, required: true },
  mode: { type: String, enum: ["OFFLINE", "ONLINE"] },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
