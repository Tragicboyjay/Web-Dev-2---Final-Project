const express = require('express');
const router = express.Router();

const {
    getAppointmentByDoctor,
    getAppointmentByPatient,
    cancelAppointment,
    editAppointmentDate,
    bookAppointment
} 
= require("../controller/appointmentController");

router.get("/doctor/:id", getAppointmentByDoctor);

router.patch("/edit/:id", editAppointmentDate)
router.post("/book", bookAppointment)
router.delete("/:id", cancelAppointment);

router.get("/patient/:id", getAppointmentByPatient);
module.exports = router;