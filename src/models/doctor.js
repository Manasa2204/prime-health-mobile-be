const mongoose = require("mongoose");
const DoctorAttributes = require("./doctorAttribute");

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  doctorAttributes: {
    type: mongoose.ObjectId,
    ref: "DoctorAttributes",
  },
  userType: {
    type: String,
    default: "DOCTOR",
  },
  code: String,
  expiresIn: Number,
});
doctorSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      console.log("deleted doctor attribute before", this.doctorAttributes);

      // Delete related education, experience, and appointments documents
      // await DoctorAttributes.deleteOne({
      //   _id: this.doctorAttributes,
      // });

      const doc = await DoctorAttributes.findOne({
        _id: this.doctorAttributes,
      });
      await doc.deleteOne();
      console.log("deleted doctor attribute");
      next(); // Proceed with deleting the doctor
    } catch (error) {
      console.log(error, "error in doctor");
      next(error); // Handle error
    }
  }
);
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
