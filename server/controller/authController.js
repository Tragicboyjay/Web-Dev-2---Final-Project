require('dotenv').config();
const bcrypt = require('bcrypt');
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

async function createUser(req,res) {
    const type = req.params.type;
    const { firstName, lastName, password, email } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        
        if (type === "patient") {
            const existingEmail = await Patient.findOne({ email });

            if (existingEmail) return res.status(400).json({ message: 'Email already exists' });

            const newPatient = new Patient({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            });

            const addedPatient = await newPatient.save();

            return res.status(201).json({ "message": "Patient created successfuly!", "patient": addedPatient })   
        }

        else if (type === "doctor") {
            const existingEmail = await Doctor.findOne({ email });

            if (existingEmail) return res.status(400).json({ message: 'Email already exists' });

            const practice = req.body.practice;

            const newDoctor = new Doctor({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                practice: practice
            });

            const addedDoctor = await newDoctor.save();

            return res.status(201).json({ "message": "Doctor created successfuly!", "doctor": addedDoctor })   
        }

    } catch (e) {
        console.error('Error creating user:', e);
        res.status(500).json({ message: 'Internal server error' });
    }   
}

async function authenticateUser(req,res) {

}

module.exports = {
    createUser,
    authenticateUser
}; 