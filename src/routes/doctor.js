const express = require("express");

const router = express.Router();

const doctorController = require("../controllers/doctorController");

router.post("/register", doctorController.register);
router.delete("/delete/:id", doctorController.deleteAccount);
router.post("/:id/appointment/", doctorController.addAppointment);
router.post("/:id/appointment/", doctorController.addAppointment);
router.post("/appointment/:appointmentId", doctorController.editAppointment);
router.delete(
  "/appointment/:appointmentId",
  doctorController.deleteAppointment
);
router.get("/:id/appointment/", doctorController.getDoctorAppointments);

module.exports = router;
