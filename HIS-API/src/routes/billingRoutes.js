const express = require('express');
const billingController = require('../controllers/billingController');

const router = express.Router();

// GET all billings
router.get('/', billingController.getAllBillings);

// GET billings by patient ID
router.get('/patient/:patientId', billingController.getBillingsByPatientId);

// GET billing by ID
router.get('/:id', billingController.getBillingById);

// POST create new billing
router.post('/', billingController.createBilling);

// PUT update billing
router.put('/:id', billingController.updateBilling);

// DELETE billing
router.delete('/:id', billingController.deleteBilling);

module.exports = router; 