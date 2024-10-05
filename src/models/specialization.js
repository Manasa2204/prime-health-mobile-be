const mongoose = require("mongoose");

const specializationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Specialization = mongoose.model("Specialization", specializationSchema);
module.exports = Specialization;
