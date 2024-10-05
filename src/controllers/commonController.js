const Specialization = require("../models/specialization");
const data = require("../../data/specializations");
const Doctor = require("../models/doctor");
const DoctorAttribute = require("../models/doctorAttribute");
const Sales = require("../models/sales");
const Education = require("../models/education");
const Experience = require("../models/experience");
const Appointment = require("../models/appointments");
const Service = require("../models/services");

exports.login = async (req, res) => {
  try {
    let data;

    data = await Doctor.findOne({ phoneNumber: req.body.phoneNumber });
    console.log(data, "doctor");
    if (!data) {
      data = await Sales.findOne({ phoneNumber: req.body.phoneNumber });
    }
    console.log(data, "sales");

    if (data) {
      return res.json({ success: true, user: data });
    } else {
      return res.json({ success: false, error: { message: "user not found" } });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error, success: false });
  }
};

exports.addData = async (req, res) => {
  try {
    const data1 = await Specialization.insertMany(data);
    res.status(200).json({ success: true, specializations: data1 });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};

exports.getAllSpecializations = async (req, res) => {
  try {
    const data1 = await Specialization.find({});
    res.status(200).json({ success: true, specializations: data1 });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};
exports.getDoctorSpecialization = async (req, res) => {
  try {
    const data1 = await DoctorAttribute.findById(req.params.id)
      .select("specializations")
      .populate([{ path: "specializations" }]);
    res.status(200).json({ success: true, specializations: data1 });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};

exports.addDoctorSpecialization = async (req, res) => {
  try {
    if (req.params.doctorAttributeId) {
      console.log(req.params.doctorAttributeId);
      const data = await DoctorAttribute.findByIdAndUpdate(
        req.params.doctorAttributeId,
        { $addToSet: { specializations: [req.params.id] } },
        { new: true }
      )
        .select("specializations")
        .populate({
          path: "specializations",
        });
      console.log(data, "data afteradding");
      return res.status(200).json({ success: true, specializations: data });
    }
    res.status(400).json({
      success: false,
      error: { message: "cannot add the specialization data" },
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ error: error, success: false });
  }
};
exports.deleteDoctorSpecialization = async (req, res) => {
  try {
    if (req.params.doctorAttributeId) {
      console.log(req.params.doctorAttributeId);
      const data = await DoctorAttribute.findByIdAndUpdate(
        req.params.doctorAttributeId,
        { $pull: { specializations: req.params.id } },
        { new: true }
      )
        .select("specializations")
        .populate({
          path: "specializations",
        });
      console.log(data, "data afteradding");
      return res.status(200).json({ success: true, specializations: data });
    }
    res.status(400).json({
      success: false,
      error: { message: "cannot delete the specialization data" },
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ error: error, success: false });
  }
};

exports.getAllDoctorData = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.params.id })
      .populate({
        path: "doctorAttributes",
        populate: [{ path: "experience" }, { path: "education" }],
      })
      .exec();
    res.status(200).json({ success: true, doctor: doctor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, success: false });
  }
};

exports.editDoctorBasicData = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).select("-doctorAttributes");
    console.log(doctor, "doctor with edited data");
    res.status(200).json({ success: true, doctor: doctor });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};

exports.addDoctorEducation = async (req, res) => {
  try {
    const educationData = await Education.create({ ...req.body });
    if (educationData) {
      const data = await DoctorAttribute.findByIdAndUpdate(
        req.params.id,
        { $push: { education: educationData._id } },
        { new: true }
      )
        .select("education")
        .populate({
          path: "education",
        });
      console.log(data, "doctor with edited data");
      return res.status(200).json({ success: true, education: data });
    }
    res.status(400).json({
      success: false,
      error: { message: "cannot create the education data" },
    });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};
exports.addDoctorExperience = async (req, res) => {
  try {
    const experienceData = await Experience.create({ ...req.body });
    if (experienceData) {
      const data = await DoctorAttribute.findByIdAndUpdate(
        req.params.id,
        { $push: { experience: experienceData._id } },
        { new: true }
      )
        .select("experience")
        .populate({
          path: "experience",
        });
      console.log(data, "doctor with edited data");
      return res.status(200).json({ success: true, experience: data });
    }
    res.status(400).json({
      success: false,
      error: { message: "cannot create the experience data" },
    });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};

exports.editDoctorExperience = async (req, res) => {
  try {
    const experienceData = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (experienceData) {
      console.log(experienceData, "doctor with edited data");
      return res
        .status(200)
        .json({ success: true, experience: experienceData });
    }
    res.status(400).json({
      success: false,
      error: { message: "cannot update the experience data" },
    });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};
exports.editDoctorEducation = async (req, res) => {
  try {
    const educationData = await Education.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (educationData) {
      console.log(educationData, "doctor with edited data");
      return res.status(200).json({ success: true, education: educationData });
    }
    res.status(400).json({
      success: false,
      error: { message: "cannot update the education data" },
    });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};
