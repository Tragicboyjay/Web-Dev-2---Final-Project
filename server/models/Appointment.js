const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;
const Patient = require("./Patient")
const Doctor = require("./Doctor")

const appointmentSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  reason: {
    type: String,
   
  }
}, {
  timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

const seedAppointments = async function () {
    try {
        await Appointment.deleteMany()
      // Provided patient and doctor IDs
      const patientId = '6685a8f4cdc66ccf15f7a156';
      const doctorId = '668debee237e3b37af0d144b';
  
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
  
      const appointmentTimes = ['22:00', '23:00'];
  
      for (let time of appointmentTimes) {
        const newAppointment = new Appointment({
          doctorId: doctorId,
          patientId: patientId,
          date: dateString,
          time: time,
          reason: 'General Checkup' // or any other reason
        });
  
        const savedAppointment = await newAppointment.save();
  
        // Update patient appointments
        await Patient.findByIdAndUpdate(patientId, { $push: { appointments: savedAppointment._id } });
  
        // Update doctor availability
        const doctor = await Doctor.findById(doctorId);
        const updatedTimes = doctor.availability.get(dateString).filter(t => t !== time);
        doctor.availability.set(dateString, updatedTimes);
        await doctor.save();
  
        console.log(`Appointment for ${time} on ${dateString} created successfully`);
      }
  
      console.log('Appointments seeded successfully');
    } catch (err) {
      console.error('Error seeding appointments:', err);
    }
  };
  
  // Call the seed function
//   seedAppointments();



module.exports = Appointment;
