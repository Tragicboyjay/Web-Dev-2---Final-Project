const Doctor = require("../models/Doctor");


async function getDoctors(req,res) {
    const doctors = await Doctor.find();
    res.send(doctors);
}

async function getDoctorsAvailability(req, res) {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }
    res.send(doctor.availability);
}

module.exports = {
    getDoctorsAvailability,
    getDoctors
}