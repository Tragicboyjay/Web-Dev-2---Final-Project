const express = require('express');
const router = express.Router();

const {
    getDoctorsAvailability,
    getDoctors
} 
= require("../controller/doctorController");


router.get("/", getDoctors);
router.get("/:id/availability", getDoctorsAvailability);



module.exports = router;