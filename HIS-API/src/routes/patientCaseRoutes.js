const express = require('express');
const patientCaseController = require('../controllers/patientCaseController');

const router = express.Router();

// GET all patient cases
router.get('/', patientCaseController.getAllPatientCases);

// GET cases by patient ID
router.get('/patient/:patientId', patientCaseController.getCasesByPatientId);

// GET cases by doctor ID
router.get('/doctor/:doctorId', patientCaseController.getCasesByDoctorId);

// GET patient case by ID
router.get('/:id', patientCaseController.getPatientCaseById);

// POST create new patient case
router.post('/', patientCaseController.createPatientCase);

// PUT update patient case
router.put('/:id', patientCaseController.updatePatientCase);

// DELETE patient case
router.delete('/:id', patientCaseController.deletePatientCase);

module.exports = router; 