const Patient = require('../models/Patient');

// Get patient profile by email
exports.getPatientProfileByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const patient = await Patient.findOne({ email }).select('-password');
    if (!patient) return res.status(404).send('Patient not found');
    res.send(patient);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update patient email
exports.updatePatientEmail = async (req, res) => {
  try {
    const { email, newEmail } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(404).send('Patient not found');
    patient.email = newEmail;
    await patient.save();
    res.send(patient);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
