const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
