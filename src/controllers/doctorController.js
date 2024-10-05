const Appointment = require("../models/appointments");
const Doctor = require("../models/doctor");
const DoctorAttribute = require("../models/doctorAttribute");

exports.register = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ phoneNumber: req.body.phoneNumber });
    console.log(doctor, "user");
    if (doctor) {
      return res.status(400).json({
        error: { message: "doctor already registered" },
        success: false,
      });
    }
    let doctorAttribute = await DoctorAttribute.create({});
    console.log(doctorAttribute, "attribute");
    const newDoctor = new Doctor({
      ...req.body,
      doctorAttributes: doctorAttribute._id,
    });
    const result = await newDoctor.save();
    if (!result) {
      return res.status(500).json({
        error: { message: "doctor cannot be created" },
        success: false,
      });
    }
    console.log("succesffull");
    res.status(201).json({ doctor: result, success: true });
  } catch (error) {
    console.log(error, "error creating user");
    return res.status(500).json({ error: error, success: false });
  }
};

exports.deleteAccount = async (req, res) => {
  console.log("hello", req.params.id);
  try {
    const doc = await Doctor.findOne({ _id: req.params.id });
    await doc.deleteOne();
    console.log(data);
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log(error, "sdsjadkajs");
    return res.status(500).json({ error: error, success: false });
  }
};

exports.addAppointment = async (req, res) => {
  try {
    const appointmentData = await Appointment.create({ ...req.body });
    if (appointmentData) {
      const data = await DoctorAttribute.findByIdAndUpdate(
        req.params.id,
        { $push: { appointments: appointmentData._id } },
        { new: true }
      )
        .select("appointments")
        .populate({
          path: "appointments",
        });
      console.log(data, "doctor with edited data");
      return res.status(200).json({ success: true, appointments: data });
    }
    res.status(400).json({
      success: false,
      error: { message: "cannot create the appointment data" },
    });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const data = await DoctorAttribute.findOne({ _id: req.params.id })
      .select("appointments")
      .populate({ path: "appointments" })
      .exec();
    res.status(200).json({ success: true, appointments: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, success: false });
  }
};

exports.editAppointment = async (req, res) => {
  try {
    const appointmentData = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      {
        ...req.body,
      },
      { new: true }
    );
    if (appointmentData) {
      console.log(appointmentData, "appointmentData with edited data");
      return res
        .status(200)
        .json({ success: true, appointment: appointmentData });
    }
    res.status(400).json({
      success: false,
      error: { message: "cannot update the appointment Data" },
    });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentData = await Appointment.findByIdAndDelete(
      req.params.appointmentId
    );
    console.log(appointmentData);
    res.status(200).json({ success: true, appointment: appointmentData });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};
