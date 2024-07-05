const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

const seedAppointments = async () => {
    
    await Appointment.deleteMany(); // Clear existing data

    const appointments = [
        {
          doctorId: "6687013941a1ed8d2d745bee", // a doctor in your db
          patientId: "6685a8f4cdc66ccf15f7a156", // a patient in your db
          startTime: "09:00:00",
          date: new Date('2024-07-10')

        },
        {
          doctorId: "6687013941a1ed8d2d745bee",
          patientId: "6685a8f4cdc66ccf15f7a156",
          startTime: '11:00:00',
          date: new Date('2024-07-11')
        }
      ];
  
      for (let appointmentData of appointments) {
        const appointment = new Appointment(appointmentData);
        await appointment.save();
      }
}

// seedAppointments()
module.exports = Appointment;
