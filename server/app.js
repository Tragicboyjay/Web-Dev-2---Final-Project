require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Doctor = require('./models/Doctor');
// routes
const authRoute = require("./routes/authRoute");

app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("test");
});

app.get("/api/doctors", async (req, res) => {
  const doctors = await Doctor.find();
  res.send(doctors);
});

app.get("/api/doctors/:id/availability", async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return res.status(404).send("Doctor not found");
  }
  res.send(doctor.availability);
});

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to DB and Listening at http://localhost:${process.env.PORT}/`
      );
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
