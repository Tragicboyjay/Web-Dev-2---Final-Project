require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Doctor = require('./models/Doctor');

// routes
const authRoute = require("./routes/authRoute");
const doctorRoute = require("./routes/doctorRoute");

app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router
app.use("/auth", authRoute);
app.use("/doctor", doctorRoute);

app.get("/", (req, res) => {
  res.send("test");
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
