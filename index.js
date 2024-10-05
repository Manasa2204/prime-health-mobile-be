const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const doctorRoutes = require("./src/routes/doctor");
const salesRoutes = require("./src/routes/sales");
const commonRoutes = require("./src/routes/common");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/doctor", doctorRoutes);
app.use("/sales", salesRoutes);
app.use("/common", commonRoutes);

app.get("/", (req, res) => {
  res.json({ name: "manasa" });
});

mongoose
  .connect(process.env.MONGODB_URL, { dbName: "PrimeHealth" })
  .then(() => {
    app.listen(8002, () => {
      console.log("server is running at http://localhost:8002/");
    });
  })
  .catch((error) => {
    console.log("error connecting with database", error);
  });
