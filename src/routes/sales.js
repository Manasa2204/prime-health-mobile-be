const express = require("express");

const router = express.Router();

const salesController = require("../controllers/salesController");

router.post("/register", salesController.register);

module.exports = router;
