const PatientCase = require('../models/patientCaseModel');

// Get all patient cases
exports.getAllPatientCases = async (req, res) => {
  try {
    const cases = await PatientCase.getAll();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patient cases', error: error.message });
  }
};

// Get patient case by ID
exports.getPatientCaseById = async (req, res) => {
  try {
    const patientCase = await PatientCase.getById(req.params.id);
    if (!patientCase) {
      return res.status(404).json({ message: 'Patient case not found' });
    }
    res.status(200).json(patientCase);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patient case', error: error.message });
  }
};

// Get cases by patient ID
exports.getCasesByPatientId = async (req, res) => {
  try {
    const cases = await PatientCase.getByPatientId(req.params.patientId);
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patient cases', error: error.message });
  }
};

// Get cases by doctor ID
exports.getCasesByDoctorId = async (req, res) => {
  try {
    const cases = await PatientCase.getByDoctorId(req.params.doctorId);
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patient cases', error: error.message });
  }
};

// Create new patient case
exports.createPatientCase = async (req, res) => {
  try {
    if (!req.body.patient_id || !req.body.doctor_id) {
      return res.status(400).json({ message: 'Patient ID and Doctor ID are required' });
    }

    const newCase = await PatientCase.create(req.body);
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient case', error: error.message });
  }
};

// Update patient case
exports.updatePatientCase = async (req, res) => {
  try {
    const caseId = req.params.id;
    const patientCase = await PatientCase.getById(caseId);
    
    if (!patientCase) {
      return res.status(404).json({ message: 'Patient case not found' });
    }

    const updated = await PatientCase.update(caseId, req.body);
    if (updated) {
      res.status(200).json({ message: 'Patient case updated successfully' });
    } else {
      res.status(400).json({ message: 'Patient case could not be updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient case', error: error.message });
  }
};

// Delete patient case
exports.deletePatientCase = async (req, res) => {
  try {
    const caseId = req.params.id;
    const patientCase = await PatientCase.getById(caseId);
    
    if (!patientCase) {
      return res.status(404).json({ message: 'Patient case not found' });
    }

    const deleted = await PatientCase.delete(caseId);
    if (deleted) {
      res.status(200).json({ message: 'Patient case deleted successfully' });
    } else {
      res.status(400).json({ message: 'Patient case could not be deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient case', error: error.message });
  }
}; 