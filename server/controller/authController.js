require('dotenv').config();
const bcrypt = require('bcrypt');
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

async function createUser(req, res) {
    const type = req.params.type;
    const { firstName, lastName, password, email, practice } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        if (type === "patient") {
            const existingEmail = await Patient.findOne({ email });

            if (existingEmail) return res.status(400).json({ message: 'Email already exists' });

            const newPatient = new Patient({
                firstName,
                lastName,
                email,
                password: hashedPassword
            });

            const addedPatient = await newPatient.save();

            // Omit password from the user object sent to the client
            const userWithoutPassword = {
                _id: addedPatient._id,
                firstName: addedPatient.firstName,
                lastName: addedPatient.lastName,
                email: addedPatient.email
            };

            return res.status(201).json({ message: "Patient created successfully!", user: userWithoutPassword });
        }

        else if (type === "doctor") {
            const existingEmail = await Doctor.findOne({ email });

            if (existingEmail) return res.status(400).json({ message: 'Email already exists' });

            const newDoctor = new Doctor({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                practice
            });

            const addedDoctor = await newDoctor.save();

            // Omit password from the user object sent to the client
            const userWithoutPassword = {
                _id: addedDoctor._id,
                firstName: addedDoctor.firstName,
                lastName: addedDoctor.lastName,
                email: addedDoctor.email,
                practice: addedDoctor.practice,
            };

            return res.status(201).json({ message: "Doctor created successfully!", user: userWithoutPassword });
        }

    } catch (e) {
        console.error('Error creating user:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function authenticateUser(req,res) {
    const type = req.params.type;
    const { email, password } = req.body;

    try {

        const existingUser = type === "patient" ? await Patient.findOne({ email }) : await Doctor.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({ message: 'The email or password you\'ve entered is incorect' });
        }

        const existingUserPassword = existingUser.password

        const passwordMatch = await bcrypt.compare(password,existingUserPassword);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'The email or password you\'ve entered is incorect' });
        }

        res.status(200).json({ message: 'Login successful', 
        user: {
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            id: existingUser._id,
            practice: existingUser.practice
        }});
    } catch (e) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createUser,
    authenticateUser
}; 