const mongoose = require("mongoose");
const { constants } = require("@xavisoft/mongoose-cascade");
const { ON_DELETE } = constants;
const Education = require("./education");
const Experience = require("./experience");
const Appointment = require("./appointments");

const doctorAttributeSchema = new mongoose.Schema({
  experience: [
    {
      type: mongoose.ObjectId,
      ref: "Experience",
    },
  ],
  education: [
    {
      type: mongoose.ObjectId,
      ref: "Education",
    },
  ],
  appointments: [
    {
      type: mongoose.ObjectId,
      ref: "Appointment",
    },
  ],
  services: [
    {
      type: mongoose.ObjectId,
      ref: "Services",
    },
  ],
  specializations: [
    {
      type: mongoose.ObjectId,
      ref: "Specialization",
    },
  ],
});

doctorAttributeSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log(this, "this in attributes");
    try {
      // Delete related education, experience, and appointments documents
      await Education.deleteMany({
        _id: { $in: this.education },
      });
      await Experience.deleteMany({
        _id: { $in: this.experience },
      });
      await Appointment.deleteMany({
        _id: { $in: this.appointments },
      });

      next(); // Proceed with deleting the doctor
    } catch (error) {
      next(error); // Handle error
    }
  }
);

const DoctorAttributes = mongoose.model(
  "DoctorAttributes",
  doctorAttributeSchema
);
module.exports = DoctorAttributes;
