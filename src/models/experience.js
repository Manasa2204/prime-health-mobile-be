const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  organization: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
