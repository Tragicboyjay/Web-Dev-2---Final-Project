const express = require('express');
const router = express.Router();

const {
    getAppointmentByDoctor,
    getAppointmentByPatient,
    cancleAppointment,
    editAppointmentDate,
    bookAppointment
} 
= require("../controller/appointmentController");

router.get("/doctor/:id", getAppointmentByDoctor);
router.get("/patient/:id", getAppointmentByPatient);

router.post("/book", bookAppointment)

router.patch("/edit/:id", editAppointmentDate)

router.delete("/:id", cancleAppointment);

module.exports = router;