const express = require("express");

const router = express.Router();

const commonController = require("../controllers/commonController");

router.post("/login", commonController.login);
router.post("/specializations", commonController.addData);
router.post(
  "/addSpecialization/:id/doctorAttribute/:doctorAttributeId",
  commonController.addDoctorSpecialization
);
router.delete(
  "/deleteSpecialization/:id/doctorAttribute/:doctorAttributeId",
  commonController.deleteDoctorSpecialization
);
router.get("/getAllSpecializations", commonController.getAllSpecializations);
router.get(
  "/getDoctorSpecialization/:id",
  commonController.getDoctorSpecialization
);
router.get("/doctor/:id", commonController.getAllDoctorData);
router.post("/doctor/:id", commonController.editDoctorBasicData);
router.post(
  "/doctorAttribute/education/:id",
  commonController.addDoctorEducation
);
router.post(
  "/doctorAttribute/experience/:id",
  commonController.addDoctorExperience
);
router.post(
  "/doctorAttribute/experience/edit/:id",
  commonController.editDoctorExperience
);
router.post(
  "/doctorAttribute/education/edit/:id",
  commonController.editDoctorEducation
);

module.exports = router;
