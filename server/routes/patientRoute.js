const express = require('express');
const { getPatientProfileByEmail, updatePatientEmail } = require('../controller/patientController');
const router = express.Router();

// Get patient profile by email
router.get('/profile', getPatientProfileByEmail);

// Update patient email
router.put('/email', updatePatientEmail);




module.exports = router;
