const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
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
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
