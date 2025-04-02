const Patient = require('../models/patientModel');

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.getAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patients', error: error.message });
  }
};

// Get patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.getById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patient', error: error.message });
  }
};

// Search patients by name
exports.searchPatients = async (req, res) => {
  try {
    if (!req.query.search) {
      return res.status(400).json({ message: 'Search term is required' });
    }
    
    const patients = await Patient.searchByName(req.query.search);
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error searching patients', error: error.message });
  }
};

// Create new patient
exports.createPatient = async (req, res) => {
  try {
    if (!req.body.firstname || !req.body.lastname || !req.body.gender) {
      return res.status(400).json({ message: 'First name, last name, and gender are required' });
    }

    const newPatient = await Patient.create(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient', error: error.message });
  }
};

// Update patient
exports.updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.getById(patientId);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const updated = await Patient.update(patientId, req.body);
    if (updated) {
      res.status(200).json({ message: 'Patient updated successfully' });
    } else {
      res.status(400).json({ message: 'Patient could not be updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
};

// Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.getById(patientId);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const deleted = await Patient.delete(patientId);
    if (deleted) {
      res.status(200).json({ message: 'Patient deleted successfully' });
    } else {
      res.status(400).json({ message: 'Patient could not be deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
}; 