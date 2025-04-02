const Billing = require('../models/billingModel');

// Get all billings
exports.getAllBillings = async (req, res) => {
  try {
    const billings = await Billing.getAll();
    res.status(200).json(billings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving billings', error: error.message });
  }
};

// Get billing by ID
exports.getBillingById = async (req, res) => {
  try {
    const billing = await Billing.getById(req.params.id);
    if (!billing) {
      return res.status(404).json({ message: 'Billing not found' });
    }
    res.status(200).json(billing);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving billing', error: error.message });
  }
};

// Get billings by patient ID
exports.getBillingsByPatientId = async (req, res) => {
  try {
    const billings = await Billing.getByPatientId(req.params.patientId);
    res.status(200).json(billings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving billings', error: error.message });
  }
};

// Create new billing
exports.createBilling = async (req, res) => {
  try {
    if (!req.body.patient_id) {
      return res.status(400).json({ message: 'Patient ID is required' });
    }

    const newBilling = await Billing.create(req.body);
    res.status(201).json(newBilling);
  } catch (error) {
    res.status(500).json({ message: 'Error creating billing', error: error.message });
  }
};

// Update billing
exports.updateBilling = async (req, res) => {
  try {
    const billingId = req.params.id;
    const billing = await Billing.getById(billingId);
    
    if (!billing) {
      return res.status(404).json({ message: 'Billing not found' });
    }

    const updated = await Billing.update(billingId, req.body);
    if (updated) {
      res.status(200).json({ message: 'Billing updated successfully' });
    } else {
      res.status(400).json({ message: 'Billing could not be updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating billing', error: error.message });
  }
};

// Delete billing
exports.deleteBilling = async (req, res) => {
  try {
    const billingId = req.params.id;
    const billing = await Billing.getById(billingId);
    
    if (!billing) {
      return res.status(404).json({ message: 'Billing not found' });
    }

    const deleted = await Billing.delete(billingId);
    if (deleted) {
      res.status(200).json({ message: 'Billing deleted successfully' });
    } else {
      res.status(400).json({ message: 'Billing could not be deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting billing', error: error.message });
  }
};