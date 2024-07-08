const Patient = require("../models/Patient") 
const Doctor = require("../models/Doctor") 
const Appointment = require("../models/Appointment") 

async function bookAppointment(req, res) {
    const { doctorId, startDate, patientId, time } = req.body;

    try {
        if (!doctorId || !startDate || !patientId) {
            return res.status(400).json({ message: 'Doctor ID, patient ID, and start date are required' });
        }

        
        const startDateObj = new Date(startDate);
        const dateString = startDateObj.toISOString().split('T')[0];
        const timeString = time;

        const doctor = await Doctor.findById(doctorId);
        
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        if (!doctor.availability[dateString]) {
            return res.status(400).json({ message: 'Doctor is not available on the requested date' });
        }

        if (!doctor.availability[dateString].includes(timeString)) {
            return res.status(400).json({ message: 'Doctor is not available at the requested time' });
        }

        const newAppointment = new Appointment({
            doctorId: doctor._id,
            patientId: patientId,
            date: dateString,
            time: timeString
        });w

        const savedAppointment = await newAppointment.save();

        // Push the appointment ID to the patient's appointments array
        await Patient.findByIdAndUpdate(patientId, { $push: { appointments: savedAppointment._id } });

        doctor.availability[dateString] = doctor.availability[dateString].filter(time => time !== timeString);
        await doctor.save();

        return res.status(201).json({ message: 'Appointment booked successfully', appointment: savedAppointment });
    } catch (e) {
        console.error('Error booking appointment:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getAppointmentByPatient(req, res) {
    const patientId = req.params.id;
  
    try {
      const existingPatient = await Patient.findById(patientId);
  
      if (!existingPatient) {
        return res.status(401).json({ message: 'The patient does not exist' });
      }
  
      // Populate the doctorId field to include firstName and lastName
      const appointments = await Appointment.find({ patientId: patientId }).populate('doctorId', 'firstName lastName');
  
      return res.status(200).json({ message: 'Appointments fetched successfully', appointments: appointments });
    } catch (e) {
      console.error('Error fetching patient appointments:', e);
      res.status(500).json({ message: 'Internal server error' });
    }
}

async function getAppointmentByDoctor(req, res) {
    const doctorId = req.params.id;

    try {
        const existingDoctor = await Doctor.findById(doctorId);

        if (!existingDoctor) {
            return res.status(401).json({ message: 'The doctor does not exist' });
        }

        // Find appointments and populate patient details
        const appointments = await Appointment.find({ doctorId: doctorId }).populate('patientId', 'firstName lastName');

        return res.status(200).json({ message: 'Appointments fetched successfully', appointments: appointments });
    } catch (e) {
        console.error('Error fetching doctor appointments:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function cancelAppointment(req, res) { 
    const appointmentId = req.params.id;

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        await Appointment.deleteOne({ _id: appointmentId });

        return res.status(200).json({ message: 'Appointment deleted successfully' });

    } catch (e) {
        console.error('Error deleting appointment:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function editAppointmentDate(req,res) {
    const appointmentId = req.params.id;
    const { startDate} = req.body;

    try {
        if (!startDate) {
        return res.status(400).json({ message: 'StartDate is required' });
        }

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.startDate = new Date(startDate);

        const updatedAppointment = await appointment.save();

        return res.status(200).json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (e) {
        console.error('Error updating appointment dates:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    getAppointmentByDoctor,
    getAppointmentByPatient,
    cancelAppointment,
    editAppointmentDate,
    bookAppointment
}