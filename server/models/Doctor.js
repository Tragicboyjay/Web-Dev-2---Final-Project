const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  availability: [{
    type: Date,
  }]
}, {
  timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
