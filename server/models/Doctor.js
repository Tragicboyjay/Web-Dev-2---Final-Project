const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const doctorSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
    type: String,
    required: true
  },
  practice: {
    type: String,
    required: true
  },
  availability: {
    type: Object,
    of: [String],
  },
}, {
  timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

const doctors = [
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    password: 'test123', // Password to be hashed
    practice: 'Cardiology',
    avatar: 'https://via.placeholder.com/150',
    availability: {
      '2024-07-09': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-10': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-11': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-12': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-13': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-14': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-15': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
  },
  {
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    password: 'test123',
    practice: 'Dermatology',
    avatar: 'https://via.placeholder.com/150',
    availability: {
      '2024-07-09': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-10': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-11': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-12': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-13': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-14': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-15': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    password: 'test123',
    practice: 'Orthopedics',
    avatar: 'https://via.placeholder.com/150',
    availability: {
      '2024-07-09': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-10': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-11': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-12': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-13': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-14': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-15': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
  },
  {
    firstName: 'Sophia',
    lastName: 'Brown',
    email: 'sophia.brown@example.com',
    password: 'test123',
    practice: 'Pediatrics',
    avatar: 'https://via.placeholder.com/150',
    availability: {
      '2024-07-09': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-10': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-11': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-12': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-13': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-14': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-15': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
  },
  {
    firstName: 'Olivia',
    lastName: 'Garcia',
    email: 'olivia.garcia@example.com',
    password: 'test123',
    practice: 'Ophthalmology',
    avatar: 'https://via.placeholder.com/150',
    availability: {
      '2024-07-09': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-10': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-11': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-12': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-13': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-14': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-15': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
  },
  {
    firstName: 'Daniel',
    lastName: 'Martinez',
    email: 'daniel.martinez@example.com',
    password: 'test123',
    practice: 'Neurology',
    avatar: 'https://via.placeholder.com/150',
    availability: {
      '2024-07-09': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-10': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-11': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-12': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-13': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-14': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      '2024-07-15': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
  },
];
// Function to seed doctors data
const seedDoctors = async () => {
  try {
    await Doctor.deleteMany(); // Clear existing data

    for (let doctorData of doctors) {
      // Hash password before inserting
      const hashedPassword = await hashPassword(doctorData.password);
      doctorData.password = hashedPassword;
      const doctor = new Doctor(doctorData);
      // Insert doctor document
      await doctor.save();
      console.log(`Inserted doctor ${doctor.firstName} ${doctor.lastName}`);
    }

    console.log('Doctors inserted successfully');
  } catch (err) {
    console.error('Error inserting doctors:', err);
  }

};

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Seed doctors data on server startup
seedDoctors();
module.exports = Doctor;
