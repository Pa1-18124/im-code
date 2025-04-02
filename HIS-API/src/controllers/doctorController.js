const Doctor = require('../models/doctorModel');

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.getAll();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving doctors', error: error.message });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.getById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving doctor', error: error.message });
  }
};

// Create new doctor
exports.createDoctor = async (req, res) => {
  try {
    if (!req.body.firstname || !req.body.lastname || !req.body.specialization) {
      return res.status(400).json({ message: 'First name, last name, and specialization are required' });
    }

    const newDoctor = await Doctor.create(req.body);
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating doctor', error: error.message });
  }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.getById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const updated = await Doctor.update(doctorId, req.body);
    if (updated) {
      res.status(200).json({ message: 'Doctor updated successfully' });
    } else {
      res.status(400).json({ message: 'Doctor could not be updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating doctor', error: error.message });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.getById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const deleted = await Doctor.delete(doctorId);
    if (deleted) {
      res.status(200).json({ message: 'Doctor deleted successfully' });
    } else {
      res.status(400).json({ message: 'Doctor could not be deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor', error: error.message });
  }
}; 