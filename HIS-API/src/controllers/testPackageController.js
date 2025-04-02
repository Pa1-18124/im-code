const TestPackage = require('../models/testPackageModel');

// Get all test packages
exports.getAllTestPackages = async (req, res) => {
  try {
    const packages = await TestPackage.getAll();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving test packages', error: error.message });
  }
};

// Get test package by ID
exports.getTestPackageById = async (req, res) => {
  try {
    const testPackage = await TestPackage.getById(req.params.id);
    if (!testPackage) {
      return res.status(404).json({ message: 'Test package not found' });
    }
    
    // Get the tests in the package
    const tests = await TestPackage.getTestsInPackage(req.params.id);
    
    // Add tests array to the package object
    testPackage.tests = tests;
    
    res.status(200).json(testPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving test package', error: error.message });
  }
};

// Get tests in a package
exports.getTestsInPackage = async (req, res) => {
  try {
    const tests = await TestPackage.getTestsInPackage(req.params.id);
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tests in package', error: error.message });
  }
};

// Create new test package
exports.createTestPackage = async (req, res) => {
  try {
    if (!req.body.description || !req.body.price) {
      return res.status(400).json({ message: 'Description and price are required' });
    }

    const newPackage = await TestPackage.create(req.body);
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating test package', error: error.message });
  }
};

// Update test package
exports.updateTestPackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const testPackage = await TestPackage.getById(packageId);
    
    if (!testPackage) {
      return res.status(404).json({ message: 'Test package not found' });
    }

    const updated = await TestPackage.update(packageId, req.body);
    if (updated) {
      res.status(200).json({ message: 'Test package updated successfully' });
    } else {
      res.status(400).json({ message: 'Test package could not be updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating test package', error: error.message });
  }
};

// Delete test package
exports.deleteTestPackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const testPackage = await TestPackage.getById(packageId);
    
    if (!testPackage) {
      return res.status(404).json({ message: 'Test package not found' });
    }

    const deleted = await TestPackage.delete(packageId);
    if (deleted) {
      res.status(200).json({ message: 'Test package deleted successfully' });
    } else {
      res.status(400).json({ message: 'Test package could not be deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting test package', error: error.message });
  }
}; 