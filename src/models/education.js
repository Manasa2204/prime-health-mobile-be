const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  course: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  college: { type: String, required: true },
});

const Education = mongoose.model("Education", educationSchema);
module.exports = Education;
