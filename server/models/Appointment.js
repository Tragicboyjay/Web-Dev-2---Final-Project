const mongoose = require('mongoose');
const { type } = require('os');
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

const seedAppointments = async () => {
    
    await Appointment.deleteMany(); // Clear existing data

    const appointments = [
        {
          doctorId: "668832be9c2f364fcb45a852", // a doctor in your db
          patientId: "6685a8f4cdc66ccf15f7a156", // a patient in your db
          time: "09:00:00",
          date: '2024-07-10',
          reason: "sick"

        },
        {
          doctorId: "668832be9c2f364fcb45a852",
          patientId: "6685a8f4cdc66ccf15f7a156",
          time: '11:00:00',
          date: "2024-07-11",
          reason: "sick"
        },
        {
          doctorId: "6687013941a1ed8d2d745bea",
          patientId: "6685a8f4cdc66ccf15f7a156",
          time: '15:00:00',
          date: "2024-07-07",
          reason: "sick"
        },
        {
          doctorId: "668832be9c2f364fcb45a852",
          patientId: "6685a8f4cdc66ccf15f7a156",
          time: '15:00:00',
          date: "2024-07-06",
          reason: "sick"
        }
      ];
  
      for (let appointmentData of appointments) {
        const appointment = new Appointment(appointmentData);
        await appointment.save();
      }
}

// seedAppointments()
module.exports = Appointment;
