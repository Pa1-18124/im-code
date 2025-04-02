const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

// GET all patients
router.get('/', patientController.getAllPatients);

// GET search patients
router.get('/search', patientController.searchPatients);

// GET patient by ID
router.get('/:id', patientController.getPatientById);

// POST create new patient
router.post('/', patientController.createPatient);

// PUT update patient
router.put('/:id', patientController.updatePatient);

// DELETE patient
router.delete('/:id', patientController.deletePatient);

module.exports = router; 